import { NextRequest, NextResponse } from "next/server";
import { addClientToNotion, addFeedbackToNotion, updateFeedbackEmailSent } from "@/lib/notion";
import { sendThankYouEmail } from "@/lib/email";

// Types pour les données Tally
interface TallyField {
  key: string;
  label: string;
  type: string;
  value: string | number | null;
}

interface TallyData {
  responseId: string;
  formId: string;
  fields: TallyField[];
}

interface TallyPayload {
  eventId: string;
  eventType: string;
  data: TallyData;
}

// Fonction pour convertir le tableau fields en objet
function parseFields(fields: TallyField[]): Record<string, any> {
  const result: Record<string, any> = {};
  fields.forEach((field) => {
    result[field.label] = field.value;
  });
  return result;
}

export async function POST(request: NextRequest) {
  try {
    console.log("[Webhook] Requête reçue");
    const body = (await request.json()) as TallyPayload;
    console.log("[Webhook] Body parsé:", JSON.stringify(body).substring(0, 200));

    if (body.eventType !== "FORM_RESPONSE") {
      return NextResponse.json(
        { message: "Event type not FORM_RESPONSE, ignoring" },
        { status: 200 }
      );
    }

    const fields = parseFields(body.data.fields);

    // Validation des données requises
    const prenom = fields["Votre prénom"];
    const email = fields["Votre email"];

    if (!prenom || !email) {
      console.error("[Webhook] Données manquantes:", { prenom, email });
      return NextResponse.json(
        { error: "Prénom et email sont requis" },
        { status: 400 }
      );
    }

    console.log("[Webhook Tally] Données reçues:", {
      prenom,
      email,
      allFields: Object.keys(fields),
    });

    // 1. Ajouter le client à Notion
    console.log("[Notion] Tentative d'ajout client...");
    const clientId = await addClientToNotion({
      name: prenom,
      email: email,
      phone: fields["Votre numéro téléphone"],
    });

    console.log("[Notion] Client ajouté:", clientId);

    // 2. Ajouter le feedback à Notion
    console.log("[Notion] Tentative d'ajout feedback...");
    const noteContenu =
      fields["Comment évaluez vous le contenu en général ?"] ||
      fields["Comment évaluez-vous le contenu en général ?"] ||
      0;
    
    const noteGlobale =
      fields["Quelle est votre niveau de satisfaction général ?"] || 0;

    const feedbackId = await addFeedbackToNotion({
      clientId,
      noteContenu: Number(noteContenu),
      noteGlobale: Number(noteGlobale),
      appreciation: fields["Qu'avez vous le plus apprécié ?"],
      aspects: fields["Quels aspects mériteraient d'être repensés ?"],
      atelier: fields["À quel atelier avez-vous participé ?"],
    });

    console.log("[Notion] Feedback ajouté:", feedbackId);

    // 3. Envoyer l'email de remerciement
    console.log("[Email] Tentative d'envoi...");
    const emailResponse = await sendThankYouEmail({
      to: email,
      name: prenom,
      rating: Number(noteGlobale),
      feedback: fields["Qu'avez vous le plus apprécié ?"],
    });

    console.log("[Email] Remerciement envoyé:", emailResponse);

    // 4. Mettre à jour le feedback pour indiquer que l'email a été envoyé
    console.log("[Notion] Mise à jour du statut email...");
    await updateFeedbackEmailSent(feedbackId);

    console.log("[Notion] Statut email mis à jour");

    return NextResponse.json(
      {
        success: true,
        message: "Merci pour votre avis! Un email de remerciement a été envoyé.",
        clientId,
        feedbackId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Webhook Error]", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erreur serveur inconnue";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// GET endpoint pour vérifier que l'API fonctionne
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Webhook Tally prêt à recevoir des données (v1)",
    timestamp: new Date().toISOString(),
  });
}

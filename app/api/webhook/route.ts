import { NextRequest, NextResponse } from "next/server";
import { addClientToNotion, addFeedbackToNotion, updateFeedbackEmailSent } from "@/lib/notion";
import { sendThankYouEmail } from "@/lib/email";

// Types pour les données Tally
interface TallyFormData {
  data: {
    "À quel atelier avez-vous participé ?"?: string;
    "Quand ?"?: string;
    "Comment évaluez-vous le contenu en général ?"?: number;
    "Quelle est votre niveau de satisfaction général ?"?: number;
    "Qu'avez-vous le plus apprécié ?"?: string;
    "Quels aspects mériteraient d'être repensés ?"?: string;
    "Votre prénom"?: string;
    "Votre email"?: string;
    "Votre numéro téléphone"?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TallyFormData;
    const { data } = body;

    // Validation des données requises
    if (!data["Votre prénom"] || !data["Votre email"]) {
      return NextResponse.json(
        { error: "Prénom et email sont requis" },
        { status: 400 }
      );
    }

    console.log("[Webhook Tally] Données reçues:", {
      nom: data["Votre prénom"],
      email: data["Votre email"],
    });

    // 1. Ajouter le client à Notion
    const clientId = await addClientToNotion({
      name: data["Votre prénom"],
      email: data["Votre email"],
      phone: data["Votre numéro téléphone"],
    });

    console.log("[Notion] Client ajouté:", clientId);

    // 2. Ajouter le feedback à Notion
    const feedbackId = await addFeedbackToNotion({
      clientId,
      noteContenu: data["Comment évaluez-vous le contenu en général ?"] || 0,
      noteGlobale: data["Quelle est votre niveau de satisfaction général ?"] || 0,
      appreciation: data["Qu'avez-vous le plus apprécié ?"],
      aspects: data["Quels aspects mériteraient d'être repensés ?"],
      atelier: data["À quel atelier avez-vous participé ?"],
    });

    console.log("[Notion] Feedback ajouté:", feedbackId);

    // 3. Envoyer l'email de remerciement
    const emailResponse = await sendThankYouEmail({
      to: data["Votre email"],
      name: data["Votre prénom"],
      rating: data["Quelle est votre niveau de satisfaction général ?"] || 0,
      feedback: data["Qu'avez-vous le plus apprécié ?"],
    });

    console.log("[Email] Remerciement envoyé:", emailResponse);

    // 4. Mettre à jour le feedback pour indiquer que l'email a été envoyé
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
    message: "Webhook Tally prêt à recevoir des données",
    timestamp: new Date().toISOString(),
  });
}

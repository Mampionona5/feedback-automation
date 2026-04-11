import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string;
  name: string;
  rating: number;
  feedback?: string;
}

export async function sendThankYouEmail(data: EmailData) {
  try {
    const response = await resend.emails.send({
      from: "attimo@resend.dev",
      to: data.to,
      subject: "Merci pour votre avis - Attimo",
      html: generateThankYouEmail(data),
    });

    return response;
  } catch (error) {
    console.error("Erreur Resend - email:", error);
    throw error;
  }
}

function generateThankYouEmail(data: EmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          .content { background-color: #f9fafb; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          .footer { text-align: center; color: #999; font-size: 12px; }
          .rating { font-size: 18px; font-weight: bold; color: #4F46E5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Merci ${data.name} ! 🙏</h1>
          </div>
          
          <div class="content">
            <p>Nous avons bien reçu votre avis pour l'atelier Attimo.</p>
            
            <p><strong>Votre satisfaction générale :</strong> <span class="rating">${data.rating}/10</span></p>
            
            ${data.feedback ? `<p><strong>Votre retour :</strong></p><p>${data.feedback}</p>` : ""}
            
            <p>Votre feedback nous est extrêmement précieux pour continuer à améliorer nos services.</p>
            
            <p>À très bientôt ! 📊</p>
            <p><strong>L'équipe Attimo</strong></p>
          </div>
          
          <div class="footer">
            <p>Cet email a été envoyé automatiquement. Merci de ne pas y répondre.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

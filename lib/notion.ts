import { Client } from "@notionhq/client";

function getNotionClient() {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY is not set");
  }
  return new Client({
    auth: process.env.NOTION_API_KEY,
  });
}

export async function addClientToNotion(data: {
  name: string;
  email: string;
  phone?: string;
}) {
  const notion = getNotionClient();
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_CLIENTS_DATABASE_ID!,
      },
      properties: {
        Nom: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        Email: {
          email: data.email,
        },
        ...(data.phone && {
          "Téléphone": {
            phone_number: data.phone,
          },
        }),
        "Date d'ajout": {
          date: {
            start: new Date().toISOString().split("T")[0],
          },
        },
      },
    });

    return response.id;
  } catch (error) {
    console.error("Erreur Notion - ajout client:", error);
    throw error;
  }
}

export async function addFeedbackToNotion(data: {
  clientId: string;
  clientName: string;
  noteContenu: number;
  noteGlobale: number;
  appreciation?: string;
  aspects?: string;
  atelier?: string;
}) {
  const notion = getNotionClient();
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_FEEDBACK_DATABASE_ID!,
      },
      properties: {
        "Clients": {
          title: [
            {
              text: {
                content: data.clientName,
              },
            },
          ],
        },
        "Note Contenu": {
          number: data.noteContenu,
        },
        "Note Globale": {
          number: data.noteGlobale,
        },
        ...(data.appreciation && {
          "Qu'avez-vous apprécié ?": {
            rich_text: [
              {
                text: {
                  content: data.appreciation,
                },
              },
            ],
          },
        }),
        ...(data.aspects && {
          "Aspects à repenser": {
            rich_text: [
              {
                text: {
                  content: data.aspects,
                },
              },
            ],
          },
        }),
        "Email envoyé": {
          checkbox: false,
        },
      },
    });

    return response.id;
  } catch (error) {
    console.error("Erreur Notion - ajout feedback:", error);
    throw error;
  }
}

export async function updateFeedbackEmailSent(feedbackId: string) {
  const notion = getNotionClient();
  try {
    await notion.pages.update({
      page_id: feedbackId,
      properties: {
        "Email envoyé": {
          checkbox: true,
        },
      },
    });
  } catch (error) {
    console.error("Erreur Notion - update email envoyé:", error);
    throw error;
  }
}

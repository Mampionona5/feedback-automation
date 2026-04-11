import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback Automation - Attimo",
  description: "Système d'automatisation des avis clients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

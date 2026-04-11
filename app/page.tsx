export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>✅ Feedback Automation App</h1>
        <p>
          Server is running and ready to receive webhook data from Tally.
        </p>

        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "30px",
            textAlign: "left",
          }}
        >
          <h2>Endpoint API</h2>
          <code
            style={{
              backgroundColor: "#333",
              color: "#0f0",
              padding: "10px",
              borderRadius: "4px",
              display: "block",
              marginBottom: "10px",
            }}
          >
            POST /api/webhook
          </code>

          <h2>Fonctionnalités Activées</h2>
          <ul>
            <li>✅ Réception des données Tally</li>
            <li>✅ Sauvegarde en base Notion</li>
            <li>✅ Envoi d'email de remerciement</li>
            <li>✅ Suivi du statut d'envoi</li>
          </ul>

          <p style={{ marginTop: "20px", color: "#666", fontSize: "14px" }}>
            Connecte le webhook Tally à:{" "}
            <code>https://[ton-domaine-vercel]/api/webhook</code>
          </p>
        </div>
      </div>
    </main>
  );
}

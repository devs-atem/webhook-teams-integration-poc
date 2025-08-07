require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const { event, data } = req.body;

  const message = {
    text: `🚩 Flagsmith Trigger:\n\nEvento: *${event}*\nFeature: *${data.feature?.name || 'N/A'}*\nAmbiente: *${data.environment || 'N/A'}*`,
  };

  try {
    await axios.post(process.env.TEAMS_WEBHOOK_URL, message);
    console.log("✅ Enviado para Teams");
    res.status(200).send("OK");
  } catch (err) {
    console.error("❌ Erro:", err.message);
    res.status(500).send("Erro ao enviar para Teams");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Flagsmith-to-Teams ativo!");
});

app.listen(port, () => {
  console.log(`🚀 Rodando na porta ${port}`);
});

const express = require("express");
const Parser = require("rss-parser");
const cors = require("cors");

const app = express();
const parser = new Parser();
const PORT = process.env.PORT || 3000;

app.use(cors());

const feeds = {
  g1: "https://g1.globo.com/rss/g1/",
  agenciabrasil: "https://agenciabrasil.ebc.com.br/rss.xml",
  veja: "https://veja.abril.com.br/rss",
  olhardigital: "https://olhardigital.com.br/feed/",
  cnn: "https://www.cnnbrasil.com.br/feed/",
  poder360: "https://www.poder360.com.br/feed/",
  infomoney: "https://www.infomoney.com.br/feed/"
};

function extrairImagemDoHTML(html) {
  const match = html?.match(/<img[^>]+src=["']?([^"'>]+)["']?/i);
  return match ? match[1] : null;
}

app.get("/news", async (req, res) => {
  try {
    const results = [];

    for (const [fonte, url] of Object.entries(feeds)) {
      const feed = await parser.parseURL(url);
      const noticias = feed.items.slice(0, 3).map((item) => {
        const imagemDireta = item.enclosure?.url;
        const imagemExtraida = extrairImagemDoHTML(item["content:encoded"] || item.content || "");
        return {
          fonte,
          titulo: item.title,
          link: item.link,
          resumo: ((item.contentSnippet || item.content || "")
            .replace(/<[^>]+>/g, "")
            .trim()
            .slice(0, 250) + "..."),
          imagem: imagemDireta || imagemExtraida || "https://via.placeholder.com/400x200?text=NoticiaZap",
        };
      });

      results.push(...noticias);
    }

    res.json(results);
  } catch (error) {
    console.error("Erro ao carregar feeds:", error);
    res.status(500).json({ error: "Erro ao carregar feeds" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
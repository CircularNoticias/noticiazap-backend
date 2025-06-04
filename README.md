# NotíciaZap - Backend

Este é o backend do **NotíciaZap**, um agregador de notícias que coleta e exibe as últimas manchetes de diversas fontes confiáveis do Brasil.

## 🚀 Funcionalidades

- Consome múltiplos feeds RSS (G1, Agência Brasil, CNN Brasil, Olhar Digital, Poder360 e mais).
- Extrai título, link, resumo, imagem e fonte.
- Processa conteúdo HTML e retira imagem diretamente, caso não venha via RSS.
- API JSON disponível em `/news`.

## 🌐 Endpoint

```http
GET /news
```

Retorna uma lista de notícias agregadas.

## ▶️ Como rodar localmente

```bash
npm install
node index.js
```

A aplicação estará disponível em `http://localhost:3000/news`.

---
Projeto em desenvolvimento para fins de protótipo.
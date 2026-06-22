# Project Memory: Chatbot Centralino AI

## Overview
- **Goal:** Create an AI chatbot for https://www.centralinoai.it/ (WordPress).
- **Frontend:** Code snippet to embed. Animated icon (bottom right), colors: Dark Blue (#003559), Orange (#FF9914). Design inspiration from Dribbble link.
- **Backend/Hosting:** Vercel (using user's connected account). Next.js API route or plain Vercel functions exposing a `widget.js`.
- **LLM:** Gemini 1.5 Flash.
- **Core Functionality:** Answer questions ONLY about AI-Voice product. Propose call via contact form when appropriate.
- **Guardrails:** Exact fallback string: "Posso rispondere soltanto a domande che riguardano l'argomento Centralino con Intelligenza Artificiale."
- **Memory:** Simple history (10 messages max).
- **Lead Qualification:** Ask what kind of company they are and what their current difficulties are.
- **CTA Link:** https://www.centralinoai.it/#demo

## Current State (Aggiornato)
- **Design & Sviluppo Completati:** Il widget Frontend in React (usando Vite) e l'API Serverless (`api/chat.js`) per Vercel sono stati completamente sviluppati.
- **Logica AI:** Il file `gemini.md` funge da Knowledge Base per l'agente. I guardrail (temperature 0.2 e blocco degli argomenti fuori tema) sono stati integrati.
- **Build testata:** Il comando `npm run build` genera correttamente i file minimizzati `widget.js` e `widget.css`.
- **Documentazione:** È stato generato il file di `walkthrough.md` contenente la sintesi e i passaggi per il deploy.

## Prossimi Passi (Da fare da Lunedì)
1. **Repository:** Inizializzare un repository Git, fare il commit e pushare i file su GitHub.
2. **Deploy Vercel:** Importare il repository su Vercel.
3. **Variabili d'ambiente:** Aggiungere la `GEMINI_API_KEY` su Vercel prima del deploy finale.
4. **Integrazione WordPress:** Inserire i tag `<script>` e `<link>` (forniti da Vercel) nel Footer del sito www.centralinoai.it.

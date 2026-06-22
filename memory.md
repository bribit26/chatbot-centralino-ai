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
- **Design & Sviluppo Completati:** Il widget Frontend in React (usando Vite) e l'API Serverless (`api/chat.js`) per Vercel sono stati sviluppati.
- **Logica AI:** Il file `gemini.md` è stato convertito in `api/prompt.js` per risolvere problemi di compatibilità con le funzioni serverless di Vercel. Il modello LLM utilizzato è `gemini-2.5-flash` per restare all'interno dei limiti del Free Tier di Google AI Studio in Europa.
- **Deploy:** Il codice è ospitato su GitHub e deployato con successo su Vercel. Il widget è in grado di dialogare correttamente con le API e rispondere alle domande.
- **Integrazione:** Sono stati impostati i percorsi assoluti, i CORS e i tag corretti per l'inserimento in WordPress.

## Prossimi Passi
1. **Miglioramento UI/UX:** Rendere l'icona del chatbot più "particolare" rispetto a un'icona generica.
2. **Animazioni Avanzate:** Introdurre animazioni fluide ispirate ai migliori design Dribbble (es. morphing del pulsante, effetti ripple/pulsanti, transizioni morbide all'apertura).
3. **Perfezionamento Grafico:** Applicare micro-interazioni e stili CSS moderni al widget per renderlo un prodotto "Premium".

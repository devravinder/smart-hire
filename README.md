# 🚀 Smart Hire – AI-Powered Recruiter

Open-source AI recruiting platform using LLMs + embeddings + vector search for automated candidate evaluation and job matching.

## ✨ Key Features

- AI job ↔ candidate matching
- Dual LLM (embeddings + chat)
- Qdrant vector DB + Postgres
- Cloud / Local / Hybrid model support
- OpenAPI playground
- 100% open-source & self-hostable

## 🗂️ Project Structure

- `server/` – Node.js backend, APIs, LLM logic
- `client/` – Web UI (React/Vite/Next)
- `qdrant` – Vector database
- `postgres` – Metadata & messages

## ⚡ Quick Local Setup

### 1. Start databases

Run Postgres + Qdrant (Docker or cloud)

### 2. Backend (.env in `server/`)

```env
POSTGRES_URL=... POSTGRES_USER=... POSTGRES_PASSWORD=... POSTGRES_DB=...
QDRANT_URL=... QDRANT_API_KEY=...

GOOGLE_AI_STUDIO_API_KEY=...
GROK_API_KEY=...

MODELS_ENV=CLOUD   # or LOCAL / HYBRID
```

```sh
cd server
pnpm install
pnpm run seed   # optional
pnpm run dev
```

### 3. Frontend

```bash
cd client
pnpm install
pnpm run dev
```

→ <http://localhost:3000>

## 🔑 Required AI Keys (at least one of each)

| Purpose     | Recommended Model                     | Provider/Link                                      |
|-------------|---------------------------------------|----------------------------------------------------|
| Embeddings  | text-embedding-004                    | Google AI Studio                                   |
| Chat        | qwen/qwen3-32b                        | Groq (fast) → <https://console.groq.com/keys>        |

Alternatives: OpenRouter, Gemini, Ollama (local)

## 🧠 Model Modes

| Mode   | Embeddings                | Chat                     | ENV                    |
|--------|---------------------------|--------------------------|------------------------|
| CLOUD  | Google text-embedding-004 | qwen3-32b (Groq)         | `MODELS_ENV=CLOUD`     |
| LOCAL  | nomic-embed-text (Ollama) | qwen2.5:0.5b+ (Ollama)   | `MODELS_ENV=LOCAL`     |
| HYBRID | Mix & match               | Mix & match              | Edit `server/models.ts`|

## 🔗 Useful Links

- API playground: <http://localhost:3001/openapi>
- Qdrant dashboard: <http://localhost:6333/dashboard>
- Postgres: any SQL client (DBeaver, pgAdmin)

## 🎯 Done

Fully functional AI recruiter running locally or in the cloud in minutes.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GROK_API_KEY: string;
      GROK_MODEL: string

      GOOGLE_AI_STUDIO_API_KEY: string;
      GOOGLE_EMBEDDINGS_MODEL: string

      LOCAL_OLLAMA_BASE_URL: string
      LOCAL_OLLAMA_MODEL: string
      LOCAL_OLLAMA_EMBEDDING_MODEL: string

      //
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_DB: string;

      //
      QDRANT_URL: string;
      QDRANT_COLLECTION_NAME: string;
      QDRANT_API_KEY: string

      //
      MESSAGE_STORAGE: "PG" | "IN_MEMORY";

      MODELS_ENV: "LOCAL" | "CLOUD" | "HYBRID";


      ///
      SUPABSE_PROJECT_ID: string
    }
  }
}

export {};

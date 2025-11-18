import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import { ChatGroq } from "@langchain/groq";
import {
  GoogleGenerativeAIEmbeddings
} from "@langchain/google-genai";


const grok=() => new ChatGroq({
  apiKey: process.env.GROK_API_KEY,
  model: process.env.GROK_MODEL,
  temperature: 0.9,
  // maxTokens: 500
});

// https://ai.google.dev/gemini-api/docs/models#
const googleEmbeddings = ()=>new GoogleGenerativeAIEmbeddings({
  model: process.env.GOOGLE_EMBEDDINGS_MODEL,
  apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY,
});


//===

const localEmbeddings =()=> new OllamaEmbeddings({
  model: process.env.LOCAL_OLLAMA_EMBEDDING_MODEL,
  baseUrl: process.env.LOCAL_OLLAMA_BASE_URL,
});

const localOllama = ()=>new ChatOllama({
  model: process.env.LOCAL_OLLAMA_MODEL,
  temperature: 0.9,
  maxRetries: 2,
  baseUrl: process.env.LOCAL_OLLAMA_BASE_URL,
});

const cloud = ()=> ({
  chatModel: grok(),
  embeddingModel: googleEmbeddings(),
});


const local = ()=>({
  chatModel: localOllama(),
  embeddingModel: localEmbeddings(),
});

const hybrid = ()=>({
  chatModel: grok(),
  embeddingModel: localEmbeddings(),
});

const models = (() => {
  switch (process.env.MODELS_ENV) {
    case "CLOUD":
      return cloud();

    case "HYBRID":
      return hybrid();

    default:
      return local();
  }
})();

export default models;

/* 
 combinations:

     chatModel - embeddingModel
==================================
 1.  googleModel - googleEmbeddings
 2.  groq  - localEmbeddings
 3.  localOllama - localEmbeddings
 4.  groq - googleEmbeddings


*/

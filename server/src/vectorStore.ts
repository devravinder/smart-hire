import { QdrantVectorStore } from "@langchain/qdrant";
import models from "./models.js";

const { embeddingModel } = models;

export const qdrantVectorStore = async (
) => {
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddingModel,
    {
      url: process.env.QDRANT_URL,
      collectionName: process.env.QDRANT_COLLECTION_NAME,
      apiKey: process.env.QDRANT_API_KEY
    }
  );

  return vectorStore;
};

export const vectorStore = await qdrantVectorStore();

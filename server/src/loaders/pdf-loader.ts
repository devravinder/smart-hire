import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { combineDocs } from "./loader-util.js";
import { randomUUID } from "crypto";

const loadPdfDocs = async (pathOrBlob: string | Blob) => {
  const loader = new PDFLoader(pathOrBlob);

  const docs = await loader.load();

  return docs;
};

export const loadPdfAsSingleDocument = async (pathOrBlob: string | Blob) => {
  const docs = await loadPdfDocs(pathOrBlob);

  if (docs.length < 1) throw Error(`Empty PDF`);

  const metadata = docs[0]?.metadata!;
  metadata.id = randomUUID();
  metadata.pdf = { ...metadata.pdf, totalPages: 1 };
  metadata.loc = { ...metadata.loc, pageNumber: 1 };

  const fullDocument = combineDocs(docs, metadata);
  return fullDocument;
};

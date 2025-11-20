import { getConversations } from "@/services/chatService";

export const conversationLoader = async () => {
  const { data: res, error } = await getConversations();
  if (error) return [];
  return res;
};

export default conversationLoader;

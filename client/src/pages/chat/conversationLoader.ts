import { getConversations } from "@/services/chatService";

export const conversationLoader = async () => {
  try {
    const { data: res, error } = await getConversations();
  if (error) return [];
  return res;
  } catch (error) {
    console.log(error)
    return []
  }
};

export default conversationLoader;

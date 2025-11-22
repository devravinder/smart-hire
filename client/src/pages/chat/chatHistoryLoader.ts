import { getChatHistory } from "@/services/chatService";
import { type NonIndexRouteObject } from "react-router";

export const chatHistoryLoader: NonIndexRouteObject["loader"] = async ({
  params,
}) => {
  try {
    if (params.conversationId) {
      const { data: res, error } = await getChatHistory(params.conversationId);
      if (error) return [];
      return res;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default chatHistoryLoader;

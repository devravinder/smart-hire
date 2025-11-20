import { getChatHistory } from "@/services/chatService";
import { type NonIndexRouteObject } from "react-router";



export const chatHistoryLoader: NonIndexRouteObject["loader"] = async ({
  params,
}) => {

  if(params.conversationId){
      const {data:res, error} = await getChatHistory(params.conversationId)
      if(error)
        return []
      return res
  }
  return [];
};

export default chatHistoryLoader;

import { apiClient, withAccessToken } from "./apiClient";

export const getChatHistory = (conversationId: string) => {
  return withAccessToken(({ headers }) =>
    apiClient.GET("/api/history/{conversationId}", {
      params: {
        path: {
          conversationId: conversationId,
        },
      },
      headers,
    })
  );
};


export const getConversations=()=>{
  return withAccessToken(({ headers }) =>
    apiClient.GET("/api/conversations",{headers})
  );
}

export const chatWithAgent=(message: string, conversationId?: string)=>{
 return withAccessToken(({ headers }) =>
    apiClient.POST(
      conversationId ? "/api/chat/{conversationId}" : "/api/chat",
      {
        params: {
          path: { conversationId: conversationId! },
        },
        body: {
          message,
        },
        headers
      }
    )
  );
}

export const deleteConversation = (conversationId: string) => {

  return withAccessToken(({ headers }) =>
    apiClient.DELETE("/api/conversations/{conversationId}", {
      params: {
        path: {
          conversationId: conversationId,
        },
      },
      headers,
    })
  );
  };

  export const  deleteAllConversations = () => {
   return withAccessToken(({ headers }) =>
    apiClient.DELETE("/api/conversations", {
      headers,
    })
  )
  };
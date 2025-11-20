import { apiClient, withAccessToken } from "./apiClient";



export const uploadFile = (file: File) => {
  return withAccessToken(({ headers }) =>
    apiClient.POST("/api/upload", {
        body:{
            file: file as unknown as string // open api type issue
        },
        bodySerializer: (body) => {
        const formData = new FormData();
        formData.append("file", body.file);
        return formData;
      },
      headers
     })
  );
};
import FetchUtils from "@/api/FetchUtils";
import { ApiError, Levels } from "./error";
import Document from "@/types/Document";

const baseURL = `${process.env.VUE_APP_API_URL}/api/vuedemo-backend-service`;

export default class DocumentService {
  static post(projectId: number, docs: File[]): Promise<Document[]> {
    const formData = new FormData();
    docs.forEach((doc) => {
      formData.append("attachments[]", doc);
    });

    return fetch(
      `${baseURL}/documents/project/${projectId}`,
      FetchUtils.getPOSTConfig(formData, false, null)
    )
      .then(FetchUtils.defaultResponseHandler)
      .catch(FetchUtils.defaultCatchHandler)
      .then((response) => response.json());
  }

  static put(documentId: number, file: File): Promise<Response> {
    const formData = new FormData();
    formData.append("attachment", file);
    return fetch(
      `${baseURL}/documents/${documentId}`,
      FetchUtils.getPUTConfig(formData, false, null)
    )
      .then(FetchUtils.defaultResponseHandler)
      .catch(FetchUtils.defaultCatchHandler);
  }

  static delete(id: number): Promise<Response> {
    return fetch(`${baseURL}/documents/${id}`, FetchUtils.getDELETEConfig())
      .then(FetchUtils.defaultResponseHandler)
      .catch(FetchUtils.defaultCatchHandler);
  }

  static getDocuments(id: string): Promise<Document[]> {
    return (
      fetch(`${baseURL}/documents/project/${id}`)
        //Überprüfung der Verbindung
        .catch(() => {
          throw new ApiError({
            level: Levels.ERROR,
            message:
              "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new ApiError({
              level: Levels.ERROR,
              message: "Die Dokumente konnten nicht geladen werden",
            });
          }
          return response.json();
        })
    );
  }

  static createDocumentLink(id: string) {
    return `${baseURL}/documents/${id}`;
  }
}

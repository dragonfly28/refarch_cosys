import { ApiError, Levels } from "./error";
import { Project } from "@/types/Project";
import FetchUtils from "@/api/FetchUtils";
import { baseURL } from "@/constants/constants";

export default {
  postProject(project: Project): Promise<Project> {
    return fetch(`${baseURL}/projects`, FetchUtils.getPOSTConfig(project))
      .then((response) => {
        FetchUtils.defaultResponseHandler(
          response,
          "Das Projekt konnte nicht gespeichert werden."
        );
        return response.json();
      })
      .catch(() => {
        throw new ApiError({
          level: Levels.ERROR,
          message:
            "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
        });
      });
  },
  putProject(project: Project): Promise<Project> {
    return fetch(
      `${baseURL}/projects/${project.id}`,
      FetchUtils.getPUTConfig(project)
    )
      .then((response) => {
        FetchUtils.defaultResponseHandler(
          response,
          "Das Projekt konnte nicht aktualisiert werden."
        );
        return response.json();
      })
      .catch(() => {
        throw new ApiError({
          level: Levels.ERROR,
          message:
            "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
        });
      });
  },
  getProjects(page: number, size: number) {
    return fetch(
      `${baseURL}/projects?page=${page}&size=${size}`,
      FetchUtils.getGETConfig()
    )
      .then((response) => {
        FetchUtils.defaultResponseHandler(
          response,
          "Die Projekte konnten nicht geladen werden."
        );
        return response.json();
      })
      .catch(() => {
        throw new ApiError({
          level: Levels.ERROR,
          message:
            "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
        });
      });
  },
  getSingleProject(id: string): Promise<Project> {
    return (
      fetch(`${baseURL}/projects/${id}`)
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
              message: "Das Projekt konnten nicht geladen werden.",
            });
          }
          return response.json();
        })
    );
  },
  getTodos(): Promise<Project[]> {
    return new Promise<Project[]>((resolve, reject) => {
      fetch(`${baseURL}/projects/search/todo`, FetchUtils.getGETConfig())
        .then((res) => {
          if (res.status != 200)
            return reject(
              new ApiError({
                level: Levels.ERROR,
                message: `Ein Fehler ist Aufgetreten, bitte informieren Sie ihren Administrator. Details: HTTP-Status-Code: ${res.status}`,
              })
            );
          res
            .json()
            .then((json) => {
              let data: Project[] = json["_embedded"]["projects"];
              resolve(data);
            })
            .catch(() => {
              throw new ApiError({
                level: Levels.ERROR,
                message:
                  "Ein Fehler ist Aufgetreten, bitte informieren Sie ihren Administrator. Details: Der Server hat keine gültigen JSON-Daten zurückgeliefert.",
              });
            });
        })
        .catch(() => {
          throw new ApiError({
            level: Levels.ERROR,
            message:
              "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
          });
        });
    });
  },
  search(query: string): Promise<Project[]> {
    const param = encodeURIComponent(query);
    return fetch(
      `${baseURL}/projects/search/like?name=${param}`,
      FetchUtils.getGETConfig()
    )
      .then((response) => {
        FetchUtils.defaultResponseHandler(
          response,
          "Die Projekte konnten nicht geladen werden."
        );
        return response.json();
      })
      .then((json) => json._embedded.projects)
      .catch(() => {
        throw new ApiError({
          level: Levels.ERROR,
          message:
            "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
        });
      });
  },

  deleteProject(id: string | number): Promise<Response> {
    return fetch(`${baseURL}/projects/${id}`, FetchUtils.getDELETEConfig());
  }
};

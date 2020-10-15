import FetchUtils from "@/api/FetchUtils";
import { ApiError, Levels } from "@/api/error";
import Membership from "@/types/Membership";
import { Person } from "@/types/Person";

const baseURL = `${process.env.VUE_APP_API_URL}/api/vuedemo-backend-service`;

export default class MembershipService {
  static postMembership(membership: Membership): Promise<any> {
    try {
      return fetch(
        `${baseURL}/memberships`,
        FetchUtils.getPOSTConfig({
          state: membership.state,
          roles: membership.roles,
          person: `${baseURL}/persons/${membership.personId}`,
          project: `${baseURL}/projects/${membership.projectId}`,
        })
      )
        .then((response) => response.json())
        .then((membership) => membership.id);
    } catch (e) {
      throw new ApiError({
        level: Levels.ERROR,
        message:
          "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
      });
    }
  }

  static putMembership(membership: Membership) {
    try {
      return fetch(
        `${baseURL}/memberships/${membership.id}`,
        FetchUtils.getPUTConfig({
          state: membership.state,
          roles: membership.roles,
        })
      )
        .then((response) => response.json())
        .then((membership) => membership.id);
    } catch (e) {
      throw new ApiError({
        level: Levels.ERROR,
        message:
          "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
      });
    }
  }

  static getMemberships(id: string) {
    return (
      fetch(`${baseURL}/projects/${id}/members`, FetchUtils.getGETConfig())
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
              message: "Mitglieder konnten nicht geladen werden",
            });
          }
          return response.json();
        })
    );
  }

  static getMember(id: string | number): Promise<Person> {
    return (
      fetch(`${baseURL}/memberships/${id}/person`, FetchUtils.getGETConfig())
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
              message: "Mitglied konnten nicht geladen werden",
            });
          }
          return response.json();
        })
    );
  }

  static deleteMembership(id: string | number) {
    return fetch(
      `${baseURL}/memberships/${id}`,
      FetchUtils.getDELETEConfig()
    ).catch(() => {
      throw new ApiError({
        level: Levels.ERROR,
        message:
          "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
      });
    });
  }

  static getMembershipsWithPerson(projectId: number | string): Promise<Membership[]> {
    return (
      fetch(`${baseURL}/projects/${projectId}/members`, FetchUtils.getGETConfig())
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
              message: "Mitglieder konnten nicht geladen werden",
            });
          }
          return response.json();
        }))
        .then(json => json._embedded.memberships)
        .then(async (memberships: Membership[]) => {
          for (const membership of memberships ) {
            membership.person = await MembershipService.getMember(membership.id!);
          }
          return memberships;
        });
  }
}

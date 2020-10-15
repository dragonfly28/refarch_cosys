import { ApiError, Levels } from "@/api/error";

export enum ContentTypes {
  HEADER = "content-type",
  JSON = "application/json; charset=utf-8",
  OCTET_STREAM = "application/octet-stream",
  MULTIPART = "multipart/form-data",
}

export default class FetchUtils {
  /**
   * Liefert eine default GET-Config für fetch
   */
  static getGETConfig(): RequestInit {
    return {
      headers: this.getHeaders(),
      mode: "cors",
      credentials: "same-origin",
      redirect: "manual",
    };
  }

  /**
   * Liefert eine default DELETE-Config für fetch
   */

  static getDELETEConfig(): RequestInit {
    return {
      method: "DELETE",
      headers: this.getHeaders(),
      mode: "cors",
      credentials: "same-origin",
      redirect: "manual",
    };
  }

  /**
   * Liefert eine default POST-Config für fetch
   * @param body Optional zu übertragender Body
   * @param stringify Ob JSON.stringify angewendet werden soll (Default = true)
   * @param content_type Content Type (Default = JSON)
   */
  // eslint-disable-next-line
  static getPOSTConfig(
    body: any,
    stringify = true,
    content_type: any = ContentTypes.JSON
  ): RequestInit {
    let converted = body
      ? stringify
        ? JSON.stringify(body)
        : body
      : undefined;
    return {
      method: "POST",
      body: converted,
      headers: FetchUtils.getHeaders(content_type),
      mode: "cors",
      credentials: "same-origin",
      redirect: "manual",
    };
  }

  /**
   * Liefert eine default PUT-Config für fetch
   * In dieser wird, wenn vorhanden, die Version der zu aktualisierenden Entität
   * als "If-Match"-Header mitgesetzt.
   * @param body Optional zu übertragender Body
   * @param stringify Ob JSON.stringify angewendet werden soll (Default = true)
   * @param contentType Content Type (Default = JSON)
   */
  // eslint-disable-next-line
  static getPUTConfig(
    body: any,
    stringify = true,
    contentType: any = ContentTypes.JSON
  ): RequestInit {
    const convertedBody = body
      ? stringify
        ? JSON.stringify(body)
        : body
      : undefined;
    const headers = FetchUtils.getHeaders(contentType);
    if (body.version) {
      headers.append("If-Match", body.version);
    }
    return {
      method: "PUT",
      body: convertedBody,
      headers,
      mode: "cors",
      credentials: "same-origin",
      redirect: "manual",
    };
  }

  /**
   * Liefert eine default PATCH-Config für fetch
   * In dieser wird, wenn vorhanden, die Version der zu aktualisierenden Entität
   * als "If-Match"-Header mitgesetzt.
   * @param body Optional zu übertragender Body
   */
  // eslint-disable-next-line
  static getPATCHConfig(body: any): RequestInit {
    const headers = FetchUtils.getHeaders();
    if (body.version !== undefined) {
      headers.append("If-Match", body.version);
    }
    return {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      headers,
      mode: "cors",
      credentials: "same-origin",
      redirect: "manual",
    };
  }

  /**
   * Deckt das Default-Handling einer Response ab. Dazu zählt:
   *
   * - Fehler bei fehlenden Berechtigungen --> HTTP 403
   * - Reload der App bei Session-Timeout --> HTTP 3xx
   * - Default-Fehler bei allen HTTP-Codes !2xx
   *
   * @param response Die response aus fetch-Befehl die geprüft werden soll.
   * @param errorMessage Die Fehlermeldung, welche bei einem HTTP-Code != 2xx angezeigt werden soll.
   */
  static defaultResponseHandler(
    response: Response,
    errorMessage = "Es ist ein unbekannter Fehler aufgetreten."
  ): Response {
    if (!response.ok) {
      if (response.status === 403) {
        throw new ApiError({
          level: Levels.ERROR,
          message: `Sie haben nicht die nötigen Rechte um diese Aktion durchzuführen.`,
        });
      } else if (response.type === "opaqueredirect") {
        location.reload();
      }
      throw new ApiError({
        level: Levels.WARNING,
        message: errorMessage,
      });
    }
    return response;
  }

  /**
   * Default Catch-Handler für alle Anfragen des Service.
   * Schmeißt derzeit nur einen ApiError
   * @param error die Fehlermeldung aus fetch-Befehl
   */
  static defaultCatchHandler(
    error: Error,
    errorMessage = "Es ist ein unbekannter Fehler aufgetreten."
  ): PromiseLike<never> {
    throw new ApiError({
      level: Levels.WARNING,
      message: errorMessage,
    });
  }

  /**
   *  Baut den Header fuer den Request auf
   * @returns {Headers}
   */
  static getHeaders(content_type: any = ContentTypes.JSON): Headers {
    const headers = content_type
      ? new Headers({
          "Content-Type": content_type,
        })
      : new Headers();
    const csrfCookie = this._getXSRFToken();
    if (csrfCookie !== "") {
      headers.append("X-XSRF-TOKEN", csrfCookie);
    }
    return headers;
  }

  /**
   * Liefert den XSRF-TOKEN zurück.
   * @returns {string|string}
   */
  static _getXSRFToken(): string {
    const help = document.cookie.match(
      "(^|;)\\s*" + "XSRF-TOKEN" + "\\s*=\\s*([^;]+)"
    );
    return (help ? help.pop() : "") as string;
  }
}

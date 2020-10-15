import FetchUtils from "./FetchUtils";
import { ApiError, Levels } from "./error";
import { Person } from "@/types/Person";

const BASE_URL = `${process.env.VUE_APP_API_URL}/api/vuedemo-backend-service/persons`;

const enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const ALL_HTTP_METHODS = [
  HttpMethod.GET,
  HttpMethod.POST,
  HttpMethod.PUT,
  HttpMethod.PATCH,
  HttpMethod.DELETE,
];

type ErrorMessageDefinition = {
  methods: HttpMethod[];
  statusCode: number;
  message: string;
};

const ERROR_MESSAGES: ErrorMessageDefinition[] = [
  {
    methods: ALL_HTTP_METHODS,
    statusCode: 404,
    message: "Diese Person wurde nicht gefunden.",
  },
  {
    methods: [HttpMethod.DELETE],
    statusCode: 409,
    message:
      "Diese Person kann nicht gelöscht werden, da sie von anderen Teilen des Programms noch benötigt wird.",
  },
];

const DEFAULT_ERROR_MESSAGE =
  "Ein unbekannter Fehler ist aufgetreten, bitte den Administrator informieren.";

/**
 * Handled nicht erfolgreiche Status-Codes und wandelt diese in nicht-technische Meldungen für den Benutzer um.
 *
 * @param httpMethod
 * @param res
 * @returns string Nicht-technische Fehlerbeschreibung
 */
function handleWrongResponse(httpMethod: HttpMethod, res: Response): void {
  for (let errorMessage of ERROR_MESSAGES) {
    if (
      errorMessage.methods.includes(httpMethod) &&
      res.status == errorMessage.statusCode
    )
      throw new ApiError({
        level: Levels.ERROR,
        message: errorMessage.message,
      });
  }
  throw new ApiError({
    level: Levels.ERROR,
    message: `${DEFAULT_ERROR_MESSAGE} - HTTP Status Code: ${res.status}`,
  });
}

function handleError(err: any): Error {
  if (err.level !== undefined)
    // check for ApiError
    return err;
  return new ApiError({
    message: DEFAULT_ERROR_MESSAGE,
  });
}

type PagedPeople<Person> = {
  data: Person[];
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

/**
 * Implementiert CRUD-Funktionen der API für Person Entität.
 */
export default class PersonService {
  /**
   * Get Request für ein Item mit gegebener Id
   * @param id
   */
  public static get(id: Id): Promise<Person> {
    return new Promise<Person>((resolve, reject) => {
      fetch(`${BASE_URL}/${id}`, FetchUtils.getGETConfig())
        .then((res) => {
          if (res.status == 200) resolve(res.json());
          reject(handleWrongResponse(HttpMethod.GET, res));
        })
        .catch((err) => reject(handleError(err)));
    });
  }

  /**
   * Get Request für alle Items. Paginiert, deswegen Seite mit angeben.
   * @param pageIndex bei 0 beginnend
   * @param pageSize
   */
  public static getAllPaged(
    pageIndex: number,
    pageSize: number = 20
  ): Promise<PagedPeople<Person>> {
    return new Promise<PagedPeople<Person>>((resolve, reject) => {
      fetch(
        `${BASE_URL}?page=${pageIndex}&size=${pageSize}`,
        FetchUtils.getGETConfig()
      )
        .then((res) => {
          if (res.status != 200)
            return reject(handleWrongResponse(HttpMethod.GET, res));
          res
            .json()
            .then((json) => {
              let data: Person[] = json["_embedded"]["persons"];
              resolve({
                data: data,
                page: json["page"]["number"],
                pageSize: json["page"]["size"],
                totalElements: json["page"]["totalElements"],
                totalPages: json["page"]["totalPages"],
              });
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(handleError(err)));
    });
  }

  /**
   * Löscht das Item mit der gegebenen Id.
   * @param id
   * @returns Promise<void>
   */
  public static delete(id: Id): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fetch(`${BASE_URL}/${id}`, FetchUtils.getDELETEConfig())
        .then((res) => {
          if (res.status == 204) resolve();
          handleWrongResponse(HttpMethod.DELETE, res);
        })
        .catch((err) => reject(handleError(err)));
    });
  }

  /**
   * Erzeugt eine Instanz des Models im Backend und gibt diese als Objekt in einem Promise zurück.
   * @param instance
   * @returns Promise
   */
  public static create(instance: Person) {
    return new Promise<Person>((resolve, reject) => {
      fetch(`${BASE_URL}`, FetchUtils.getPOSTConfig(instance))
        .then((res) => {
          res
            .json()
            .then((createdInstance) => {
              if (res.status == 201) resolve(createdInstance);
              reject(handleWrongResponse(HttpMethod.POST, res));
            })
            .catch((reason) => reject(handleError(reason)));
        })
        .catch((reason) => reject(handleError(reason)));
    });
  }

  /**
   * Aktualisiert die Daten einer Instanz eines Models im Backend, hierbei werden alle Daten mit den Daten aus dem
   * übergebenem Objekt überschrieben.
   *
   * @param instance Instanz des Models mit den aktuellen Daten
   * @returns instanz des Models mit dem aktuellem Stand vom Server
   */
  public static update(instance: Person): Promise<Person> {
    return new Promise<Person>((resolve, reject) => {
      fetch(
        `${BASE_URL}/${instance.id.toString()}`,
        FetchUtils.getPUTConfig(instance)
      )
        .then((res) => {
          res
            .json()
            .then((newInstance) => {
              if (res.status == 200) resolve(newInstance);
              reject(handleWrongResponse(HttpMethod.PUT, res));
            })
            .catch((reason) => reject(handleError(reason)));
        })
        .catch((reason) => reject(handleError(reason)));
    });
  }

  public static search(query: string): Promise<Person[]> {
    const param = encodeURIComponent(query);
    return fetch(
      `${BASE_URL}/search/like?name=${param}`,
      FetchUtils.getGETConfig()
    )
      .then((response) => {
        FetchUtils.defaultResponseHandler(
          response,
          "Die Personen konnten nicht geladen werden."
        );
        return response.json();
      })
      .then((json) => json._embedded.persons)
      .catch(() => {
        throw new ApiError({
          level: Levels.ERROR,
          message:
            "Keine Verbindung zum Server, bitte Internetverbindung überprüfen.",
        });
      });
  }
}

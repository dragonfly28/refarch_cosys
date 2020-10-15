import { Component, Vue } from "vue-property-decorator";

/**
 * rulesMixin stellt generelle Rules für die Vuetify-Validierung bereit.
 *
 * Die Texte für Validierungsfehler sind deshalb allgemein und nicht auf die
 * Felder bezogen. Im Fall, dass der Text nicht passt, kann in der Komponente
 * eine extra Rule erzeugt werden (z.B. `if (typeof RULE_MAIL(value) == 'string') {...}`).
 */
@Component
export default class rulesMixin extends Vue {
  RULE_REQUIRED = (v: any) => {
    return !!v || "Feld ist erforderlich";
  };

  RULE_MUST_BE_EMPTY = (v: any) => {
    return !v || "Feld muss leer sein.";
  };

  RULE_MAIL = (v: string) => {
    return (
      !v ||
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) ||
      "Valide E-Mail angeben"
    );
  };

  RULE_MUST_BE_POSITIVE_NUMBER = (v: string) => {
    return !v || /^\d*$/.test(v) || "Ganze Zahl angeben.";
  };

  RULE_MUST_BE_GREATER_THAN_ZERO = (v: string) => {
    const n = Number(v);
    return !v || n > 0 || "Ganze Zahl größer 0 angeben.";
  };

  RULE_MUST_BE_POSITIVE_PERCENTAGE = (v: any) => {
    return (
      !v ||
      /^\d{1,2}(\.\d{1,2})?$/.test(v) ||
      "Ganze Zahl oder Dezimalzahl der Form xx.xx eingeben"
    );
  };
  RULE_MUST_BE_PERCENTAGE_UNDER_100 = (v: any) => {
    const n = Number(v);
    return !v || n < 100 || "Prozentzahl kleiner 100 angeben";
  };

  RULE_MUST_BE_POSITIVE_ZAHL_2 = (v: any) => {
    return !v || /^\d{1,2}?$/.test(v) || "Ganze Zahl bis 2 Stellen angeben";
  };
  RULE_MUST_BE_POSITIVE_ZAHL_3 = (v: any) => {
    return !v || /^\d{1,3}$/.test(v) || "Ganze Zahl bis 3 Stellen angeben";
  };
  RULE_MUST_BE_POSITIVE_ZAHL_10 = (v: any) => {
    return !v || /^\d{1,10}$/.test(v) || "Ganze Zahl bis 10 Stellen angeben";
  };
  RULE_MUST_BE_POSITIVE_DEZIMAL_2_1 = (v: any) => {
    return (
      !v ||
      /^\d{1,2}(\.\d{1})?$/.test(v) ||
      "Ganze Zahl oder Dezimalzahl der Form xx.x eingeben"
    );
  };
  RULE_MUST_BE_POSITIVE_DEZIMAL_2_2 = (v: any) => {
    return (
      !v ||
      /^\d{1,2}(\.\d{1,2})?$/.test(v) ||
      "Ganze Zahl oder Dezimalzahl der Form xx.xx eingeben"
    );
  };
  RULE_MUST_BE_POSITIVE_DEZIMAL_3_2 = (v: any) => {
    return (
      !v ||
      /^\d{1,3}(\.\d{1,2})?$/.test(v) ||
      "Ganze Zahl oder Dezimalzahl der Form xxx.xx eingeben"
    );
  };

  RULE_DATE_MUST_NOT_BE_IN_FUTURE = (v: Date) => {
    const now = new Date();
    const enteredDate = new Date(v);
    return (
      !v || enteredDate <= now || "Datum darf nicht in der Zukunft liegen."
    );
  };

  RULE_DATE_MUST_BE_IN_PAST = (v: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const enteredDate = new Date(v);
    return (
      !v ||
      enteredDate <= yesterday ||
      "Datum muss vor dem aktuellen Tag liegen."
    );
  };
}

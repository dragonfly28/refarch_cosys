export default class Antrag {
  /**
   * 
   * @type {string}
   * @memberof Antrag
   */
  vorname: string;
  /**
   * 
   * @type {string}
   * @memberof Antrag
   */
  nachname: string;
/**
   * 
   * @type {string}
   * @memberof Antrag
   */
  email: string;
  /**
   * 
   * @type {string}
   * @memberof Antrag
   */
  abteilung: string;
  
  constructor(vorname: string, nachname: string, email: string, abteilung: string) {
      this.vorname = vorname;
      this.nachname = nachname;
      this.email = email;
      this.abteilung = abteilung;
  }
}

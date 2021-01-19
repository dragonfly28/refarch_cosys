export default class Antragsteller {
  /**
   * 
   * @type {string}
   * @memberof Antragsteller
   */
  name: string;
  /**
   * 
   * @type {string}
   * @memberof Antragsteller
   */
  firstname: string;
/**
   * 
   * @type {string}
   * @memberof Antragsteller
   */
  email: string;
  /**
   * 
   * @type {string}
   * @memberof Antragsteller
   */
  department: string;
  
  constructor(name: string, firstname: string, email: string, department: string) {
      this.name = name;
      this.firstname = firstname;
      this.email = email;
      this.department = department;
  }
}

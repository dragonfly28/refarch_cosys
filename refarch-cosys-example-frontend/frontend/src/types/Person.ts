export interface Person extends BaseModel {
  name: string;
  firstname: string;
  email: string;
  department: string;
}

export function getPersonFullName(person: Person) {
  return `${person.firstname} ${person.name}`;
}

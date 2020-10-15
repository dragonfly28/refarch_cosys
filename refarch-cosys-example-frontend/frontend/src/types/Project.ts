import { Person } from "@/types/Person";
import Feature from "@/types/Feature";

export interface Project {
  name?: string;
  description?: string;
  status?: string;
  // TODO obsolet mit km
  km83?: boolean;
  projectstart?: Date;
  projectend?: Date;
  members?: Person[];
  // change to string, if backend changes id type to UUID
  id?: number;
  // TODO this attribute is referenced in Projects.vue, but not defined in backend entity
  oid?: any;

  repositoryLink?: string;
  iteraplanLink?: string;
  testEnvironmentLink?: string;
  testEnvironmentUser?: string;
  testEnvironmentPassword?: string;
  km?: string;
  referat?: string;

  techs?: string[];
  aufbau?: string;

  features?: Feature[];
  dueDate?: string;
}

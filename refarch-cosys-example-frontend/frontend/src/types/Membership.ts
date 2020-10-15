import { Person } from "@/types/Person";

export default interface Membership {
  id?: number;
  roles?: string[];
  state?: string;
  personId?: number;
  projectId?: number;
  person?: Person | null;
}

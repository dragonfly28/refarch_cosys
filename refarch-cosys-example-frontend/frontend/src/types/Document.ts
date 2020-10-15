export default interface Document {
  // change to string, if backend changes id type in BaseEntity to UUID
  id?: number;
  file?: File;
  filename: string;
  filesize: number;
}

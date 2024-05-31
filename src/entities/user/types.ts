export type Gender = "not_specified" | "male" | "female";

export interface User {
  id: string;
  email: string;
  emailVerified: Date | null;
  name: string | null;
  image: string | null;
  username: string | null;
  roles: ("user" | "admin")[] | null;
  bio: string | null;
  gender: Gender | null;
  birthdate: string | null;
}

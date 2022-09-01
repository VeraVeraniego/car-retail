import { User } from "../../interfaces/User";

export interface Response {
  users: User[];
}

export interface EmailVars {
  where: {
    email: {
      _ilike: string;
    };
  };
}

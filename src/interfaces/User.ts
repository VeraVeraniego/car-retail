export interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  uuid?: string;
}
export interface Response {
  users: User[];
}

export interface EmailVars {
  where: {
    email: {
      _eq: string;
    };
  };
}

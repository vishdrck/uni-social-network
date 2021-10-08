export interface ICombination {
  key: string;
  value: string;
}

export interface IDepartments {
  key: string;
  value: string
}

export interface IFaculties {
  key: string;
  value: string;
}

export interface IAcademicYear {
  key: string;
  value: string;
}

export interface ILoginRegistrationResponse {
  STATUS: string;
  MESSAGE:string;
  DATA: {
    _uid: string;
    firstName: string;
    indexNumber: string;
    email: string;
    username: string;
    token: string;
  }
}

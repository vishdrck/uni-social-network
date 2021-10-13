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

export interface ItokenResponse {
  STATUS: string;
  MESSAGE: string;
  DATA: {
    validity: boolean
  }
}

export interface IProfileResponse {
  STATUS: string;
  MESSAGE: string;
  DATA: {
    _uid: any;
    firstName: string;
    lastName?: string;
    email: string;
    indexNumber: string;
    academicYear?: string;
    combination?: string;
    faculty?: string;
    department?: string;
    username: string;
  }
}

export interface IProfile {
  _uid: any;
  firstName: string;
  lastName?: string;
  email: string;
  indexNumber: string;
  academicYear?: string;
  combination?: string;
  faculty?: string;
  department?: string;
  username: string;
}

export interface Class {
  _id: string;
  className: string;
  year: number;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  classes: Class[];
}

export interface ClassFormData {
  className: string;
  year: number;
}

export interface StudentFormData {
  id?: string; // This property is optional because it is not present when creating a new student
  firstName: string;
  lastName: string;
  email: string;
  classIds: string[];
}
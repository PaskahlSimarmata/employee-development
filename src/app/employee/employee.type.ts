export interface EmployeeResponse {
  username: string;
  fisrtName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export interface FilterResponse {
  username: string;
  name: string;
  status: string;
  group: string;
}

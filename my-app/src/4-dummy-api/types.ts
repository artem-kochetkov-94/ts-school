type HairType = "Strands" | "Curly" | "Very curly" | "Straight" | "Wavy";

enum Gender {
  Male = "male",
  Female = "female",
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city?: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  address: Address;
  department: string;
  name: string;
  title: string;
}

interface Hair {
  color: string;
  type: HairType;
}

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface IUserResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}

export enum HTTPRequestStatus {
  OK = 200,
}

export enum HTTPMethod {
  GET = "GET",
}

export function isSuccessUserData(data: unknown): data is IUserResponse {
  if (typeof data === "object" && !!data && "users" in data) {
    return true;
  }

  return false;
}

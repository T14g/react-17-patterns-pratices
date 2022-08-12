interface IWork {
  company: string;
  position: string;
}

// Type extending an Interface with &
type TPerson = IWork & {
  name: string;
  age: number;
};

// Interface extending another interface with extends
interface IPerson extends IWork {
  name: string;
  age: number;
}

// You CAN'T implement a union type

type TWork2 =
  | { company: string; position: string }
  | { name: string; age: number };

class Person3 implements TWork2 {
  company: "Google";
  position: "Senior Dev";
}

// You can Merge interfaces, IT CAN BE DEFINED MULTIPLE TIMES AND WILL BE TREATED AS A SINGLE INTERFACE

interface IUser {
  username: string;
  email: string;
  name: string;
  age?: number;
  website: string;
  active: boolean;
}

interface IUser {
  country: string;
}

const user: IUser = {
  username: "czantany",
  email: "carlos@milkzoft.com",
  name: "Carlos Santana",
  country: "Mexico",
  age: 33,
  website: "http://www.js.education",
  active: true,
};

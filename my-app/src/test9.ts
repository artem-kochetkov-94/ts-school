interface IForm {
  name: string;
  password: string;
}

type IsValid = {
  isValid: true;
};

type isInvalid = {
  isValid: false;
  errorMessage: string;
};

type ValidationForm<T> = {
  [P in keyof T]: IsValid | isInvalid;
};

type FormValidation = ValidationForm<IForm>;

const formValidation: FormValidation = {
  name: { isValid: true },
  password: { isValid: false, errorMessage: "Ошибка!" },
};

export {}
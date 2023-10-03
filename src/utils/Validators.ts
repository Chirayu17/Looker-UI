import { ValidatorFn, ValidationError } from "../types/Validators";

function required<T>(input: T, label: string): ValidationError | null {
  if (!input) return { errorMessage: `${label} is required` };
  return null;
}

const alphanumeric: ValidatorFn<string> = (input, label) => {
  const regEx = new RegExp("^[a-zA-Z0-9]+$");
  if (input && !regEx.test(input))
    return {
      errorMessage: `${label} can only contain alphanumeric characters`,
    };
  return null;
};

const email: ValidatorFn<string> = (input, label) => {
  const regEx = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
  if (input && !regEx.test(input))
    return {
      errorMessage: `${label} must be a valid address`,
    };
  return null;
};

const atLeastValidator = (count: string) => {
  return function (
    input: string | null,
    label: string,
    testExpression: string,
    message: string
  ): ValidationError | null {
    const regEx = new RegExp(testExpression);
    if (input && !regEx.test(input))
      return {
        errorMessage: `${label} should containt at least ${count} ${message}`,
      };
    return null;
  };
};

const atLeastOneValidator = atLeastValidator("one");

const atLeastOneLowerCaseLetter: ValidatorFn<string> = (input, label) =>
  atLeastOneValidator(input, label, "(?=.*[a-z])", "lower case letter");

const atLeastOneUpperCaseLetter: ValidatorFn<string> = (input, label) =>
  atLeastOneValidator(input, label, "(?=.*[A-Z])", "upper case letter");

const atLeastOneDigit: ValidatorFn<string> = (input, label) =>
  atLeastOneValidator(input, label, "(?=.*[0-9])", "digit");

const atLeastOneSpecialChar: ValidatorFn<string> = (input, label) =>
  atLeastOneValidator(
    input,
    label,
    "(?=.*[-+_!@#$%^&*.,?])",
    "special character from -+_!@#$%^&*.,?"
  );

// eslint-disable-next-line no-useless-escape
const atLeastEightChars: ValidatorFn<string> = (input, label) =>
  atLeastValidator("eight")(input, label, ".{8,}", "characters");

function applyMultipleValidators<T>(
  validators: ValidatorFn<T>[],
  input: T,
  label: string
): ValidationError | null {
  let validationError = null;
  for (let index = 0; index < validators.length; index++) {
    validationError = validators[index](input, label);
    if (validationError) return validationError;
  }
  return validationError;
}

const Validators = {
  required,
  username: (username: string, label: string) =>
    applyMultipleValidators<string>([required, alphanumeric], username, label),
  password: (password: string, label: string) =>
    applyMultipleValidators<string>(
      [
        required,
        atLeastOneLowerCaseLetter,
        atLeastOneUpperCaseLetter,
        atLeastOneDigit,
        atLeastOneSpecialChar,
        atLeastEightChars,
      ],
      password,
      label
    ),
  fullname: (name: string, label: string) =>
    applyMultipleValidators<string>([required], name, label),
  email: (emailAddress: string, label: string) =>
    applyMultipleValidators<string>([required, email], emailAddress, label),
};

export default Validators;

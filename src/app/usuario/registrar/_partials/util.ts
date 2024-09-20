import { validationMessages } from "#/helpers/constants";
import { stringField } from "#/helpers/fn";
import { number, object } from "yup";

/**
 * Regular expression pattern to validate an email address.
 * This ensures the email is in a valid format.
 * @type {RegExp}
 */
export const regexEmail: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Interface defining the structure of the registration data.
export interface RegisterData {
  names: string;
  surnames: string;
  email: string;
  phone: string;
  typeDocumentId: number;
  identificationNumber: string;
}

/**
 * Initial values for the registration form fields.
 * This is used to initialize the form with empty values.
 */
export const initialValue: RegisterData = {
  names: "",
  surnames: "",
  email: "",
  phone: "",
  typeDocumentId: 0,
  identificationNumber: ""
};

/**
 * Validation schema for the registration form using Yup.
 * This schema ensures that each field follows the required rules.
 */
export const registerValidation = object({
  names: stringField(validationMessages.required),
  surnames: stringField(validationMessages.required),
  email: stringField(validationMessages.required)
    .email("Dirección de correo electrónico no válida")
    .matches(regexEmail, "Esta debe ser una dirección de correo electrónico válida"),
  phone: stringField(validationMessages.required),
  typeDocumentId: number()
    .required(validationMessages.required)
    .min(1, "Debe seleccionar un tipo de documento válido"),
  identificationNumber: stringField(validationMessages.required)
});

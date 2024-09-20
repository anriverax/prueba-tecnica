import { validationMessages } from "#/helpers/constants";
import { stringField } from "#/helpers/fn";
import { array, number, object } from "yup";

// Interface defining the structure of the dwelling data.
export interface DwellingData2 {
  departmentId: number;
  municipalityId: number;
  address: string;
  salary: string;
}

export interface DwellingData extends DwellingData2 {
  image: File[] | null;
}

/**
 * Initial values for the dwelling form fields.
 * This is used to initialize the form with empty values.
 */
export const initialValue: DwellingData = {
  departmentId: 0,
  municipalityId: 0,
  address: "",
  salary: "",
  image: null
};

/**
 * Validation schema for the dwelling form using Yup.
 * This schema ensures that each field follows the required rules.
 */
export const dwellingValidation = object({
  departmentId: number()
    .required(validationMessages.required)
    .min(1, "Debe seleccionar un tipo de documento válido"),
  municipalityId: number()
    .required(validationMessages.required)
    .min(1, "Debe seleccionar un tipo de documento válido"),
  address: stringField(validationMessages.required),
  salary: stringField(validationMessages.required),
  image: array().min(1, "Se requiere al menos una imagen").required(validationMessages.required)
});

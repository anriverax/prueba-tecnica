import { validationMessages } from "#/helpers/constants";
import { stringField } from "#/helpers/fn";
import { object } from "yup";

// Interface defining the structure of the selfie data.
export interface SelfieData {
  selfie: string;
}

/**
 * Initial values for the selfie form fields.
 * This is used to initialize the form with empty values.
 */
export const initialValue: SelfieData = {
  selfie: ""
};

/**
 * Validation schema for the selfie form using Yup.
 * This schema ensures that each field follows the required rules.
 */
export const selfieValidation = object({
  selfie: stringField(validationMessages.required)
});

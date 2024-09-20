import { SelectBox } from "./types";

export const typeDocumentItems: SelectBox[] = [
  { id: 1, name: "Dui" },
  { id: 3, name: "Pasaporte" }
];

export const ERR_BAD_REQUEST: string = "ERR_BAD_REQUEST";

interface ValidationMessage {
  required: string;
}

export const validationMessages: ValidationMessage = {
  required: "Porfavor complete este campo*."
};

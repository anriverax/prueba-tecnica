/**
 * @file use-store.ts
 * @description This file defines a Zustand store for managing form data and actions.
 */
import { initialValue as formRegisterData, RegisterData } from "#/app/usuario/registrar/_partials/util";
import { DwellingData, initialValue as formDwellingData } from "#/app/usuario/vivienda/_partials/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Interface representing the structure of form data.
 */
interface FormData {
  register: RegisterData;
  dwelling: DwellingData;
}

/**
 * Interface representing the actions that can be performed on the form data.
 */
interface FormActions {
  /** Indicates whether each form type is filled */
  isFilled: Record<keyof FormData, boolean>;
  /**
   * Updates a specific form type with new data.
   * @param formType - The type of form to update ('register' or 'dwelling').
   * @param data - The new data to merge into the existing form data.
   */
  updateForm: <T extends keyof FormData>(formType: T, data: Partial<FormData[T]>) => void;
  /**
   * Resets a specific form type to its initial state.
   * @param formType - The type of form to reset ('register' or 'dwelling').
   */
  resetForm: (formType: keyof FormData) => void;
}

/** Type representing the entire form store, combining form data and actions. */
type FormStore = FormData & FormActions;

/** The initial state of the form store. */
const initialState: FormData & { isFilled: FormStore["isFilled"] } = {
  register: formRegisterData,
  dwelling: formDwellingData,
  isFilled: {
    register: false,
    dwelling: false
  }
};

/**
 * A Zustand store hook for managing form data and actions.
 * This store is persisted in local storage.
 */
export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      ...initialState,
      updateForm: (formType, data) =>
        set((state) => ({
          [formType]: { ...state[formType], ...data },
          isFilled: {
            ...state.isFilled,
            [formType]: true
          }
        })),
      resetForm: (formType) =>
        set((state) => ({
          ...state,
          [formType]: initialState[formType],
          isFilled: {
            ...state.isFilled,
            [formType]: false
          }
        }))
    }),
    {
      name: "form-storage"
    }
  )
);

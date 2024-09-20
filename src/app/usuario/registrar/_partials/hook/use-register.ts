import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { initialValue, RegisterData, registerValidation } from "../util";

import { FormikResponse } from "#/helpers/types";
import { useFormStore } from "#/helpers/hook/use-store";

/**
 * Custom hook for handling registration form using Formik.
 * It integrates form state management, validation, and routing.
 *
 * @returns {FormikResponse<RegisterData>} Formik helpers for the registration form.
 */
const useRegister = (): FormikResponse<RegisterData> => {
  // Destructure and get form state and actions from custom hook

  const { updateForm, resetForm, isFilled, register } = useFormStore();

  const router = useRouter();

  /**
   * Handle form submission.
   * Updates form data in the store and navigates to a new route.
   *
   * @param {RegisterData} values - The form values.
   */
  const handleSubmit = (values: RegisterData): void => {
    try {
      updateForm("register", values); // Update form data in the store

      router.push("/usuario/vivienda"); // Navigate to a new route
    } catch (error) {
      resetForm("register"); // Reset form data in the store
      console.error(error);
    }
  };

  // Configure Formik with form initial values, validation, and submission handler
  const formik = useFormik<RegisterData>({
    enableReinitialize: true,
    initialValues: isFilled["register"] ? register : initialValue,
    validationSchema: registerValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useRegister };

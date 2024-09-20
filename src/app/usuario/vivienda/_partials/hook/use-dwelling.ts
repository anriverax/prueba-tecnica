import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { DwellingData, dwellingValidation, initialValue } from "../utils";
import { FormikResponse } from "#/helpers/types";
import { useFormStore } from "#/helpers/hook/use-store";

/**
 * Custom hook for handling dwelling form using Formik.
 * It integrates form state management, validation, and routing.
 *
 * @returns {FormikResponse<DwellingData>} Formik helpers for the dwelling form.
 */
const useDwelling = (): FormikResponse<DwellingData> => {
  // Destructure and get form state and actions from custom hook

  const { updateForm, resetForm, isFilled, dwelling } = useFormStore();

  const router = useRouter();

  /**
   * Handle form submission.
   * Updates form data in the store and navigates to a new route.
   *
   * @param {DwellingData} values - The form values.
   */
  const handleSubmit = (values: DwellingData) => {
    try {
      updateForm("dwelling", values); // Update form data in the store
      router.push("/usuario/selfie"); // Navigate to a new route
    } catch (error) {
      resetForm("dwelling"); // Reset form data in the store
      console.error(error);
    }
  };

  // Configure Formik with form initial values, validation, and submission handler
  const formik = useFormik<DwellingData>({
    enableReinitialize: true,
    initialValues: isFilled["dwelling"] ? dwelling : initialValue,
    validationSchema: dwellingValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useDwelling };

import { useFormik } from "formik";
import { initialValue, SelfieData, selfieValidation } from "../utils";
import { useFormStore } from "#/helpers/hook/use-store";
import { RegisterData } from "#/app/usuario/registrar/_partials/util";
import { DwellingData2 } from "#/app/usuario/vivienda/_partials/utils";
import useAxios from "#/helpers/hook/use-axios";
import { useRouter } from "next/navigation";
import { FormikResponse } from "#/helpers/types";

/**
 * Custom hook to handle selfie submission.
 * @returns {FormikResponse<SelfieData>} Formik properties for the selfie form.
 */
const useSelfie = (): FormikResponse<SelfieData> => {
  const router = useRouter();
  const { register, dwelling, resetForm } = useFormStore();
  const useRequest = useAxios();

  /**
   * Handles the submission of the selfie form.
   * @param {SelfieData} values - The form values.
   */
  const handleSubmit = async (values: SelfieData): Promise<void> => {
    const { image, ...otherData } = dwelling;
    try {
      const formData = new FormData();

      // Append register data
      Object.keys(register).forEach((key) => {
        const value = register[key as keyof RegisterData];
        formData.append(key, String(value)); // Convierte a string
      });

      // Append dwelling data
      Object.keys(otherData).forEach((key) => {
        const value = otherData[key as keyof DwellingData2];
        formData.append(key, String(value)); // Convierte a string
      });

      if (image) {
        image.forEach((img) => {
          if (image) {
            formData.append("images", img);
          }
        });
      }

      // Convert base64 selfie to Blob
      const byteString = atob(values.selfie.split(",")[1]);
      const mimeString = values.selfie.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      formData.append("selfie", blob, "selfie.png");

      // Make the API request
      const results = await useRequest.post("/user/create", formData);
      console.log(results);
      if (results.status === 201) {
        resetForm("dwelling");
        resetForm("register");

        // Await the router.push call
        router.push("/usuario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Initialize formik
  const formik = useFormik<SelfieData>({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: selfieValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useSelfie };

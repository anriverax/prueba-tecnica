import { AxiosError, AxiosResponse } from "axios";
import { string } from "yup";

import { ERR_BAD_REQUEST } from "./constants";

/**
 * Handles the response error from a form submission.
 *
 * @param {AxiosError} error - The Axios error object.
 * @param {function} setStatus - A function to set the status of the form.
 * @param {function} setFieldError - A function to set field-specific errors in the form.
 */
export const formResponseError = (
  error: AxiosError,
  setStatus: (status: number) => void,
  setFieldError: (field: string, message: string | undefined) => void
) => {
  // Handle registration error.

  if (error.code === ERR_BAD_REQUEST) {
    /* eslint-disable */
    // Extract error details from the Axios response.
    const { response } = error;
    if (response) {
      const { data } = response as AxiosResponse;
      const { statusCode, message } = data;

      // Set form status and field error.
      setStatus(statusCode);
      setFieldError("axiosMessage", message);
    } else {
      // Handle non-Axios error (e.g., network error)
      setStatus(400);
      setFieldError("axiosMessage", `Network error: ${error}`);
    }
  } else {
    // Handle non-Axios error (e.g., network error)
    setStatus(500);
    setFieldError("axiosMessage", error.message);
  }
};

/**
 * Common validation schema for string fields.
 * @param {string} requiredMessage - The error message for the required validation.
 */
export const stringField = (requiredMessage: string) => string().required(requiredMessage);

export const fileToImage = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img: any = new Image();
      img.src = reader.result;

      img.onload = () => resolve(img);
      img.onerror = reject;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

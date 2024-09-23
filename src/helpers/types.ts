import { AxiosResponse } from "axios";
import * as faceapi from "face-api.js";
import { FormikErrors, FormikTouched } from "formik";

/**
 * Represents an optional message returned from an Axios request.
 */
export interface AxiosMessage {
  axiosMessage?: string | string[];
}

/**
 * Represents the response object from Formik.
 * @template T - The type of the form values.
 */
export interface FormikResponse<T> {
  values: T; // The current values of the form fields
  touched: FormikTouched<T>; // Indicates which fields have been interacted with
  errors: FormikErrors<T>; // Captures any validation errors
  isSubmitting: boolean; // Indicates if the form is currently being submitted

  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Handles input changes
  handleBlur: (e: React.FocusEvent<Element, Element>) => void; // Handles blur events
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void; // Handles form submission

  status?: number; // Optional HTTP status code
  setStatus: (status: number | undefined) => void; // Sets the status
  setFieldValue: <K extends keyof T>(
    field: K,
    value: T[K],
    shouldValidate?: boolean
  ) => Promise<FormikErrors<T>> | Promise<void>; // Sets a field's value
}

/**
 * Represents the structure of a response from an Axios fetch request.
 * @template T - The type of the data returned.
 */
export interface FetchResponse<T> extends AxiosResponse {
  msg: string | string[]; // Message from the response
  data: T; // The data payload
}

/**
 * Represents an option in a select box.
 */
export interface SelectBox {
  id: number; // Unique identifier for the option
  name: string; // Display name of the option
}

export type FaceApiResult =
  | faceapi.WithFaceDescriptor<
      faceapi.WithFaceLandmarks<
        {
          detection: faceapi.FaceDetection;
        },
        faceapi.FaceLandmarks68
      >
    >
  | undefined;

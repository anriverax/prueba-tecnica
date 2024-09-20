import { AxiosResponse } from "axios";
import { FormikErrors, FormikTouched } from "formik";

export interface AxiosMessage {
  axiosMessage?: string | string[];
}

export interface FormikResponse<T> {
  values: T;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  isSubmitting: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleChange: (e: React.ChangeEvent<any>) => void;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  status?: number;
  setStatus: (status: number | undefined) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<FormikErrors<T>> | Promise<void>;
}

export interface FetchResponse<T> extends AxiosResponse {
  msg: string[] | string;
  data: T;
}

export interface SelectBox {
  id: number;
  name: string;
}

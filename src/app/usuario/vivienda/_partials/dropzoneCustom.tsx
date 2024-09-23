"use client";

import Image from "next/image";
import { useDropzone } from "react-dropzone";
import React, { memo, useCallback, useEffect } from "react";
import { DwellingData } from "./utils";
import { FormikErrors } from "formik";
import CheckIcon from "./checkIcon";
import DragActive from "./dragActive";
import { useFaceApi } from "#/helpers/hook/use-faceApi";

/**
 * Dropzone component props interface.
 */
interface DropzoneCustomProps {
  value: File[] | null;
  touched?: boolean | undefined;
  errors?: string | undefined;
  setFieldValue: <K extends keyof DwellingData>(
    field: K,
    value: DwellingData[K],
    shouldValidate?: boolean
  ) => Promise<FormikErrors<DwellingData>> | Promise<void>;
}

/**
 * Custom dropzone component for file uploads with preview and Formik integration.
 *
 * @param {DropzoneCustomProps} props - Props for the component, including value, touched, errors, and setFieldValue.
 * @returns {React.JSX.Element} The dropzone component.
 */
const DropzoneCustom = (props: DropzoneCustomProps): React.JSX.Element => {
  const { value, touched, errors, setFieldValue } = props;
  const { msg, detectFaces, detectFaceApiStatus } = useFaceApi();
  // Handle file drop by updating the form field with the accepted files.
  /* eslint-disable */
  const onDrop = useCallback((acceptedFiles: any) => {
    setFieldValue("image", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  });

  const hasError: boolean = Boolean(touched && errors);

  useEffect(() => {
    if (value && value.length > 0) detectFaces(value);
  }, [value]);

  const isDragActived = useCallback(() => {
    if (isDragActive) {
      return <div className="p-2 font-semibold text-sm my-3">Suelta la imagen aquí</div>;
    }
    return <DragActive />;
  }, [isDragActive]);

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-dashed relative border-2 border-blue-400 rounded-lg p-4 flex justify-center items-center h-80"
      >
        <input {...getInputProps()} />
        {value ? (
          <div className="mt-4 flex lg:flex-wrap gap-4">
            {msg.color !== "danger" ? <CheckIcon /> : undefined}
            {value.map((preview, index) => (
              <div key={index} className="relative w-40 h-64 lg:w-64">
                <Image
                  src={typeof preview === "string" ? preview : URL.createObjectURL(preview)}
                  alt={`Preview ${index + 1}`}
                  className="max-w-full h-auto rounded-lg"
                  fill
                  style={{
                    objectFit: "contain"
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>{isDragActived()}</div>
        )}
      </div>
      {hasError ? (
        <div className="text-tiny text-danger p-1">Porfavor complete este campo*.</div>
      ) : undefined}

      {detectFaceApiStatus()}
    </div>
  );
};

export default memo(DropzoneCustom);

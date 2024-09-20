"use client";

import Image from "next/image";
import { useDropzone } from "react-dropzone";
import React, { memo, useCallback } from "react";
import { DwellingData } from "./utils";
import { FormikErrors } from "formik";

/**
 * Dropzone component props interface.
 */
interface DropzoneCustomProps {
  value: File[] | null;
  touched?: boolean | undefined;
  errors?: string | undefined;
  setFieldValue: (
    field: string,
    value: File | null,
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

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-dashed relative border-2 border-blue-400 rounded-lg p-4 flex justify-center items-center h-80"
      >
        <input {...getInputProps()} />
        {value ? (
          <div className="mt-4 flex lg:flex-wrap gap-4">
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
          <div>
            {!isDragActive ? (
              <React.Fragment>
                <div className="flex justify-center">
                  <div>
                    <Image
                      src="/images/upload.png"
                      alt="Icono para subir foto"
                      width={54}
                      height={54}
                      className="m-auto"
                    />

                    <p className="text-sm my-3">Arrastrar aquí</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="text-gray-500">o</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="p-2 border-default-200 border bg-default-100 rounded-medium font-semibold text-sm my-3">
                  Seleccionar archivo
                </div>
              </React.Fragment>
            ) : (
              <div className="p-2 font-semibold text-sm my-3">Suelta la imagen aquí</div>
            )}
          </div>
        )}
      </div>
      {hasError ? (
        <div className="text-tiny text-danger p-1">Porfavor complete este campo*.</div>
      ) : undefined}
    </div>
  );
};

export default memo(DropzoneCustom);

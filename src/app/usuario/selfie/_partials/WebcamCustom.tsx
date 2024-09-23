"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

import Webcam from "react-webcam";
import { FormikErrors } from "formik";
import { SelfieData } from "./utils";
import { useFaceApi } from "#/helpers/hook/use-faceApi";

/**
 * Props interface for WebcamCustom component
 * @interface
 * @extends {PhoneInputProps}
 */
interface WebcamCustomProps {
  value: string;
  touched?: boolean | undefined;
  errors?: string | undefined;
  isSubmitting: boolean;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: <K extends keyof SelfieData>(
    field: K,
    value: SelfieData[K],
    shouldValidate?: boolean
  ) => Promise<FormikErrors<SelfieData>> | Promise<void>;
}

/**
 * WebcamCustom Component
 *
 * This component allows users to capture a selfie using their device's webcam.
 * It integrates with Formik for form handling and uses a custom face API for face comparison.
 *
 * @param props - Props adhering to the WebcamCustomProps interface.
 * @returns A React element representing the webcam interface and captured image.
 */
export const WebcamCustom = (props: WebcamCustomProps) => {
  const [webcamOpen, setWebcamOpen] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const { compareFaces, isLoading, msg, setIsLoading, detectFaceApiStatus } = useFaceApi();

  const { value, touched, errors, isSubmitting, handleSubmit, setFieldValue } = props;

  /**
   * Captures a photo from the webcam, updates the form field, and initiates face comparison.
   */
  /* eslint-disable*/
  const capturePhoto = async () => {
    if (webcamRef.current) {
      const imageSrc = (webcamRef.current as any).getScreenshot();

      if (imageSrc) {
        setIsLoading(true);
        await setFieldValue("selfie", imageSrc);
        setWebcamOpen(false);

        // Convert data URL to Blob
        const response = await fetch(imageSrc);
        const blob = await response.blob();

        // Compare the captured face using the face API
        await compareFaces(blob);
      }
    }
  };

  /**
   * Renders the captured selfie view with options to change the photo or continue.
   */
  const renderCapturedSelfie = (): React.JSX.Element => (
    <div className="mt-4">
      <Image src={value} alt="Captured selfie" width={644} height={484} />
      {detectFaceApiStatus()}
      <div className="flex justify-center mt-2 mb-4">
        <div>
          <Button
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="Take a photo"
            className="w-full mb-1"
            onClick={() => setWebcamOpen(true)}
          >
            <Image src="/images/photo_camera.png" alt="camera" width={26} height={26} />
          </Button>
          <p className="font-semibold">Cambiar foto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center">
        <Button
          isLoading={isLoading || isSubmitting}
          isDisabled={msg.color === "primary-400" ? false : true}
          type="submit"
          className="bg-[rgba(255,92,0,1)] text-white rounded-md font-semibold"
        >
          Finalizar
        </Button>
      </form>
    </div>
  );

  /**
   * Renders the webcam interface with an option to capture a photo.
   */
  const renderWebcam = (): React.JSX.Element => (
    <div className="mt-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="border-2 border-gray-300 rounded-lg"
      />
      <div className="flex justify-center mt-8">
        <Button onClick={capturePhoto} className="ml-4 bg-orange-500 text-white">
          Tomar Foto
        </Button>
      </div>
    </div>
  );

  /**
   * Renders the initial state with a button to open the webcam and form submission.
   */
  const renderInitialState = (): React.JSX.Element => (
    <React.Fragment>
      <Button
        isIconOnly
        color="warning"
        variant="faded"
        aria-label="Take a photo"
        className="mt-8 w-24 h-24"
        onClick={() => setWebcamOpen(true)}
      >
        <Image src="/images/photo_camera.png" alt="camera" width={86} height={86} />
      </Button>
      {Boolean(touched && errors) ? (
        <div className="text-tiny text-danger p-1">Porfavor complete este campo*.</div>
      ) : undefined}
      <h2 className="text-2xl font-semibold mt-8">¡Es hora de la selfie!</h2>
      <p className="text-sm mt-2 mb-8">Sonríe y asegúrate de tener buena iluminación.</p>
      <form onSubmit={handleSubmit}>
        <Button type="submit" className="bg-[rgba(255,92,0,1)] text-white rounded-md font-semibold">
          Continuar
        </Button>
      </form>
    </React.Fragment>
  );

  // Conditional rendering based on the state and props
  if (value && !webcamOpen) return renderCapturedSelfie();

  if (webcamOpen) return renderWebcam();

  return renderInitialState();
};

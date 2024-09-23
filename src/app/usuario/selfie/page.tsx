"use client";

import React from "react";
import Image from "next/image";
import { WebcamCustom } from "./_partials/WebcamCustom";
import { useSelfie } from "./_partials/hook/use-selfie";
import Note from "./_partials/note";

/**
 * Component for the Selfie page

 * @returns {React.JSX.Element} The registration page form component
 */
const PageSelfie = (): React.JSX.Element => {
  const formik = useSelfie(); // Get formik instance from useSelfie hook

  const { values, setFieldValue, isSubmitting, handleSubmit, touched, errors } = formik;

  return (
    <div>
      <div className="bg-[url('/images/bg.png')] bg-cover w-full h-10"></div>
      <div className="centered flex-col min-h-[calc(100vh-2.5rem)]">
        <Image
          src="/images/title.png"
          alt="title"
          width={129}
          height={32}
          className="h-[32px] w-[129px]"
        />

        <WebcamCustom
          value={values.selfie}
          touched={touched.selfie}
          errors={errors.selfie}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
        />
        <Note />
      </div>
    </div>
  );
};

export default PageSelfie;

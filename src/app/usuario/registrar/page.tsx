"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRegister } from "./_partials/hook/use-register";

import { typeDocumentItems } from "#/helpers/constants";
import { InputMaskCustom } from "./_partials/inputMaskCustom";
import { PhoneInputCustom } from "./_partials/phoneInputCustom";
import { SelectBox } from "#/helpers/types";

/**
 * Component for the Registration page
 * It includes a form to register user data such as names, surnames, email, etc.
 * @returns {React.JSX.Element} The registration page form component
 */
export default function PageRegister(): React.JSX.Element {
  const [mask, setMask] = useState("99999999-9");

  const formik = useRegister(); // Get formik instance from useRegister hook

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = formik;

  /**
   * Handles document type change and updates the input mask accordingly.
   * @param {number} value - The selected document type ID
   */
  const handleDocumentTypeChange = async (value: number) => {
    await setFieldValue("typeDocumentId", value);
    await setFieldValue("identificationNumber", "");
    switch (value) {
      case 1:
        setMask("99999999-9");
        break;
      case 3:
        setMask("AAAA999999");
        break;
      default:
        setMask("99999999-9");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Background Image Section */}
      <div className="bg-[url('/images/bg.png')] bg-cover w-full hidden md:h-screen md:flex md:justify-center md:items-center">
        <div className="relative">
          <Image
            src="/images/group-photo.png"
            alt="grupo de personas viendo una laptop"
            width={559}
            height={740}
            className="object-cover h-full w-full rounded-l-lg"
          />
          <div className="absolute top-1/2 -left-6 bg-white p-2 rounded-full">
            <Image src="/images/logo.png" alt="logo" width={32} height={32} />
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="bg-white p-6 w-full h-screen md:flex md:items-center md:px-12">
        <div className="w-full">
          <Image
            src="/images/title.png"
            alt="title"
            width={129}
            height={32}
            className="h-[32px] w-[129px]"
          />
          <div>
            <h2 className="text-2xl font-semibold my-12">Registro</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                name="names"
                label="Nombres"
                className="w-full"
                placeholder="Ingresar nombres"
                variant="bordered"
                color="primary"
                labelPlacement="outside"
                classNames={{
                  label: ["text-foreground-500 group-data-[focus=true]:text-primary"],
                  mainWrapper: ["mb-5"],
                  inputWrapper: ["h-12"]
                }}
                value={values.names}
                isInvalid={Boolean(touched.names && errors.names)}
                errorMessage={touched.names ? errors.names : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="surnames"
                label="Apellidos"
                className="w-full"
                placeholder="Ingresar apellidos"
                variant="bordered"
                color="primary"
                labelPlacement="outside"
                classNames={{
                  label: ["text-foreground-500 group-data-[focus=true]:text-primary"],
                  mainWrapper: ["mb-5"],
                  inputWrapper: ["h-12"]
                }}
                value={values.surnames}
                isInvalid={Boolean(touched.surnames && errors.surnames)}
                errorMessage={touched.surnames ? errors.surnames : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                name="email"
                type="email"
                label="Correo"
                autoComplete="off"
                className="w-full"
                placeholder="ejemplo@gmail.com"
                variant="bordered"
                color="primary"
                labelPlacement="outside"
                classNames={{
                  label: ["text-foreground-500 group-data-[focus=true]:text-primary"],
                  mainWrapper: ["mb-5"],
                  inputWrapper: ["h-12"]
                }}
                value={values.email}
                isInvalid={Boolean(touched.email && errors.email)}
                errorMessage={touched.email ? errors.email : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <PhoneInputCustom
                value={values.phone}
                onChange={(value) => setFieldValue("phone", value)}
                onBlur={handleBlur}
                touched={touched.phone}
                errors={errors.phone}
              />
              <Select
                items={typeDocumentItems}
                label="Tipo de identificación"
                id="typeDocumentId"
                name="typeDocumentId"
                placeholder="Seleccionar"
                variant="bordered"
                labelPlacement="outside"
                color="primary"
                classNames={{
                  trigger: ["group/custom h-12"],
                  label: ["text-foreground-500 group-data-[open=true]/custom:text-primary"],
                  mainWrapper: ["mt-5 mb-5"]
                }}
                selectedKeys={[values.typeDocumentId === 0 ? "" : values.typeDocumentId.toString()]}
                onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                  await handleDocumentTypeChange(Number(e.target.value));
                }}
                isInvalid={Boolean(touched.typeDocumentId && errors.typeDocumentId)}
                errorMessage={touched.typeDocumentId ? errors.typeDocumentId : undefined}
              >
                {(doc: SelectBox) => <SelectItem key={doc.id.toString()}>{doc.name}</SelectItem>}
              </Select>

              <InputMaskCustom
                mask={mask}
                placeholder={mask}
                value={values.identificationNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.identificationNumber}
                errors={errors.identificationNumber}
              />

              <Button
                type="submit"
                className="bg-[rgba(255,92,0,1)] text-white rounded-md w-full h-12 text-[22px]"
                isLoading={isSubmitting}
              >
                Continuar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

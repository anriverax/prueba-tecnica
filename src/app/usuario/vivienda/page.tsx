"use client";

import React from "react";
import Image from "next/image";
import { Button, Input, Link, Select, SelectItem, Textarea } from "@nextui-org/react";
import DropzoneCustom from "./_partials/dropzoneCustom";
import { useDwelling } from "./_partials/hook/use-dwelling";
import { useList } from "./_partials/hook/use-list";

/**
 * Component for the Dwelling page
 * @returns {React.JSX.Element} The dwelling page form component
 */
const PageVivienda = (): React.JSX.Element => {
  const formik = useDwelling(); // Get formik instance from useDwelling hook
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

  const { departments, municipalities } = useList({
    departamentId: values.departmentId.toString(),
    setFieldValue
  });

  return (
    <div>
      <div className="bg-[url('/images/bg.png')] bg-cover w-full h-10"></div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="p-6 md:p-0 md:flex md:items-center min-h-[calc(100vh-14.5rem)]">
          {/* Dwelling Form Section */}
          <div className="w-full md:px-6 lg:px-24">
            <Image
              src="/images/title.png"
              alt="title"
              width={129}
              height={32}
              className="h-[32px] w-[129px]"
            />
            <h2 className="text-2xl font-semibold my-12">Datos de vivienda</h2>
            <Select
              isLoading={departments.length === 0}
              items={departments}
              label="Departamento"
              placeholder="Seleccionar"
              variant="bordered"
              labelPlacement="outside"
              color="primary"
              classNames={{
                trigger: ["group/custom h-12"],
                label: ["text-foreground-500 group-data-[open=true]/custom:text-primary"],
                mainWrapper: ["mb-5"]
              }}
              selectedKeys={
                departments.length > 0
                  ? [values.departmentId === 0 ? "" : values.departmentId.toString()]
                  : [""]
              }
              onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                await setFieldValue("departmentId", Number(e.target.value));
              }}
              isInvalid={Boolean(touched.departmentId && errors.departmentId)}
              errorMessage={touched.departmentId ? errors.departmentId : undefined}
            >
              {(val) => <SelectItem key={val.id.toString()}>{val.name}</SelectItem>}
            </Select>
            <Select
              isLoading={municipalities.length === 0}
              variant="bordered"
              labelPlacement="outside"
              items={municipalities}
              label="Municipio"
              placeholder="Seleccionar"
              color="primary"
              classNames={{
                trigger: ["group/custom h-12"],
                label: ["text-foreground-500 group-data-[open=true]/custom:text-primary"],
                mainWrapper: ["mb-5"]
              }}
              selectedKeys={
                municipalities.length > 0
                  ? [values.municipalityId === 0 ? "" : values.municipalityId.toString()]
                  : [""]
              }
              onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                await setFieldValue("municipalityId", Number(e.target.value));
              }}
              isInvalid={Boolean(touched.municipalityId && errors.municipalityId)}
              errorMessage={touched.municipalityId ? errors.municipalityId : undefined}
            >
              {(val) => <SelectItem key={val.id}>{val.name}</SelectItem>}
            </Select>
            <Textarea
              minRows={2}
              variant="bordered"
              labelPlacement="outside"
              placeholder="Dirección"
              label="Dirección"
              name="address"
              color="primary"
              classNames={{
                label: ["text-foreground-500 group-data-[focus=true]:text-primary"]
              }}
              value={values.address}
              isInvalid={Boolean(touched.address && errors.address)}
              errorMessage={touched.address ? errors.address : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              name="salary"
              type="number"
              label="Ingresos mensuales"
              placeholder="0.00"
              variant="bordered"
              labelPlacement="outside"
              color="primary"
              classNames={{
                label: ["text-foreground-500 group-data-[focus=true]:text-primary"],
                mainWrapper: ["my-5"],
                inputWrapper: ["h-12"]
              }}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              value={values.salary}
              isInvalid={Boolean(touched.salary && errors.salary)}
              errorMessage={touched.salary ? errors.salary : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {/* Custom Dropzone component */}
          <div className="w-full md:px-6 lg:px-24">
            <h2 className="text-2xl font-semibold my-12">Fotografía de documento de identidad</h2>
            <div>
              <DropzoneCustom
                value={values.image}
                touched={touched.image}
                errors={errors.image}
                setFieldValue={setFieldValue}
              />
            </div>
          </div>
        </div>

        <div className="space-x-3 flex justify-between w-full items-end p-6 lg:p-0 lg:pr-24 lg:justify-end lg:items-start lg:h-48">
          <Button href="registrar" as={Link} className="rounded-md text-base w-40">
            Cancelar
          </Button>
          <Button
            isLoading={isSubmitting}
            type="submit"
            className="bg-[rgba(255,92,0,1)] text-white rounded-md text-base w-40"
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PageVivienda;

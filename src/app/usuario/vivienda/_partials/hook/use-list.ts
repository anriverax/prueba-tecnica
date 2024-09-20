"use client";

import { SelectBox } from "#/helpers/types";
import { useEffect, useState } from "react";
import { DwellingData } from "../utils";
import { FormikErrors } from "formik";
import { useFormStore } from "#/helpers/hook/use-store";

/**
 * ListProps defines the shape of the props passed to useList.
 */
export type ListProps = {
  departamentId: string;
  setFieldValue: (
    field: string,
    value: number,
    shouldValidate?: boolean
  ) => Promise<FormikErrors<DwellingData>> | Promise<void>;
};

/**
 * useList is a custom hook for fetching and managing the list of departments and municipalities.
 * @param data - Object containing the departmentId and setFieldValue function.
 * @returns An object containing departments and municipalities.
 */

const useList = (data: ListProps) => {
  const {
    dwelling: { municipalityId }
  } = useFormStore();

  const [departments, setDepartments] = useState<SelectBox[]>([]);
  const [municipalities, setMunicipalities] = useState<SelectBox[]>([]);

  const { departamentId, setFieldValue } = data;

  useEffect(() => {
    // Fetches the list of departments and sets the state.
    void (async () => {
      try {
        if (departments.length === 0) {
          const result = await fetch(
            "https://countries-mkag.onrender.com/api/state?fields=id%2C%20name&value=54&filter=countryId"
          );

          if (!result.ok) {
            throw new Error("Network response was not ok");
          }

          const data: SelectBox[] = (await result.json()) as SelectBox[];

          setDepartments(data);
        }
      } catch (error) {
        const e: string =
          error instanceof Error ? error.message : "An error occurred while fetching species data";

        console.log(e);
      }
    })();
  }, [departments]);

  useEffect(() => {
    // Fetches the list of municipalities based on the selected department.
    void (async () => {
      if (parseInt(departamentId) > 0) {
        try {
          const result = await fetch(
            `https://countries-mkag.onrender.com/api/city?filter=stateId&value=${departamentId}&fields=id%2C%20name`
          );

          if (!result.ok) {
            throw new Error("Network response was not ok");
          }

          const data: SelectBox[] = (await result.json()) as SelectBox[];
          setMunicipalities(data);

          if (municipalityId === 0) await setFieldValue("municipalityId", 0);
        } catch (error) {
          const e: string =
            error instanceof Error ? error.message : "An error occurred while fetching species data";

          console.log(e);
        }
      }
    })();
  }, [departamentId, municipalityId, setFieldValue]);

  return { departments, municipalities };
};

export { useList };

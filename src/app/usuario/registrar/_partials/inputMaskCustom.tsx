import React from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

/**
 * Props interface for InputMaskCustom component, extending the default InputMaskProps from react-input-mask.
 * @interface
 * @extends {InputMaskProps}
 */
interface InputMaskCustomProps extends React.InputHTMLAttributes<HTMLInputElement>, InputMaskProps {
  touched?: boolean | undefined;
  errors?: string | undefined;
}

/**
 * Custom input mask component with validation support and styling.
 *
 * @param {InputMaskCustomProps} props
 * @returns {React.JSX.Element} The InputMaskCustom component.
 */
export const InputMaskCustom = ({
  touched,
  errors,
  ...props
}: InputMaskCustomProps): React.JSX.Element => {
  const hasError: boolean = Boolean(touched && errors);

  return (
    <div className="!mt-0">
      <label
        htmlFor="identificationNumber"
        className={`block text-sm font-medium mb-2 ${hasError && "text-danger"}`}
      >
        Número de identificación
      </label>
      <InputMask
        {...props}
        name="identificationNumber"
        id="identificationNumber"
        autoComplete="off"
        className={`input-mask shadow-sm border-2 rounded-medium h-12 w-full font-normal text-small px-3 ${hasError ? "border-danger" : "border-default-200"}`}
      />
      {hasError ? (
        <div className="text-tiny text-danger p-1">Porfavor complete este campo*.</div>
      ) : undefined}
    </div>
  );
};

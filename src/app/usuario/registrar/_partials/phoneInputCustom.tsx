import React from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

/**
 * Props interface for PhoneInputCustom component, extending the default PhoneInputProps from react-phone-input-2.
 * @interface
 * @extends {PhoneInputProps}
 */
interface PhoneInputCustomProps extends PhoneInputProps {
  touched?: boolean | undefined;
  errors?: string | undefined;
}

/**
 * Custom phone input component with validation support and styling.
 *
 * @param {PhoneInputCustomProps} props
 * @returns {React.JSX.Element} The PhoneInputCustom component.
 */
export const PhoneInputCustom = ({
  touched,
  errors,
  ...props
}: PhoneInputCustomProps): React.JSX.Element => {
  const hasError: boolean = Boolean(touched && errors);

  return (
    <div className="!mt-0">
      <label className={`block text-sm font-medium mb-2 ${hasError && "text-danger"}`}>
        Número de teléfono
      </label>
      <PhoneInput
        {...props}
        country="sv"
        inputClass={`peer py-3 pr-12 !w-full !h-12 !border-medium !rounded-medium !shadow-sm ${hasError ? "!border-danger" : "!border-default-200 hover:!border-default-400 focus:!border-primary"}`}
        buttonClass={`!border-y-2 !border-r-0 !border-l-2 !rounded-none !rounded-tl-medium !rounded-bl-medium ${hasError ? "!border-danger" : "!border-default-200 peer-hover:!border-default-400 peer-focus:!border-primary"}`}
        buttonStyle={{
          backgroundColor: "white",
          zIndex: 1000
        }}
      />
      {hasError ? (
        <div className="text-tiny text-danger p-1">Porfavor complete este campo*.</div>
      ) : undefined}
    </div>
  );
};

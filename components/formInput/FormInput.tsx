import React from "react";
import { useField } from "formik";
import FormError from "../common/formError/FormError";
import Input from "../common/Input/Input";

interface IFormInput {
  ariaLabel: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
}

const FormInput: React.FC<IFormInput> = ({
  ariaLabel,
  name,
  type,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  return (
    <>
      <Input
        field={field}
        ariaLabel={ariaLabel}
        name={field.name}
        type={type}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <FormError text={meta.error}></FormError>
      ) : null}
    </>
  );
};

export default FormInput;

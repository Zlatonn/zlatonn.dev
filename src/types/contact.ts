import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface Iform {
  name: string;
  email: string;
  message: string;
}

export interface InputFieldProps {
  id: "name" | "email" | "message";
  label: string;
  formType: "input" | "textArea";
  inputType?: string;
  placeholder: string;
  register: UseFormRegister<Iform>;
  errors: FieldErrors<Iform>;
  pattern?: RegExp;
}

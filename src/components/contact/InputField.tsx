import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { InputFieldProps as Props } from "@/types/contact";
import { Textarea } from "../ui/textarea";

const InputField = ({ id, label, formType, inputType, placeholder, register, errors, pattern }: Props) => (
  <div className="flex flex-col w-full gap-1.5">
    {/* Label for input field */}
    <Label htmlFor={id}>{label}</Label>

    {/* Conditionally render an input or textarea based on formType */}
    {formType === "input" ? (
      <Input
        type={inputType}
        id={id}
        placeholder={placeholder}
        {...register(id, {
          required: `${label} is required.`,
          pattern: pattern && {
            value: pattern,
            message: `Invalid ${id} format.`,
          },
        })}
        className="bg-light/50 placeholder:text-light border-none outline-none"
      />
    ) : (
      <Textarea
        id={id}
        placeholder={placeholder}
        {...register(id, {
          required: `${label} is required.`,
          pattern: pattern && {
            value: pattern,
            message: `Invalid ${id} format.`,
          },
        })}
        className="bg-light/50 placeholder:text-light border-none outline-none"
      />
    )}

    {/* Display validation error messages if any */}
    {errors && errors[id]?.message && <p className="w-fit mt-1 text-orange-300 text-sm">{errors[id].message}</p>}
  </div>
);

export default InputField;

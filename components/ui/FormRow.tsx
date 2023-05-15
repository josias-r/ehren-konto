import { ReactNode } from "react";
import { Label } from "./label";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors } from "react-hook-form";

function FormRow<TId extends string>({
  label,
  errors,
  id,
  children,
  required = false,
}: {
  errors?: FieldErrors<any>;
  label: string;
  required?: boolean | string;
  id: TId;
  children: ({
    id,
    name,
  }: {
    id: TId;
    name: TId;
    className: string;
    required: string | false;
  }) => ReactNode;
}) {
  const requiredText = required === true ? "is required" : required;
  return (
    <div className="grid gap-2">
      <div className="grid relative gap-3 sm:grid-cols-3 sm:items-center sm:gap-4">
        <Label htmlFor={id} className="whitespace-nowrap">
          {label}
          {required ? (
            <span className="text-red-500 ordinal">
              {" "}
              <sup>*</sup>
            </span>
          ) : null}
        </Label>
        {children({
          id,
          name: id,
          className: "col-span-2",
          required: requiredText,
        })}
      </div>
      {!!errors?.[id]?.["message"] && (
        <div className="grid grid-cols-3 text-red-500 text-xs italic">
          <div className="col-start-2 col-span-2">
            <ErrorMessage name={id} errors={errors} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormRow;

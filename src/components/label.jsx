import { classNames } from "../lib/classnames";
import { React, useContext } from "react";
import { FieldContext } from "./field-context";

export const Label = (props) => {
  const fieldId = useContext(FieldContext);

  return (
    <label
      htmlFor={fieldId}
      {...props}
      className={classNames("block text-sm font-medium text-gray-900", props.className)}
    />
  );
}
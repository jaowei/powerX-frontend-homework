import { classNames } from "../lib/classnames";
import PropTypes from "prop-types";
import { React, forwardRef, useContext } from "react";
import { callAll } from "../lib/call-all";
import { FieldContext } from "./field-context";

export const TextInput = forwardRef(function TextInput(
  { type = 'text', onChangeValue, ...props },
  forwardedRef
) {
  const fieldId = useContext(FieldContext);

  return (
    <input
      type={type}
      {...props}
      id={props.id || fieldId}
      className={classNames(
        "block w-full shadow-sm sm:text-sm focus:ring-pink-500 focus:border-pink-500 rounded-md",
        props.className
      )}
      onChange={callAll(
        onChangeValue && ((ev) => onChangeValue(ev.target.value)),
        props.onChange
      )}
      ref={forwardedRef}
    />
  );
});

TextInput.propTypes = {
  onChangeValue: PropTypes.func,
};
import { classNames } from "../lib/classnames";
import PropTypes from "prop-types";

export const Button = ({ type = "button", variant, ...props }) => (
  <button
    type={type}
    {...props}
    className={classNames(
      "inline-flex justify-center items-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500",
      variant && classByVariant[variant],
      props.className
    )}
  />
);

const classByVariant = {
  primary: "border-transparent text-white bg-pink-600 hover:bg-pink-700",
  outline: "border-pink-500 text-pink-500 bg-white hover:text-pink-700",
  borderless: "hover:bg-gray-50 focus:ring-opacity-30 transition duration-150 ease-in-out text-red-400"
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "outline", "borderless"]),
};
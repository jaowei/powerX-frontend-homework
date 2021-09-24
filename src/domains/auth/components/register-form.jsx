import { useFormik } from "formik";
import { TextField } from "../../../components/text-field";
import { Button } from "../../../components/button";
import { useRegisterMutation } from "../";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const RegisterForm = () => {
  const registerMutation = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      registerMutation.mutate(
        {
          ...values,
        },
        {
          onSuccess: () => {
            formik.resetForm();
          },
        }
      );
    },
  });

  return (
    <div className="max-w-md mx-auto m-6 shadow">
      <form onSubmit={formik.handleSubmit}>
        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Register Your Account
        </div>
        <div className="space-y-5 p-3">
          {registerMutation.isSuccess && (
            <div className="p-2 text-green-800 bg-green-200 rounded-sm">
              Registration Successful!
            </div>
          )}
          <TextField
            label="Email"
            id="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={registerMutation.isLoading}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="block text-xs text-red-500">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="space-y-6 p-3">
          <TextField
            label="Username"
            id="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={registerMutation.isLoading}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="block text-xs text-red-500">
              {formik.errors.username}
            </div>
          )}
        </div>
        <div className="space-y-5 p-3">
          <TextField
            label="Password"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={registerMutation.isLoading}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="block text-xs text-red-500">
              {formik.errors.password}
            </div>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={registerMutation.isLoading}
        >
          Register!
        </Button>
      </form>
    </div>
  );
};

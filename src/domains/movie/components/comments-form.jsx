import { useAuth } from "../../auth";
import { useFormik } from "formik";
import { useCreateMovieComment } from "../";
import { SelectField } from "../../../components/select-field";
import { Button } from "../../../components/button";
import { TextareaField } from "../../../components/textarea-field";
import * as Yup from 'yup';

const validationSchema = Yup.object({
  rating: Yup.string().required("Please select your rating"),
  content: Yup.string().required("Please enter your comment").max(255)
})

export const CommentsForm = ({ movieId }) => {
  const { status, accessToken } = useAuth();
  const createMovieComment = useCreateMovieComment();

  const formik = useFormik({
    initialValues: {
      rating: "",
      content: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createMovieComment.mutate(
        {
          data: {
            rating: Number(values.rating),
            movieId: movieId,
            ...values,
          },
          token: accessToken,
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
    <div className="mt-6">
      <div className="mt-10">
        {status === "authenticated" ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4 space-y-6">
              <SelectField
                id="rating"
                label="Enter your rating"
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </SelectField>
            </div>
            <div className="mt-4 mb-4 space-y-6">
              <TextareaField
                id="content"
                label="Type your comment below"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              ADD COMMENT
            </Button>
          </form>
        ) : (
          <Button
            variant="outline"
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            render={(bProps) => <a {...bProps} href="/login" />}
          >
            LOGIN TO WRITE A COMMENT
          </Button>
        )}
      </div>
    </div>
  );
};

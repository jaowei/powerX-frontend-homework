import { useMovieComments, useDeleteMovieCommentMutation } from "../";
import { useAuth, useWhoami } from "../../auth";
import { Button } from "../../../components/button";
import { TrashIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/outline";

const DeleteButton = ({ text, onClick }) => (
  <Button variant="outline" onClick={onClick}>
    <TrashIcon className="w-5 h-5 mr-1.5" />
    {text}
  </Button>
);

export const Comments = ({ movieId }) => {
  const { data } = useMovieComments(movieId);
  const { status, accessToken } = useAuth();
  const whoamiQuery = useWhoami(accessToken);
  const deleteCommentMutation = useDeleteMovieCommentMutation();

  return (
    <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
      <div className="mb-5">
        <h1 className="text-xl font-extrabold text-gray-900 sm:text-center">
          <u>Comments</u>
        </h1>
      </div>
      {data && (
        <div>
          {data.map((comment) => (
            <div key={comment._id} className="flex flex-row place-content-between border rounded-sm p-4 mb-3">
              <div className="flex flex-col items-center">
                <div className="rounded-full border flex items-center justify-center h-8 w-8 bg-gray-200">
                  <UserIcon className="w-4 h-4" />
                </div>
                <h1>{comment.userName}</h1>
              </div>
              <div>
                <h3>Rating</h3>
                <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
                  {comment.rating}
                </p>
              </div>
              <div>
                <h3>Comment</h3>
                <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
                  {comment.content}
                </p>
              </div>
              {whoamiQuery.data &&
                status === "authenticated" &&
                whoamiQuery.data.userId === comment.userId && (
                  <DeleteButton
                    onClick={() =>
                      deleteCommentMutation.mutate({
                        commentId: comment._id,
                        token: accessToken,
                      })
                    }
                  />
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

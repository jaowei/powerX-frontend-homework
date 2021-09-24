import { useState } from "react";
import { Button } from "../../../components/button";
import { TextField } from "../../../components/text-field";
import { useLogin } from "../auth.state";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const login = useLogin();

  return (
    <div className="max-w-md mx-auto m-6 shadow">
      <form
        className="p-6"
        onSubmit={(ev) => {
          ev.preventDefault();
          setStatus("Loading");
          login({ email, password })
            .then(() => {
              setEmail("");
              setPassword("");
            })
            .catch(() => setStatus("error"));
        }}
      >
        {status === "error" && (
          <div className="p-2 text-red-800 bg-red-200 rounded-sm">
            Failed to login.
          </div>
        )}

        <div className="text-3xl mt-4 mb-8 font-extrabold text-center">
          Login
        </div>

        <div className="space-y-6">
          <TextField
            label="Email"
            value={email}
            onChangeValue={setEmail}
            name="username"
            id="username"
            autoFocus
            required
            disabled={status === "loading"}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChangeValue={setPassword}
            name="password"
            id="password"
            autoFocus
            required
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={status === "loading"}
          >
            Login
          </Button>
        </div>
      </form>
      <div className="flex justify-center p-3">
        Or...
        <Link to={"/register"}><p className="text-blue-700 font-medium"> Click here to sign up!</p></Link>
      </div>
    </div>
  );
};

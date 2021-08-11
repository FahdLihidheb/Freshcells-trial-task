import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as fromShared from "./shared";

const LOGIN_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
      }
    }
  }
`;

function Login(props: { handleLoggingIn: any }) {
  let [errorMesssage, setErrorMesssage] = useState("");

  let [redirect, setRedirect] = useState(false);

  const [credential, setcredential] = useState({
    identifier: "",
    password: "",
  });

  const [LoginMutation, { loading }] = useMutation(LOGIN_MUTATION);

  const loginAction = (e: any) => {
    e.preventDefault();
    // Login
    if (!!credential.identifier && !!credential.password) {
      // Init error
      setErrorMesssage("");
      // Call
      LoginMutation({
        variables: {
          input: {
            identifier: credential.identifier,
            password: credential.password,
          },
        },
      })
        .then(({ data }) => {
          // Set to local storage
          localStorage.setItem(fromShared.AUTH_TOKEN, data.login.jwt);
          // Lift state up
          props.handleLoggingIn({
            isLogged: true,
            userId: data.login.user.id,
          });
          // Redirect
          setRedirect(true);
        })
        .catch((error) => {
          setcredential({ ...credential, password: "" });
          setErrorMesssage("Email or password is not valid.");
        });
    } else {
      setErrorMesssage("Email or password should not be emplty.");
    }
  };

  if (redirect) return <Redirect to="/account" />;

  return (
    <div className="text-center">
      <h1>Login Screen</h1>

      <small className="text-muted m-1">
        {loading ? "Connecting..." : errorMesssage || "Hello!"}
      </small>

      <form onSubmit={loginAction}>
        <div className="form-inner mt-5">
          <div className="form-group m-1">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Identifier"
              onChange={(e) =>
                setcredential({ ...credential, identifier: e.target.value })
              }
              value={credential.identifier}
            />
          </div>

          <div className="form-group m-1">
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setcredential({ ...credential, password: e.target.value })
              }
              value={credential.password}
            />
          </div>
        </div>

        <button
          className="rounded m-2"
          type="submit"
          value="LOGIN"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

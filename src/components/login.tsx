import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import * as fromShared from "./shared";

const LOGIN_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
    }
  }
`;

function Login() {
  let [errorMesssage, setErrorMesssage] = useState("");

  let [redirect, setRedirect] = useState(false);

  const [credential, setcredential] = useState({
    identifier: "",
    password: "",
  });

  const [LoginMutation, { data, loading }] = useMutation(LOGIN_MUTATION);

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
          // Redirect
          setRedirect(true);
        })
        .catch((error) => {
          console.log(error);
          setErrorMesssage("Email or password is not valid.");
        });
    } else {
      setErrorMesssage("Email or password should not be emplty.");
    }
  };

  if (redirect) return <Redirect to={{ pathname: "/account" }} />;

  return (
    <form onSubmit={loginAction}>
      <div className="form-inner">
        <h2>Login: KTKwXm2grV4wHzW</h2>
        {!!errorMesssage ? (
          <span className="error">{errorMesssage}</span>
        ) : (
          <br />
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) =>
              setcredential({ ...credential, identifier: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setcredential({ ...credential, password: e.target.value })
            }
          />
        </div>
      </div>

      <button type="submit" value="LOGIN" disabled={loading}>
        {loading ? "Connecting..." : "Login"}
      </button>
    </form>
  );
}

export default Login;

import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import * as fromShared from "./shared";

const USER_DATA_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`;

function Account(props: { id: number }) {
  // Get token
  const auth_token = localStorage.getItem(fromShared.AUTH_TOKEN);

  // Get current user data
  const { loading, error, data } = useQuery(USER_DATA_QUERY, {
    variables: { id: props.id },
    context: {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    },
  });

  // Redirect
  const [redirect, setRedirect] = useState(false);

  function logout() {
    // remove token
    localStorage.removeItem(fromShared.AUTH_TOKEN);
    // Redirect to logout
    setRedirect(true);
  }

  if (redirect) return <Redirect to="/" />;

  if (loading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );

  if (error)
    return (
      <div>
        <span>
          There was an error, refrech page or go back to
          <a href="/"> Login page</a>.
        </span>
      </div>
    );

  return (
    <div className="text-center">
      <h1 className="mb-5">Account Screen</h1>

      <div className="row">
        <h2>{data.user.firstName}</h2>
        <h2>{data.user.lastName}</h2>
      </div>

      <button className="w-50 m-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Account;

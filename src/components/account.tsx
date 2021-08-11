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

function Account() {
  // Get token
  const auth_token = localStorage.getItem(fromShared.AUTH_TOKEN);

  // Get current user data
  const { loading, error, data } = useQuery(USER_DATA_QUERY, {
    variables: { id: 2 },
    context: {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    },
    skip: !auth_token,
  });

  // Redirect
  const [redirect, setRedirect] = useState(!auth_token);

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
          <a href="/">Login page</a>.
        </span>
      </div>
    );

  return (
    <div>
      <span>{data.user.firstName}</span>
      <span>{data.user.lastName}</span>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Account;

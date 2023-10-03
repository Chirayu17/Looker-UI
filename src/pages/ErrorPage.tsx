import React from "react";
import { useRouteError } from "react-router-dom";

// TODO: Make this page generic for any error type (To be used for all server side and generic client side errors)
const ErrorPage: React.FC<{}> = () => {
  const error = useRouteError() as Error & { statusText: string };
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;

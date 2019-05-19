import React from "react";

interface ILoginButtonProps {
  login: () => any;
  logout: () => any;
  isAuthenticated: boolean;
}

const LoginButton = (props: ILoginButtonProps) => {
  const { login, logout, isAuthenticated } = props;
  return (
    <React.Fragment>
      {isAuthenticated ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <button onClick={login}>Log In</button>
      )}
    </React.Fragment>
  );
};

export default LoginButton;

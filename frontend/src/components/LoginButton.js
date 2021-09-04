import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
  const history = useHistory();

  function handleClick() {
    history.push('/');
  }
  return <button onClick={handleClick}>Login</button>;
};

export default LoginButton;

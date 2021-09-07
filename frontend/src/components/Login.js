import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/authenticationActions';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.dispatch(handleLogin(email, password));
        }}
      >
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(props.authentication);
        }}
      >
        Check state
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

export default connect(mapStateToProps)(Login);

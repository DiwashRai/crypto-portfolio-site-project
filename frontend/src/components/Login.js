import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleLogin } from '../actions/authenticationActions';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Coinsensus</h1>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            props.dispatch(handleLogin(email, password));
            props.history.push('/dashboard');
          }}
        >
          <input
            type="text"
            placeholder="Email"
            className="text-input"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="text-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  };
};

export default connect(mapStateToProps)(Login);

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startSetUser } from '../actions/userActions';
import { handleLogin } from '../actions/authenticationActions';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authentication = useSelector((state) => state.authentication);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(startSetUser());
  }, []);

  useEffect(() => {
    if (authentication.isAuthenticated) {
      history.push('/dashboard');
    }
  }, [authentication]);

  return (
    <div className="box-layout">
      <div className="ui raised segment login">
        <div className="ui large header">Coinsensus</div>
        <form
          className="ui form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(handleLogin(email, password));
            history.push('/dashboard');
          }}
        >
          <div className="field">
            <label>Username</label>
            <div className="ui input">
              <input
                type="text"
                placeholder="Email"
                className="text-input"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="ui input">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="fluid ui button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

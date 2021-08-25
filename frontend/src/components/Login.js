import React from 'react';

export default class Login extends React.Component {
  state = {
    data: undefined,
    token: undefined,
    error: undefined,
  };
  handleLogin = (event) => {
    event.preventDefault();
    console.log('clicked');
    const email = event.target.elements.email.value.trim();
    const password = event.target.elements.password.value;
    this.getData('http://localhost:3000/users/login', email, password);
  };
  getData(url, email, password) {
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState((prevState) => ({
          data: result.user,
          token: result.token,
        }));
        console.log(result);
      })
      .catch((err) => {
        this.setState((prevState) => ({
          error: 'Invalid/Incorrect credentials entered',
        }));
      });
  }
  getTradesWithCookie = () => {};
  getTrades = () => {
    console.log(this.state.token);
    fetch('http://localhost:3000/trades', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          this.setState((prevState) => ({
            data: result,
          }));
        } else {
          this.setState((prevState) => ({
            error: result.error,
          }));
        }
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        This is my login page.
        <form onSubmit={this.handleLogin}>
          <input type="text" name="email" placeholder="email" />
          <input type="text" name="password" placeholder="password" />
          <button>Login</button>
        </form>
        <button onClick={this.getTrades}>Get Trades</button>
        {this.state.error && <p>{this.state.error}</p>}
        {this.state.data && <p>{JSON.stringify(this.state.data.user)}</p>}
      </div>
    );
  }
}

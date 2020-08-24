import React, { Component } from "react";
import "./App.css";
import logo from "./logo.svg";
import { TodoApp } from "./components/TodoApp";
import "react-datepicker/dist/react-datepicker.css";
import { Login } from "./components/Login";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false };
    this.handleLog = this.handleLog.bind(this);
    localStorage.setItem("email", "prueba@mail.com");
    localStorage.setItem("password", "prueba");
    if (!localStorage.getItem("isLogged"))
    localStorage.setItem("isLogged", this.state.isLoggedIn); //SetFalse
  }

  handleLog() {
    let state = localStorage.getItem("isLogged") === "true" ? "false" : "true";
    console.log("yelloooow!!!")
    this.setState({ isLoggedIn: state });
    localStorage.setItem("isLogged", state);

  }

  Draw() {
  let log1 = localStorage.getItem("isLogged");
  const LoginView = () => {
    return localStorage.getItem("isLogged") === "true"? <h1>Login Exitoso!</h1> : <Login login={this.handleLog}/> 
};

    const TodoAppView = () => {
      if (!(log1 === "true")) {
        return ( 
          <Login login={this.handleLog}/>
        );
      } else {
        return (
          <div>
            <TodoApp />
          </div>
        );
      }
    };

    return (
      <div>
        <Route exact path="/" component={LoginView} />
        <Route exact path="/login" component={LoginView} />
        <Route path="/todo" component={TodoAppView} />
      </div>
    );
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">TODO React App</h1>
          </header>

          <br />
          <br />

          <ul>
            <li>
              <Link to="/">LogIn</Link>
            </li>
            <li>
              <Link to="/todo">Todo</Link>
            </li>
          </ul>
          {this.Draw()}
        </div>
      </Router>
    );
  }
}

export default App;

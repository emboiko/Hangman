import React, { Component } from 'react';
import Header from "./components/Header";
import Hangman from "./components/Hangman";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Hangman />
      </div>
    );
  }
}

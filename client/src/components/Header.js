import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper grey darken-4">
          <span className="brand-logo center">Hangman</span>
        </div>
      </nav>
    );
  }
}

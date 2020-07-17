import React, { Component } from 'react';
import generateRandomPhrase from "../utils/generateRandomPhrase";
import stageZero from "../img/0.gif";
import stageOne from "../img/1.gif";
import stageTwo from "../img/2.gif";
import stageThree from "../img/3.gif";
import stageFour from "../img/4.gif";
import stageFive from "../img/5.gif";
import stageSix from "../img/6.gif";
import M from "materialize-css";

export default class Hangman extends Component {
  constructor(props) {
    super(props);
    const options = this.generateAlphabet().map((letter, i) => {
      return <option key={i} value={letter}>{letter}</option>
    });
    this.state = {
      stages: [stageZero, stageOne, stageTwo, stageThree, stageFour, stageFive, stageSix],
      stage: 0,
      gameOver: false,
      options,
      secret: generateRandomPhrase(),
      currentGuess: "",
      message: "",
    };
  }

  componentDidMount = () => {
    M.AutoInit();
    M.FormSelect.getInstance(document.getElementsByTagName("select")[0]);
  }

  generateAlphabet = () => {
    const alphabet = [];
    const start = 'A'.charCodeAt(0);
    const end = 'Z'.charCodeAt(0);
    for (let i = start; i <= end; ++i) {
      alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
  }

  guess = (e) => {
    if (this.state.gameOver) return;
    // almost done
  }

  handleChange = (e) => this.setState({ currentGuess: e.target.value });

  render() {
    return (
      <>
        <div className="center">
          <p>{this.state.message}</p>
          <button className="waves-effect waves-light btn mtop">New Game</button>
          <div className="bbottom">
            <img className="mtop" src={this.state.stages[this.state.stage]} alt="Hangman" />
          </div>
          <div className="mtop row">
            {this.state.blanks}
          </div>
          <div className="row">
            <div className="input-field col s2 offset-s10">
              <select onChange={this.handleChange} value={this.currentGuess}>
                {this.state.options}
              </select>
              <button
                onClick={this.guess}
                className="waves-effect waves-light btn mtop guess"
              >
                Guess
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

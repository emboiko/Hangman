import React, { Component } from 'react';
import M from "materialize-css";
import generateRandomPhrase from "../utils/generateRandomPhrase";
import stageZero from "../img/0.gif";
import stageOne from "../img/1.gif";
import stageTwo from "../img/2.gif";
import stageThree from "../img/3.gif";
import stageFour from "../img/4.gif";
import stageFive from "../img/5.gif";
import stageSix from "../img/6.gif";

export default class Hangman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: [
        stageZero,
        stageOne,
        stageTwo,
        stageThree,
        stageFour,
        stageFive,
        stageSix
      ],
      stage: 0,
      gameOver: false,
      message: "",
      guesses: [],
      currentGuess: "A",
      secret: generateRandomPhrase(),
      choices: this.generateAlphabet().map((letter, i) => {
        return <option key={i} value={letter}>{letter}</option>;
      })
    };

    const blanks = [];
    Array.from(this.state.secret).forEach((letter, i) => {
      if (letter === " ") {
        blanks.push(
          <span className="blank" key={i}>&ensp;</span>
        );
      } else {
        blanks.push(
          <span className="blank" key={i}>_&nbsp;</span>
        );
      }
    })
    this.state.blanks = blanks;
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


  guess = () => {
    const guess = this.state.currentGuess;
    const guesses = Array.from(this.state.guesses);

    if (
      this.state.gameOver
      ||
      guesses.includes(guess)
    ) return;

    const indices = [];
    Array.from(this.state.secret).forEach((letter, i) => {
      if (letter === guess) indices.push(i);
    });

    if (!indices.length) {
      this.setState({ stage: this.state.stage + 1 });
    }

    if (this.state.stage >= 5) {
      return this.setState(
        { gameOver: true, message: "Game Over", stage: 6 }
      );
    }

    const blanks = Array.from(this.state.blanks);
    indices.forEach((index) => {
      blanks[index] = <span className="blank" key={index}>
        {this.state.secret[index]}
      </span>;
    });
    this.setState({ blanks });

    if (!guesses.includes(guess) && !indices.length) {
      guesses.push(guess);
    }
    this.setState({ guesses });

    let winner = true;
    blanks.forEach((blank) => {
      if (blank.props.children.trim() === "_") {
        winner = false;
      }
    });

    if (winner) this.setState({ gameOver: true, message: "Winner!" });
  }


  newGame = () => {
    const secret = generateRandomPhrase();
    this.setState({
      secret,
      stage: 0,
      gameOver: false,
      guesses: [],
      message: ""
    });

    const blanks = [];
    Array.from(secret).forEach((letter, i) => {
      if (letter === " ") {
        blanks.push(
          <span className="blank" key={i}>&emsp;</span>
        );
      } else {
        blanks.push(
          <span className="blank" key={i}>_&nbsp;</span>
        );
      }
    });
    this.setState({ blanks });
  }


  handleChange = (e) => this.setState({ currentGuess: e.target.value });


  render() {
    return (
      <>
        <div className="center">

          <button
            onClick={this.newGame}
            className="waves-effect waves-light btn red mtop"
          >
            New Game
          </button>

          <div className="bbottom">
            <img
              className="mtop responsive-img"
              src={this.state.stages[this.state.stage]}
              alt="Hangman"
            />
          </div>

          <div className="row">
            <div className="input-field col s4 ">
              <select
                name="currentGuess"
                id="currentGuess"
                onChange={this.handleChange}
                value={this.state.currentGuess}
              >
                {this.state.choices}
              </select>
              <button
                onClick={this.guess}
                className="waves-effect waves-light btn mtop red guess hide-on-med-and-down"
              >
                Guess
              </button>
              <button
                onClick={this.guess}
                className="waves-effect waves-light btn mtop red guess-mobile hide-on-large-only	"
              >
                ⏎
              </button>
            </div>
            <div className="mtop col s4">
              {this.state.blanks}
              <h3 className="red-text">
                {this.state.guesses.map((guess, i) => {
                  return <span key={i}>{guess}</span>
                })}
              </h3>
            </div>
            <div className="mtop col s4">
              <h5 className="red-text">{this.state.message}</h5>
              <h5>{this.state.gameOver ? this.state.secret : ""}</h5>
            </div>


          </div>

        </div>
      </>
    );
  }
}

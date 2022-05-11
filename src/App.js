import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MathGame />
      </header>
    </div>
  );
}

class MathGame extends React.Component {

  constructor(props) {

    super(props);

    //
    // default settings
    //
    this.state = {
      playerName: "",
      playerScore: 0,
      playerTries: 0,
      variable1: 0,
      variable2: 0,
      operand: '',
      result: 0,
      maxVariable: 13,
      playerInput: "",
      playerResult: "",
    }
  }

  componentDidMount() {
    // 
    // refreshProblem preps data for a new question
    //
    this.refreshProblem();
  }

  render() {

    return (
      <div>
        <h1 className={ this.state.playerResult === "Incorrect" ? "incorrect" : "correct" } > 
          {this.state.variable1} {this.state.operand} {this.state.variable2} = &nbsp; 
        <input inputmode="numeric" className="user-input"
          onKeyUp={this.parseInput}
          onChange={this.parseOnChange} 
          value={this.state.playerInput}
        />
        </h1>

        <h3> Your score is {this.state.playerScore} out of {this.state.playerTries} </h3>
      </div>
    )
  }

  refreshProblem = () => {

    const operands = ['+', '-', '*',];
    const thisOperand = operands[Math.floor(Math.random() * 3)];
    //const thisOperand = '*';
    
    let a1 = Math.floor(Math.random() * this.state.maxVariable);
    let a2 = Math.floor(Math.random() * this.state.maxVariable);
    let myresult = '';

    switch (thisOperand) {
      case '+':
        myresult = (a1 + a2).toString();
        break;
      case '-':
        myresult = (a1 - a2).toString();
        break;
      case '*':
        myresult = (a1 * a2).toString();
        break;
      case '/':
        a2 = (a2 === 0) ? 1 : a2;
        myresult = (a1 / a2).toString();
        break;
      default:
        alert('operand selection failure');
      }

    this.setState(state => ({
      variable1: a1,
      variable2: a2,
      operand: thisOperand,
      result: myresult,
      playerInput: "",
      playerResult: "",
    }));

  }

  parseInput = (event) => {

    if (event.key === 'Enter') {
      if (parseInt(this.state.playerInput) === parseInt(this.state.result) ) {
        //
        // player input is correct
        //
        this.setState(state => ({
          playerScore: state.playerScore + 1,
          playerResult: 'Correct',
          playerTries: state.playerTries + 1,
        }));
        this.refreshProblem();
      } else {
        //
        // player input is not correct
        //
        this.setState(state => ({
          playerResult: 'Incorrect',
          playerInput: '',
          playerTries: state.playerTries + 1,
        }));
      }
    }
  }

  parseOnChange = (event) => {
    this.setState(state => ({
      playerInput: event.target.value
    }));
  }
}

export default App;

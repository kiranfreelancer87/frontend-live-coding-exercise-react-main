import React, { Component } from "react";
import { QUESTIONS } from "./questions";
import "./App.css";

class App extends Component {
  state = {
    answers: {},
    averageScore: 0,
    totalRuns: 0,
  };

  componentDidMount() {
    this.calculateAverageScore();
  }

  calculateAverageScore() {
    const totalRuns = parseInt(localStorage.getItem("totalRuns")) || 0;
    const totalScore = parseFloat(localStorage.getItem("totalScore")) || 0;
    const averageScore = totalRuns === 0 ? 0 : totalScore / totalRuns;
    this.setState({ averageScore, totalRuns });
  }

  handleAnswer = (questionId, answer) => {
    const { answers } = this.state;
    const updatedAnswers = { ...answers, [questionId]: answer };
    this.setState({ answers: updatedAnswers });
  };

  calculateScore = () => {
    const { answers } = this.state;
    const totalQuestions = Object.keys(QUESTIONS).length;
    const yesCount = Object.values(answers).filter((answer) => answer === "Yes").length;
    return yesCount / totalQuestions;
  };

  handleSubmit = () => {
    const score = this.calculateScore();
    const { totalRuns } = this.state;
    const totalScore = parseFloat(localStorage.getItem("totalScore")) || 0;
    localStorage.setItem("totalScore", totalScore + score);
    localStorage.setItem("totalRuns", totalRuns + 1);
    this.calculateAverageScore();
  };

  render() {
    const { answers, averageScore } = this.state;

    return (
      <div className="main__wrap">
        <main className="container">
          <div>
            <h1>Questions</h1>
            <ul>
              {Object.entries(QUESTIONS).map(([id, question]) => (
                <li key={id}>
                  <p>{question}</p>
                  <div>
                    <button
                      className={answers[id] === "Yes" ? "selected" : ""}
                      onClick={() => this.handleAnswer(id, "Yes")}
                    >
                      Yes
                    </button>
                    <button
                      className={answers[id] === "No" ? "selected" : ""}
                      onClick={() => this.handleAnswer(id, "No")}
                    >
                      No
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={this.handleSubmit}>Submit</button>
            {averageScore > 0 && (
              <div>
                <p>Average Score: {averageScore}</p>
                <button onClick={() => window.location.reload()}>Restart</button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;

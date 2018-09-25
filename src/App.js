import React, { Component } from 'react';
import _ from 'lodash'
import he from 'he'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      answers: [],
      category: '',
      guessedAnswers: [],
      question: '',
      streak: 0,
    }
  }

  componentDidMount() {
    this.getNextQuestion()
  }

  getNextQuestion() {
    const url = 'https://opentdb.com/api.php?amount=1&type=multiple'

    fetch(url)
      .then(blob => blob.json())
      .then(data => {
        const correctAnswer = data.results[0].correct_answer
        const incorrectAnswers = data.results[0].incorrect_answers
        const answers = incorrectAnswers.concat(correctAnswer)

        this.setState({
          answers: _.shuffle(answers),
          category: data.results[0].category,
          correctAnswer: correctAnswer,
          guessedAnswers: [],
          question: he.decode(data.results[0].question),
        })
      })
  }

  submitAnswer(answer) {
    this.setState({
      guessedAnswers: this.state.guessedAnswers.concat(answer),
      streak: answer === this.state.correctAnswer ? this.state.streak + 1 : 0
    })
  }

  render() {
    return (
      <div className="App">
        <h3>{this.state.question}</h3>
        <div>
          {this.state.answers.map((answer, idx) => {
            const hasBeenGuessed = this.state.guessedAnswers.includes(answer)
            const className = answer === this.state.correctAnswer ? 'correct' : 'incorrect'

            return (
              <button key={idx} className={hasBeenGuessed ? className : ''} onClick={this.submitAnswer.bind(this, answer)}>
                {answer}
              </button>
            )
          })}
          <div>
            Streak: {this.state.streak}
          </div>
          <div>
            <button onClick={this.getNextQuestion.bind(this)}>Next Question</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

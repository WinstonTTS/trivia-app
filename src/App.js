import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      question: {}
    }
  }

  componentDidMount() {
    const url = 'https://opentdb.com/api.php?amount=1&type=multiple'

    fetch(url)
      .then(blob => blob.json())
      .then(data => {
        this.setState({ question: data.results[0] })
      })
  }

  render() {
    return (
      <div className="App">
        <h3>{this.state.question.question}</h3>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

const isValidRange = ([firstNum, secondNum]) => {
  return firstNum && secondNum && firstNum < secondNum;
}

// sample - [6098, 6009, 7000, 7001, 7002, 7003]

const findDuplicates = (inputs, input) => {
  return input.filter(i => inputs.has(i))
}

class App extends Component {
  state = {
    input: '',
    messages: []
  }
  componentDidMount () {
    const inputs = [7000,7001,7002,7003,7004,7005]
    const inputsMap = new Map();
    inputs.forEach(i => inputsMap.set(i, i));
    this.setState({inputs: inputsMap})
  }
  onKeyDown = ({target: {value}}) => {
    const {inputs} = this.state;
    // create number array
    // TODO: check below computation
    let nums = (value || '')
      .split(',')
      .map(n => n.trim())
      .filter(n => n),
      pureNums = nums
      .map(Number);
    const duplicates = findDuplicates(inputs, pureNums)
    // determine range and replace it with the numbers
    // TODO: search multiple ranges
    const range = nums.find(n => n.indexOf('-') !== -1) || '';
    let rangeNumbers = [],
      splitByDash = range.split('-').filter(i => i);
    if (splitByDash.length) {
      rangeNumbers = splitByDash.map(Number);
    }
    // is Valid range
    if (isValidRange(rangeNumbers)) {
      console.log('from ', rangeNumbers[0], ' to', rangeNumbers[1])
    }
    // const 
    if(duplicates.length) {
      const {messages} = this.state
      messages.push(duplicates.join(', '))
      // this.setState({messages: messages})
      console.log(nums, value, duplicates)
    }
  }
  render() {
    const {input, messages} = this.state;
    return (
      <div className="App">
        <header>
          <nav>
            Range Matcher
          </nav>
        </header>
        <section>
          <article>
            <textarea className="form-control" rows="6" onKeyDown={this.onKeyDown}></textarea>
            {input}
            <ul className="result">
              {messages.map((m, index) => <li key={index}>{m}</li>)}
            </ul>
          </article>
        </section>
      </div>
    );
  }
}

export default App;

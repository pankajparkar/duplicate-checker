import React, { Component } from 'react';
import './App.css';

const isValidRange = ([firstNum, secondNum]) => {
  return firstNum && secondNum && firstNum < secondNum;
}

const findDuplicates = (inputs, input, ranges) => {
  const matchedNumber = input.filter(i => inputs.has(i));
  const values = Array.from(inputs.values());
  const matchedRange = ranges.map(({start, end}) => 
    values.filter(v => start <= v && v <= end)
  ).flat()
  // merge duplicate to unique
  return [...new Set(matchedNumber.concat(matchedRange))];
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
    let trimmedNums = (value || '')
        .split(',')
        .map(n => n.trim()),
      nums = trimmedNums
        // Remove variable that has - in it
        .filter(n => n && n.split('-').length !== 2),
      pureNums = nums.map(Number);

    // determine range and replace it with the numbers
    // TODO: search multiple ranges
    const ranges = trimmedNums
      .map(n => n.split('-'))
      .filter(r => r.length === 2 && isValidRange(r))
      .map(([start, end]) => ({ start: Number(start), end: Number(end) }));

    const duplicates = findDuplicates(inputs, pureNums, ranges)
    
    // const 
    if(duplicates.length) {
      const {messages} = this.state
      messages.push(duplicates.join(', '))
      this.setState({messages: [duplicates.join(', ')]})
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

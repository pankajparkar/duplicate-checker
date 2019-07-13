import React, { Component } from 'react';
import './App.css';

// const isValidRange = ([firstNum, secondNum]) => {
//   return firstNum && secondNum && firstNum < secondNum;
// }

const findDuplicates = (inputs, input) => {
  return input.filter(i => inputs.has(i))
}

class App extends Component {
  state = {
    input: '',
    messages: []
  }
  componentDidMount () {
    const inputsMap = new Map();
    [7000,7001,7002,7003,7004,7005].forEach(i => inputsMap.set(i, i));
    this.setState({inputs: inputsMap})
  }
  onKeyDown = ({target: {value}}) => {
    const {inputs} = this.state;
    console.log(value)
    // create number array
    let nums = (value || '')
      .split(',')
      .map(n => n.trim())
      .filter(n => n)
      .map(Number);
    // nums = [6098, 6009, 7000, 7001, 7002, 7003]
    const duplicates = findDuplicates(inputs, nums)
    // determine range and replace it with the numbers
    // TODO: search multiple ranges
    // const range = nums.find(n => n.indexOf('-') !== -1) || '';
    // let rangeNumbers = [];
    // if (range) {
    //   rangeNumbers = range.split('-').map(Number);
    // }
    // // is Valid range
    // if (isValidRange(rangeNumbers)) {
    //   console.log(nums, range, rangeNumbers)
    // }
    // const 
    console.log(nums, value, duplicates)
    if(duplicates.length) {
      const {messages} = this.state
      messages.push(duplicates.join(', '))
      this.setState({messages: messages})
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

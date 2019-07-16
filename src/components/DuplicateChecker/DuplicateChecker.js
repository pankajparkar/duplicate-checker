import './DuplicateChecker.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const regex = /^[0-9]+(-[0-9]+)?(,[0-9]+(-[0-9]+)?)*$/

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

class DuplicateChecker extends Component {
  state = {
    input: '',
    messages: []
  }
  componentDidMount () {
    const {inputs} = this.props;
    const inputsMap = new Map();
    inputs.forEach(i => inputsMap.set(i, i));
    this.setState({inputs: inputsMap})
  }
  onKeyDown = ({target: {value}}) => {
    const withoutSpace = (value || '').replace(/\s/g, '')
    const isValid = regex.test(withoutSpace)
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
    console.log('isValid', isValid)
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
    const {messages} = this.state
    const inputs = JSON.stringify(this.props.inputs);
    return <div className="wrapper">
        <h2>Existing input</h2>
        {inputs}
        <textarea className="form-control" rows="6" onKeyDown={this.onKeyDown}></textarea>
        <ul className="result">
          {messages.map((m, index) => <li key={index}>{m}</li>)}
        </ul>
    </div>
  } 
}

DuplicateChecker.propTypes = {
  inputs: PropTypes.array.isRequired,
};

export default DuplicateChecker;

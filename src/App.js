import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import DuplicateChecker from './components/DuplicateChecker/DuplicateChecker';

class App extends Component {
  state = {
    inputs: [7000,7001,7002,7003,7004,7005],
  }
  render() {
    const {inputs} = this.state;
    return (
      <div className="App">
        <header>
          <Navbar />
        </header>
        <section>
          <article>
            <DuplicateChecker inputs={inputs}/>
          </article>
        </section>
      </div>
    );
  }
}

export default App;

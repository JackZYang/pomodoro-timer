import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOn: false,
      remainingTime: 1500,

    };
  }
  
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.handleCountdown(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleStart = () => {
    this.setState({
      isOn: true
    });
  }

  handleReset = () => {
    this.setState({
      isOn: false,
      remainingTime: 1500
    });
  }
  
  handlePause = () => {
    this.setState({
      isOn: false
    });
  }

  handleCountdown = () => {
    if (this.state.isOn) {
      this.setState({
        remainingTime: this.state.remainingTime-1,
      });
    }
  }

  render(){
    return(
      <div className="App">
        <h1>Pomodoro Clock:</h1>
        <div>
          <div className="time-remaning">
            {Math.floor(this.state.remainingTime/60) + ":" + ('0' + this.state.remainingTime%60).slice(-2)}
          </div>
          <div className="buttons">
            <button onClick={this.handleStart}>Start</button>
            <button onClick={this.handlePause}>Pause</button>
            <button onClick={this.handleReset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
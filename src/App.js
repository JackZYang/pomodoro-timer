import React, {Component} from 'react';
import './App.css';
import Timer from './Timer';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOn: false,
      breakIsOn: false,
      defaultRemainingTime: 5,
      defaultBreakTime: 3,
      remainingTime: 5
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
      remainingTime: this.state.defaultRemainingTime,
      isOn: false,
      breakIsOn: false,
    });
  }
  
  handlePause = () => {
    this.setState({
      isOn: false,
      breakIsOn: false
    });
  }

  handleCountdown = () => {
    if (this.state.remainingTime>0 && (this.state.isOn || this.state.breakIsOn)) {
      this.setState({
        remainingTime: this.state.remainingTime - 1,
      });
    } else if (this.state.remainingTime===0 && this.state.isOn) {
      this.setState({
        isOn: false,
        breakIsOn: true,
        remainingTime: this.state.defaultBreakTime - 1,
      });
    } else if (this.state.remainingTime===0 && this.state.breakIsOn) {
      this.setState({
        isOn: true,
        breakIsOn: false,
        remainingTime: this.state.defaultRemainingTime - 1,
      });
    }
  }

  render(){
    return(
      <div className="App">
        <h1>Pomodoro Clock:</h1>
        <div>
          <div className="time-remaning">
            <Timer remainingTime={this.state.remainingTime} />
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
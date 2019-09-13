import React, {Component} from 'react';
import './App.css';
import Timer from './Timer';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOn: false,
      breakIsOn: false,
      defaultWorkTime: 60,
      defaultBreakTime: 300,
      remainingTime: 60
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
      remainingTime: this.state.defaultWorkTime,
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
        remainingTime: this.state.defaultWorkTime - 1,
      });
    }
  }

  addWork = () => {
    this.setState({
      defaultWorkTime: this.state.defaultWorkTime + 60
    });
  }

  minusWork = () => {
    if (this.state.defaultWorkTime > 60){
      this.setState({
        defaultWorkTime: this.state.defaultWorkTime - 60
      });
    }
  }

  addBreak = () => {
    this.setState({
      defaultBreakTime: this.state.defaultBreakTime + 60
    });
  }

  minusBreak = () => {
    if (this.state.defaultBreakTime > 60){
      this.setState({
        defaultBreakTime: this.state.defaultBreakTime - 60
      });
    }
  }

  handleDefault = () => {
    this.setState({
      defaultWorkTime: 1500,
      defaultBreakTime: 300
    });
  }

  render(){
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="time-remaning">
            <Timer remainingTime={this.state.remainingTime} />
            <div className="timer-state">
              {this.state.isOn ? "Working!" : "Break Time!"}
            </div>
        </div>
        <div className="start-buttons">
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handlePause}>Pause</button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
        <div className="modify-time">
          <div className="modify-work">
            Work: {Math.floor(this.state.defaultWorkTime/60)} minutes
            <button onClick={this.minusWork}>-</button>
            <button onClick={this.addWork}>+</button>
          </div>
          <div className="modify-break">
            Break: {Math.floor(this.state.defaultBreakTime/60)} minutes
            <button onClick={this.minusBreak}>-</button>
            <button onClick={this.addBreak}>+</button>
          </div>
          <div className="set-time">
            <button onClick={this.handleReset}>Set</button>
            <button onClick={this.handleDefault}>Default</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
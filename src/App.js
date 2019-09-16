import React, {Component} from 'react';
import './App.css';
import Timer from './Timer';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      working: false,
      onBreak: false,
      pause: true,
      currentWork: 1500,
      currentBreak: 300,
      remainingTime: 1500,
      setWork: 1500,
      setBreak: 300
    };
  }
  
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.countdown(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  start = () => {
    this.setState({
      pause: false
    });
  }

  reset = () => {
    this.setState({
      remainingTime: this.state.setWork,
      working: false,
      onBreak: false,
      pause: true,
      currentWork: this.state.setWork,
      currentBreak: this.state.setBreak
    });
  }
  
  pause = () => {
    this.setState({
      pause: true
    });
  }

  countdown = () => {
    if (!this.state.working && !this.state.onBreak && !this.state.pause) {
      this.setState({
        working: true,
      });
    }
    if (this.state.remainingTime>0 && !this.state.pause) {
      this.setState({
        remainingTime: this.state.remainingTime - 1
      });
    } else if (this.state.remainingTime===0 && this.state.working) {
      this.setState({
        working: false,
        onBreak: true,
        remainingTime: this.state.currentBreak - 1
      });
    } else if (this.state.remainingTime===0 && this.state.onBreak) {
      this.setState({
        working: true,
        onBreak: false,
        remainingTime: this.state.currentWork - 1
      });
    }
  }

  addWork = () => {
    this.setState({
      setWork: this.state.setWork + 60
    });
  }

  minusWork = () => {
    if (this.state.setWork > 60){
      this.setState({
        setWork: this.state.setWork - 60
      });
    }
  }

  addBreak = () => {
    this.setState({
      setBreak: this.state.setBreak + 60
    });
  }

  minusBreak = () => {
    if (this.state.setBreak > 60){
      this.setState({
        setBreak: this.state.setBreak - 60
      });
    }
  }

  default = () => {
    this.setState({
      setWork: 1500,
      setBreak: 300
    });
  }

  render(){
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="time-remaning">
            <Timer remainingTime={this.state.remainingTime} />
            <div className="timer-state">
              {this.state.working ? "Working!" : this.state.onBreak ? "Break Time!" : "Paused"}
            </div>
        </div>
        <div className="start-buttons">
          <button onClick={this.start}>Start</button>
          <button onClick={this.pause}>Pause</button>
          <button onClick={this.reset}>Reset</button>
        </div>
        <div className="modify-time">
          <div className="modify-work">
            Work: {Math.floor(this.state.setWork/60)} minutes
            <button onClick={this.minusWork}>-</button>
            <button onClick={this.addWork}>+</button>
          </div>
          <div className="modify-break">
            Break: {Math.floor(this.state.setBreak/60)} minutes
            <button onClick={this.minusBreak}>-</button>
            <button onClick={this.addBreak}>+</button>
          </div>
          <div className="set-time">
            <button onClick={this.reset}>Set</button>
            <button onClick={this.default}>Default</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
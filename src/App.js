import React, {Component} from 'react';
import './App.css';
import Timer from './Timer';
import ModifyTime from './ModifyTime';

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

  reset = (setWork, setBreak) => {
    if (setWork && setBreak) {
      this.setState({
        remainingTime: setWork,
        working: false,
        onBreak: false,
        pause: true,
        currentWork: setWork,
        currentBreak: setBreak
      });
    } else {
      this.setState({
        remainingTime: 1500,
        working: false,
        onBreak: false,
        pause: true,
        currentWork: 1500,
        currentBreak: 300
      });
    }
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

  render(){
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="time-remaning">
            <Timer remainingTime={this.state.remainingTime} />
            <div className="timer-state">
              {this.state.working && !this.state.pause ? "Working!" : this.state.onBreak && !this.state.pause ? "Break Time!" : "Paused"}
            </div>
        </div>
        <div className="start-buttons">
          <button onClick={this.start}>Start</button>
          <button onClick={this.pause}>Pause</button>
          <button onClick={this.reset}>Reset</button>
        </div>
        <ModifyTime 
          add={this.add}
          minus={this.minus}
          reset={this.reset} 
        />
      </div>
    );
  }
}

export default App;
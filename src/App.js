import React, {Component} from 'react';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
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

  handleCountdown = () => {
    this.setState({
      remainingTime: this.state.remainingTime-1,
    });
  }

  render(){
    return(
      <div className="App">
        <h1>Pomodoro Clock:</h1>
        <div>
          {Math.floor(this.state.remainingTime/60) + ":" + ('0' + this.state.remainingTime%60).slice(-2)}
        </div>
      </div>
    );
  }

}

export default App;
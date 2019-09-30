import React, {Component} from 'react';

class ModifyTime extends Component{
    state={
        setWork: 1500,
        setBreak: 300
    }

    add = (e) => {
        if (e.target.id === "setWork") {
          this.setState({
            [e.target.id]: this.state.setWork + 60
          });
        }
        if (e.target.id === "setBreak") {
          this.setState({
            [e.target.id]: this.state.setBreak + 60
          });
        }
    }

    minus = (e) => {
        if (this.state.setWork > 60 && e.target.id === "setWork"){
          this.setState({
            [e.target.id]: this.state.setWork - 60
          });
        }
        if (this.state.setBreak > 60 && e.target.id === "setBreak") {
          this.setState({
            [e.target.id]: this.state.setBreak - 60
          });
        }
    }

    default = () => {
        this.setState({
            setWork: 1500,
            setBreak: 300
        });
    }
    set = () => {
        this.props.reset(this.state.setWork, this.state.setBreak)
    }
    render(){
        return (
            <div className="modify-time">
                <div className="modify-work">
                    Work: {Math.floor(this.state.setWork/60)} minutes
                    <button onClick={this.minus} id="setWork">-</button>
                    <button onClick={this.add} id="setWork">+</button>
                </div>
                <div className="modify-break">
                    Break: {Math.floor(this.state.setBreak/60)} minutes
                    <button onClick={this.minus} id="setBreak">-</button>
                    <button onClick={this.add} id="setBreak">+</button>
                </div>
                <div className="set-time">
                    <button onClick={this.set}>Set</button>
                    <button onClick={this.default}>Default</button>
                </div>
            </div>
        )
    }
}

export default ModifyTime
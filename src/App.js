import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';
import Modal from './components/Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      n: 4,
      d: 3,
    }
    this.setParams = this.setParams.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.boardParams = [2,2,2,2]
  }
  toggleModal () {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  setParams (n, d) {
    this.setState({ n, d });
    this.boardParams = new Array(n).fill(d)
    console.log(this.boardParams);
    this.forceUpdate()
  }
  updateFn() {console.log('this')}
  render() {
    return (
      <div>
        <Modal shouldShow = {this.state.showModal} onClose = {this.toggleModal} params={{N: this.state.n, D: this.state.d}} setParams={this.setParams}/>
        <Game boardParams={this.boardParams}/>
        {/* <button onClick={toggleModal}>Toggle modal</button> */}
      </div>
    );
  }
}

export default App;

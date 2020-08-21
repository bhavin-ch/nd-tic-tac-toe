import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      n: this.props.params.N,
      d: this.props.params.D
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const identifier = event.target.attributes.name.nodeValue;
    if (identifier === 'n') {
      console.log('setting n');
      this.setState({ n: parseInt(event.target.value) });
      console.log(this.state);
    }
    if (identifier === 'd') {
      console.log('setting d');
      this.setState({ d: parseInt(event.target.value) });
      console.log(this.state);
    }
  }
  handleSubmit(event) {
    // console.log(this.getState())
    console.log(this.state);
    this.props.setParams(this.state.n, this.state.d);
    this.props.onClose();
  }
  render() {
    const { shouldShow, onClose, title = "Pick your game", subtitle = "I suggest start with N=4, D=3 :)", params } = this.props;
    return shouldShow === true ? 
    <div className="modal">
      <span className="modal-title">{title}</span>
      <span className="modal-subtitle">{subtitle}</span>
      <form onSubmit={this.handleSubmit}>
        <label>N = <input name="n" type="text" value={this.state.n || ''} onChange={this.handleChange} /></label>
        <label>D = <input name="d" type="text" value={this.state.d || ''} onChange={this.handleChange} /></label>
        <button type="submit" value="Done" className="btn action-btn">Done</button>
      </form>
    </div> :
    <div style={{display: 'none'}}></div>
  }
}

export default Modal;
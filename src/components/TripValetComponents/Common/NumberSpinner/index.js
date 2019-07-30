import React, { PureComponent } from 'react';
import { InputNumber, Input } from 'antd';
import './index.styles.scss';

export default class NumberSpinner extends PureComponent {
  state = {
    value: 0,
    step: 1,
    min: 0,
    max: 10,
  };

  componentDidMount = () => {
    if (this.props.defaultValue) this.setState(state => ({ value: this.props.defaultValue }));
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.defaultValue !== this.state.value) {
      this.setState(state => ({
        value: nextProps.defaultValue,
      }));
    }
  };

  onKeyPress = event => {
    const char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };

  handleNumberChange = value => {
    if (this.props.numberChanged) this.props.numberChanged(value === '' ? 0 : +value);
  };

  onNumberChange = event => {
    const value = event.target.value;
    if (value === '' || (+value >= this.state.min && +value <= this.state.max)) {
      const { numberChanged } = this.props;
      this.setState(state => ({
        ...state,
        value,
      }));
      this.handleNumberChange(value);
    }
  };

  onMinusClick = () => {
    const newValue = this.state.value === '' ? 0 : +this.state.value - this.state.step;
    if (newValue >= this.state.min) {
      this.setState(state => ({
        ...state,
        value: newValue,
      }));
      this.handleNumberChange(newValue);
    }
  };

  onPlusClick = () => {
    const newValue = this.state.value === '' ? 1 : +this.state.value + this.state.step;
    if (newValue <= this.state.max) {
      this.setState(state => ({
        ...state,
        value: newValue,
      }));
      this.handleNumberChange(newValue);
    }
  };
  render() {
    const { value } = this.state;
    return (
      <div className="NumberSpinner">
        <div className="NumberSpinner__Minus" onClick={this.onMinusClick} />
        <input className="NumberSpinner__Input" onKeyPress={this.onKeyPress} onChange={e => this.onNumberChange(e)} value={value} />
        <div className="NumberSpinner__Plus" onClick={this.onPlusClick} />
      </div>
    );
  }
}

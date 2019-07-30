import React, { PureComponent } from 'react';
import { Radio, Icon } from 'antd';
import moment from 'moment';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class DateSelection extends PureComponent {
  handleDateClicked = e => {
    this.props.setDate(this.props.dates[+e.target.value]);
  };

  render() {
    const dates = this.props.dates;
    return (
      <div className="text-center">
        <RadioGroup size="large" onChange={this.handleDateClicked}>
          {dates.map((date, index) => {
            const dateText = `${moment(date.start).format('MMM Do YYYY')} - ${moment(date.end).format('MMM Do YYYY')}`;
            return (
              <RadioButton key={index} className="TripCheckout__RadioGroupButtonText" value={index}>
                {dateText}
              </RadioButton>
            );
          })}
        </RadioGroup>
      </div>
    );
  }
}

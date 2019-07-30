import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import moment from 'moment';
import filter from 'lodash/filter';
import omit from 'lodash/omit';
import omitDeep from 'omit-deep-lodash';
import v1 from 'uuid/v1';
import InputMask from 'react-input-mask';
import { DateTime } from 'luxon';
import { Form, Input, InputNumber, Tooltip, Icon, Avatar, DatePicker, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Card, Collapse, Steps, message, Radio, notification } from 'antd';
import { withCheckoutContext } from 'providers/CheckoutProvider';
import StepNavigation from '../../StepNavigation';
import { UPDATE_RESERVATION_GUESTS } from '../OrderWizard.mutations';

import 'react-input-mask/dist/react-input-mask.min.js';

const { Meta } = Card;
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const ccMonth = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const ccYear = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const cvcFormItem = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const doubleFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const dateFormat = 'MM/DD/YYYY';

@Form.create()
@withCheckoutContext
export default class RegistrationTravelers extends Component {
  state = {
    currentTraveler: {
      firstName: '',
      lastName: '',
      passportNumber: '',
      passportExpiration: moment(),
      dietaryRestrictions: '',
    },
    editIndex: -1,
    displayOrder: 0,
    warnSingle: false,
    warnAcknowledged: false,
  };

  setGuests = guests => {
    this.props.checkout.setGuests(guests);
  };

  // export default ({ travelers, getFieldDecorator }) => {
  remove = index => {
    let {
      checkout: {
        reservation: { date, guests },
      },
    } = this.props;
    let { displayOrder } = this.state;
    guests.splice(index, 1);
    //this.setGuests(guests);
    this.setState({ displayOrder: displayOrder - 1 });
  };

  edit = index => {
    let {
      checkout: {
        reservation: { date, guests },
      },
    } = this.props;
    this.setState({ editIndex: index });
    const toEdit = guests[index];
    this.props.form.setFieldsValue(toEdit);
  };

  clearForm = () => {
    this.setState({ editIndex: -1 });
    this.props.form.resetFields();
  };

  done = () => {
    if (this.props.update) {
      let {
        checkout: {
          reservation: { date, guests },
        },
      } = this.props;
    }
  };

  handleSubmit = (e, updateReservationGuests) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {
          checkout: {
            reservation: { id, date, guests, willingToRoom },
            setReservation,
            next,
          },
        } = this.props;
        updateReservationGuests({ variables: { id, guests: values.guests, willingToRoom } }).then(data => {
          notification.open({
            type: 'success',
            description: 'Successfully updated your Guest List!',
            message: 'Guest List',
          });
          this.props.checkout.setReservation(omitDeep(data.data.updateReservationGuests, ['__typename']));
          this.props.form.resetFields();
          next();
        });
      }
    });
  };

  addGuest = () => {
    let {
      checkout: {
        reservation: { guests },
        setGuests,
      },
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const withNewGuest = [
          ...guests,
          {
            id: v1(),
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            phone: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            postalCode: '',
          },
        ];
        setGuests(withNewGuest);
      }
    });
  };

  removeGuest = index => {
    let {
      checkout: {
        setGuests,
        reservation: { guests },
      },
    } = this.props;
    setGuests([...guests.slice(index)]);
  };

  handleWillingToRoom = e => {
    this.setState(state => ({
      ...state,
      warnAcknowledged: true,
      warnSingle: true,
    }));
    this.props.checkout.setWillingToRoom(e.target.value === 'Yes' ? true : false);
  };

  renderGuests = () => {
    const {
      checkout: {
        reservation: { guests },
      },
      form: { getFieldDecorator },
    } = this.props;
    let { editIndex } = this.state;

    return guests.map((guest, index) => {
      return (
        <Row key={index} className="OrderWizard__Guests__Row">
          <Col>
            <Row gutter={10}>
              <Col xs={12}>
                <img className="OrderWizard__Guests__OrderImage" src={`/resources/images/svgs/guest-0${index + 1}.svg`} alt="Guest #1" />
              </Col>
              <Col xs={12}>
                {guests.length === 1 ? (
                  <Button type="primary" onClick={this.addGuest}>
                    Add Guest
                  </Button>
                ) : (
                  index > 0 && (
                    <Button type="danger" onClick={() => this.removeGuest(index)}>
                      Remove Guest
                    </Button>
                  )
                )}
              </Col>
            </Row>
            <Row gutter={10}>
              <Col xs={24} sm={12}>
                <FormItem label="First Name" hasFeedback>
                  {getFieldDecorator(`guests[${index}].firstName`, {
                    initialValue: guest.firstName,
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's First Name",
                      },
                    ],
                  })(<Input placeholder="Guest's First Name" />)}
                </FormItem>
              </Col>
              <Col xs={24} sm={12}>
                <FormItem label="Last Name" hasFeedback>
                  {getFieldDecorator(`guests[${index}].lastName`, {
                    initialValue: guest.lastName,
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's Last Name",
                      },
                    ],
                  })(<Input type="text" placeholder="Guest's Last Name" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col xs={24} sm={10}>
                <FormItem label="Email Address" hasFeedback>
                  {getFieldDecorator(`guests[${index}].email`, {
                    initialValue: guest.email,
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's Email Address",
                      },
                    ],
                  })(<Input placeholder="Guest's Email Address" />)}
                </FormItem>
              </Col>
              <Col xs={24} sm={7}>
                <FormItem label="Phone" hasFeedback>
                  {getFieldDecorator(`guests[${index}].phone`, {
                    initialValue: guest.phone,
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's Phone Number",
                      },
                    ],
                  })(<InputMask className="InputMask__AntLike" mask="(999) 999-9999" placeholder="Enter Guest's Phone Number" />)}
                </FormItem>
              </Col>
              <Col xs={24} sm={7}>
                <FormItem label="Date of Birth" hasFeedback>
                  {getFieldDecorator(`guests[${index}].dob`, {
                    initialValue: guest.dob ? DateTime.fromISO(guest.dob).toFormat('LL/dd/yyyy') : '',
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's Date of Birth",
                      },
                    ],
                  })(<InputMask className="InputMask__AntLike" mask="99/99/9999" placeholder="Enter Guest's Birth Date" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Address" hasFeedback>
                  {getFieldDecorator(`guests[${index}].address`, {
                    initialValue: guest.address,
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's Address",
                      },
                    ],
                  })(<Input placeholder="Guest's Address 1" />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem label="Address 2" hasFeedback>
                  {getFieldDecorator(`guests[${index}].address2`, {
                    initialValue: guest.address2,
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Input type="text" placeholder="Guest's Address 2" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col xs={24} sm={12}>
                <FormItem label="City" hasFeedback>
                  {getFieldDecorator(`guests[${index}].city`, {
                    initialValue: guest.city,
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's City",
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Guest's City" />)}
                </FormItem>
              </Col>
              <Col xs={24} sm={6}>
                <FormItem label="State / Province" hasFeedback>
                  {getFieldDecorator(`guests[${index}].state`, {
                    initialValue: guest.state,
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's State/Province",
                        whitespace: true,
                      },
                    ],
                  })(<Input placeholder="Guest's State/Province" />)}
                </FormItem>
              </Col>
              <Col xs={24} sm={6}>
                <FormItem label="Postal Code" hasFeedback>
                  {getFieldDecorator(`guests[${index}].postalCode`, {
                    initialValue: guest.postalCode,
                    rules: [
                      {
                        required: true,
                        message: "Enter Guest's Postal Code",
                        whitespace: true,
                      },
                    ],
                  })(<Input type="number" placeholder="Guest's Postal Code" />)}
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    });
  };

  render() {
    const {
      checkout: {
        reservation: { date, willingToRoom, guests },
        next,
        previous,
      },
    } = this.props;
    const { warnSingle, warnAcknowledged } = this.state;
    return (
      <Mutation mutation={UPDATE_RESERVATION_GUESTS}>
        {(updateReservationGuests, { data, loading, error }) => {
          if (error) {
            return <div>{error}</div>;
          }
          return (
            <Row>
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Enter Guests Traveling on this Trip</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    <Form layout="vertical" onSubmit={e => this.handleSubmit(e, updateReservationGuests)}>
                      <div className="step-content">{this.renderGuests()}</div>
                      {guests.length === 1 && (
                        <React.Fragment>
                          <div className="OrderWizard__Guests__RoomShare">
                            <div className="OrderWizard__Guests__RoomShare__Question">
                              <img src="/resources/images/svgs/TripValetWarningIcon.svg" alt="Warning, You want to room with another to save money?" style={{ width: '55px' }} />
                              <div className="OrderWizard__Guests__RoomShare__Question__Text">
                                With a single Guest travelling,<br />are you willing or interested<br />in sharing a room in order<br />to get the per person rate?
                              </div>
                            </div>
                            <RadioGroup defaultValue={willingToRoom ? 'Yes' : 'No'} onChange={this.handleWillingToRoom}>
                              <RadioButton className="TripCheckout__RadioGroupButtonText" value="Yes">
                                <i className="fa fa-thumbs-up" /> Yes
                              </RadioButton>
                              <RadioButton className="TripCheckout__RadioGroupButtonText" value="No">
                                <i className="fa fa-thumbs-down" /> No
                              </RadioButton>
                            </RadioGroup>
                          </div>
                          <div />
                        </React.Fragment>
                      )}
                      <StepNavigation disabled={false} nextAsSubmit={true} />
                    </Form>
                  </div>
                </section>
              </Col>
            </Row>
          );
        }}
      </Mutation>
    );
  }
}

import React, { PureComponent } from 'react';

export default class AddEditForm extends PureComponent {
  render() {
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <div className="step-content">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} sm={24} md={12} className="traveler-intake">
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <FormItem label="First Name" hasFeedback>
                    {getFieldDecorator(`firstName`, {
                      rules: [
                        {
                          required: true,
                          message: "Enter Guest's First Name",
                        },
                      ],
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="Last Name" hasFeedback>
                    {getFieldDecorator(`lastName`, {
                      rules: [
                        {
                          required: true,
                          message: "Enter Guest's Last Name",
                        },
                      ],
                    })(<Input type="text" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <FormItem label="Passport #" hasFeedback>
                    {getFieldDecorator(`passportNumber`, {
                      initialValue: currentTraveler.passportNumber,
                      rules: [
                        {
                          required: false,
                          message: "Enter Guest's Passport #",
                        },
                      ],
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="Passport Expiration" hasFeedback>
                    {getFieldDecorator(`passportExpiration`, {
                      rules: [
                        {
                          required: false,
                          message: "Enter Guest's Passport Expiration",
                        },
                      ],
                    })(<DatePicker format="MM-DD-YYYY" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col xs={24} sm={12}>
                  <FormItem label="Gender" hasFeedback>
                    {getFieldDecorator(`gender`, {
                      rules: [
                        {
                          required: true,
                          message: "Enter Guest's Gender",
                        },
                      ],
                    })(
                      <Select>
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem {...formItemLayout} label="Date of Birth" hasFeedback>
                    {getFieldDecorator(`dob`, {
                      rules: [
                        {
                          required: true,
                          message: "Enter Guest's Date of Birth",
                        },
                      ],
                    })(<DatePicker format="MM-DD-YYYY" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="Dietary Restrictions" hasFeedback>
                    {getFieldDecorator(`dietaryRestrictions`, {
                      initialValue: currentTraveler.dietaryRestrictions,
                      rules: [],
                    })(<TextArea rows="4" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col xs={24} sm={16}>
                  <Button className="add-traveler" type="primary" htmlType="submit" disabled={travelers.length >= 4}>
                    {editIndex >= 0 ? 'Update Traveler' : 'Add Traveler'}
                  </Button>
                </Col>
                <Col xs={24} sm={8}>
                  <Button className="reset-button" onClick={() => this.clearForm()}>
                    Clear Form
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

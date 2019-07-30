import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, notification } from 'antd';
import { Mutation } from 'react-apollo';
import { PROSPECT_ACCEPT_CERT } from '../Prospect.mutations';
import { omit, startsWith } from 'lodash';
import GraphQLError from '../../../../../components/TripValetComponents/Common/GraphQLError';

const FormItem = Form.Item;
const Search = Input.Search;

@Form.create()
class GiftAcceptanceForm extends React.PureComponent {
  state = {
    validationError: null,
    isSubmitting: false,
  };

  handleSubmit = (e, acceptProspectCertificate) => {
    e.preventDefault();
    this.setState({ validationError: null, isSubmitting: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { uuid } = this.props;
        // cert = omit(cert, ['__typename']);
        acceptProspectCertificate({ variables: { uuid, firstName: values.firstName, lastName: values.lastName, deliveryEndpoint: values.deliveryEndpoint } })
          .then(data => {
            this.setState({ isSubmitting: false });
            this.props.form.resetFields();
            notification.open({
              type: 'success',
              message: 'Accepting Your Gift',
              description: `A Certificate has been sent to: ${values.deliveryEndpoint}!`,
            });
            if (this.props.handleAcceptance) this.props.handleAcceptance();
          })
          .catch(err => {
            this.setState({ isSubmitting: false });
          });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      prospect,
      uuid,
    } = this.props;
    const { validationError, isSubmitting } = this.state;

    return (
      <Mutation mutation={PROSPECT_ACCEPT_CERT}>
        {(acceptProspectCertificate, { data, loading, error }) => (
          <React.Fragment>
            <h2>Please Send my Certificate now!</h2>
            <h5 className="mb-4">Fill out the form below to email your complimentary vacation certificate to you or whoever you choose.</h5>
            {validationError && <GraphQLError message={validationError} />}
            {error && <GraphQLError message={error.message} />}
            <Form onSubmit={e => this.handleSubmit(e, acceptProspectCertificate)} className="login-form">
              <Spin spinning={isSubmitting} size="large">
                <Row gutter={12}>
                  <Col xs={12}>
                    <FormItem hasFeedback>
                      <label className="form-label mb-0">First Name</label>
                      {getFieldDecorator('firstName', {
                        initialValue: prospect.firstName,
                        rules: [{ required: true, message: 'Please enter First Name' }],
                      })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
                    </FormItem>
                  </Col>
                  <Col xs={12}>
                    <FormItem hasFeedback>
                      <label className="form-label mb-0">Last Name</label>
                      {getFieldDecorator('lastName', {
                        initialValue: prospect.lastName,
                        rules: [{ required: true, message: 'Please enter Last Name' }],
                      })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24}>
                    <FormItem hasFeedback>
                      <label className="form-label mb-0">Email</label>
                      {getFieldDecorator('deliveryEndpoint', {
                        initialValue: prospect.deliveryEndpoint,
                        rules: [{ required: true, message: 'Please enter Email Address' }],
                      })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email Address" />)}
                    </FormItem>
                  </Col>
                </Row>
                <div className="form-actions">
                  <Button htmlType="submit" type="primary" icon="mail" size="large" className="utils__fullWidthButton" loading={isSubmitting}>
                    Send My Complimentary Vacation!
                  </Button>
                </div>
              </Spin>
            </Form>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default GiftAcceptanceForm;

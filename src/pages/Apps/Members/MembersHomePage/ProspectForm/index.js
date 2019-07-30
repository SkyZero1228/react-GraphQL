import React from 'react';
import { Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, notification } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import HtmlEditor from 'components/TripValetComponents/Input/HtmlEditor';
import { Mutation, Query } from 'react-apollo';
import { CREATE_PROSPECT } from '../MembersHomePage.mutations';
import { GET_CERTIFICATES_FOR_PROSPECT } from '../MembersHomePage.queries';
import CertificateList from './CertificateList';
import './index.styles.scss';
import { omit, startsWith } from 'lodash';
import GraphQLError from '../../../../../components/TripValetComponents/Common/GraphQLError';

const FormItem = Form.Item;
const Search = Input.Search;

@Form.create()
class ProspectFormComponent extends React.PureComponent {
  state = {
    searchTerm: '',
    selectedCertificate: null,
    validationError: null,
    personalizedMessage: '<p></p>',
    certificateMessage: '<p></p>',
    isSubmitting: false,
  };

  handleSubmit = (e, createProspect) => {
    e.preventDefault();
    this.setState({ validationError: null, isSubmitting: true });
    if (!this.state.selectedCertificate) {
      this.setState({ validationError: 'You must select a Certificate', isSubmitting: false });
      window.scrollTo(0, 0);
      return null;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let cert = this.state.selectedCertificate;
        cert = omit(cert, ['__typename']);
        const html = this.state.personalizedMessage === '<p></p>' ? this.state.certificateMessage : this.state.personalizedMessage;
        createProspect({ variables: { firstName: values.firstName, lastName: values.lastName, deliveryEndpoint: values.deliveryEndpoint, certificateId: cert.id, personalizedMessage: html } })
          .then(data => {
            this.setState({ isSubmitting: false });
            // this.props.form.resetFields();
            notification.open({
              type: 'success',
              message: 'Send Prospect a Certificate',
              description: 'You have successfully sent certificate invitation!',
            });
          })
          .catch(err => {
            this.setState({ isSubmitting: false });
          });
      } else {
        this.setState({ isSubmitting: false });
      }
    });
  };

  handleEditorStateChanged = html => {
    this.setState({ personalizedMessage: html });
  };

  handleSelectCertificate = certificate => {
    this.setState({ selectedCertificate: certificate });
  };

  useCertificateMessage = () => {
    this.setState(
      state => ({ certificateMessage: '' }),
      () => {
        this.setState(state => ({ certificateMessage: state.selectedCertificate.defaultMessage }));
      }
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { searchTerm, validationError, isSubmitting } = this.state;

    return (
      <Mutation mutation={CREATE_PROSPECT}>
        {(createProspect, { data, loading, error }) => (
          <React.Fragment>
            <Row>
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Send a Prospect a Certificate</strong>
                      <h5 className="my-2">Fill out the form below to email a complimentary vacation certificate of your choice to your prospect.</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <Spin spinning={loading && !error} size="large">
                      {validationError && <GraphQLError message={validationError} />}
                      {error && <GraphQLError message={error.message} />}
                      <Form onSubmit={e => this.handleSubmit(e, createProspect)} className="login-form">
                        <Row gutter={12}>
                          <Col xs={24} sm={8}>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">First Name</label>
                              {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please enter First Name' }],
                              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />)}
                            </FormItem>
                          </Col>
                          <Col xs={24} sm={8}>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">Last Name</label>
                              {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please enter Last Name' }],
                              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />)}
                            </FormItem>
                          </Col>
                          <Col xs={24} sm={8}>
                            <FormItem hasFeedback>
                              <label className="form-label mb-0">Email</label>
                              {getFieldDecorator('deliveryEndpoint', {
                                rules: [{ required: true, message: 'Please enter Email Address' }],
                              })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email Address" />)}
                            </FormItem>
                          </Col>
                        </Row>
                        <div className="utils__title pt-4 pb-2">
                          <strong>Customize Your Personal Message to your Prospect</strong>
                          <Button className="ml-2 float-right" type="primary" disabled={this.state.selectedCertificate ? false : true} size="small" onClick={this.useCertificateMessage}>
                            Use Selected Certificate's Default Message
                          </Button>
                        </div>
                        <Row>
                          <Col>
                            <HtmlEditor html={this.state.certificateMessage} editorStateChanged={this.handleEditorStateChanged} />
                          </Col>
                        </Row>
                        <div className="utils__title pt-4 pb-1">
                          <strong>Select a Complimentary Certificate</strong>
                        </div>
                        <Query query={GET_CERTIFICATES_FOR_PROSPECT} variables={{ searchTerm }} name="certificates">
                          {({ loading, error, data, refetch }) => {
                            if (loading) return <Spin delay="250" />;
                            if (data) {
                              return <CertificateList handleSelectCertificate={this.handleSelectCertificate} certificates={data.getCertificatesForProspect} />;
                            }
                          }}
                        </Query>
                        <div className="form-actions">
                          <Button htmlType="submit" type="primary" icon="mail" size="large" className="utils__fullWidthButton" loading={isSubmitting}>
                            Send Invitation
                          </Button>
                        </div>
                      </Form>
                    </Spin>
                  </div>
                </section>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default ProspectFormComponent;

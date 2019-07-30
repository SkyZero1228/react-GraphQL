import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, notification, Layout as AntLayout } from 'antd';
import { Query, Mutation } from 'react-apollo';
import { find } from 'lodash';
import GiftLayout from 'components/LayoutComponents/Layout/GiftLayout';
import './index.styles.scss';
import GiftProvider, { GiftContext } from '../../../providers/GiftProvider';
import cn from 'classnames';
import { omit, startsWith } from 'lodash';
import GraphQLError from '../../../components/TripValetComponents/Common/GraphQLError';
import { CREATE_PROSPECT } from './Gift.mutations';

const FormItem = Form.Item;
const Search = Input.Search;
const AntContent = AntLayout.Content;

@Form.create()
class GiftAcceptancePage extends React.Component {
  static defaultProps = {
    pathName: 'Invitation',
  };

  state = {
    accepted: false,
    validationError: null,
    isSubmitting: false,
    paymentCompleted: false,
  };

  componentWillMount = () => {
    localStorage.removeItem('token');
  };

  handleAcceptance = () => {
    this.setState({ accepted: true });
  };

  handleSubmit = (e, acceptProspectCertificate) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.referralCode === '37-A') {
        } else {
          acceptProspectCertificate({
            variables: { referralCode: values.referralCode, certificateCode: values.certificateCode },
          })
            .then(data => {
              console.log('aaaa');

              setTimeout(() => {
                this.props.form.resetFields();
                this.props.history.push(`/gift/${data.data.addProspectGift.uuid}`);
              }, 300);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    });
  };

  render() {
    const { uuid } = this.props.match.params;
    const { accepted, validationError, isSubmitting } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Mutation mutation={CREATE_PROSPECT}>
        {(acceptProspectCertificate, { data, loading, error }) => (
          <GiftLayout>
            <GiftContext.Consumer>
              {context => {
                const { isMobile } = context;
                const classes = cn('utils__content-image-wrapper', { mobile: isMobile });
                return (
                  <AntContent className={classes}>
                    <Helmet title="Dashboard" />
                    <div className="GiftAcceptance__wrapper">
                      <div className="logo">
                        {isMobile ? (
                          <img src="/resources/images/TVI-TM-Horizontal.png" alt="TripValet Incentives" />
                        ) : (
                          <img src="/resources/images/svgs/TVI-TM-Logo-Horizontal-White.svg" alt="TripValet Incentives" />
                        )}
                        <React.Fragment>
                          <div className="GiftAcceptance__wrapper__content mt-5">
                            <div className="GiftAcceptance__wrapper__content__details">
                              <h2>Please redeem my certificate now!</h2>
                              <h5 className="mb-4">Fill out the form below to email your complimentary certificate.</h5>
                              {validationError && <GraphQLError message={validationError} />}
                              {error && <GraphQLError message={error.message} />}

                              <Form onSubmit={e => this.handleSubmit(e, acceptProspectCertificate)} className="login-form">
                                <Spin spinning={isSubmitting} size="large">
                                  <Row gutter={12} className="mt-3">
                                    <Col xs={12}>
                                      <FormItem hasFeedback>
                                        <label className="form-label mb-0">Referral Code</label>
                                        {getFieldDecorator('referralCode', {
                                          rules: [{ required: true, message: 'Please enter the Referral Code' }],
                                        })(
                                          <Input
                                            //prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Referral Code"
                                          />
                                        )}
                                      </FormItem>
                                    </Col>
                                    <Col xs={12}>
                                      <FormItem hasFeedback>
                                        <label className="form-label mb-0">Certificate Code</label>
                                        {getFieldDecorator('certificateCode', {
                                          rules: [{ required: true, message: 'Please enter the Certificate Code' }],
                                        })(
                                          <Input
                                            //prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Certificate Code"
                                          />
                                        )}
                                      </FormItem>
                                    </Col>
                                  </Row>
                                  <div className="form-actions">
                                    <Button
                                      htmlType="submit"
                                      type="primary"
                                      icon="audit"
                                      size="large"
                                      className="utils__fullWidthButton"
                                      loading={isSubmitting}
                                    >
                                      Redeem My Certificate!
                                    </Button>
                                  </div>
                                </Spin>
                              </Form>
                            </div>
                          </div>
                        </React.Fragment>
                      </div>
                    </div>
                  </AntContent>
                );
              }}
            </GiftContext.Consumer>
          </GiftLayout>
        )}
      </Mutation>
    );
  }
}

export default GiftAcceptancePage;

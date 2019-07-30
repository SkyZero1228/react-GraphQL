import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Row, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_STRIPE_INFO } from '../UserAccount.queries';
import StripeCardForm from './StripeCardForm';
import NextStripePayment from './NextStripePayment';
import CardTables from './CardTables';
const FormItem = Form.Item;
const AntContent = AntLayout.Content;

const NoStripeInformation = () => {
  return (
    <div>
      {/* <img src="/resources/images/svgs/oops-no-subscription.svg" alt="Oops! You have no subscription!" /> */}
      <h3 style={{ textAlign: 'center', fontWeight: 'bold', padding: '50px' }}>No Subscription or Credit Card Information Found.</h3>
    </div>
  );
};

class MarketingToolsPage extends React.Component {
  state = {
    isEditing: true,
    cardToEdit: null,
  };
  static defaultProps = {
    pathName: 'Payment Information',
  };

  editCard(id) {
    console.log(id);
    this.setState({ isEditing: true });
  }

  render() {
    const props = this.props;
    let plan = {};
    let card = {};
    const { cardToEdit } = this.state;
    const addNewCard = () => {
      this.setState({ isEditing: false });
      card = {};
    };

    const editingNewCard = card => {
      this.setState({ isEditing: true, cardToEdit: card });
    };

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Payment Information" />

            <Query fetchPolicy="network-only" query={GET_STRIPE_INFO}>
              {({ loading, data, error }) => {
                if (loading) return <Spin />;
                if (error) return <NoStripeInformation />;
                if (!loading && data) {
                  let card = this.state.isEditing ? cardToEdit || data.getStripeCard : {};
                  let subscription = data.getStripSubscription;
                  let cardList = data.getUserCards;
                  return (
                    <React.Fragment>
                      <Row className="utils__wide-content-card">
                        <Col>
                          <section className="card">
                            <div className="card-header">
                              <div className="utils__title">
                                <strong>Subscription Information</strong>
                              </div>
                            </div>
                            <div className="card-body">
                              <Row>
                                <Col xs={24} sm={24}>
                                  <NextStripePayment card={card} subscription={subscription} />
                                </Col>
                              </Row>
                            </div>
                          </section>
                        </Col>
                      </Row>

                      <Row className="utils__wide-content-card">
                        <Col>
                          <section className="card">
                            <div className="card-header">
                              <div className="utils__title">
                                <strong>Payment Information</strong>
                              </div>
                            </div>
                            <div className="card-body">
                              <Row>
                                <Col xs={24}>
                                  <CardTables cardList={cardList} addNewCard={addNewCard} editingNewCard={editingNewCard} />
                                </Col>
                              </Row>
                              <Row gutter={24}>
                                <Col xs={24}>
                                  <StripeCardForm card={card} isEditing={this.state.isEditing} />
                                </Col>
                              </Row>
                            </div>
                          </section>
                        </Col>
                      </Row>
                    </React.Fragment>
                  );
                }
              }}
            </Query>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default MarketingToolsPage;

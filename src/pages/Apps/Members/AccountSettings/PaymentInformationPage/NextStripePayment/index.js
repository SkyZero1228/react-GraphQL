import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification } from 'antd';
import moment from 'moment';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import './index.styles.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class NextStripePayment extends React.Component {
  static defaultProps = {
    pathName: 'Payment Information',
  };

  render() {
    const { card, subscription } = this.props;
    const amount = subscription.plan.amount / 100;
    const nextDate = moment(subscription.current_period_end);
    return (
      <React.Fragment>
        <Row type="flex" align="middle" justify="center" gutter={18}>
          <Col xs={24} md={4} xlg={3} style={{ maxWidth: '100px', textAlign: 'center', marginBottom: '20px' }}>
            <img src="/resources/images/svgs/calendar-icon.svg" alt="Calendar Date to Remember" />
          </Col>
          {subscription.status === 'canceled' && (
            <Col xs={24} md={20} xlg={21} className="NextStripePayment__plan-description">
              <div>
                Subscription Status: <strong style={{ textTransform: 'capitalize', color: 'red' }}>{subscription.status}</strong>
              </div>
              You cancelled your subscription on <strong>{moment(subscription.canceled_at).format('dddd, MMMM Do YYYY')}</strong>. Your
              access ends on{' '}
              <strong>
                {subscription.cancel_at_period_end
                  ? moment(subscription.cancel_at_period_end).format('dddd, MMMM Do YYYY')
                  : moment(subscription.canceled_at).format('dddd, MMMM Do YYYY')}
              </strong>
              .
            </Col>
          )}
          {subscription.status !== 'canceled' && (
            <Col xs={24} md={20} xlg={21} className="NextStripePayment__plan-description">
              <div>
                Subscription Status: <strong style={{ textTransform: 'capitalize', color: 'green' }}>{subscription.status}</strong>
              </div>
              The charge for{' '}
              <strong>
                ${amount}
                .00
              </strong>{' '}
              will be on <strong>{nextDate.format('dddd, MMMM Do YYYY')}</strong> to your <strong>{card.brand}</strong> ending in{' '}
              <strong>{card.last4}</strong>.
            </Col>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

export default NextStripePayment;

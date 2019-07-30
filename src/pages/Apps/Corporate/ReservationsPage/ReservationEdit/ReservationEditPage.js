import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo'
import omitDeep from 'omit-deep-lodash';
import { Table, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_RESERVATION_BY_ID } from './ReservationEditPage.queries'
import CheckoutProvider from '../../../../../providers/CheckoutProvider'
import TripProvider from '../../../../../providers/TripProvider'
import OrderWizardWrapper from './Components/OrderWizardWrapper'

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class ReservationsPage extends React.Component {
  render() {
    return (
      <TripProvider>
        <CheckoutProvider>
          <OrderWizardWrapper />
        </CheckoutProvider>
      </TripProvider>
    );
  }
}

export default ReservationsPage;

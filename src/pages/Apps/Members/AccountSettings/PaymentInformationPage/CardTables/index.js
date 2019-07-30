import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query, ApolloConsumer, Mutation } from 'react-apollo';
import { Table, Popconfirm, Row, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification } from 'antd';
import moment from 'moment';
import { GET_CARD_BY_ID } from '../../UserAccount.queries';
import { SET_STRIPE_CARD_AS_DEFAULT, DELETE_STRIPE_CARD } from '../../UserAccount.mutations';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import './index.styles.scss';
import { Button } from '../../../../../../../node_modules/antd/lib/index';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class NextStripePayment extends React.Component {
  static defaultProps = {
    pathName: 'Payment Information',
  };

  handleDelete(cardId, deleteStripeCard) {
    deleteStripeCard({ variables: { cardId } }).then(a => {
      notification.open({
        type: 'success',
        description: 'You have successfully delete this card!',
        message: 'Card Deletion',
      });
    });
  }

  handleSetCardAsDefault(cardId, setStripeCardAsDefault) {
    setStripeCardAsDefault({ variables: { cardId } }).then(a => {
      notification.open({
        type: 'success',
        description: 'You have successfully set this card as default!',
        message: 'Card Set As Default',
      });
    });
  }

  handleEdit(cardId, client) {
    client.query({ query: GET_CARD_BY_ID, variables: { cardId } }).then(card => {
      this.props.editingNewCard(card.data.getCardById);
    });
  }

  render() {
    const columns = [
      { title: 'Card', dataIndex: 'last4', render: text => `XXXX-XXXX-XXXX-${text}` },
      {
        title: 'Operations',
        dataIndex: 'operation',
        render: (text, record) =>
          cardList ? (
            cardList.length >= 1 ? (
              <Mutation mutation={SET_STRIPE_CARD_AS_DEFAULT} refetchQueries={['getStripeInfo']}>
                {setStripeCardAsDefault => {
                  return (
                    <Mutation mutation={DELETE_STRIPE_CARD} refetchQueries={['getStripeInfo']}>
                      {deleteStripeCard => (
                        <ApolloConsumer>
                          {client => (
                            <div>
                              <Popconfirm
                                title="Sure to this card as default?"
                                onConfirm={() => this.handleDelete(record.id, setStripeCardAsDefault)}
                              >
                                <Button type="primary" size="small">
                                  {' '}
                                  Set This Card as Default
                                </Button>
                              </Popconfirm>
                              <Button
                                type="primary"
                                size="small"
                                style={{ margin: '0 20px' }}
                                onClick={() => this.handleEdit(record.id, client)}
                              >
                                Edit
                              </Button>
                              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id, deleteStripeCard)}>
                                <Button type="danger" size="small">
                                  {' '}
                                  Delete
                                </Button>
                              </Popconfirm>
                            </div>
                          )}
                        </ApolloConsumer>
                      )}
                    </Mutation>
                  );
                }}
              </Mutation>
            ) : null
          ) : null,
      },
    ];
    const { cardList } = this.props;
    return (
      <div style={{ marginBottom: '30px' }}>
        <Button type="primary" style={{ marginBottom: '10px' }} onClick={() => this.props.addNewCard()}>
          {' '}
          Add New Card{' '}
        </Button>
        <Table columns={columns} dataSource={cardList} pagination={false} rowKey={'id'} />
      </div>
    );
  }
}

export default NextStripePayment;

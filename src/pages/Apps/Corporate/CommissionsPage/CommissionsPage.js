import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import moment from 'moment';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Query, ApolloConsumer, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import {
  DatePicker,
  Modal,
  Spin,
  Dropdown,
  Menu,
  Input,
  Button,
  Tag,
  Table,
  Pagination,
  Row,
  Col,
  Alert,
  Icon,
  Form,
  Layout as AntLayout,
  notification,
} from 'antd';
import { parse } from 'json2csv';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_ALL_COMMISSIONS, DOWNLOAD_COMMISSIONS } from './CommissionsPage.queries';
import { REMOVE_COMMISSION, MARK_COMMISSION_AS_PAID } from './CommissionsPage.mutation';
import './CommissionsPage.global.scss';
const Search = Input.Search;
const FormItem = Form.Item;
const AntContent = AntLayout.Content;

@withRouter
class CommissionsPage extends React.Component {
  state = {
    searchText: '',
    visible: false,
    confirmLoading: false,
    orderId: null,
    removeCommission: null,
    client: null,
    dateFilter: { value: moment().format('MM/DD/YYYY'), filter: 'Select Date Filter' },
    selectedRowKeys: [],
  };
  static defaultProps = {
    pathName: 'Commissions',
  };

  downloadCSV = data => {
    console.log(data);
    const fields = [
      {
        label: 'Name',
        value: (row, field) => `${row.firstName} ${row.lastName}`,
        default: 'No Name',
      },
      {
        label: 'Email',
        value: 'email',
        default: 'No Email',
      },
      {
        label: 'Pay Commission On',
        value: (row, field) => DateTime.fromISO(row.payCommissionOn, { setZone: 'local' }).toLocaleString(),
        default: 'Empty Date',
      },
      {
        label: 'Commission Amount',
        value: (row, field) => Number(row.commissionAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        default: 0,
      },
      {
        label: 'Total Commissions',
        value: 'count',
        default: 0,
      },
    ];
    const opts = { fields };
    const csv = parse(data.downloadCommissions, opts);
    let csvString = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
    let downloadLink = document.createElement('a');
    downloadLink.href = csvString;
    downloadLink.download = `commissions.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  showRemoveCommissionModal = (orderId, removeCommission) => {
    this.setState({
      visible: true,
      orderId,
      removeCommission,
    });
  };

  showMarkCommissionAsPaidModal = (commission, markCommissionAsPaid) => {
    Modal.confirm({
      title: `Commission of ${commission.affiliate.firstName} ${commission.affiliate.lastName}`,
      content: (
        <p>
          Would You Like To Mark Commission of{' '}
          <b>
            {commission.affiliate.firstName} {commission.affiliate.lastName}{' '}
          </b>{' '}
          as Paid?
        </p>
      ),
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk() {
        markCommissionAsPaid({ variables: { id: [commission.id] } }).then(result => {});
      },
    });
  };

  showMarkMultipleCommissionsAsPaidModal = markCommissionAsPaid => {
    const { selectedRowKeys } = this.state;
    Modal.confirm({
      title: `Mark Commissions as Paid`,
      content: (
        <p>
          Would You Like To Mark <b>{selectedRowKeys.length} Commissions</b> as Paid?
        </p>
      ),
      okText: 'Yes',
      cancelText: 'Cancel',
      onOk: () => {
        markCommissionAsPaid({ variables: { id: selectedRowKeys } }).then(result => {
          this.setState({
            selectedRowKeys: [],
          });
        });
      },
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    const { orderId, removeCommission } = this.state;
    this.setState({
      confirmLoading: true,
    });
    removeCommission({ variables: { orderId } }).then(a => {
      this.setState({
        confirmLoading: false,
        visible: false,
      });
    });
  };

  renderMenu = (order, commission) => {
    return (
      <React.Fragment>
        <Mutation mutation={REMOVE_COMMISSION} refetchQueries={['getAllCommissions']}>
          {removeCommission => {
            return (
              <Menu>
                <Menu.Item onClick={() => this.showRemoveCommissionModal(order.id, removeCommission)}>Remove Commission</Menu.Item>
              </Menu>
            );
          }}
        </Mutation>
        {commission.status !== 'Paid' && (
          <Mutation mutation={MARK_COMMISSION_AS_PAID}>
            {markCommissionAsPaid => {
              return (
                <Menu>
                  <Menu.Item onClick={() => this.showMarkCommissionAsPaidModal(commission, markCommissionAsPaid)}>Mark as Paid</Menu.Item>
                </Menu>
              );
            }}
          </Mutation>
        )}
      </React.Fragment>
    );
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const props = this.props;
    const { searchText, visible, confirmLoading, dateFilter, selectedRowKeys } = this.state;
    const dateFormat = 'MM/DD/YYYY';
    let columns = [
      {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        render: customer => {
          if (customer) {
            return (
              <div>
                <strong>{`${customer.firstName} ${customer.lastName}`}</strong>
                <br />
                {customer.email}
              </div>
            );
          }
        },
      },
      {
        title: 'Affiliate',
        dataIndex: 'affiliate',
        key: 'affiliate',
        render: affiliate => {
          if (affiliate) {
            return (
              <div>
                <strong>{`${affiliate.firstName} ${affiliate.lastName}`}</strong>
                <br />
                {affiliate.email}
              </div>
            );
          }
        },
      },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'text-center',
        render: createdAt => {
          return DateTime.fromISO(createdAt, { setZone: 'local' }).toLocaleString();
        },
      },
      {
        title: 'Commission',
        dataIndex: 'commissionAmount',
        key: 'commissionAmount',
        className: 'text-center',
        render: commissionAmount => {
          return (
            <div className="text-center">{Number(commissionAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
      },
      {
        title: 'Pay Date',
        dataIndex: 'payCommissionOn',
        key: 'payCommissionOn',
        className: 'text-center',
        render: payCommissionOn => {
          return <div className="text-center">{DateTime.fromISO(payCommissionOn).toLocaleString()}</div>;
        },
      },
      {
        title: 'Product(s)',
        dataIndex: 'order',
        key: 'order',
        render: order => {
          if (order) {
            return order.products.map(o => {
              return (
                <Tag key={o.id} style={{ pointerEvents: 'none' }}>
                  {o.name}
                </Tag>
              );
            });
          }
        },
      },
      {
        title: 'Action',
        dataIndex: 'order',
        key: 'operation',
        render: (order, commission) => {
          return (
            <span className="table-operation">
              <Dropdown overlay={this.renderMenu(order, commission)} trigger={['click']} placement="bottomRight">
                <a href="javascript:;">
                  Actions <Icon type="down" />
                </a>
              </Dropdown>
            </span>
          );
        },
      },
    ];

    const menuFilter = (
      <Menu
        onClick={typeDateFilter =>
          this.setState({ dateFilter: { filter: typeDateFilter.item.props.children, value: this.state.dateFilter.value } })
        }
      >
        <Menu.Item key="equals">Equals</Menu.Item>
        <Menu.Item key="before">Before</Menu.Item>
        <Menu.Item key="after">After</Menu.Item>
      </Menu>
    );

    const menuActions = (
      <Mutation mutation={MARK_COMMISSION_AS_PAID} refetchQueries={['getAllCommissions']}>
        {markCommissionAsPaid => (
          <Menu>
            <Menu.Item key="markAsPaid" onClick={() => this.showMarkMultipleCommissionsAsPaidModal(markCommissionAsPaid)}>
              Mark Commissions as Paid
            </Menu.Item>
          </Menu>
        )}
      </Mutation>
    );

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.status === 'Paid',
        name: record.status,
      }),
    };
    return (
      <React.Fragment>
        <Layout>
          <AntContent className="utils__content-image-wrapper">
            <Page {...props}>
              <Helmet title="Commissions" />
              <Row className="utils__wide-content-card ">
                <section className="card">
                  <div className="card-body">
                    <Row className="mb-3">
                      <Col xs={24} sm={12} className="text-left ">
                        <ApolloConsumer>
                          {client => (
                            <Button
                              type="primary"
                              onClick={async () => {
                                const { data } = await client.query({
                                  fetchPolicy: 'network-only',
                                  query: DOWNLOAD_COMMISSIONS,
                                });
                                this.downloadCSV(data);
                              }}
                            >
                              Download Pending Commissions
                            </Button>
                          )}
                        </ApolloConsumer>
                      </Col>

                      <Col xs={24} sm={12} className="text-right ">
                        {selectedRowKeys.length > 0 && (
                          <Dropdown overlay={menuActions}>
                            <Button type="primary">
                              Actions <Icon type="down" />
                            </Button>
                          </Dropdown>
                        )}
                      </Col>
                    </Row>
                    <Row gutter={10} className="mb-3">
                      <Col xs={12} sm={8}>
                        <Search placeholder="input search text" onChange={e => this.setState({ searchText: e.target.value })} />
                      </Col>
                      <Col xs={12} sm={5}>
                        <Dropdown overlay={menuFilter}>
                          <Button className="drop-down ">
                            {this.state.dateFilter.filter} <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </Col>
                      <Col xs={12} sm={4}>
                        <DatePicker
                          defaultValue={moment(moment().format('MM/DD/YYYY'), dateFormat)}
                          format={dateFormat}
                          onChange={e =>
                            this.setState({ dateFilter: { value: e.format(dateFormat), filter: this.state.dateFilter.filter } })
                          }
                        />
                      </Col>
                    </Row>

                    <Query
                      query={GET_ALL_COMMISSIONS}
                      variables={{ skip: 0, pageSize: 10, searchText, dateFilter }}
                      fetchPolicy="network-only"
                    >
                      {({ data, loading, error, fetchMore }) => {
                        if (error) return null;
                        return (
                          <React.Fragment>
                            <Modal
                              title="Delete Commission"
                              centered
                              visible={visible}
                              onOk={this.handleOk}
                              confirmLoading={confirmLoading}
                              onCancel={this.handleCancel}
                            >
                              <p style={{ textAlign: 'center', fontSize: '14px', paddingTop: '20px', paddingBottom: '9px' }}>
                                Are You Sure you want to <b style={{ color: 'red' }}>Delete</b>
                                <br />
                                this Commission, Order and all related Commissions?
                              </p>
                            </Modal>
                            <Table
                              rowSelection={rowSelection}
                              loading={loading}
                              bordered
                              columns={columns}
                              dataSource={data.getAllCommissions ? data.getAllCommissions.commissions : []}
                              pagination={{ pageSize: 10, position: 'none' }}
                              rowKey="id"
                            />
                            {!loading && (
                              <Pagination
                                defaultCurrent={1}
                                pageSize={10}
                                total={data.getAllCommissions ? data.getAllCommissions.totalRows : 0}
                                className="ant-pagination ant-table-pagination"
                                onChange={pagination => {
                                  fetchMore({
                                    variables: {
                                      skip: 10 * (pagination - 1),
                                      pageSize: 10,
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => {
                                      if (!fetchMoreResult) return prev;
                                      return Object.assign({}, prev, {
                                        getAllCommissions: { ...fetchMoreResult.getAllCommissions },
                                      });
                                    },
                                  });
                                }}
                              />
                            )}
                          </React.Fragment>
                        );
                      }}
                    </Query>
                  </div>
                </section>
              </Row>
            </Page>
          </AntContent>
        </Layout>
      </React.Fragment>
    );
  }
}

export default CommissionsPage;

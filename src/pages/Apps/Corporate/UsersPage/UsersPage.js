import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query, ApolloConsumer, Mutation } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import {
  Modal,
  Spin,
  Menu,
  Dropdown,
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
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_USERS } from './UsersPages.queries';
import { ACTIVATE_USER, IMPERSONATE_USER } from './UserPage.mutation';
import { withCurrentUserContext } from 'providers/CurrentUserProvider';
import { GET_ME } from '../../../../pages/Apps/Members/AccountSettings/UserAccount.queries';
const AntContent = AntLayout.Content;
const Search = Input.Search;

@withRouter
@withCurrentUserContext
class UsersPage extends React.Component {
  state = {
    searchText: '',
  };
  static defaultProps = {
    pathName: 'Users',
  };

  render() {
    const props = this.props;
    const { searchText } = this.state;

    const handleOk = (id, activateUser) => {
      this.setState({
        confirmLoading: true,
      });
      activateUser({ variables: { id } }).then(a => {
        this.setState({
          confirmLoading: false,
          visible: false,
        });
        notification.open({
          type: 'success',
          description: 'You have successfully updated the user!',
          message: 'User Update',
        });
      });
    };

    const modal = (user, activateUser) => {
      const { visible, confirmLoading } = this.state;
      Modal.confirm({
        title: `${user.active ? 'Deactivate' : 'Activate'} User
        `,
        content: (
          <p style={{ textAlign: 'center', fontSize: '14px', paddingTop: '20px', paddingBottom: '9px' }}>
            Are You Sure you want to <b>{user.active ? 'Deactivate' : 'Activate'}</b> the User {user.firstName} {user.lastName}?
          </p>
        ),
        okText: 'Yes',
        cancelText: 'Cancel',
        onOk: () => handleOk(user.id, activateUser),
      });
    };

    const impersonate = (impersonateUser, id) => {
      impersonateUser({ variables: { id } }).then(result => {
        const { user, token, adminToken } = result.data.impersonate;
        localStorage.setItem('adminToken', adminToken);
        localStorage.setItem('token', token);
        this.props.history.push('/members');
      });
    };

    const menu = (id, user) => {
      return (
        <Mutation mutation={ACTIVATE_USER} refetchQueries={['users']}>
          {activateUser => {
            return (
              <Mutation mutation={IMPERSONATE_USER}>
                {impersonateUser => (
                  <ApolloConsumer>
                    {client => (
                      <Menu>
                        <Menu.Item>
                          <Link className="text-strong" to={`/corporate/${id}`}>
                            Edit User
                          </Link>
                        </Menu.Item>
                        <Menu.Item onClick={() => modal(user, activateUser)}>
                          {' '}
                          {user.active ? 'Deactivate User' : 'Activate User'}
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            client.cache.reset();
                            // .then(() => {
                            impersonateUser({ variables: { id: user.id } }).then(result => {
                              const { user, token, adminToken } = result.data.impersonate;
                              localStorage.setItem('adminToken', adminToken);
                              localStorage.setItem('token', token);
                              // client.resetStore().then(() => {
                              // this.props.userContext.setCurrentUser(user);
                              this.props.history.push('/members');
                              // client.query({ query: GET_ME, fetchPolicy: 'network-only' }).then(me => {
                              //   this.props.userContext.setCurrentUser(me.data.me);
                              //   this.props.history.push('/members');
                            });
                            // });
                          }}
                        >
                          Impersonate User
                        </Menu.Item>
                      </Menu>
                    )}
                  </ApolloConsumer>
                )}
              </Mutation>
            );
          }}
        </Mutation>
      );
    };

    let columns = [
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'operation',
        render: (id, user) => (
          <Dropdown overlay={menu(id, user)} placement="topLeft">
            <Button size="small" type="primary">
              Actions
            </Button>
          </Dropdown>
        ),
      },

      {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'userFirstName',
        render: (firstName, user) => {
          return `${firstName} ${user.lastName}`;
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },

      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },

      {
        title: 'Roles',
        dataIndex: 'roles',
        key: 'userRoles',
        render: roles => {
          return roles.map(r => {
            return (
              <Tag key={r} style={{ pointerEvents: 'none' }}>
                {r}
              </Tag>
            );
          });
        },
      },
      {
        title: 'Sponsor',
        dataIndex: 'sponsor',
        key: 'sponsor',
        render: sponsor => {
          if (sponsor) {
            return (
              <div key={sponsor.email} style={{ pointerEvents: 'none' }}>
                {sponsor.firstName} {sponsor.lastName}
                <br />
                {sponsor.email}
              </div>
            );
          } else {
            return <div>No Sponsor</div>;
          }
        },
      },
      {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render: active => {
          return active ? 'Yes' : 'No';
        },
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Query query={GET_USERS} variables={{ skip: 0, pageSize: 10, searchText }}>
              {({ data, loading, error, fetchMore, refetch }) => {
                if (error) return null;
                // if (loading) return <Spin delay="250" />;
                return (
                  <React.Fragment>
                    <Helmet title="Users" />
                    <Row className="utils__full-width-content-card">
                      <section className="card">
                        <div className="card-body">
                          <Row gutter={10}>
                            <Col xs={12} sm={6}>
                              <Search placeholder="input search text" onChange={e => this.setState({ searchText: e.target.value })} />
                            </Col>
                            <Col className="text-right">
                              <Link className="btn btn-primary mb-3 text-strong" to={`/corporate/users/new-user`}>
                                Add New User
                              </Link>
                            </Col>
                          </Row>
                          <React.Fragment>
                            <Table
                              loading={loading}
                              bordered
                              columns={columns}
                              dataSource={data.users ? data.users.user : []}
                              pagination={{ pageSize: 10, position: 'none' }}
                              rowKey="id"
                            />
                            {!loading && (
                              <Pagination
                                defaultCurrent={1}
                                pageSize={10}
                                total={data.users ? data.users.totalRows : 0}
                                className="ant-pagination ant-table-pagination"
                                onChange={pagination => {
                                  fetchMore({
                                    variables: {
                                      skip: 10 * (pagination - 1),
                                      pageSize: 10,
                                      searchText,
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => {
                                      if (!fetchMoreResult) return prev;
                                      return Object.assign({}, prev, {
                                        users: { ...fetchMoreResult.users },
                                      });
                                    },
                                  });
                                }}
                              />
                            )}
                          </React.Fragment>
                        </div>
                      </section>
                    </Row>
                  </React.Fragment>
                );
              }}
            </Query>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default UsersPage;

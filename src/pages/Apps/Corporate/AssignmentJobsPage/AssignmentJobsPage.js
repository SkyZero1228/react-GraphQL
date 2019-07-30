import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Badge, Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_ALL_ASSIGNMENTS_JOBS } from './AssignmentJobsPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class AssignmentJobsPage extends React.Component {
  static defaultProps = {
    pathName: 'Orders',
  };

  render() {
    const props = this.props;

    let columns = [
      {
        title: 'Requestor',
        dataIndex: 'requestor',
        key: 'requestor',
        className: 'text-center',
        render: requestor => {
          return (
            <div key={requestor.email} style={{ pointerEvents: 'none' }}>
              <b>
                {requestor.firstName} {requestor.lastName}
              </b>
              <br />
              {requestor.email}
            </div>
          );
        },
      },
      {
        title: 'Affiliate',
        dataIndex: 'affiliate',
        key: 'affiliate',
        className: 'text-center',
        render: affiliate => {
          return (
            <div key={affiliate.email} style={{ pointerEvents: 'none' }}>
              <b>
                {affiliate.firstName} {affiliate.lastName}
              </b>
              <br />
              {affiliate.email}
            </div>
          );
        },
      },

      {
        title: 'New Sponsor',
        dataIndex: 'newSponsor',
        key: 'newSponsor',
        className: 'text-center',
        render: newSponsor => {
          if (newSponsor == null)
            return (
              <div key="noSponsor" style={{ pointerEvents: 'none' }}>
                <b>No Sponsor</b>
              </div>
            );
          return (
            <div key={newSponsor.email} style={{ pointerEvents: 'none' }}>
              <b>
                {newSponsor.firstName} {newSponsor.lastName}
              </b>
              <br />
              {newSponsor.email}
            </div>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Assignment Jobs" />
            <Row className="utils__wide-content-card">
              <section className="card">
                <div className="card-body">
                  <Row gutter={10}>
                    <Col className="text-right">
                      <Link className="btn btn-primary mb-3 text-strong" to={`/corporate/assignment-jobs/add`}>
                        Add Assignment Job
                      </Link>
                    </Col>
                  </Row>
                  <Query query={GET_ALL_ASSIGNMENTS_JOBS} fetchPolicy="network-only">
                    {({ data, loading, error, fetchMore }) => {
                      console.log('=====<', data);
                      if (error) return null;
                      return (
                        <React.Fragment>
                          <Table
                            loading={loading}
                            bordered
                            columns={columns}
                            dataSource={data.getAllSponsorAssignments || []}
                            rowKey="id"
                          />
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
    );
  }
}

export default AssignmentJobsPage;

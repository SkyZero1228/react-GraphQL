import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  Button,
  Spin,
  Modal,
  Menu,
  Dropdown,
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
import { GET_ALL_VIDEOS } from './VideosPage.queries';
import { REMOVE_VIDEO } from './VideosPage.mutations';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;

class VideosPage extends React.Component {
  static defaultProps = {
    pathName: 'Videos',
  };

  state = {
    visible: false,
    confirmLoading: false,
  };

  render() {
    const handleOk = (videoId, removeVideo) => {
      this.setState({
        confirmLoading: true,
      });
      removeVideo({ variables: { videoId } }).then(a => {
        this.setState({
          confirmLoading: false,
          visible: false,
        });
      });
    };

    const modal = (videoId, title, removeVideo) => {
      const { visible, confirmLoading } = this.state;
      Modal.confirm({
        title: 'Delete Video',
        content: (
          <p style={{ textAlign: 'center', fontSize: '14px', paddingTop: '20px', paddingBottom: '9px' }}>
            Are You Sure you want to <b style={{ color: 'red' }}>Delete</b> the Video
            <br /> <b> {title} </b> ?
          </p>
        ),
        okText: 'Yes',
        cancelText: 'Cancel',
        onOk: () => handleOk(videoId, removeVideo),
      });
    };
    const menu = (id, title) => {
      return (
        <Mutation mutation={REMOVE_VIDEO} refetchQueries={['getAllVideos']}>
          {removeVideo => {
            return (
              <Menu>
                <Menu.Item>
                  <Link className="text-strong" to={`/corporate/${id}`}>
                    Edit Video
                  </Link>
                </Menu.Item>
                <Menu.Item onClick={() => modal(id, title, removeVideo)}>Remove Video</Menu.Item>
              </Menu>
            );
          }}
        </Mutation>
      );
    };

    const props = this.props;

    let columns = [
      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'operation',
        render: (id, video) => (
          <Dropdown overlay={menu(id, video.title)} placement="topLeft">
            <Button size="small" type="primary">
              Actions
            </Button>
          </Dropdown>
        ),
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Video ID',
        dataIndex: 'videoId',
        key: 'videoId',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Tag',
        dataIndex: 'tag',
        key: 'tag',
        render: tag => {
          if (tag) {
            return (
              <Tag key={tag} style={{ pointerEvents: 'none' }}>
                {tag}
              </Tag>
            );
          }
        },
      },
    ];

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Videos" />
            <Row className="utils__full-width-content-card">
              <section className="card">
                <div className="card-body">
                  <Col className="text-right">
                    <Link className="btn btn-primary mb-3 text-strong" to={`/corporate/videos/new-video`}>
                      Add Video
                    </Link>
                  </Col>
                  <Query query={GET_ALL_VIDEOS} variables={{ skip: 0, pageSize: 10 }}>
                    {({ data, loading, error, fetchMore }) => {
                      if (error) return null;
                      return (
                        <React.Fragment>
                          <Table
                            loading={loading}
                            bordered
                            columns={columns}
                            dataSource={data.getAllVideos ? data.getAllVideos.videos : []}
                            pagination={{ pageSize: 10, position: 'none' }}
                            rowKey="id"
                          />
                          {!loading && (
                            <Pagination
                              defaultCurrent={1}
                              pageSize={10}
                              total={data.getAllVideos ? data.getAllVideos.totalRows : 0}
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
                                      getAllVideos: { ...fetchMoreResult.getAllVideos },
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
    );
  }
}

export default VideosPage;

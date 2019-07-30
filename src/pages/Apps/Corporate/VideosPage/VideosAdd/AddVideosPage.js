import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Select, Row, Col, Form, Icon, Input, Button, Alert, AutoComplete, Spin, Layout as AntLayout, notification } from 'antd';
import { Mutation, Query } from 'react-apollo';
import Gravatar from 'react-gravatar';
import { CREATE_VIDEO } from './AddVideosPage.mutations';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import GraphQLError from 'components/TripValetComponents/Common/GraphQLError';
import { CurrentUserContext } from 'providers/CurrentUserProvider';
import { Link, withRouter } from 'react-router-dom';
import { GET_VIDEO_CATEGORY, GET_VIDEO_TAGS_BY_CATEGORY } from '../VideosPage.queries';
import './AddVideosPage.global.scss';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
@Form.create()
@withRouter
class AddVideosPage extends React.PureComponent {
  static defaultProps = {
    pathName: 'Add New Video',
  };

  state = {
    category: '',
    dataSource: null,
    searchString: '',
    searchTagString: '',
  };

  handleSubmit = (e, addVideo) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addVideo({ variables: { video: { title: values.title, description: values.description, videoId: values.videoId, tag: values.tag, category: values.category } } }).then(data => {
          notification.open({
            type: 'success',
            description: 'You have successfully created a video!',
            message: 'Account Update',
          });
          this.props.history.push('/corporate/videos');
        });
      }
    });
  };
  onSelect = category => {
    this.setState({ category });

    this.props.form.setFieldsValue({
      category,
    });
  };

  onTagSelect = tag => {
    this.setState({ tag });

    this.props.form.setFieldsValue({
      tag,
    });
  };

  handleChange = value => {
    this.setState({
      searchString: value,
    });
  };
  handleTagChange = value => {
    this.setState({
      searchTagString: value,
    });
  };

  render() {
    let categorySelect = [];
    let tagSelect = [];
    const props = this.props;
    const { dataSource, category, tag } = this.state;
    const { getFieldDecorator } = props.form;

    const searchResult = searchString => {
      return categorySelect.filter(category => category.toLowerCase().indexOf(searchString) > -1);
    };

    const searchTagResult = searchTagString => {
      return tagSelect.filter(tag => tag.toLowerCase().indexOf(searchTagString) > -1);
    };

    const handleSearch = value => {
      this.setState({
        dataSource: value ? searchResult(value) : categorySelect,
      });
    };

    const handleTagSearch = value => {
      this.setState({
        dataSource: value ? searchTagResult(value) : tagSelect,
      });
    };

    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Dashboard" />
            <Row className="utils__full-width-content-card">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Add Video</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    <Mutation mutation={CREATE_VIDEO}>
                      {(editMe, { loading: mutationLoading, error: mutationError, data: mutationData }) => {
                        return (
                          <React.Fragment>
                            <Form onSubmit={e => this.handleSubmit(e, editMe)} className="login-form">
                              {mutationError && <GraphQLError message={mutationError.message} />}

                              <Row gutter={12}>
                                <Col xs={24} sm={8}>
                                  <FormItem hasFeedback>
                                    <label className="form-label mb-0">Title</label>
                                    {getFieldDecorator('title', {
                                      rules: [{ required: true, message: 'Please enter Title' }],
                                    })(<Input placeholder="Title" />)}
                                  </FormItem>
                                </Col>
                                <Col xs={24} sm={8}>
                                  <FormItem hasFeedback>
                                    <label className="form-label mb-0">Description</label>
                                    {getFieldDecorator('description', {
                                      rules: [{ required: true, message: 'Please enter Description' }],
                                    })(<Input placeholder="Description" />)}
                                  </FormItem>
                                </Col>
                                <Col xs={24} sm={8}>
                                  <FormItem hasFeedback>
                                    <label className="form-label mb-0">Video ID</label>
                                    {getFieldDecorator('videoId', {
                                      rules: [{ required: true, message: 'Please enter Video ID' }],
                                    })(<Input placeholder="Video ID" />)}
                                  </FormItem>
                                </Col>
                              </Row>
                              <Query fetchPolicy="cache-and-network" query={GET_VIDEO_CATEGORY}>
                                {({ data, loading, error }) => {
                                  if (loading) return <Spin size="large" />;
                                  if (data && !loading) {
                                    const { getAllVideoCategories } = data;

                                    getAllVideoCategories.forEach((cat, i) => {
                                      if (cat) {
                                        categorySelect.push(cat);
                                      }
                                    });
                                    const categories = [];
                                    getAllVideoCategories.map(category => {
                                      if (category) return categories.push(<AutoCompleteOption key={category}>{category}</AutoCompleteOption>);
                                      return null;
                                    });
                                    return (
                                      <Row gutter={12}>
                                        <Col xs={24} sm={24}>
                                          <FormItem hasFeedback>
                                            <label className="form-label mb-0">Category</label>
                                            {getFieldDecorator('category', {
                                              rules: [{ required: true, message: 'Please enter at least one Tag' }],
                                            })(
                                              <div className="global-search-wrapper">
                                                <AutoComplete className="global-search" style={{ width: '100%' }} dataSource={dataSource || categories} onSearch={handleSearch} onSelect={this.onSelect} onBlur={this.onSelect} placeholder="Select or Create a Tag" onChange={this.handleChange}>
                                                  <Input
                                                    suffix={
                                                      <Button className="search-btn" type="primary" onClick={e => this.onSelect(this.state.searchString)}>
                                                        <Icon type="plus" />
                                                      </Button>
                                                    }
                                                  />
                                                </AutoComplete>
                                              </div>
                                            )}
                                          </FormItem>
                                        </Col>
                                      </Row>
                                    );
                                  }
                                }}
                              </Query>
                              <Query fetchPolicy="network-only" query={GET_VIDEO_TAGS_BY_CATEGORY} variables={{ category }}>
                                {({ data, loading, error }) => {
                                  if (loading) return <Spin size="large" />;
                                  if (data && !loading) {
                                    const { getAllVideoTagsByCategory } = data;

                                    const tags = [];
                                    getAllVideoTagsByCategory.map(tag => {
                                      return tags.push(<Option key={tag}>{tag}</Option>);
                                    });
                                    return (
                                      <Row gutter={12}>
                                        <Col xs={24} sm={24}>
                                          <FormItem hasFeedback>
                                            <label className="form-label mb-0">Tag</label>
                                            {getFieldDecorator('tag', {
                                              rules: [{ required: true, message: 'Please enter at least one Tag' }],
                                            })(
                                              <div className="global-search-wrapper">
                                                <AutoComplete className="global-search" style={{ width: '100%' }} dataSource={dataSource || tags} onSearch={handleTagSearch} onSelect={this.onTagSelect} onBlur={this.onTagSelect} placeholder="Select or Create a Tag" onChange={this.handleTagChange}>
                                                  <Input
                                                    suffix={
                                                      <Button className="search-btn" type="primary" onClick={e => this.onSelect(this.state.searchTagString)}>
                                                        <Icon type="plus" />
                                                      </Button>
                                                    }
                                                  />
                                                </AutoComplete>
                                              </div>
                                            )}
                                          </FormItem>
                                        </Col>
                                      </Row>
                                    );
                                  }
                                }}
                              </Query>
                              <div className="form-actions">
                                <Button htmlType="submit" type="primary" icon="mail" size="large" className="utils__fullWidthButton">
                                  Add Video
                                </Button>
                              </div>
                            </Form>
                          </React.Fragment>
                        );
                      }}
                    </Mutation>
                  </div>
                </section>
              </Col>
            </Row>
            );
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default AddVideosPage;

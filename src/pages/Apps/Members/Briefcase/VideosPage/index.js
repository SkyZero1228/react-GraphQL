import React from 'react';
import { Query } from 'react-apollo';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import forEach from 'lodash/forEach';
import { Row, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification, Card, Select } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import VideoCard from './VideoCard';
import { LayoutContext } from '../../../../../providers/LayoutProvider';
import Categories from './Categories';
import Tags from './Tags';
import { GET_VIDEO_CONTENT } from './VideosPage.queries';
import './index.styles.scss';

const { Meta } = Card;

const FormItem = Form.Item;
const AntContent = AntLayout.Content;
const Option = Select.Option;

class VideosPage extends React.Component {
  static defaultProps = {
    pathName: 'Videos',
  };

  state = {
    category: 'Training',
    tag: '',
  };

  renderVideos = videos => {
    return videos.map(video => {
      return <VideoCard key={video.id} video={video} />;
    });
  };

  handleTagClick = (e, tag) => {
    this.setState({ tag });
  };

  renderVideoTagSelect = videoTags => {
    const options = videoTags.map(tag => {
      let opts = [];
      opts.push(
        <Option key={tag} value={tag}>
          {tag}
        </Option>
      );

      return opts;
    });
    return (
      <Select defaultValue={this.state.category} className="mx-3 mb-2" style={{ flex: 1 }} onChange={this.handleCategorySelectChange}>
        <Option key="All" value="All">
          All
        </Option>
        {options}
      </Select>
    );
  };

  handleCategorySelectChange = category => {
    this.setState({ category, tag: '' });
  };

  render() {
    const props = this.props;
    const { category, tag } = this.state;
    const { isMobile } = props;

    return (
      <Layout className="VideosPage">
        <AntContent className="VideosPage__full-width-background">
          <Page {...props}>
            <Helmet title="Videos" />
            <Row className="utils__full-width-content-card">
              <Col>
                <section className="card">
                  <div className="card-header">
                    <div className="utils__title">
                      <strong>Videos</strong>
                    </div>
                  </div>

                  <div className="card-body VideosPage__video-body">
                    {category && (
                      <Query fetchPolicy="cache-and-network" query={GET_VIDEO_CONTENT} variables={{ category, tag }}>
                        {({ data, loading, error }) => {
                          if (loading) return <Spin size="large" />;
                          if (data && !loading) {
                            const { getVideos, getVideoTags } = data;
                            return (
                              <React.Fragment>
                                <Row>
                                  <Col xs={24} sm={12}>
                                    <Row>
                                      <Col>
                                        <h4 className="font-weight-bold m-3">Category</h4>
                                      </Col>
                                      <Col>
                                        <Categories setCategory={this.handleCategorySelectChange} currentCategory={category} isMobile={isMobile} />
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col xs={24} sm={12}>
                                    <Row>
                                      <Col>
                                        <h4 className="font-weight-bold m-3">Tag</h4>
                                      </Col>
                                      <Col>
                                        <Tags category={category} handleTagClick={this.handleTagClick} currentTag={tag} isMobile={isMobile} />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                                <Row>
                                  <div>
                                    {getVideos.length ? (
                                      <div className="VideosPage__video-body__video-wrapper__cards_wrapper">{this.renderVideos(getVideos)}</div>
                                    ) : (
                                      <div className="text-center p-5">
                                        <h4 className="font-weight-bold m-3">Please Select a Tag.</h4>
                                      </div>
                                    )}
                                  </div>
                                </Row>
                              </React.Fragment>
                            );
                          }
                        }}
                      </Query>
                    )}
                    {!category && (
                      <React.Fragment>
                        <Row type="flex">
                          <Col>
                            <h4 className="font-weight-bold m-3">Category: {category}</h4>
                          </Col>
                          <Col>
                            <Categories setCategory={this.handleCategorySelectChange} currentCategory={category} />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {!isMobile && (
                              <div className="VideosPage__video-body__category-wrapper mx-2 my-3">
                                <h5 className="font-weight-bold">Tags</h5>
                                <div key="All" className="category" onClick={e => this.handleTagClick(e, 'All')} />
                              </div>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="VideosPage__video-body__video-wrapper__cards_wrapper" />
                            <div className="text-center p-5">
                              <h4 className="font-weight-bold m-3">Please a Category.</h4>
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                    <script src="https://fast.wistia.net/assets/external/E-v1.js" async />
                  </div>
                </section>
              </Col>
            </Row>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

const withLayoutContext = Component => {
  return props => (
    <LayoutContext.Consumer>
      {({ isMobile }) => {
        return <Component {...props} isMobile={isMobile()} />;
      }}
    </LayoutContext.Consumer>
  );
};

export default withLayoutContext(VideosPage);

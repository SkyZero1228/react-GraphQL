import React from 'react';
import { Query } from 'react-apollo';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import forEach from 'lodash/forEach';
import { Row, Radio, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification, Card, Select } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import VideoCard from './VideoCard';
import { LayoutContext } from '../../../../../providers/LayoutProvider';
import { GET_VIDEO_TAGS_BY_CATEGORY } from './VideosPage.queries';
import './index.styles.scss';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const Tags = ({ category, currentTag, handleTagClick, isMobile }) => {
  const renderTags = videoTags => {
    return videoTags.map((tag, index) => {
      return (
        <div key={`${tag}-${index}`}>
          <div className="category" onClick={e => handleTagClick(e, tag)}>
            {tag}
          </div>
        </div>
      );
    });
  };

  const handleMobile = tag => {
    handleTagClick({}, tag);
  };

  const renderVideoTagSelect = videoTags => {
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
      <Select className="mx-3 mb-2" style={{ flex: 1 }} value={currentTag} onChange={tag => handleMobile(tag)}>
        {options}
      </Select>
    );
  };
  return (
    <Query fetchPolicy="cache-and-network" query={GET_VIDEO_TAGS_BY_CATEGORY} variables={{ category }}>
      {({ data, loading, error }) => {
        if (loading) return <Spin size="large" />;
        if (data && !loading) {
          const { getAllVideoTagsByCategory } = data;
          return (
            <React.Fragment>
              <div style={{ display: 'flex' }}>{renderVideoTagSelect(getAllVideoTagsByCategory)}</div>
            </React.Fragment>
          );
        }
      }}
    </Query>
  );
};

export default Tags;

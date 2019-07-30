import React from 'react';
import { Query } from 'react-apollo';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import forEach from 'lodash/forEach';
import { Row, Radio, Col, Alert, Spin, Icon, Form, Layout as AntLayout, notification, Card, Select } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import VideoCard from './VideoCard';
import { LayoutContext } from '../../../../../providers/LayoutProvider';
import { GET_VIDEO_CATEGORY } from './VideosPage.queries';
import './index.styles.scss';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const Categories = ({ setCategory, currentCategory, isMobile }) => {
  const handleMobile = category => {
    setCategory(category);
  };

  const renderCategorySelect = categories => {
    const options = categories.map(category => {
      let opts = [];
      opts.push(
        <Option key={category} value={category}>
          {category}
        </Option>
      );
      return opts;
    });
    return (
      <Select className="mx-3 mb-2" style={{ flex: 1 }} value={currentCategory} onChange={category => handleMobile(category)}>
        {options}
      </Select>
    );
  };

  const renderCategories = categories => {
    return (
      <RadioGroup size="large" buttonStyle="solid">
        {categories.map(category => {
          console.log('currentCategory === category', currentCategory === category, currentCategory, category);
          return (
            <RadioButton key={category} value={category} checked={currentCategory === category} onClick={e => setCategory(e.target.value)}>
              {category}
            </RadioButton>
          );
        })}
      </RadioGroup>
    );
  };
  return (
    <Query fetchPolicy="cache-and-network" query={GET_VIDEO_CATEGORY}>
      {({ data, loading, error }) => {
        if (loading) return <Spin size="large" />;
        if (data && !loading) {
          const { getAllVideoCategories } = data;
          return <div style={{ display: 'flex' }}>{renderCategorySelect(getAllVideoCategories)}</div>;
        }
      }}
    </Query>
  );
};

export default Categories;

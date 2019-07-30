import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Chart from '@latticehr/react-org-chart';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Tree, Spin, Tag, Table, Pagination, Row, Col, Alert, Icon, Form, Layout as AntLayout, notification } from 'antd';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_GENEALOGY } from './GenealogyPage.queries';

const FormItem = Form.Item;
const AntContent = AntLayout.Content;
const TreeNode = Tree.TreeNode;

class GenealogyTreePAge extends React.Component {
  render() {
    const props = this.props;
    const loop = data => {
      return data.map(item => {
        const color = item.person.name.indexOf('Active') > 0 || item.person.name.indexOf('YOU') > 0 ? 'green' : '#999';
        const fontWeight = color === 'green' ? '700' : '300';
        if (item && item.children && item.children.length) {
          return (
            <TreeNode
              key={item.id}
              title={
                <div style={{ color, fontWeight }}>
                  {' '}
                  {item.person.name} {item.person.email && <span> - {item.person.email}</span>}
                </div>
              }
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return (
          <TreeNode
            key={item.id}
            title={
              <div style={{ color, fontWeight }}>
                {' '}
                {item.person.name} {item.person.email && <span> - {item.person.email}</span>}
              </div>
            }
            isLeaf={true}
          />
        );
      });
    };
    return (
      <Tree showLine defaultExpandedKeys={[this.props.data.id]}>
        <TreeNode
          key={this.props.data.id}
          title={
            <div>
              {this.props.data.person.name} {this.props.data.person.email && <span> - {this.props.data.person.email}</span>}
            </div>
          }
        >
          {loop(this.props.data.children)}
        </TreeNode>
      </Tree>
    );
  }
}

export default GenealogyTreePAge;

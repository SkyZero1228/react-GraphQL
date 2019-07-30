import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Row, Col, Alert, Spin, Icon, notification, Layout as AntLayout } from 'antd';
import { Query } from 'react-apollo';
import ProspectForm from './ProspectForm';
import Welcome from './Welcome';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { GET_CERTIFICATES_FOR_PROSPECT } from './MembersHomePage.queries';
import TviWelcomePage from './components/TviWelcomePage';
import NonTviWelcomeMembers from './components/NonTviWelcomeMembers';
const AntContent = AntLayout.Content;

class MembersHomePage extends React.Component {
  static defaultProps = {
    pathName: 'Dashboard',
  };

  state = {
    searchTerm: '',
  };

  handleSearch = searchTerm => {
    this.setState({ searchTerm }, () => {
      this.props.refetch();
    });
  };

  render() {
    const props = this.props;
    const { searchTerm } = this.state;
    const tviUser = props.currentUser.roles.find(role => role === 'TVI PRO' || role === 'TVI PLUS' || role === 'TVI BASIC');
    return (
      <React.Fragment>
        {tviUser && <TviWelcomePage currentUser={props.currentUser} threeForFreeCount={props.threeForFreeCount} />}
        {!tviUser && <NonTviWelcomeMembers />}
      </React.Fragment>
    );
  }
}

export default MembersHomePage;

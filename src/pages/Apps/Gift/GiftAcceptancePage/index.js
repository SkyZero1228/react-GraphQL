import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Spin, Layout as AntLayout } from 'antd';
import { Query } from 'react-apollo';
import { find } from 'lodash';
import GiftLayout from 'components/LayoutComponents/Layout/GiftLayout';
import AcceptanceForm from './AcceptanceForm';
import './index.styles.scss';
import { GET_PROSPECT } from './Prospect.queries';
import GiftProvider, { GiftContext } from '../../../../providers/GiftProvider';
import cn from 'classnames';
import LasVegas from './LasVegas/index';

const AntContent = AntLayout.Content;

class GiftAcceptancePage extends React.Component {
  static defaultProps = {
    pathName: 'Invitation',
  };

  state = {
    accepted: false,
    paymentCompleted: false,
  };

  componentWillMount = () => {
    localStorage.removeItem('token');
  };

  handleAcceptance = () => {
    this.setState({ accepted: true });
  };

  paymentComplete = () => {
    this.setState({ paymentCompleted: true });
  };

  render() {
    const { uuid } = this.props.match.params;
    const { accepted } = this.state;

    return (
      <GiftLayout>
        <GiftContext.Consumer>
          {context => {
            const { isMobile } = context;
            const classes = cn('utils__content-image-wrapper', { mobile: isMobile });
            return (
              <AntContent className={classes}>
                <Helmet title="Dashboard" />
                <div className="GiftAcceptance__wrapper">
                  <div className="logo">
                    {isMobile ? (
                      <img src="/resources/images/TVI-TM-Horizontal.png" alt="TripValet Incentives" />
                    ) : (
                      <img src="/resources/images/svgs/TVI-TM-Logo-Horizontal-White.svg" alt="TripValet Incentives" />
                    )}
                  </div>
                  <Query query={GET_PROSPECT} variables={{ uuid }}>
                    {({ loading, error, data }) => {
                      if (loading) return <Spin spinning={loading} delay="250" />;
                      if (data) {
                        const image = find(data.getProspectByUuid.certificate.images, { type: 'Email', displayOrder: 1 });
                        const prospect = data.getProspectByUuid;
                        return (
                          <React.Fragment>
                            {prospect.certificate.id === 'certificates/37-A' ? (
                              <div className="GiftAcceptance__wrapper__content">
                                <img src={image.url} alt={prospect.certificate.title} />
                                <div className="GiftAcceptance__wrapper__content__details">
                                  {!accepted &&
                                    !prospect.redeemed && (
                                      <LasVegas
                                        handleAcceptance={this.handleAcceptance}
                                        uuid={uuid}
                                        prospect={prospect}
                                        paymentCompleted={this.paymentCompleted}
                                      />
                                    )}
                                  {prospect.redeemed && (
                                    <div className="GiftAcceptance__wrapper__content__accepted">
                                      <h1>This Gift has already been redeemed</h1>
                                    </div>
                                  )}
                                  {accepted && (
                                    <div className="GiftAcceptance__wrapper__content__accepted">
                                      <h1>Your Certificate is on its way!</h1>
                                      <h5>Please add certificates@funrewardsforyou.com to your contacts.</h5>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="GiftAcceptance__wrapper__content">
                                <img src={image.url} alt={prospect.certificate.title} />
                                <div className="GiftAcceptance__wrapper__content__details">
                                  {!accepted &&
                                    !prospect.redeemed && (
                                      <AcceptanceForm handleAcceptance={this.handleAcceptance} uuid={uuid} prospect={prospect} />
                                    )}
                                  {prospect.redeemed && (
                                    <div className="GiftAcceptance__wrapper__content__accepted">
                                      <h1>This Gift has already been redeemed</h1>
                                    </div>
                                  )}
                                  {accepted && (
                                    <div className="GiftAcceptance__wrapper__content__accepted">
                                      <h1>Your Certificate is on its way!</h1>
                                      <h5>Please add certificates@funrewardsforyou.com to your contacts.</h5>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      }
                    }}
                  </Query>
                </div>
              </AntContent>
            );
          }}
        </GiftContext.Consumer>
      </GiftLayout>
    );
  }
}

export default GiftAcceptancePage;

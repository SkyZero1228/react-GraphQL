import React, { PureComponent } from 'react';
import { Card, Icon, Row, Col } from 'antd';
import cn from 'classnames';
import { find, some } from 'lodash';
import { CurrentUserContext } from '../../../../../providers/CurrentUserProvider';
import './CertificateListItem.styles.scss';

const { Meta } = Card;

class CertificateListItem extends PureComponent {
  selectCertificate = (certificate, userLevel, plusLevel, proLevel) => {
    if (!plusLevel && !proLevel) this.props.handleSelect(certificate);
  };

  render() {
    const { certificate, selectedId } = this.props;
    const isSelected = selectedId === certificate.id;
    const imageUrl = find(certificate.images, { type: 'Email' });
    let certClasses = cn('CertificateListItem__certificate-card', {
      'CertificateListItem__certificate-card--selected': isSelected ? true : false,
    });
    return (
      <CurrentUserContext.Consumer>
        {context => {
          const userRole = find(context.currentUser.roles, r => {
            return r === 'TVI PLUS' || r === 'TVI PRO' || r === 'TVI BASIC';
          });
          let plusLevel =
            userRole === 'TVI BASIC' &&
            (some(certificate.membershipLevel, level => level === 'TVI PRO') ||
              some(certificate.membershipLevel, level => level === 'TVI PLUS')) &&
            !some(certificate.membershipLevel, level => level === 'TVI BASIC');

          let proLevel =
            (userRole === 'TVI BASIC' &&
              (some(certificate.membershipLevel, level => level === 'TVI PRO') &&
                !some(certificate.membershipLevel, level => level === 'TVI BASIC'))) ||
            (userRole === 'TVI PLUS' && some(certificate.membershipLevel, level => level === 'TVI PRO'));

          if (
            proLevel &&
            some(certificate.membershipLevel, level => level === 'TVI INTERNATIONAL') &&
            !some(['USA', 'United States', 'Canada'], country => country === context.currentUser.address.country)
          ) {
            plusLevel = false;
            proLevel = false;
          }

          return (
            <Card
              className={certClasses}
              onClick={() => this.selectCertificate(certificate, userRole, plusLevel, proLevel)}
              hoverable
              cover={<img alt={certificate.title} src={imageUrl.url} />}
            >
              <Meta title={certificate.title} />
              {plusLevel && (
                <div className="CertificateListItem__certificate-card__notPro">
                  <div className="CertificateListItem__certificate-card__notPro__text">
                    <img src="/resources/images/svgs/locked-plus-level-white.svg" alt="Locked - Plus Level" style={{ maxHeight: 36 }} />
                  </div>
                </div>
              )}
              {proLevel && (
                <div className="CertificateListItem__certificate-card__notPro">
                  <div className="CertificateListItem__certificate-card__notPro__text">
                    <img
                      src="/resources/images/svgs/locked-pro-level-only-white.svg"
                      alt="Locked - Pro Level Only"
                      style={{ maxHeight: 36 }}
                    />
                  </div>
                </div>
              )}
              {isSelected && (
                <div className="CertificateListItem__certificate-card__selectedIcon">
                  <Icon type="check-circle" />
                  <span>Selected</span>
                </div>
              )}
            </Card>
          );
        }}
      </CurrentUserContext.Consumer>
    );
  }
}

export default CertificateListItem;

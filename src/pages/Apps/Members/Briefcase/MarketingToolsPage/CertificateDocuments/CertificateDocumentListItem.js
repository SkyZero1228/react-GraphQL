import React, { PureComponent } from 'react';
import { Card, Icon, Button } from 'antd';
import cn from 'classnames';
import './CertificateDocumentListItem.styles.scss';
import vars from '../../../../../../env/vars';
import Description from '../../../../../../components/AntComponents/Alert/Description/index';
import axios from 'axios';

const { Meta } = Card;

class CertificateDocumentListItem extends PureComponent {
  renderCardDescription = (certificate, doc, userRole) => {
    const locked = userRole === 'TVI PLUS' && certificate.membershipLevel === 'TVI PRO';
    if (certificate.title === 'Free Healthcare Discount Card') {
      // console.log('cert, doc, userRole', certificate, doc, userRole);
    }
    return (
      <React.Fragment>
        <div>{certificate.description}</div>
        {locked ? (
          <div className="CertificateDocumentListItem__certificate-card__notPro__text">
            <img src="/resources/images/svgs/locked-pro-level-only-white.svg" alt="Locked - Pro Level Only" />
          </div>
        ) : (
          <div className="CertificateDocumentListItem__certificate-card__plus__download">
            <div
              onClick={async () => {
                axios(`${vars.ServerUrl}api/certificates/${certificate.id.replace('certificates/', '')}`, {
                  method: 'GET',
                  responseType: 'blob', //Force to receive data in a Blob Format
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
                  .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${certificate.title}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}
            >
              <img src="/resources/images/svgs/pdf-download.svg" alt="Download PDF" />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { certificate, doc, userRole } = this.props;
    console.log(`${vars.ServerUrl}certificates/${certificate.id.replace('certificates/', '')}`);
    let certClasses = cn('CertificateDocumentListItem__certificate-card');
    return (
      <Card key={`${doc.id}-card`} className={certClasses} hoverable cover={<img alt={certificate.title} src={doc.images[0].url} />}>
        <Meta title={certificate.title} description={this.renderCardDescription(certificate, doc, userRole)} />
      </Card>
    );
  }
}

export default CertificateDocumentListItem;

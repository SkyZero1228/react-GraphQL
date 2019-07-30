import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import CertificateDocumentListItem from './CertificateDocumentListItem';
import { Query } from 'react-apollo';
import { find } from 'lodash';
import { GET_CERTIFICATE_DOCUMENTS } from '../../Briefcase.queries';
import Loading from '../../../../../../components/AntComponents/Card/Loading/index';
import { CurrentUserContext } from '../../../../../../providers/CurrentUserProvider';

class CertificateDocumentsList extends PureComponent {
  renderCertificateDocuments = (certificates, userRole) => {
    return certificates.map(cert => {
      return cert.documents.map((doc, index) => (
        <Col key={`col-${doc.id}-${index}`} xs={24} sm={10} md={6} xl={4}>
          <CertificateDocumentListItem key={`cdli-${doc.id}-${index}`} certificate={cert} doc={doc} userRole={userRole} />
        </Col>
      ));
    });
  };

  render() {
    const { certificates } = this.props;
    return (
      <CurrentUserContext.Consumer>
        {context => {
          const userRole = find(context.currentUser.roles, r => {
            return r === 'TVI PLUS' || r === 'TVI PRO';
          });
          return (
            <Query query={GET_CERTIFICATE_DOCUMENTS} variables={{ type: 'Marketing Tool' }}>
              {({ loading, error, data }) => {
                if (loading) return null;
                if (data)
                  return (
                    <Row gutter={15} type="flex">
                      {this.renderCertificateDocuments(data.getCertificateDocuments, userRole)}
                    </Row>
                  );
              }}
            </Query>
          );
        }}
      </CurrentUserContext.Consumer>
    );
  }
}

export default CertificateDocumentsList;

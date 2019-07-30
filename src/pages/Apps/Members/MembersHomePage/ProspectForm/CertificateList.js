import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import CertificateListItem from './CertificateListItem';

class CertificateList extends PureComponent {
  state = {
    selectedCertificate: null,
  };

  renderCertificates = certificates => {
    const id = this.state.selectedCertificate ? this.state.selectedCertificate.id : null;
    return certificates.map(cert => (
      <Col key={cert.id} xs={24} sm={10} md={6} xl={3}>
        <CertificateListItem handleSelect={this.handleSelectCertificate} certificate={cert} selectedId={id} />
      </Col>
    ));
  };

  handleSelectCertificate = certificate => {
    this.setState({ selectedCertificate: certificate });
    this.props.handleSelectCertificate(certificate);
  };

  render() {
    const { certificates } = this.props;
    return <Row gutter={15}>{this.renderCertificates(certificates)}</Row>;
  }
}

export default CertificateList;

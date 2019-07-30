import React from 'react';
import Page from 'components/LayoutComponents/Page';
import Helmet from 'react-helmet';
import { Mutation, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Layout from 'components/LayoutComponents/Layout/MemberLayout';
import { Upload, Button, Icon, Row, Col, Form, Layout as AntLayout, Spin, notification } from 'antd';
import { UPLOAD_MEXICO_CERTS_CSV } from './UploadCSV.mutation';

const AntContent = AntLayout.Content;
const Dragger = Upload.Dragger;

const draggerProps = {
  name: 'file',
  multiple: false,
  beforeUpload: file => {
    return false;
  },
};

@Form.create()
@withRouter
class UploadDocuments extends React.Component {
  static defaultProps = {
    pathName: 'Upload CSV',
  };
  state = {
    isSubmitForm: false,
    documentFile: null,
  };
  file = [];

  openNotification = () => {
    notification.open({
      message: 'Upload Resource Center Documents',
      description: `You selected the document successfully.`,
    });
  };

  onUpload = (event, uploadMexicoCerts) => {
    this.setState({ isSubmitForm: true });
    const { documentFile } = this.state;

    if (!documentFile) {
      notification.error({
        message: 'Upload a list of Mexico certifications',
        description: `You need to select a csv file.`,
      });
      this.setState({ isSubmitForm: false });
      return;
    }

    uploadMexicoCerts({ variables: { file: documentFile } }).then(data => {
      console.log(data.data.uploadMexicoCerts.success);
      this.setState({ isSubmitForm: false, documentFile: null });
      if (data.data.uploadMexicoCerts.success) {
        notification.success({ message: 'Upload a list of Mexico certifications', description: `The CSV file uploaded successfully.` });
      } else {
        notification.error({ message: 'Upload a list of Mexico certifications', description: `No users` });
      }
    });
  };

  handleChange = info => {
    this.setState({ documentFile: info.file });
  };

  render() {
    const props = this.props;
    const { documentFile } = this.state;
    return (
      <Layout>
        <AntContent className="utils__content-image-wrapper">
          <Page {...props}>
            <Helmet title="Upload Mexico certs" />
            <Row className="utils__full-width-content-card">
              <section className="card">
                <div className="card-body" style={{ width: '100%' }}>
                  <Row gutter={12} type="flex" justify="end" style={{ marginBottom: 10 }}>
                    <Col gutter={10} className="text-right" style={{ width: '100%' }}>
                      <span>
                        <Mutation mutation={UPLOAD_MEXICO_CERTS_CSV}>
                          {(uploadMexicoCerts, { loading, error }) => (
                            <Spin spinning={this.state.isSubmitForm} size="large">
                              <Row gutter={12} type="flex">
                                <Col xs={24} className="text-left">
                                  <Dragger {...draggerProps} fileList={documentFile ? [documentFile] : []} onChange={this.handleChange}>
                                    <p className="ant-upload-drag-icon">
                                      <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">Click or drag CSV file to this area to upload.</p>
                                    <p className="ant-upload-hint">Select the CSV file.</p>
                                  </Dragger>
                                </Col>
                              </Row>
                              <Row gutter={12} className="text-right">
                                <Col xs={24} className="text-right">
                                  <Button
                                    htmlType="submit"
                                    icon="upload"
                                    size={`large`}
                                    onClick={e => this.onUpload(e, uploadMexicoCerts)}
                                    style={{ marginTop: 12 }}
                                  >
                                    Upload
                                  </Button>
                                </Col>
                              </Row>
                            </Spin>
                          )}
                        </Mutation>
                      </span>
                    </Col>
                  </Row>
                </div>
              </section>
            </Row>
          </Page>
        </AntContent>
      </Layout>
    );
  }
}

export default withApollo(UploadDocuments);

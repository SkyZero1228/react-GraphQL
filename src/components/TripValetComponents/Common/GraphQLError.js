import React, { PureComponent } from 'react';
import { Alert } from 'antd';

class GraphQLError extends PureComponent {
  static defaultProps = {
    message: 'Test',
    className: 'mb-4',
  };

  render() {
    const { message, className } = this.props;
    const parsedMessage = message.replace('GraphQL error: ', '');

    return <Alert message={parsedMessage} type="error" closeText="Close Now" className={className} />;
  }
}

export default GraphQLError;

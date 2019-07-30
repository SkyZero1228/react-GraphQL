import React from 'react';
import { Row, Col, Button } from 'antd';
import './index.styles.scss';

export default ({ disabled, next, previous, nextAsSubmit }) => {
  return (
    <Row className="StepNavigation">
      <Col>
        {nextAsSubmit && (
          <Button type="primary" icon="right-circle" htmlType="submit">
            Next
          </Button>
        )}
        {!nextAsSubmit &&
          next && (
            <Button type="primary" icon="right-circle" onClick={() => next()} disabled={disabled}>
              Next
            </Button>
          )}
        {previous && (
          <Button className="ml-3" icon="left-circle" onClick={() => previous()}>
            Previous
          </Button>
        )}
      </Col>
    </Row>
  );
};

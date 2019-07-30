import React from 'react';
import { Table, Badge } from 'antd';
import { DateTime } from 'luxon';
import { GET_LEADS, GET_LEADS_VISITS } from './LeadsPage.queries';
class SubTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
    this.columns = [
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        className: 'text-center',
        render: createdAt => {
          return <div className="text-center">{DateTime.fromISO(createdAt, { setZone: 'local' }).toLocaleString()}</div>;
        },
      },
      {
        title: 'URL',
        dataIndex: 'funnelStep.url',
        key: 'funnelStep',
        className: 'text-center',
      },
    ];
  }

  componentWillMount() {
    this.fetchData();
  }

  async fetchData() {
    console.log(this.props);
    let leadVisits = await this.props.row.query({
      query: GET_LEADS_VISITS,
      variables: { id: this.props.record.id },
    });

    this.setState({ data: leadVisits.data.getLeadsVisitsById });
  }

  render() {
    return <Table columns={this.columns} dataSource={this.state.data} pagination={false} />;
  }
}

export default SubTable;

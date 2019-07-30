import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ getFieldDecorator, value, form, removeFunnel, productList }) => {
  if (value && value.funnelSteps) {
    return <ul className="ul-funnels">{value.funnelSteps.map((value, index) => <SortableItem key={`item-${index}`} index={index} sortIndex={index} getFieldDecorator={getFieldDecorator} tierPayouts={value} form={form} removeFunnel={removeFunnel} value={value} productList={productList} />)}</ul>;
  } else {
    return <div />;
  }
});

export default SortableList;

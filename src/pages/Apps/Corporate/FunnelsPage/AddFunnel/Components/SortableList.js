import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ getFieldDecorator, value, form, removeFunnel, productList }) => {
  return <ul className="ul-funnels">{value.funnelSteps.map((value, index) => <SortableItem key={`item-${index}`} index={index} sortIndex={index} getFieldDecorator={getFieldDecorator} stepOrder={value} form={form} removeFunnel={removeFunnel} productList={productList} />)}</ul>;
});

export default SortableList;

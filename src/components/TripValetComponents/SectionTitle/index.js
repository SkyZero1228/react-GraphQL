import * as React from 'react';
import './index.styles.scss';

interface ISectionTitleProps {
  title: string;
}

const SectionTitle: React.SFC<ISectionTitleProps> = props => {
  return <div className="sectionTitle">{props.title}</div>;
};

export default SectionTitle;

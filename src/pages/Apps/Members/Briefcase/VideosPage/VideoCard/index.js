import React, { PureComponent } from 'react';
import { Card } from 'antd';

export default class VideoCard extends PureComponent {
  render() {
    const { videoId, title } = this.props.video;
    return (
      <Card className="VideosPage__video-body__video-wrapper__video-card" hoverable>
        <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
            <iframe src={`https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true`} title="Wistia video player" allowtransparency="true" frameBorder="0" scrolling="no" className="wistia_embed" name="wistia_embed" allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true" width="100%" height="100%" />
          </div>
        </div>
        <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
      </Card>
    );
  }
}

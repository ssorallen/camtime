/* @flow */

import type { Photo } from './reducer';
import React from 'react';
import { connect } from 'react-redux';

type Props = {
  photos: Array<Photo>,
};

class Review extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.photos.map(photo => (
          <img alt="" className="m-1 rounded" key={photo.id} src={photo.dataURL} width="150" />
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  photos: state.photos,
}))(Review);

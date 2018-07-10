/* @flow */

import './Review.css';
import type { Photo } from './reducer';
import React from 'react';
import { connect } from 'react-redux';

type Props = {
  photos: Array<Photo>,
};

class Review extends React.Component<Props> {
  render() {
    return (
      <div className="clear-float">
        {this.props.photos.map(photo => (
          <div
            className="float-left m-1 rounded review-img"
            key={photo.id}
            style={{ backgroundImage: `url(${photo.dataURL})` }}
          />
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  photos: state.photos,
}))(Review);

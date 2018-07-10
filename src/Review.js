/* @flow */

import './Review.css';
import { Link } from 'react-router-dom';
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
          <Link key={photo.id} to={`/edit/${photo.id}`}>
            <div
              className="float-left m-1 rounded review-img"
              style={{ backgroundImage: `url(${photo.dataURL})` }}
            />
          </Link>
        ))}
      </div>
    );
  }
}

export default connect(state => ({
  photos: state.photos,
}))(Review);

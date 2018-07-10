/* @flow */

import React from 'react';
import type { Photo } from './reducer';
import { connect } from 'react-redux';
import { setPhotoNote } from './actions';

type Props = {
  dispatch: Function,
  photo: Photo,
};

type State = {
  nextNote: string,
};

class Edit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { nextNote: this.props.photo.note };
  }

  _isDirty() {
    return this.props.photo.note !== this.state.nextNote;
  }

  _setPhotoNote = event => {
    event.preventDefault();
    this.props.dispatch(setPhotoNote(this.props.photo, this.state.nextNote));
  };

  _setNextNote = event => {
    this.setState({ nextNote: event.currentTarget.value });
  };

  render() {
    return (
      <div>
        <img alt="" className="mb-1" src={this.props.photo.dataURL} style={{ width: '100%' }} />
        <form onSubmit={this._setPhotoNote}>
          <textarea onChange={this._setNextNote} value={this.state.nextNote} />
          <button disabled={!this._isDirty()} type="submit">
            Save Note
          </button>
        </form>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const photoId = ownProps.match.params.id;
  return {
    photo: state.photos.find(photo => photo.id === photoId),
  };
})(Edit);

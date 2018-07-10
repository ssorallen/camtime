/* @flow */

import './Edit.css';
import { Button, Col, Form, FormGroup, Input } from 'reactstrap';
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
      <div className="d-flex edit-container flex-column">
        <div
          className="edit-img flex-fill mb-1"
          style={{ backgroundImage: `url(${this.props.photo.dataURL})` }}
        />
        <Form className="p-1" onSubmit={this._setPhotoNote}>
          <FormGroup row>
            <Col>
              <Input onChange={this._setNextNote} type="textarea" value={this.state.nextNote} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <Button disabled={!this._isDirty()} type="submit">
                Save Note
              </Button>
            </Col>
          </FormGroup>
        </Form>
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

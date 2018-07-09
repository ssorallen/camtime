/* @flow */

import './App.css';
import { Button, Col, Container, Nav, Navbar, NavItem, NavLink, Row } from 'reactstrap';
import type { Photo } from './reducer';
import React from 'react';
import { addPhoto } from './actions';
import { connect } from 'react-redux';

type Props = {
  dispatch: Function,
  photos: Array<Photo>,
};

type State = {
  showCameraFeed: boolean,
};

class App extends React.Component<Props, State> {
  _canvasRef: ?HTMLCanvasElement;
  _videoRef: ?HTMLVideoElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      showCameraFeed: false,
    };
  }

  _requestCameraAccess = () => {
    // $FlowFixMe
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.setState({ showCameraFeed: true }, () => {
        if (this._videoRef == null) return;
        this._videoRef.srcObject = stream;
      });
    });
  };

  _stopCamera = () => {
    if (this._videoRef == null) return;
    // $FlowFixMe
    this._videoRef.srcObject.getVideoTracks().forEach(track => track.stop());
    this.setState({ showCameraFeed: false });
  };

  _takePicture = () => {
    const videoRef = this._videoRef;
    if (videoRef == null) return;

    const canvas = document.createElement('canvas');
    canvas.height = videoRef.videoHeight;
    canvas.width = videoRef.videoWidth;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef, 0, 0, videoRef.videoWidth, videoRef.videoHeight);
    this.props.dispatch(addPhoto({ dataURL: canvas.toDataURL(), id: '' }));
  };

  render() {
    return (
      <div>
        <Navbar className="bg-primary" dark>
          <Nav className="text-center">
            <NavItem>
              <NavLink className="text-white" href="/capture">
                Capture
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" href="/review">
                Review
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Container fluid>
          <Row>
            {this.state.showCameraFeed ? (
              <React.Fragment>
                <video
                  autoPlay
                  className="mb-1"
                  ref={ref => {
                    this._videoRef = ref;
                  }}
                  style={{ background: 'black', height: '300px', width: '100%' }}
                />
                <Col className="text-center">
                  <Button onClick={this._takePicture}>Capture</Button>
                  <Button onClick={this._stopCamera}>Stop</Button>
                </Col>
              </React.Fragment>
            ) : (
              <div
                className="align-items-center d-flex justify-content-center"
                style={{ background: 'black', height: '300px', width: '100%' }}>
                <Button onClick={this._requestCameraAccess}>Access Camera</Button>
              </div>
            )}
          </Row>
          <Row className="justify-content-start">
            {this.props.photos.map(photo => (
              <Col key={photo.id}>
                <img alt="" className="rounded" src={photo.dataURL} width="150" />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(state => ({
  photos: state.photos,
}))(App);

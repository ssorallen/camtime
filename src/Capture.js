/* @flow */

import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import type { Photo } from './reducer';
import React from 'react';
import { addPhoto } from './actions';
import { connect } from 'react-redux';

type Props = {
  dispatch: Function,
  lastPhoto: ?Photo,
};

type State = {
  showCameraFeed: boolean,
};

class Capture extends React.Component<Props, State> {
  _canvasRef: ?HTMLCanvasElement;
  _videoRef: ?HTMLVideoElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      showCameraFeed: false,
    };
  }

  componentWillUnmount() {
    if (this.state.showCameraFeed) this._stopCamera();
  }

  _requestCameraAccess = () => {
    // $FlowFixMe
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { facingMode: 'environment' } })
      .then(stream => {
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
    this.props.dispatch(addPhoto({ dataURL: canvas.toDataURL(), id: '', note: '' }));
  };

  render() {
    return (
      <div
        className="d-flex flex-column"
        style={{ bottom: '0', position: 'absolute', top: '56px', width: '100%' }}>
        {this.state.showCameraFeed ? (
          <video
            autoPlay
            className="bg-dark"
            playsInline //
            ref={ref => {
              this._videoRef = ref;
            }}
            style={{ height: '100%', width: '100%' }}
          />
        ) : (
          <div
            className="align-items-center bg-dark d-flex flex-fill justify-content-center"
            style={{ height: '300px', width: '100%' }}>
            <Button onClick={this._requestCameraAccess}>Access Camera</Button>
          </div>
        )}
        <div
          className="align-items-center d-flex justify-content-around py-2"
          style={{ bottom: '20px', position: 'absolute', width: '100%' }}>
          <Link to="/review">
            {this.props.lastPhoto == null ? (
              <div style={{ height: '100px', width: '100px' }} />
            ) : (
              <div
                className="rounded"
                style={{
                  backgroundImage: `url(${this.props.lastPhoto.dataURL})`,
                  backgroundSize: 'cover',
                  height: '100px',
                  width: '100px',
                }}
              />
            )}
          </Link>
          <div className="text-center" style={{ width: '100px' }}>
            <Button
              className="btn-capture"
              color="primary"
              disabled={!this.state.showCameraFeed}
              onClick={this._takePicture}>
              Capture
            </Button>
          </div>
          <div className="text-center" style={{ width: '100px' }}>
            <Button disabled={!this.state.showCameraFeed} onClick={this._stopCamera}>
              Stop
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  lastPhoto: state.photos.length === 0 ? null : state.photos[state.photos.length - 1],
}))(Capture);

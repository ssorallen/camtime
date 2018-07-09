/* @flow */

import type { Photo } from './reducer';

export function addPhoto(photo: Photo) {
  return {
    photo,
    type: 'ADD_PHOTO',
  };
}

/* @flow */

import type { Photo } from './reducer';

export function addPhoto(photo: Photo) {
  return {
    photo,
    type: 'ADD_PHOTO',
  };
}

export function setPhotoNote(photo: Photo, note: string) {
  return {
    note,
    photo,
    type: 'SET_PHOTO_NOTE',
  };
}

/* @flow */

import uuidv4 from 'uuid/v4';

export type Photo = {
  dataURL: string,
  id: string,
  note: string,
};

type AddPhotoAction = {
  photo: Photo,
  type: 'ADD_PHOTO',
};

type SetPhotoNoteAction = {
  note: string,
  photo: Photo,
  type: 'SET_PHOTO_NOTE',
};

type Action = AddPhotoAction | SetPhotoNoteAction;
type State = { photos: Array<Photo> };

const initialState = {
  photos: [],
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_PHOTO':
      return {
        ...state,
        // $FlowFixMe
        photos: state.photos.concat([
          {
            ...action.photo,
            id: uuidv4(),
          },
        ]),
      };
    case 'SET_PHOTO_NOTE': {
      // $FlowFixMe
      const nextPhotos = state.photos.slice();
      nextPhotos.splice(state.photos.indexOf(action.photo), 1, {
        ...action.photo,
        note: action.note,
      });
      return {
        ...state,
        photos: nextPhotos,
      };
    }
    default:
      return state;
  }
}

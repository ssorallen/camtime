/* @flow */

import uuidv4 from 'uuid/v4';

export type Photo = {
  dataURL: string,
  id: string,
};

type AddPhotoAction = {
  photo: Photo,
  type: 'ADD_PHOTO',
};

type Action = AddPhotoAction;
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
    default:
      return state;
  }
}

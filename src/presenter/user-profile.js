import UserProfileView from '../views/user-profile.js';

import { render, RenderPosition } from '../utils/render.js';

export default class UserProfile {
  constructor(container) {
    this._container = container;
  }

  init(movies, filter) {

    if(movies.length === 0) {
      return;
    }
    render(this._container, new UserProfileView(filter).getElement(), RenderPosition.BEFOREEND);
  }
}

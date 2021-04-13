import dayjs from 'dayjs';
import { createElement } from '../../../util.js';
import { comments } from '../../../models/comments.js';

const createCommentTemplate = (id) => {
  let userComment;
  for(const comment of comments) {
    if(comment.id === id) {
      userComment = comment;
    }
  }
  const { author, comment, date, emotion } = userComment;

  const commentDate = dayjs(date).format('YYYY/MM/DD HH:mm');


  return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${ emotion }" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${ comment }</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${ author }</span>
          <span class="film-details__comment-day">${ commentDate }</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
};

const createCommentsTemplate = (comments) => {
  return `<ul class="film-details__comments-list">
      ${comments.map((id) => createCommentTemplate(id)).join('')}
    </ul>`;
};


export default class Comment {
  constructor(comments) {
    this._element = null;
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

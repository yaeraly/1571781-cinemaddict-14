import dayjs from 'dayjs';
import { comments } from '../../../models/comments.js';
import AbstractView from '../../abstract.js';


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


export default class Comment extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }
}

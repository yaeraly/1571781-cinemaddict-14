// import dayjs from 'dayjs';

const createCommentTemplate = () => {
  let author;
  let comment;
  let commentDate;
  let emotion;

  // for (let i = 0; comments.length; i++){
  //   if(comments[i].id === id) {
  //     author = comments[i].author;
  //     comment = comments[i].comment;
  //     commentDate = dayjs(comments[i].date).format('YYYY/MM/DD HH:mm');
  //     emotion = comments[i].emotion;
  //     break;
  //   }
  // }

  return `
    <li class="film-details__comment">
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
    </li>
  `;
};

export const createCommentsTemplate = (comments) => {
  return `
    <ul class="film-details__comments-list">
      ${comments.map((id) => createCommentTemplate(id)).join('')}
    </ul>
  `;
};

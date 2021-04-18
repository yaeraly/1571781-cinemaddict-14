import { EMOJIS, COMMENT_AUTHORS, COMMENTS } from '../const.js';
import { generateRandomDate, getRandomArrayElement } from '../utils/common.js';
import { comments } from '../models/comments.js';


let idCounter = 0;

export const generateComment = () => {
  const id      = idCounter++;
  const author  = getRandomArrayElement(COMMENT_AUTHORS);
  const comment = getRandomArrayElement(COMMENTS);
  const date    = generateRandomDate();
  const emotion = `./images/emoji/${getRandomArrayElement(EMOJIS)}`;

  comments.push({
    id,
    author,
    comment,
    date,
    emotion,
  });

  return idCounter;
};

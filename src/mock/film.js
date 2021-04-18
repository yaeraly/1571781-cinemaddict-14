import dayjs from 'dayjs';
import { generateComment } from './comment.js';
import { getRandomInteger, generateRandomDate, getRandomArrayElement } from '../utils/common.js';
import { FILM_NAMES, POSTERS, DIRECTORS, WRITERS, ACTORS, COUNTRIES, GENRES, AGE_LIMITS, DUMMY_TEXT } from '../const.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const generateDescription = () => {
  const neededSentences = getRandomInteger(1, 5);
  const randomNumber    = getRandomInteger(0, 9);

  const startIndex  = randomNumber > neededSentences ? randomNumber - neededSentences : randomNumber;
  const endIndex    = randomNumber < neededSentences ? randomNumber + neededSentences : randomNumber;

  return DUMMY_TEXT.split('. ').slice(startIndex, endIndex).join('. ');
};

const generateDuration = () => {
  const hours = getRandomInteger(1, 3);
  const minutes = getRandomInteger(1, 59);
  return dayjs.duration({ hours, minutes });
};

const generateRating = () => {
  const lower = 1;
  const upper = 10;

  const rating = parseFloat((lower + Math.random() * (upper - lower + 1)).toFixed(1));

  if(rating > 10) {
    return Math.floor(rating);
  }

  return Number.isInteger(rating) ? parseInt(rating) : rating;
};

let idCounter = 0;

export const generateFilm = () => {
  const COMMENT_COUNT  = getRandomInteger(0, 5);
  const WRITER_COUNT   = getRandomInteger(2, 4);
  const ACTOR_COUNT    = getRandomInteger(2, 6);
  const GENRE_COUNT    = getRandomInteger(1, 3);

  const id                = idCounter++;
  const comments          = new Array(COMMENT_COUNT).fill(null).map(generateComment);
  const title             = getRandomArrayElement(FILM_NAMES);
  const alternative_title = getRandomArrayElement(FILM_NAMES);
  const total_rating      = generateRating();
  const poster            = `./images/posters/${getRandomArrayElement(POSTERS)}`;
  const age_rating        = getRandomArrayElement(AGE_LIMITS);
  const director          = getRandomArrayElement(DIRECTORS);
  const writers           = new Array(WRITER_COUNT).fill(null).map(() => getRandomArrayElement(WRITERS));
  const actors            = new Array(ACTOR_COUNT).fill(null).map(() => getRandomArrayElement(ACTORS));
  const date              = generateRandomDate();
  const release_country   = getRandomArrayElement(COUNTRIES);
  const runtime           = generateDuration();
  const genre             = new Array(GENRE_COUNT).fill(null).map(() => getRandomArrayElement(GENRES));
  const description       = generateDescription();
  const watchlist         = Boolean(getRandomInteger(0, 1));
  const already_watched   = Boolean(getRandomInteger(0, 1));
  const watching_date     = generateRandomDate();
  const favorite          = Boolean(getRandomInteger(0, 1));

  return {
    id,
    comments,
    film_info: {
      title,
      alternative_title,
      total_rating,
      poster,
      age_rating,
      director,
      writers,
      actors,
      release: {
        date,
        release_country,
      },
      runtime,
      genre,
      description,
    },
    user_details: {
      watchlist,
      already_watched,
      watching_date,
      favorite,
    },
  };
};

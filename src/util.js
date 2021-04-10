import dayjs  from 'dayjs';

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomDate = () => {
  const year = getRandomInteger(1, 60);
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 28);

  return dayjs().add(-year, 'year').add(month, 'month').add(day, 'day').toDate();
};

const getRandomArrayElement = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

const validateStringMaxLength = (string, maxLength = 140) => {
  return string.length > maxLength;
};

export {
  render,
  getRandomInteger,
  generateRandomDate,
  getRandomArrayElement,
  validateStringMaxLength
};

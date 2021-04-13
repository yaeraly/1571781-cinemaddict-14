import dayjs  from 'dayjs';

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomDate = () => {
  const day = getRandomInteger(360, 60*365);

  return dayjs().add(-day, 'day').toDate();
};

const getRandomArrayElement = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

const validateStringMaxLength = (string, maxLength = 140) => {
  return string.length > maxLength;
};

export {
  RenderPosition,
  render,
  createElement,
  renderTemplate,
  getRandomInteger,
  generateRandomDate,
  getRandomArrayElement,
  validateStringMaxLength
};

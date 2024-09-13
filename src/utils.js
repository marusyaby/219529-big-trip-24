export const capitalizeFirstLetter = (value) =>
  value.toString().charAt(0).toUpperCase() + value.slice(1);

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const getRandomElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];


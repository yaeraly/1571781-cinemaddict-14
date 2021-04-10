const createFilmFooterStatisticTemplate = (films) => {
  const availableFilms = films.length;

  return `
    <p>${ availableFilms } movies inside</p>
  `;
};

export { createFilmFooterStatisticTemplate };

const PHOTOS_COUNT = 8;

const createPhotoTemplate = () => `
  <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
`;

export const createEventsItemDestinationTemplate = () => {
  const photos = [...new Array(PHOTOS_COUNT)].map(() => createPhotoTemplate()).join('');
  return `<section class="event__section  event__section--destination">
    <h3
      class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">Geneva is a city in Switzerland
      that lies at the southern tip of expansive Lac Léman (Lake Geneva).
      Surrounded by the Alps and Jura mountains, the city has views of dramatic
      Mont Blanc.</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos}
      </div>
    </div>
  </section>`;
};

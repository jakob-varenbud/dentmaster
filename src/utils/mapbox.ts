//Mapbox
export const initializeMapbox = () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiamFrb2J2YXIiLCJhIjoiY2xyeXlxa2w5MWtxYzJqbmFmZXJ4MXRhZiJ9.TxpTMaCXvDgq5akCtF1kZQ';

  function isMobileDevice() {
    return window.matchMedia('only screen and (max-width: 760px)').matches;
  }

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jakobvar/cls0hl1nj00z501r42kewbyqu',
    zoom: 1, // Standard-Zoom-Level
  });

  const locations = [
    {
      coordinates: [133.7751, -25.2744],
      info: 'Informationen über Australien',
      googleMapsLink: 'https://www.google.com/maps?q=-25.2744,133.7751',
      image:
        'https://uploads-ssl.webflow.com/655f64b940de048ead148f50/65b3f70072f408c610863c11_MapPin.png',
    }, // Australien
    {
      coordinates: [22.9375, -30.5595],
      image:
        'https://uploads-ssl.webflow.com/655f64b940de048ead148f50/65b3f70072f408c610863c11_MapPin.png',
    }, // Südafrika
    {
      coordinates: [104.1954, 35.8617],
      image:
        'https://uploads-ssl.webflow.com/655f64b940de048ead148f50/65b3f70072f408c610863c11_MapPin.png',
    }, // China
    {
      coordinates: [-102.5528, 23.6345],
      image:
        'https://uploads-ssl.webflow.com/655f64b940de048ead148f50/65b3f70072f408c610863c11_MapPin.png',
    }, // Mexiko
    {
      coordinates: [-95.7129, 37.0902],
      image:
        'https://uploads-ssl.webflow.com/655f64b940de048ead148f50/65b3f70072f408c610863c11_MapPin.png',
    }, // USA
  ];

  locations.forEach(function (loc) {
    // Erstelle ein benutzerdefiniertes HTML-Element für den Marker
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.backgroundImage = `url('${loc.image}')`;
    el.style.width = isMobileDevice() ? '50px' : '85px';
    el.style.height = isMobileDevice() ? '50px' : '85px';
    el.style.backgroundSize = 'cover';
    el.style.position = 'absolute';
    el.style.transform = 'translate(-50%, -100%)';
    el.style.cursor = 'pointer';

    // Erstelle das Popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <p>${loc.info}</p>
            <a href="${loc.googleMapsLink}" target="_blank">In Google Maps anzeigen</a>
        `);

    // Füge den Marker mit Popup zur Karte hinzu
    new mapboxgl.Marker(el, { anchor: 'bottom' })
      .setLngLat(loc.coordinates)
      .setPopup(popup)
      .addTo(map);
  });
  map.on('load', function () {
    // Passt die Kartenansicht an, um alle Marker einzuschließen
    const bounds = locations.reduce(
      function (bounds, loc) {
        return bounds.extend(loc.coordinates);
      },
      new mapboxgl.LngLatBounds(locations[0].coordinates, locations[0].coordinates)
    );

    map.fitBounds(bounds, {
      padding: 50, // Optionaler Abstand von den Rändern der Karte in Pixeln
      maxZoom: isMobileDevice() ? 2 : 3, // Maximaler Zoom-Level
    });
  });
};

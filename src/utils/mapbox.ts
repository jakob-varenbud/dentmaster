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
    [133.7751, -25.2744], // Australien
    [22.9375, -30.5595], // Südafrika
    [104.1954, 35.8617], // China
    [-102.5528, 23.6345], // Mexiko
    [-95.7129, 37.0902], // USA
  ];

  locations.forEach(function (loc) {
    new mapboxgl.Marker().setLngLat(loc).addTo(map);
  });

  map.on('load', function () {
    // Passt die Kartenansicht an, um alle Marker einzuschließen
    const bounds = locations.reduce(
      function (bounds, loc) {
        return bounds.extend(loc);
      },
      new mapboxgl.LngLatBounds(locations[0], locations[0])
    );

    map.fitBounds(bounds, {
      padding: 100, // Optionaler Abstand von den Rändern der Karte in Pixeln
      maxZoom: isMobileDevice() ? 0 : 3, // Maximaler Zoom-Level
    });
  });
};


  {/* let mapToken = mapToken;
  console.log(mapToken); */}
  mapboxgl.accessToken = mapToken;

  const map =  new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/satellite-streets-v12",
    center: listing.geometry.coordinates,
    // center: [77.5946, 12.9716],
    zoom: 9,
  })

  // console.log(coordinates);

  const marker = new mapboxgl.Marker({color:"red"})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({offset: 25})

  .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`))

  // .setLngLat([[12.554729, 55.7051]])
  .addTo(map);
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 10
});


const marker = new mapboxgl.Marker({ color: 'red', rotation: 45 })
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25, className: 'my-class' })
        .setHTML(`<h4>${loaction}</h4><p>Details location will be prodive after booking</p>`)
        .setMaxWidth("300px"))
    .addTo(map);


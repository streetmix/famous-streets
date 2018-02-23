'use strict'

var MAP_TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
var MAP_TILES_2X = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'
var MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'

var tiles = (window.devicePixelRatio && window.devicePixelRatio > 1) ? MAP_TILES_2X : MAP_TILES
var map = L.map('map', {
  zoom: 3,
  center: [20.40, -23.20]
})

L.tileLayer(tiles, {
  attribution: MAP_ATTRIBUTION
}).addTo(map)

var hash = new L.Hash(map)

var STREETMIX_GEOJSON = ''

window.fetch(STREETMIX_GEOJSON)
  .then(function (response) {
    if (!response.ok) {
      throw new Error(response.status)
    }

    return response.json()
  })
  .then(function (geojson) {
    L.geoJSON(geojson).addTo(map)
  })
  .catch(function (error) {
    console.trace(error)
  })

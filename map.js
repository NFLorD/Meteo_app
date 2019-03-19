var mymap = L.map("mapid").setView([0, 0], 20);
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoibmZsb3JkIiwiYSI6ImNqc2VrZGJjbDB6MTA0OXRibmdlbGx4czIifQ.rIl9x7lQ9DiAUypiKuQ45Q"
  }
).addTo(mymap);
var marker = L.marker([0, 0]).addTo(mymap);

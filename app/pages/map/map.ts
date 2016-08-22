import { Component } from '@angular/core';
import { MapData } from '../../providers/map-data';


@Component({
  templateUrl: 'build/pages/map/map.html'
})
export class MapPage {
  constructor(public mapData: MapData) {}

  ionViewLoaded() {
    this.mapData.getMap().then(mapData => {
      let mapEle = document.getElementById('map');

      let map = new google.maps.Map(mapEle, {
        //instead of center, map.fitBounds() is used.
        //center: mapData.find(d => d.center),
        //zoom: 16
      });

      var markers = [];//some array

      mapData.forEach(markerData => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        var image = {
          //http://stackoverflow.com/questions/8248077/google-maps-v3-standard-icon-shadow-names-equiv-of-g-default-icon-in-v2
          //from https://www.gstatic.com/mapspro/images/stock/extended-icons-highlight3.png
           url: './img/man1.gif',
          size: new google.maps.Size(55, 55),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 20)
        };

        let marker = new google.maps.Marker({
          position: markerData,
          map: map,
          title: markerData.name,
          icon: markerData.special ? image : null
        });
        markers.push(marker);

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < markers.length; i++) {
          bounds.extend(markers[i].getPosition());
      }
      map.fitBounds(bounds);

      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

    });
  }
}

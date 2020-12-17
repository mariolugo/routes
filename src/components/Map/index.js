/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

let map = null;
let directionsService = null;
let polylines = [];
let bounds = null;
/**
 *
 * This is the map component
 */
export const Map = ({
  lat,
  lng,
  zoom,
  mapRef,
  disableDefaultUI,
  zoomControl,
  scaleControl,
  fullscreenControl,
}) => {
  // have the map ref on the state
  const [localMapRef, setlocalMapRef] = useState(null);
  console.log('localMapRef', localMapRef);
  // old current highlight, this is used to remove the highlight on the previous marker
  //   const [currentHighlight, setCurrentHighlight] = useState();
  // map reference
  const mapDivRef = useRef();

  // options given to the map
  const options = {
    center: { lat, lng },
    zoom,
    disableDefaultUI,
    zoomControl,
    scaleControl,
    fullscreenControl,
    clickableIcons: false,
    clickableLabels: false,
    streetViewControl: false,
  };

  const drawLine = (path, options) => {
    console.log('options', options, path);
    const line = new google.maps.Polyline({
      path,
      ...options,
    });

    line.setMap(map);
    return line;
  };

  const calculateAndDisplayRoute = () => {
    var request = {
      origin: 'Yacatas 403, Narvarte Poniente',
      destination: 'Juan de la Barrera 7, Condesa',
      travelMode: 'DRIVING',
      provideRouteAlternatives: true,
    };
    directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        console.log('result', result);

        const routes = result.routes;
        // routes.forEach((route, i) => {
        //   displayRoute(route, i);
        // });
        // draw the lines in reverse orde, so the first one is on top (z-index)// in reverse
        for (let i = routes.length - 1; i >= 0; i--) {
          const isFirst = i == 0;
          const options = {
            strokeColor: isFirst ? '#00458E' : '#999999',
            strokeWeight: isFirst ? 8 : 6,
            strokeOpacity: 1.0,
          };

          console.log('routes', routes);

          const line = drawLine(routes[i].overview_path, options);
          polylines.push(line);

          console.log('line', line);

          bounds = line.getBounds(bounds);
        }
        map.fitBounds(bounds);
      }
    });
  };

  // this will add the map, we use an empty dependency array to simulate "ComponentDidMount"
  useEffect(() => {
    const google = window.google;

    // creates the new map and add it to the global variable for future use.
    if (map === null && mapDivRef.current !== null) {
      map = new google.maps.Map(mapDivRef.current, {
        ...options,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
      });

      directionsService = new google.maps.DirectionsService();
      bounds = new google.maps.LatLngBounds();

      google.maps.Polyline.prototype.getBounds = function (startBounds) {
        if (startBounds) {
          bounds = startBounds;
        } else {
          bounds = new google.maps.LatLngBounds();
        }

        this.getPath().forEach((item) => {
          bounds.extend(new google.maps.LatLng(item.lat(), item.lng()));
        });
        return bounds;
      };

      mapRef(map);
      setlocalMapRef(map);

      calculateAndDisplayRoute('', '');
    }
  }, []);

  // this will

  return <div id="map" ref={mapDivRef} style={{ width: '100%', height: '100%' }} />;
};

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number,
  mapRef: PropTypes.func,
  disableDefaultUI: PropTypes.bool,
  zoomControl: PropTypes.bool,
  scaleControl: PropTypes.bool,
  fullscreenControl: PropTypes.bool,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number,
      price: PropTypes.number,
    }),
  ),
  highlightMarker: PropTypes.string,
  highlightPost: PropTypes.string,
  focusPost: PropTypes.func,
};

Map.defaultProps = {
  lat: 19.41347,
  lng: -99.1757,
  zoom: 5,
  mapRef: () => {},
  disableDefaultUI: false,
  zoomControl: true,
  scaleControl: false,
  fullscreenControl: false,
  markers: [],
};

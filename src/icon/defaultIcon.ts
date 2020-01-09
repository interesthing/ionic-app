import { Icon, IconOptions, icon } from 'leaflet';
export const defaultIcon: Icon<IconOptions> = icon({
  // This define the displayed icon size, in pixel
  iconSize: [ 24, 49 ],
  // This defines the pixel that should be placed right above the location
  // If not provided, the image center will be used, and that could be awkward
  iconAnchor: [ 12, 49 ],
  // The path to the image to display. In this case, it's a Leaflet asset
  iconUrl: './assets/icon/marker-interest.png',
  // The path to the image's shadow to display. Also a leaflet asset
  
});

export const userIcon: Icon<IconOptions> = icon({
    // This define the displayed icon size, in pixel
    iconSize: [ 24, 49 ],
    // This defines the pixel that should be placed right above the location
    // If not provided, the image center will be used, and that could be awkward
    iconAnchor: [ 12, 49 ],
    // The path to the image to display. In this case, it's a Leaflet asset
    iconUrl: './assets/icon/user-marker.png',
    // The path to the image's shadow to display. Also a leaflet asset
    //shadowUrl: 'leaflet/marker-shadow.png',
  });
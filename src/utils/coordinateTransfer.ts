export function coordinateToString(latitude:number , longitude:number){
   const latDirection = latitude>=0? 'N' :'S';
   const lngDirection = longitude>=0? 'E' :'W';

   const absLat = Math.abs(latitude);
   const absLng = Math.abs(longitude);

   return `${absLat}°${latDirection} ${absLng}°${lngDirection}`
}
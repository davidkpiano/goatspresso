
function deg2rad(deg) {
    return (deg) * (Math.PI/180)
}

module.exports = {

  miles : function(lat1,long1,lat2,long2) {
  console.log(lat1,long1,lat2,long2);
    var R = 3961; // Radius of the earth in miles
    var dLat = deg2rad(+lat2 - +lat1);  // deg2rad below
    var dLong = deg2rad(+long2 - +long1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLong/2) * Math.sin(dLong/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in miles
    return d;
  }
}

// Mapa Leaflet
	var mapa = L.map('mapid').setView([9.8, -84.25], 8);

// Definición de capas base
	var capa_osm = L.tileLayer(
		'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
		{
			maxZoom: 19,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}
		).addTo(mapa);
		
	var  esri  =  L . tileLayer (
		'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' , 
		{
			atribución : 'Tiles & copy; Esri & mdash; Fuente: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP y la comunidad de usuarios de GIS '
		}
		) . addTo ( mapa ) ;
		
	
// Conjunto de capas base
	var capas_base = {
		"OSM": capa_osm ,
		"ESRI" : esri ,
	};
	
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);

// Capa vectorial Acuifero Belen en formato GeoJSON
$.getJSON("https://marce27.github.io/Dtarea2/acuifero_belen.geojson", function(geodata) {
  var capa_asp = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#013220", 'weight': 2.5, 'fillOpacity': 0.5}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Vulnerabilidad</strong>: " + feature.properties.acuifero_belen + "<br>" + "<strong>Vulnerab</strong>: " + feature.properties.Vulnerab;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_asp, 'Acuifero Belen');
});	

$.getJSON("https://marce27.github.io/Dtarea2/fallas_cuaternario.geojson", function(geodata) {
  var capa_fal = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "yellow", 'weight': 2.0, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Fallas</strong>: " + feature.properties.fallas_cuaternario + "<br>" + "<strong>FID</strong>: " + feature.properties.FID;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_fal, 'Fallas');
});	

$.getJSON("https://marce27.github.io/Dtarea2/sitios_FH.geojson", function(geodata) {
  var capa_sit = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "red", 'weight': 2.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Sitios Arqueológicos</strong>: " + feature.properties.sitios_FH + "<br>" + "<strong>Nombre</strong>: " + feature.properties.Nombre;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_sit, 'Sitios Arqueológicos');
});	


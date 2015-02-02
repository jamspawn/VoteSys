Template.prospectDetail.rendered = function(){
	//google.maps.event.addDomListener(window, 'load', initialize);
	setTimeout(function(){
		//alert('is shit?');
		initialize();
	},2000)
	//initialize();
	//window.onload = loadScript;

}

function initialize() {
	//alert('no shit man')
	var lt = Number($('#lt').val());
	var ln = Number($('#ln').val());
	//alert('latitud:'+lt+' longitud:'+ln);
	var myLatlng = new google.maps.LatLng(lt, ln);
	var mapOptions = {
		zoom: 18,
		center: myLatlng
	};

	var map = new google.maps.Map(document.getElementById('mapcontainer'),mapOptions);
	//alert('nope');
	var marker = new google.maps.Marker({
	    position: myLatlng,
	    map: map,
	    title:"Creado en esta ubicacion"
	});
}

/*function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAit3oBPOKtO53pVU3HcnHPDeSRgUG6dAQ';
  document.body.appendChild(script);
}*/
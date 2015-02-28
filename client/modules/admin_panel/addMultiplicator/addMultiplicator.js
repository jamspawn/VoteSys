Template.addMultiplicator.rendered = function(){
	
	posc = {
		lat:'desconocido',
		lon:'desconocido'
	}

	getLocation();
	//alert(Session.get('geoAllowed')+' wao')
	Meteor.subscribe('prospectos');

}

Template.addMultiplicator.events({
	'submit #addNewProspect' : function(e){
		e.preventDefault();

		var data = {
			mult : true,
			cate : $('#ptip').val(),
			name : $('#pname').val(),
			lname: $('#plname').val(),
			cc	 : $('#pcedula').val(),
			mail : $('#pemail').val(),
			addr : $('#paddres').val(),
			phon : $('#pphone').val(),
			mobil: $('#pmobile').val(),
			prof : $('#pocu').val(),
			matr : $('#pmat').val(),
			notas: $('#pnotif').val(),
			longi: posc.lat,
			latit: posc.lon
		}
		
		var loggedInUser = Meteor.user();
		if(loggedInUser){
			var add = Meteor.call('addProspects',data,function(error,result){
				//error, result;
				//console.log(result);
				if(result == 'done'){
					alert('Multiplicador Ingresado');
				}
				else{
					alert(result);
				}
			});
			
		}
	}

})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Este navegador no soporta geolocalizacion');
    }
}

function showPosition(position) {
    posc.lat = position.coords.latitude;
    posc.lon = position.coords.longitude;
    Session.set('geoAllowed',true);
}

function showError(error) {
	Session.set('geoAllowed',false);
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}
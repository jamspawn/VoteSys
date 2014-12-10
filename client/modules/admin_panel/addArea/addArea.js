Template.addArea.events({
	'click #atype li' : function(e){
		var valor = $('#'+e.currentTarget.id).find('a').html();
		var atype = $('#'+e.currentTarget.id).attr('id');
		if(atype== 'zona'){
			Session.set('atype','zone_inputs');
		}
		else if(atype== 'comu'){
			var dispZone = Areas.find({tipo:'Zona'}).count();
			if(dispZone == 0){
				alert('no se ha creado ninguna Zona')
			}
			else{
				Session.set('atype','comune_inputs')
			}
			
		}
		else{
			var dispZone = Areas.find({tipo:'Zona'}).count();
			if(dispZone == 0){
				alert('no se ha creado ninguna Zona')
			}
			else{
				var dispZone = Areas.find({tipo:'Comuna'}).count();
				if(dispZone == 0){
					alert('no se ha creado ninguna Comuna')
				}
				else{
					Session.set('atype','squad_inputs')
				}
				
			}			
		}
			
		$('#atypei').val(valor);
	},
	'submit #add-area' : function(e){
		e.preventDefault();
		var area = {
			desc : $('#adesc').val(),
			cod : $('#acode').val(),
			tip : $('#atypei').val(),
			zon : $('#aczone').val(),
			com : $('#accomu').val()
		}
		var loggedInUser = Meteor.user()

	    if (loggedInUser) {
	    	if (Roles.userIsInRole(loggedInUser, ['admin','techsup'])){
	    		
	    		if(area.tip=='Cuadrante'){
	    			var ae = Areas.find({tipo:area.tip, codigo:area.com+''+area.cod}).count();
	    		}
	    		else{
	    			var ae = Areas.find({tipo:area.tip, codigo:area.zon+''+area.com+''+area.cod}).count();
	    		}
	    		if(ae == 0){
	    			if(area.tip == 'Zona'){
	    				area.zon ='';
	    				area.com='';
	    				Areas.insert({
							tipo: area.tip,
							descripcion: area.desc,
							codigo: area.cod
						});
						
	    			}
	    			else if(area.tip == 'Comuna'){
	    				area.com='';
	    				Areas.insert({
							tipo: area.tip,
							descripcion: area.desc,
							codigo: area.zon+''+area.cod,
							zona: area.zon
						});
						
	    			}
	    			else{
	    				Areas.insert({
							tipo: area.tip,
							descripcion: area.desc,
							codigo: area.com+''+area.cod,
							zona: area.zon,
							comuna: area.com
						});
						area.zon ='';
						
	    			}
	    			alert(area.tip+' creada con el codigo '+area.zon+''+area.com+''+area.cod);
						
				}
				else{
					alert('esta '+area.tip+' ya existe en el sistema');
				}
		    }
	      
	    }
	    else{
	    	throw new Meteor.Error(403, "Access denied")
	    }

		/*var es = Meteor.call('probandoMetodos', function(error, result){
			error,result;
		})

		console.log(ins+' '+es);

		if(ins == 1){
			alert('Area creada');
		}
		else if(ins == 2){
			alert('El area ya existe');
		}*/
	}

})

Template.addArea.rendered = function(){
	Meteor.subscribe('areas');
}


Template.addArea.helpers({
    isType:function(){
       return Session.get('atype');
    }
})
Template.addColaborator.events({
	'click #ctype li' : function(e){
		var valor = $('#'+e.currentTarget.id).find('a').html();
		var ctype = $('#'+e.currentTarget.id).attr('id');
		if(ctype== 'lzo'){
			Session.set('ctype','zone_lead_inputs');
		}
		else if(ctype== 'lco'){
			var dispZone = Areas.find({tipo:'Zona'}).count();
			if(dispZone == 0){
				alert('no se ha creado ninguna Zona')
			}
			else{
				Session.set('ctype','com_lead_inputs')
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
					Session.set('ctype','cuad_lead_inputs')
				}
				
			}			
		}
			
		$('#ctypei').val(valor);
	},
	'submit #add-col' : function(e){
		e.preventDefault();
		var TEMP_accesCode = makepass();
		var colab = {
			keyp : TEMP_accesCode,
			tip : $('#ctypei').val(),
			cc : $('#cedula').val(),
			email : $('#email').val(),
			zone : $('#czone').val(),
			comu : $('#ccomu').val(),
			squa : $('#ccuad').val()
		}
		var loggedInUser = Meteor.user()

	    if (loggedInUser) {
	    	//alert(JSON.stringify(colab));
	    		var ce = Colaboradores.find({cc:colab.cc}).count();
	    		if(colab.tip=='Lider Cuadrante'){
	    			
	    		}
	    		else if(colab.tip == 'Lider Comuna'){
	    			colab.squa = "";

	    		}
	    		else if(colab.tip == 'Lider Zona'){
	    			colab.comu = "";
	    			colab.squa = "";
	    		}
	    		if(ce == 0){
	    			Meteor.call('addColaborator',colab,function(error, result){
	    				error,result;
	    			});

	    			Colaboradores.insert({
						tipo: colab.tip,
						cc: colab.cc
					});

	    			/*if(colab.tip == 'Zona'){
	    				Colaboradores.insert({
							tipo: colab.tip,
							descripcion: colab.desc,
							codigo: colab.cod
						});
						
	    			}
	    			else if(colab.tip == 'Comuna'){
	    				colab.com='';
	    				Colaboradores.insert({
							tipo: colab.tip,
							descripcion: colab.desc,
							codigo: colab.zon+''+colab.cod,
							zona: colab.zon
						});
						
	    			}
	    			else{
	    				Colaboradores.insert({
							tipo: colab.tip,
							descripcion: colab.desc,
							codigo: colab.com+''+colab.cod,
							zona: colab.zon,
							comuna: colab.com
						});
						colab.zon ='';
						
	    			}*/
	    			alert(colab.tip+' creado con el usuario '+colab.cc+' y la clave '+colab.keyp+' \\n Los datos han sido enviados al correo correspondiente');
						
				}
				else{
					alert('este '+colab.tip+' ya existe en el sistema');
				}
			
	      
	    }
	    else{
	    	throw new Meteor.Error(403, "Access denied")
	    }

	}

})

Template.addColaborator.rendered = function(){
	Meteor.subscribe('colaboradores');
	Meteor.subscribe('areas');
}

Template.addColaborator.helpers({
    isType:function(){
       return Session.get('ctype');
    }
})

function makepass()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
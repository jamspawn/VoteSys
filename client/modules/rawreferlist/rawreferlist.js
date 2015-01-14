Template.rawreferlist.helpers({
	'multipliers' : function(){
		var p = Prospectos.find({esMulti:true});
		return p;
	},

	'refers' : function(mult){
		if (mult == 'na'){
			mult = false;
		}
		var p = Prospectos.find({esMulti:false, asoMulti:mult});
		return p;
	}
})

Template.rawreferlist.rendered = function(){
	listraw = Meteor.subscribe('prospectos');
}
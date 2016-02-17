var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var attendeesSchema=new Schema({
    id:Number,
    first_name:'String',
    last_name:'String',
    country:'String',
	title:'String',
	company:'String',
	importance:Number,
	bio:'String',
	interests:'String',
	thumbnail_url:'String',
	image_url:'String',
});

module.exports=mongoose.model('Attendees',attendeesSchema);
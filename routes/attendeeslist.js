var Attendees=require('../models/attendees');
var express=require('express');

//configure routes

var router=express.Router();
var pageSize = 25;
var pageNumber = 2;

router.route('/attendeeslist')
    .get(function(req,res){
		res.header("Access-Control-Allow-Origin", "*"); //important, otherwise its not working
		//return the minimal information to render the list of attendees.
		var page = parseInt(req.query.page),
         size = parseInt(req.query.size),
         skip = page > 0 ? ((page - 1) * size) : 0;

       Attendees.find({}, { thumbnail_url: 1, first_name: 1, last_name: 1, first_name: 1, title: 1, company: 1, country: 1, interests: 1, id: 1, _id: 0 })
  .sort("-importance").skip(skip > 0 ? ((skip-1)*size) : 0).limit(size) // Sorting with Importance and Limiting the data to 25
  .exec(function(err,attendeeslist){
           if(err)
                res.send(err);
           res.json(attendeeslist);
       });
    })

    .post(function(req,res){
        var attendees=new Attendees(req.body);
        attendees.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'Attendees Added'});
        });
    });

router.route('/attendeeslist/attendee/:id')
    .put(function(req,res){
        Attendees.findOne({id:req.params.id},function(err,attendees){

            if(err)
                res.send(err);

           for(prop in req.body){
                attendees[prop]=req.body[prop];
           }

            // save the attendees
            attendees.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Attendees updated!' });
            });

        });
    })

    .get(function(req,res){
		res.header("Access-Control-Allow-Origin", "*"); //important, otherwise its not working
        Attendees.findOne({id:req.params.id},{_id: 0},function(err, attendees) {
            if(err)
                res.send(err);

            res.json(attendees);
        });
    })

    .delete(function(req,res){
        Attendees.remove({
            id: req.params.id
        }, function(err, attendees) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted attendees' });
        });
    });

module.exports=router;

// make AJAX call to Attendees List
function loadAttendee(ids)
		{
			
			$.getJSON('http://127.0.0.1:8000/api/attendeeslist/attendee/'+ids, function (data) {
				$(".og-expander").css('display','none');
				var showInterest =  data.interests;
				showInterest = showInterest.replace(/[{|}|"|/]/g,'');
				var pop = '<div class="og-expander" style="transition:height 350ms; height: 500px;">';
				pop +='<div class="og-expander-inner"><span class="og-close"></span>';
				pop +='<div class="og-fullimg"><div class="og-loading" style="display: none;"></div>';
				pop +='<img style="display: inline;" src="'+data.image_url+'"></div>';
				pop +='<div class="og-details"><h3>'+data.first_name+' '+data.last_name+'</h3>';
				pop +='<p>Title: '+data.title+'</p>';
				pop +='<p>Company: '+data.company+'</p>';
				pop +='<p>Country: '+data.country+'</p>';
				pop +='<p>Bio: '+data.bio+'</p>';
				pop +='<p>Interests: '+showInterest+'</p>';
				pop +='</div></div></div>';
				$('#displayDetails').append(pop);
				$(window).scrollTop($("#displayDetails").offset().top);
				$('#displayDetails').on( 'click', function() {
					$(".og-expander").css('display','none');
				})
			});
		} 
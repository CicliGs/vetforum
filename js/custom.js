var control_timeout, footerHeight;
$(document).foundation();
$(document).ready(function(){
    $('.phone-mask').on('input', function () {
        this.value = this.value.replace(/[^0-9+\-)(]/g, '');
    });
	//$("html").niceScroll({ autohidemode: false });
	$('#menu').localScroll({hash:true, onAfterFirst:function(){$('html, body').scrollTo( {top:'-=25px'}, 'fast' );}});
	$('.flexslider').flexslider({
      animation: "fade",
      directionNav: true,
      controlNav: false,
      pauseOnAction: true,
      pauseOnHover: true,
      direction: "horizontal",
      slideshowSpeed: 5500
    });
	
	$('#button-send').click(function(event){
		$('#button-send').html('Sending E-Mail...');
		event.preventDefault();
		
		$('html, body').scrollTo( $('#contact'), 'fast' );
		$.ajax({
			type: 'POST',
			url: 'send_form_email.php',
			data: $('#contact_form').serialize(),
			success: function(html) {
				if(html.success == '1')
				{
					$('#button-send').html('Send E-Mail');
					$('#success').show();
				}
				else
				{
					$('#button-send').html('Send E-Mail');
					$('#error').show();
				}					
			},
			error: function(){
				$('#button-send').html('Send E-Mail');
				$('#error').show();
			}
		});
		
	});

	var seconds = Math.floor((1666328400000 - Date.now()) / 1000);
	var days = Math.floor(seconds / 3600 / 24);
	seconds -= days * 3600 * 24;
	var hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
	var minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if (days < 10) {
        days = '0' + days;
	}
    if (hours < 10) {
        hours = '0' + hours;
	}
    if (minutes < 10) {
        minutes = '0' + minutes;
	}
    if (seconds < 10) {
        seconds = '0' + seconds;
	}
    $('#timer_day').text(days);
    $('#timer_hour').text(hours);
    $('#timer_minute').text(minutes);
    $('#timer_second').text(seconds);
    setTimeout(changeTime, 1000);
});

function changeTime() {
    var seconds = $('#timer_second').text();
    if (seconds > 0) {
        seconds--;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        $('#timer_second').text(seconds);
    } else {
        var minutes = $('#timer_minute').text();
        if (minutes > 0) {
            minutes--;
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            $('#timer_second').text(59);
            $('#timer_minute').text(minutes);
        } else {
            var hours = $('#timer_hour').text();
            if (hours > 0) {
                hours--;
                if (hours < 10) {
                    hours = '0' + hours;
                }
                $('#timer_minute').text(59);
                $('#timer_hour').text(hours);
            } else {
                var days = $('#timer_day').text();
                if (days > 0) {
                    days--;
                    if (days < 10) {
                        days = '0' + days;
                    }
                    $('#timer_second').text(59);
                    $('#timer_minute').text(59);
                    $('#timer_hour').text(23);
                    $('#timer_day').text(days);
                }
            }
        }
    }
    setTimeout(changeTime, 1000);
}

function valemail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

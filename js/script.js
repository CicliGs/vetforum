$(document).ready(function() {
var x =0;


  $('a.lastforums').click(function() {

    $('.lastForums').addClass( "show" );
    $('.all').addClass( "hide" );
    x =1;

  });

      $('a.simple').click(function() {
          if (x == 1){
            $('.lastForums').removeClass( "show" );
            $('.all').removeClass( "hide" );
          }
          $('html, body').animate({
              scrollTop: $($(this).attr('href')).offset().top - 67
          }, 1000);
      });
        var date = new Date(2017, 9, 13), day = "дней";
       date = Math.floor((date-Date.now())/86400000) + 1;
       $(".days").html(date);
       if (date <5){
          if (date == 1){
            day = "день";
          } else
          day = "дня";
       }
       if (date > 20){
        date = date%10;
        if (date <5){
           if (date == 1){
             day = "день";
           } else
           day = "дня";
        }
       }
      $(".day").html(day);
// width 720


    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "../template/mail.php", //Change
            data: th.serialize()
        }).done(function() {
            alert("Спасибо за регистрацию");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

});

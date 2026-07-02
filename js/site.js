/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function(){
    $(window).on('scroll', function(){
        if ($('#nav-container').hasClass('affix') && window.matchMedia('(max-width: 768px)').matches){
            $('#logo-in-mobile').show();
        } else {
            $('#logo-in-mobile').hide();
        }
//        if ($('#nav-container').hasClass('affix-top')){
//            $("ul.nav li:first-child").addClass('active');
//        }
    });
    
    var exist= $('#back-top').length;
        if(exist == 0){ 
          $("body").append("<p id='back-top'><a href='/'><span id='button'></span><span id='link'></span></a></p>");
        }
        $("#back-top").hide();
        $(function () {
          $(window).scroll(function () {
            if ($(this).scrollTop() > 400) {
              $('#back-top').fadeIn();
            } else {
              $('#back-top').fadeOut();
            }
          });
          var remcl = function(){
              $('li.active').removeClass('active');
              window.location.replace("/");
          };
          // scroll body to 0px on click
          $('#back-top a').click(function () {
            $('body,html').animate({
              scrollTop: 0
            }, 800, remcl);
            return false;
          });
        });

    var h = [];
    var maxh = 0;
    var diff =0;
    $('.wrapper-paket-cost').each(function(i){        
        h[i] = $(this).height();        
        if (h[0] < h[1]){
            maxh = h[1];
            diff = h[1] - h[0];
        } else {
            maxh = h[0];
            diff = h[0] - h[1];
        }
    });
    $('.wrapper-paket-cost').height(maxh);
    var obj = $('div.discont-total');
    $(obj[0]).css({marginTop: diff });
    
    var addHasError = function(element){
        $(element).parent().addClass("has-error").tooltip({title: "Обязательно к заполнению", placement: "auto", trigger: "focus"});
    };
    var addHasErrorSmall = function(element){
        $(element).parent().addClass("has-error");
    };
    
    //$('#infoaboutforum').on('change', function(){alert ($('#infoaboutforum option:selected').text());});
    $('#claim-urlico').on('keypress', function(e){
        if (e.keyCode == 13){
            e.preventDefault();
        }
    });
    $('#clickclaim').on('click', function(){
        $('.modal-body').removeClass('alert-success');
        $('p#claim-ok').hide();
        $('div#errors').hide();
        $('#claim-urlico').show();
    });
    
    $('#doclaim').on('click', function (e){
       e.preventDefault();
       var email = $('#email').val();
       var contactperson = $('#contactperson').val();
       var positionperson = $('#positionperson').val();       
       var companyname = $('#companyname').val();
       var phonenumber = $('#phonenumber').val();
       var costevent = $('#costevent option:selected').text();
       var infoaboutforum = $('#infoaboutforum option:selected').text();       
       var captcha = $('#captcha').val();
       
       if (!email){
           addHasError('#email');
           return false;
       }
       if (!contactperson){
           addHasError('#contactperson');
           return false;
       }
       if (!companyname){
           addHasError('#companyname');
           return false;
       }
       if (!phonenumber){
           addHasError('#phonenumber');
           return false;
       }
       if (!captcha){
           addHasError('#captcha');
           return false;
       }
       
       $.post("template/ajax.php",
             {
                email:email,
                contactperson: contactperson,
                positionperson: positionperson,                
                companyname: companyname,
                phonenumber: phonenumber,
                costevent: costevent,
                infoaboutforum: infoaboutforum,
                captcha: captcha
             }, function(result){
                    if (result.errors && result.errors.length >0){
                        if (result.errors[0]['Email']){
                            addHasErrorSmall('#email');
                            $('#email').tooltip({title: result.errors[0]['Email']});
                        } else {$('#email').parent().removeClass('has-error');}
                        if (result.errors[0]['Компания']){
                            addHasErrorSmall('#companyname');
                            $('#companyname').tooltip({title: result.errors[0]['Компания']});
                        } else {$('#companyname').parent().removeClass('has-error');}
                        if (result.errors[0]['Должность']){
                            addHasErrorSmall('#positionperson');
                            $('#positionperson').tooltip({title: result.errors[0]['Должность']});
                        } else {$('#positionperson').parent().removeClass('has-error');}
                        if (result.errors[0]['Контактное лицо']){
                            addHasErrorSmall('#contactperson');
                            $('#contactperson').tooltip({title: result.errors[0]['Контактное лицо']});
                        } else {$('#contactperson').parent().removeClass('has-error');}
                        if (result.errors[0]['Номер телефона']){
                            addHasErrorSmall('#phonenumber');
                            $('#phonenumber').tooltip({title: result.errors[0]['Номер телефона']});
                        } else {$('#phonenumber').parent().removeClass('has-error');}
                        if (result.errors[0]['Проверка']){
                            addHasErrorSmall('#captcha');
                            $('#captcha').tooltip({title: result.errors[0]['Проверка'], placement: 'bottom'});
                        } else {$('#captcha').parent().removeClass('has-error');}                        
                        
//                        jQuery.each(result.errors[0], function(k,v){
//                            $('#errors').show().append('<p class="text-left" style="font-size: 0.7em; padding: 2px">В поле '+k+' ошибка: ' +v+'</p>');
//                        });
                        
                    } else if(result.ok) {
                        $('#claim-urlico').hide();
                        $('.modal-body').addClass('alert-success').append('<p id="claim-ok">'+result.ok+'</p>');
                        $('button.close').on('click', function(){
                            window.location.replace('/');
                        });
                    };
                });             
           
    });
   
});



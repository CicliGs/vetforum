$(document).ready(function(e){
    $('.video-play').click(function(event){
        console.log($(this).attr('id'));
        $('.modal-content').html('<iframe width="100%" height="480" src="'+$(this).attr('id')+'"></iframe>');
        $('#modal').modal('show');
        return false;
    });
    $('.goToRegButton').click(function(event){
        var destination = $('#reglink').offset().top;
        if ($('#top').css('position') == 'fixed') {
            destination -= $('#top').height();
        }
        $('html').animate({ scrollTop: destination }, 1100);
        return false;
    });
    $('#goToContactsButton').click(function(event){
        var destination = $('#contacts').offset().top;
        $('html').animate({ scrollTop: destination }, 1100);
        return false;
    });

    $('#myCarousel').carousel({
        interval: 10000
    });

    $('.carousel .item').each(function(){
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length>0) {
            next.next().children(':first-child').clone().appendTo($(this));
        }
        else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });

    $('#top-form').submit(function(e){
        e.preventDefault();
        var form = $(this);
        form.find('button').attr('disabled', true);
        $.ajax({
            type: "POST",
            data: {
                name: form.find('#top-name').val(),
                phone: form.find('#top-phone').val(),
                email: form.find('#top-email').val(),
                bag: form.find('#top-bag').val()
            },
            url: "/register.php",
            success: function(data) {
                form.trigger("reset");
                form.find('button').removeAttr('disabled');
                $('#regmodal').modal('hide');
                setTimeout(function () {
                    $('#regsuccess').modal('show');
                }, 500);
            }
        });
        return false;
    });

    $('#partner-form').submit(function(e){
        e.preventDefault();
        var form = $(this);
        form.find('button').attr('disabled', true);
        $.ajax({
            type: "POST",
            data: {
                name: form.find('#partner-name').val(),
                company: form.find('#partner-company').val(),
                phone: form.find('#partner-phone').val(),
                email: form.find('#partner-email').val(),
                type: 'Стать партнером'
            },
            url: "/register.php",
            success: function(data) {
                form.trigger("reset");
                form.find('button').removeAttr('disabled');
                $('#regmodal_partner').modal('hide');
                setTimeout(function () {
                    $('#regsuccess').modal('show');
                }, 500);
            }
        });
        return false;
    });

    $('#student-form').submit(function(e){
        e.preventDefault();
        var form = $(this);
        var formData = new FormData(this);
        form.find('button').attr('disabled', true);
        $.ajax({
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            url: "/student_register.php",
            success: function(data) {
                $('#student-form').trigger("reset");
                form.find('button').removeAttr('disabled');
                $('#regmodal_student').modal('hide');
                setTimeout(function () {
                    $('#regsuccess').modal('show');
                }, 700);
            }
        });
        return false;
    });

    $('#bottom-form').submit(function(e){
        e.preventDefault();
        var form = $(this);
        $.ajax({
            type: "POST",
            data: {
                firstname: $('#bottom-firstname').val(),
                email: $('#bottom-email').val(),
                phone: $('#bottom-phone').val()
            },
            url: "/register.php",
            success: function(data) {
                $('#bottom-form').trigger("reset");
                form.find('button').removeAttr('disabled');
                $('#regsuccess').modal('show');
            }
        });
        return false;
    });
    $('.s').mouseover(function(){
        var bg = $(this).css('background-image');
        var text = $(this).data('text');
        var fs = $(this).data('fs');
        var mt = $(this).data('mt');
        $('#big-s').css('background-image', bg.replace('ico','ico-b'));
        $('#cover-s').css({'font-size': fs+'px','margin-top': mt+'px'});
        $('#cover-s').text(text);
    });

    $('.reviews-list').slick({
        slidesToShow: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false
    });
});
$('#modal').on('hidden.bs.modal', function () {
    $("#modal iframe").attr("src", $("#modal iframe").attr("src"));
});

(function () {
    var eventDate = new Date('2026-09-24T10:00:00+03:00');

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function updateTimers() {
        var now = new Date();
        var diff = Math.max(0, eventDate - now);
        var days = Math.floor(diff / 86400000);
        var hours = Math.floor((diff % 86400000) / 3600000);
        var minutes = Math.floor((diff % 3600000) / 60000);
        var seconds = Math.floor((diff % 60000) / 1000);

        $('[data-countdown]').each(function () {
            $(this).html(
                '<span>' + pad(days) + '<small>д</small></span>' +
                '<span>' + pad(hours) + '<small>ч</small></span>' +
                '<span>' + pad(minutes) + '<small>м</small></span>' +
                '<span>' + pad(seconds) + '<small>с</small></span>'
            );
        });
    }

    updateTimers();
    setInterval(updateTimers, 1000);

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    var header = document.querySelector('#header');
    var toTop = document.querySelector('#toTop');
    if (header && toTop) {
        var topObserver = new IntersectionObserver(function (entries) {
            toTop.classList.toggle('show', !entries[0].isIntersecting);
        }, { threshold: 0.01 });
        topObserver.observe(header);
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
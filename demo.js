$(function () {
  $('#register-form').off('submit').on('submit', function (e) {
    e.preventDefault();
    this.reset();
    $('#top-form-submit').prop('disabled', true);
    $('#regmodal').modal('hide');
    $('#regsuccess').modal('show');
  });

  $('#actForm').on('submit', function (e) {
    e.preventDefault();
    $('#modalActs').modal('hide');
  });

  if ($.fn.mask) {
    $('.phone-mask').mask('+375 (99) 999-99-99');
  }
});

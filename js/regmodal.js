function modalSubmitArrow() {
  return ' <span>&#8594;</span>';
}

function setModalSubmitLabel($button, text) {
  $button.html(text + modalSubmitArrow());
}

function openRegistrationModal(type) {
  var modal = $('#regmodal');
  var $title = modal.find('#modal-title');
  var $typeInput = modal.find('#reg-type');
  var $submit = modal.find('#top-form-submit');
  var $companyGroup = $('#company-group');
  var $companyInput = $('#top-company');
  $('#agree_reg, #agree_reg_2').prop('checked', false);
  $('#top-form-submit').prop('disabled', true);
  if (type === 'partners') {
    $title.text('ВЫСТУПИТЬ ПАРТНЕРОМ ФОРУМА');
    $typeInput.val('Стать партнером');
    $companyGroup.show();
    $companyInput.prop('required', true);
    setModalSubmitLabel($submit, 'Стать партнером');
  } else if (type === 'speaker') {
    $title.text('ВЫСТУПИТЬ СПИКЕРОМ ФОРУМА');
    $typeInput.val('Стать спикером');
    $companyGroup.hide();
    $companyInput.prop('required', false);
    setModalSubmitLabel($submit, 'Стать спикером');
  } else {
    $title.text('РЕГИСТРАЦИЯ');
    $typeInput.val('Участник');
    $companyGroup.hide();
    $companyInput.prop('required', false);
    setModalSubmitLabel($submit, 'Принять участие');
  }
  modal.modal('show');
}

$(function () {
  $('#regmodal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
    $('#modal-title').text('РЕГИСТРАЦИЯ');
    $('#top-form-submit').prop('disabled', true);
  });
  $('#agree_reg, #agree_reg_2').on('change', function () {
    $('#top-form-submit').prop('disabled', !($('#agree_reg').is(':checked') && $('#agree_reg_2').is(':checked')));
  });
});

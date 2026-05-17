// select the First, visible, enabled text field on the page
// TODO: read about autofocus: http://diveintohtml5.info/forms.html#autofocus

$(document).ready(function() {
  $('input:text[value=""]:visible:enabled:first').focus();
});

/*
  Accessible Accordion demo with ARIA & Tabbing by Chris Yaxley
  http://codepen.io/chrisyaxley/pen/JsKhb

  TODO: multiple accordion
  ERROR: if I click on a title in one accordion the class of all the other accordion' will be removed
*/

function accordion() {
  // var openOnLoad = $(".accordion--title:first").next('.accordion--content');
  var openOnLoad = $('.accordion').find('.accordion--title:first').next('.accordion--content');

  // $(openOnLoad).slideDown();

  $(".accordion--title").on('focus', function () {
    if (!$(this).data("mouseDown"))
      $(this).click();
  });

  $(".accordion--title").on('mousedown', function () {
    $(this).data("mouseDown", true);
  });

  $(".accordion--title").on('mouseup', function () {
    $(this).removeData("mouseDown");
  });

  $(".accordion--title").on('click', function () {
    if ($(this).hasClass('open')) {
      //Close the current section
      $('.accordion--title').removeClass('open');
      $('.accordion--content').slideUp();
    } else {
      //close the prev section & open the newly click
      $('.accordion--title').removeClass('open');
      $('.accordion--content').slideUp(); //Side up all sections that are open & remove their open class
      $(this).addClass('open');
      var sectionToOpen = $(this).next('.accordion--content');
      $(sectionToOpen).slideDown();
    }
  });
}

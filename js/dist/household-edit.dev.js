"use strict";

$(".preloader").fadeOut("slow"); // Call the dataTables jQuery plugin

$(document).ready(function () {
  var table = $('#dataTable').DataTable({
    "paging": false,
    "ordering": false,
    "info": false,
    "searching": false,
    "editting": true
  });
  $("#popup-close").click(function () {
    $(".popup").remove();
  });
  $(".han-edit").click(function () {
    var selected = $(this).parent().parent();

    if (!selected.hasClass('tr-selected')) {
      table.$('tr.tr-selected').removeClass('tr-selected');
      selected.addClass('tr-selected');
    }
  });
  $(".han-remove").click(function () {
    var selected = $(this).parent().parent();

    if (!selected.hasClass('tr-selected')) {
      table.$('tr.tr-selected').removeClass('tr-selected');
      selected.addClass('tr-selected');
    }
  });
});
$(".preloader").fadeOut("slow"); // Call the dataTables jQuery plugin

$(document).ready(function () {
  var table = $('#dataTable').DataTable({
    "paging": false,
    "ordering": false,
    "info": false,
    "searching": false,
    "editting": true
  });
  $("#popup-close").click(function () {
    $(".popup").remove();
  });
  $(".han-edit").click(function () {
    var selected = $(this).parent().parent();

    if (!selected.hasClass('tr-selected')) {
      table.$('tr.tr-selected').removeClass('tr-selected');
      selected.addClass('tr-selected');
    }
  });
  $(".han-remove").click(function () {
    var selected = $(this).parent().parent();

    if (!selected.hasClass('tr-selected')) {
      table.$('tr.tr-selected').removeClass('tr-selected');
      selected.addClass('tr-selected');
    }
  });
});
$(".form-responsive").find(".form-control").each(function () {
  var targetItem = $(this).parent();

  if ($(this).val()) {
    $(targetItem).find("label").css({
      top: "-6px",
      fontSize: "1.2rem",
      color: "#858796"
    });
  }
});
$(".form-responsive").find(".form-control").focus(function () {
  $(this).parent(".input-block").addClass("focus");
  $(this).parent().find("label").animate({
    top: "-6px",
    fontSize: "1rem",
    color: "#858796"
  }, 400);
});
$(".form-responsive").find(".form-control").blur(function () {
  if ($(this).val().length == 0) {
    $(this).parent(".input-block").removeClass("focus");
    $(this).parent().find("label").animate({
      top: "20px",
      fontSize: "1.2rem"
    }, 400);
  }
});
/*-----------------------------------------------------------
 * Template Name    : RectCV - Personal Bootstrap 4 HTML Template
 * Author           : Narek Sukiasyan
 * Version          : 1.0.0
 * Created          : May 2020
 * File Description : Contact US script file for theme
 *--
 */

//Disable Form function
function contact_state(state) {
  if (state == "disable") {
    $("#contact-btn").removeClass("btn-loading");
    $("#contact-btn").removeClass("active");
    $("#contact-btn").addClass("disabled");

    $("#contact-form .form-control").each(function () {
      $(this).addClass("disabled");
    });
  }

  if (state == "loading") {
    $("#contact-btn").addClass("btn-loading");
  }
}

$(function () {
  this.sended = false;
  var that = this;

  var form = $("#contact-form"),
    successMessage = "Message Send",
    warningMessage = "Something wrong! Please try later";

  form.on("submit", function (event) {
    /*Change URL address if you need*/

    contact_state("loading");

    if (!that.sended) {
      $.ajax({
        url: "php/form.php",
        type: "POST",
        data: form.serialize(),
        success: function (response) {
          var d = JSON.parse(response);
          if (d.status == "success") {
            custom_alert(successMessage, "success");
            contact_state("disable");
          } else {
            custom_alert(warningMessage, "error");
            contact_state("disable");
          }
        },
        error: function (response) {
          custom_alert(warningMessage, "error");
          contact_state("disable");
        },
      });

      that.sended = true;
    }

    event.preventDefault();
  });
});

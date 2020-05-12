let count = 0;
let isBar = false;

$("#plane").click(function () {
  count++;
  if (count >= 5) {
    if (!isBar) {
      let bar = $("<span>| </span>");
      $("#about").before($(bar));
      isBar = true;
    }
    fly();
  }
});

function fly() {
  let drop = setInterval(function () {
    let top = $("#plane").offset().top;
    let bottom = $(window).height() - top - $("#plane").height();
    top = top + 0.2;
    if (bottom > 5) {
      $("#plane").css({
        position: "fixed",
        top: top,
      });
    }
  }, 100);
  let top = $("#plane").offset().top;
  top = top - 50;
  let left = $("#plane").offset().left;
  let roll = Math.random();
  let xdir = roll > 0.5 ? 1 : -1;
  left = left + xdir * 10;
  if (top > 5) {
    $("#plane").css({
      position: "fixed",
      top: top,
      left: left,
      width: $("#plane").width() + 10,
    });
    if ($("#plane").width() > 100) {
      //drop.clearInterval();
      let away = setInterval(function () {
        $("#plane").css({
          position: "fixed",
          left: $("#plane").offset().left + 3,
        });
      }, 10);
      setTimeout(away.clearInterval(), 10000);
    }
  }
}

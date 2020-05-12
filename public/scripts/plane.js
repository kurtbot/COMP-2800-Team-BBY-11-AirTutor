let count = 0;
let isBar = false;
let dropping;
let startFall = false;

$("#plane").click(function () {
  count++;
  if (count >= 5) {
    if (!isBar) {
      let bar = $("<span>| </span>");
      $("#about").before($(bar));
      isBar = true;
    }
    drop();
    fly();
  }
});
function drop(){
  if (!startFall){
  dropping = setInterval(function () {
    let top = $("#plane").offset().top - $(window).scrollTop();
    console.log(top)
    let bottom = $(window).height() - top - $("#plane").height();
    top = top + 2;
    if (bottom > 5) {
      $("#plane").css({
        position: "fixed",
        top: top,
      });
    }
  }, 100);
  startFall = true;
}
}
function fly() {

  let top = $("#plane").offset().top - $(window).scrollTop();
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
    if ($("#plane").width() > 200) {
      clearInterval(dropping)

      let away = setInterval(function () {
        console.log("why")
        $("#plane").css({
          position: "fixed",
          left: $("#plane").offset().left + 3,
        });
      }, 10);
      setTimeout(function(){clearInterval(away)}, 5000);
    }
  }
}

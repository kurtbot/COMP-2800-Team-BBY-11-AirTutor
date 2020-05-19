let count = 0;
let isBar = false;
let dropping;
let startFall = false;
const GAP = 10;
const LIMIT = 5;
/**
 * Events for clicking the plane.
 */
$("#plane").click(function () {
  count++;
  // When clicked for more than 5 times, start flying
  if (count >= LIMIT) {
    // Right after the 5th click, add a new image to where the plane was
    if (!isBar) {
      let bar = $("<img></img>");
      $(bar).attr("src", "./src/favicon.png")
      $(bar).css({
        "width":"30px",
        "margin":"0px 10px"
      })
      $("#about").before($(bar));
      isBar = true;
    }
    // Plane drops as time goes on
    drop();
    // Plane flies when clicked
    fly();
  }
});

/**
 * Start a interval function to let the plane drop
 */
function drop(){
  const INTERVAL = 100;
  if (!startFall){
  // The plane's position moves downwards every 0.1 second
  dropping = setInterval(function () {
    let top = $("#plane").offset().top - $(window).scrollTop();
    let bottom = $(window).height() - top - $("#plane").height();
    top = top + 2;
    // The plane only drops if its at least 5px above the bottom
    if (bottom > LIMIT) {
      $("#plane").css({
        position: "fixed",
        top: top,
      });
    }
  }, INTERVAL);
  startFall = true;
  }
}

/**
 * The plane flies up when clicked.
 */
function fly() {
  const RAISE = 50;
  const WAIT = 5000;
  const MAX = 200;
  let top = $("#plane").offset().top - $(window).scrollTop();
  top = top - RAISE;
  let left = $("#plane").offset().left;
  let roll = Math.random();
  // Plane flies left or right randomly when clicked
  let xdir = roll > 0.5 ? 1 : -1;
  left = left + xdir * GAP;
  // The plane only flies up if it's at least 5 px below the top
  if (top > LIMIT) {
    $("#plane").css({
      position: "fixed",
      top: top,
      left: left,
      width: $("#plane").width() + GAP,
    });
    // If the plane is larger than 200px wide, stops the plane from dropping, and send the plane to fly away
    if ($("#plane").width() > MAX) {
      clearInterval(dropping)
      // Fly away the plane by moving it towards the right until 5 seconds later (out of screen)
      let away = setInterval(function () {
        $("#plane").css({
          position: "fixed",
          left: $("#plane").offset().left + LIMIT,
        });
      }, GAP);
      setTimeout(function(){clearInterval(away)}, WAIT);
    }
  }
}


/**
 * Open and close side navigation
 * Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav
 */

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("main-sidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("main-sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
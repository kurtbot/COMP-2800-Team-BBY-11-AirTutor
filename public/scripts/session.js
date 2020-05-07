
document.getElementById("go-rating").onclick = gotoRating;



function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}

function gotoRating() {
    window.location.href = "/rating" + "?" + queryResult();
}
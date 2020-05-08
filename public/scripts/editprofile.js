$(document).ready(function(){
    $("#general-button").click(generalTab);
    $("#student-button").click(studentTab);
    $("#tutor-button").click(tutorTab);
})

function generalTab() {
    $("#student").hide();
    $("#general").show();
    $("#tutor").hide();
}

function studentTab() {
    $("#student").show();
    $("#general").hide();
    $("#tutor").hide();
}

function tutorTab() {
    $("#student").hide();
    $("#general").hide();
    $("#tutor").show();
}
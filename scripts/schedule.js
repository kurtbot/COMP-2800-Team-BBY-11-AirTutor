

let d = new Date();
let month = d.getMonth() + 1 + "";
let day = d.getDate();
let year = d.getFullYear();

if (month.length == 1){
    month = "0" + month;
}

document.querySelector("#date").value = year + "-" + month + "-" + day;



$(function(){
    var $select = $(".hour");
    for (i=0;i<=11;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

$(function(){
    var $select = $(".minute");
    for (i=0;i<=55;i = i + 5){
        $select.append($('<option></option>').val(i).html(i))
    }
});

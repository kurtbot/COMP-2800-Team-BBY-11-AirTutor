$( function() {
    $( "#datepicker" ).datepicker();
  } );
$(function(){
    var $select = $(".hour");
    for (i=0;i<=23;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

$(function(){
    var $select = $(".minute");
    for (i=0;i<=59;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});

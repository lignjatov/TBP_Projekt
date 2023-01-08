$(document).ready(function(){
    console.log("YAAAAS");
    $.getJSON("http://localhost:3000/API/paps",function(data){
        console.log(data);
        $("#keks").html(data);
    }); 
});
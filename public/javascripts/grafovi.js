var news
var updates;
var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

$(document).ready(function(){
    news = new Chart($("#graf1"),{
        type:'pie',
        data:{
            datasets:[{

                label:'Broj senzora',
                borderWidth:1
            }]
        },
        options:{
            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }
    });

    updates = new Chart($("#graf2"),{
        type:'bar',
        data:{
            datasets:[{

                label:'Broj upita',
                borderWidth:1
            }]
        },
        options:{
            indexAxis: 'y',
            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }
    });

    getActive();
    getActiveGraphInfo();
    getAllInputsInLastHour();
    broj_upita();
});


function getActive(){
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/API/aktivniSvi',
        success:function(data){
            var brojElemenata= data.length-1;
            console.log(brojElemenata);
            $("#brojAktivni").text("Broj aktivnih senzora je: "+brojElemenata);
        }
    },true);
}

function broj_upita(){
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/API/broj_upita_ukupno_u_satu',
        success:function(data){
            var brojElemenata= data.length-2;
            console.log(brojElemenata);
            $("#broj_upita").text("Broj upita u zadnjih sat vremena: "+brojElemenata);
        }
    },true);
}

function getActiveGraphInfo(){
    var labels = [];
    var graphdata = [];
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/API/aktivniVrste',
        success:function(data){
            var brojElemenata= data.length-1;
            for(i=1; i<=brojElemenata;i++){
                labels.push(data[i].row.columns[0]);
                graphdata.push(data[i].row.columns[2]);
            }
            for(i=0;i<labels.length;i++){
                addDataToGraph(labels[i],graphdata[i]);
            }
        }
    },true);
}


function getAllInputsInLastHour(){
    var labels = [];
    var graphdata = [];
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/API/upitiSat',
        success:function(data){
            var brojElemenata= data.length-1;
            for(i=1; i<=brojElemenata;i++){
                labels.push(data[i].row.columns[0]);
                graphdata.push(data[i].row.columns[1]);
            }
            for(i=0;i<labels.length;i++){
                addDataToBarGraph(labels[i],graphdata[i]);
            }
        }
    },true);
}




function addDataToGraph(label,data){
    news.data.labels.push(label);
    news.data.datasets.forEach((dataset)=>{
        dataset.data.push(data);
        dataset.backgroundColor.push(dynamicColors());
    })
    
    news.update();
}


function addDataToBarGraph(label,data){
    updates.data.labels.push(label);
    updates.data.datasets.forEach((dataset)=>{
        dataset.data.push(data);
    })
    
    updates.update();
}
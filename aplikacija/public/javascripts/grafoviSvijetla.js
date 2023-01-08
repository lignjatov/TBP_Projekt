var graf;
var grafovi=[];
$(document).ready(function(){
    prikupiSveSenzoreBrzine();
});


function prikupiSveSenzoreBrzine(){
    console.log("ye");
    $.ajax({
        
        type:'GET',
        url:'http://localhost:3000/API/svjetlost/senzori',
        success:function(data){
            for(i=1;i<data.length;i++){
                $("#senzoriBrzine").append(senzorSkeleton(i));

                graf = new Chart($("#senzor"+i),{
                    type:'line',
                    data:{
                        labels:[1,2,3,4,5],
                        datasets:[{
                            label:'Tijek podataka',
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
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
                grafovi.push(graf);
                unesiPodatke(data[i]);
            }
        }
    },true);
}

function unesiPodatke(data){
    graf.data.datasets.forEach((dataset)=>{
        dataset.label=data.row.columns[0];
        dataset.data=data.row.columns[1];
        });
    graf.update();
}


function senzorSkeleton(broj_senzora){
    var html='<div id="senzorNaziv'+broj_senzora+'"> <canvas id="senzor'+broj_senzora+'"> </canvas> </div>';
    return html;
}
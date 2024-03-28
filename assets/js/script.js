$(function () {
  $("#searchSuperHero").on("submit", function (event) {
    event.preventDefault();
    let name = $("#numberSuperHero"). val();
    console.log(name);
    $.ajax({
      type:'GET',
      url:'https://www.superheroapi.com/api.php/3525635500807579/'+name,
      contentType:'application/json',
      dataType:'json',
      success: (data) =>{
        console.log(data)
        renderData(data);
      },
      error:(error)=>{
        failData(error)
      }
    })
  });

const renderData =(data)=> {
if(!data){
  alert('No se encuentra información');
  return;
}

grafico(data);

// terminar de traer bien los datos
$('#card-title').text(`Nombre: ${data.name}`)
$('#card-img').attr('src', data.image.url)
$('#card-info').text(data.connections['group-affiliation'])
$('#card-info-1').text(`Publicado por: ${data.biography.publisher}`)
$('#card-info-2').text(`Ocupación: ${data.work.occupation}`)
$('#card-info-3').text(`Primera aparición: ${data.biography.publisher}`)
$('#card-info-4').text(`Altura: ${data.biography.publisher}`)
$('#card-info-5').text(`Peso: ${data.biography.publisher}`)
$('#card-info-6').text(`Alienzas: ${data.biography.publisher}`)
}

const grafico = (data)=>{
  let powerstats = data.powerstats;
  let statsdata = [];
  for (let key in powerstats) {
   statsdata.push({label:key, y: Number(powerstats[key])})
  }

  console.log(statsdata);


let chart = new CanvasJS.Chart("graphContainer", {
  animationEnabled: true,
  title: {
    text: `Estadisticas de poder para ${data.name}`
  },
  data: [{
    type:"bar",
    dataPoints:statsdata
  }]
});
return chart.render();
}

});

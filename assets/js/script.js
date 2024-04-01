$(function () {
  $("#searchSuperHero").on("submit", function (event) {
    event.preventDefault();
    const regexValidacion = /^[0-9]+$/gm;
    let name = $("#numberSuperHero").val();
    console.log(name);

    if (regexValidacion.test(name)) {
      getSuperHero(name);
    } else {
      $("#mensajeError").text(`Debes ingresar un número positivo`);
    }
    $("#numberSuperHero").val("");
    $("#mensajeErrorID").text("");
  });

  function getSuperHero(number) {
    $.ajax({
      type: "GET",
      url: "https://www.superheroapi.com/api.php/3525635500807579/" + number,
      contentType: "application/json",
      dataType: "json",
      success: (data) => {
        console.log(data);
        cargarData(data);
      },
      error: (error) => {
        failData(error);
      },
    });
  }
  const cargarData = (data) => {
    if (!data) {
      alert("No se encuentra información");
      return;
    }
    $("#numberSuperHero").val("");
    grafico(data);

    $("#card-result").text(`Número SuperHero: ${data.id}`);
    $("#card-title").text(`Nombre: ${data.name}`);
    $("#card-img").attr("src", data.image.url);
    $("#card-info").text(data.connections["group-affiliation"]);
    $("#card-info-1").text(`Publicado por: ${data.biography.publisher}`);
    $("#card-info-2").text(`Ocupación: ${data.work.occupation}`);
    $("#card-info-3").text(`Primera aparición: ${data.biography.publisher}`);
    $("#card-info-4").text(`Altura: ${data.biography.publisher}`);
    $("#card-info-5").text(`Peso: ${data.biography.publisher}`);
    $("#card-info-6").text(`Alienzas: ${data.biography.aliases}`);
    $("#card-show").removeClass("d-none");
    $("#graphContainer").removeClass("d-none");
  };

  const grafico = (data) => {
    let powerstats = data.powerstats;
    let statsdata = [];
    if (!powerstats) {
      $("#mensajeErrorID").text(
        `No se encuentra información, consulta otro número de SuperHero`
      );
    }
    for (let key in powerstats) {
      statsdata.push({ label: key, y: Number(powerstats[key]) });
    }

    console.log(statsdata);

    let chart = new CanvasJS.Chart("graphContainer", {
      animationEnabled: true,
      title: {
        text: `Estadisticas de poder para ${data.name}`,
      },
      data: [
        {
          type: "bar",
          dataPoints: statsdata,
        },
      ],
    });
    return chart.render();
  };
});

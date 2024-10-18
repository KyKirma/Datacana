google.charts.load("current", {packages:['corechart', 'line']});
google.charts.setOnLoadCallback();

function drawChart(info) {
    console.log(info);
    var data = google.visualization.arrayToDataTable(info);

    var options = {
        title: 'Área de Cana Total',
        curveType: 'none',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('myChart'));
    chart.draw(data, options);
}

async function getDados() {
    try {
        var response = await fetch('/data/resume/2022');
        const data = await response.json();
        console.log(data);
        return {data};
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

$(document).ready(function () {
    getDados().then(function (response) {
        google.charts.load("current", {packages:["corechart"]});
        // Cria uma nova array combinando MUNICIPIO e TOTAL_AREA
        const municipios = Object.values(response.data.MUNICIPIO);
        const totalArea = Object.values(response.data.TOTAL_AREA);

        const chartData = [['Município', 'Área']];

        for (let i = 0; i < municipios.length; i++) {
            chartData.push([municipios[i], totalArea[i]]);
        }

        console.log(chartData);
        drawChart(chartData);
    });
});
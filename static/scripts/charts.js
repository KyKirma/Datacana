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
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.values(response.data.MUNICIPIO),
            datasets: [{
            label: 'Área total de Cana',
            data: Object.values(response.data.TOTAL_AREA),
            borderWidth: 0.5
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Área Total de Cana',
                    align: 'center',
                    color: 'black',
                    font: {size: 25}
                }
            },
            responsive: true,
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        });
    });
});

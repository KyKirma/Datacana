// Função GET Dados
async function getDados() {
    try {
        const response = await fetch('/map/Data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

$(document).ready(function () {
    getDados()
        .then(function (response) {
            // Mapa
            var map = L.map('map', {
                zoomControl: false
            });

            // Estilo Mapa
            var estilos =   { 
                uf: {
                    color: '#818181',
                    fillColor: '#9FD97C',
                    fillOpacity: 1,
                    weight: 1,
                }
            }

            function getRadius(areaHa) {
                const scale = 0.1;
                const radius = (Math.sqrt(areaHa) * scale) / 2;
                return Math.max(radius, 2);
            }

            jQuery.getJSON("https://servicodados.ibge.gov.br/api/v2/malhas/31?formato=application/vnd.geo+json", function(JSON) {
                var layer = new L.geoJSON(JSON, estilos.uf);   
                var ufExtent = layer.getBounds();

                map.fitBounds(ufExtent, { animate: false });
                map.setZoom(6)
                layer.addTo(map);

                for (let i = 0; i < response.qnt; i++) {
                    const municipio = response.data['MUNICIPIO'][i];
                    const areaHa = response.data['AREA_HA'][i];
                    const radius = getRadius(areaHa);

                    let marker = L.circleMarker([response.data['LAT'][i], response.data['LONG'][i]], {
                        color: 'darkgreen',
                        radius: radius,
                        stroke: true,
                        weight: 0.8,
                        opacity: 1,
                    });

                    marker.addTo(layer);
                }
            });                   
            
            // Desativação do Mapa
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
        });
});
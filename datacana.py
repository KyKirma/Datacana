from flask import Flask

# Instância o APP
app = Flask(__name__)
app.config.from_pyfile('config.py')

# Importa as rotas para o APP
from routes import *
from routesData import *

# Cria as rotinas para o inicio do APP
def createCSVs():
    """
        Cria os CSVs necessários para o funcionamento do APP
        Pega todos os GEOJSONS da pasta CACHE e converte o DB em CSV na pasta CSVs
    """
    import os, csv, geojson

    # Lista os arquivos GeoJSON na pasta cache
    geojson_files = [f for f in os.listdir('cache') if f.endswith('.geojson')]

    for geojson_file in geojson_files:
        year = geojson_file.split('_')[1].split('.')[0]  # Extrai o ano do nome do arquivo

        with open(f"cache/{geojson_file}", 'r') as geojson_file:
            geojson_data = geojson.load(geojson_file)

        csv_data = []
        csv_data.append('INDEX; AREA; CLASSE; CLASSEINDEX; MUNICIPIO') # Cria as colunas
        for feature in geojson_data.features:
            row = []
            for key, value in feature.properties.items():
                row.append(value)
            csv_data.append(row)

        with open(f"cache/CSVs/data_{year}.csv", 'w', newline='') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerows(csv_data)

if __name__ == '__main__':
    createCSVs()
    app.run(host = "0.0.0.0", debug = True)
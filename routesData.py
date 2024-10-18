from datacana import app
from flask import jsonify, send_file
import json

# Rotas de GET da nossa DataBase
@app.route('/data/<int:year>', methods = ['GET'])
def getData(year):
    """
        Rota que busca dados de um ano específico
        Método: GET
    """
    import pandas as pd
    # Tratando o geoJson
    df = pd.read_csv(f'cache/CSVs/Data_{year}.csv')
    escala = df['AREA'].describe().to_dict()
    qnt = len(df)
    totalArea = df['AREA'].sum()
    
    # Tratando os dados processados
    dfResumido = pd.read_csv(f'cache/CSVs/Data_{year}_Resume.csv').to_dict()
    return jsonify(geoJsonCana = json.loads(open(f"cache/Cana_{year}.geojson", 'r', encoding = "utf8").read()),
                   dadosCana = dfResumido,
                   escala = escala,
                   qnt = qnt,
                   totalArea = totalArea)

@app.route('/data/resume/<int:year>', methods = ['GET'])
def getDataResume(year):
    import pandas as pd
    df = pd.read_csv(f'cache/CSVs/Data_{year}_Resume.csv')
    return jsonify(df.to_dict())

@app.route('/downloads/data/<int:year>', methods = ['GET'])
def downloadData(year):
    return send_file(f"cache/CSVs/Data_{year}.csv", as_attachment = True)

@app.route('/downloads/data/resume/<int:year>', methods = ['GET'])
def downloadDataResume(year):
    return send_file(f"cache/CSVs/Data_{year}_Resume.csv", as_attachment = True)

@app.route('/downloads/data/geojson/<int:year>', methods = ['GET'])
def downloadDataGeoJSON(year):
    return send_file(f"cache/Cana_{year}.geojson", as_attachment = True)

@app.route('/downloads/data/shp/<int:year>', methods = ['GET'])
def downloadDataSHP(year):
    return send_file(f"cache/SHPs/Cana_{year}.shp", as_attachment = True)
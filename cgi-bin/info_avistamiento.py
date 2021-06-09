#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
from avistamientos_db import Avistamientos

cgitb.enable()

print("Content-type: text/html\r\n\r\n")
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

numero = cgi.FieldStorage()
id_avistamiento = numero['av'].value

dbd = Avistamientos("localhost", "root", "", "cc500256_db")

data = dbd.get_avistamiento_id(id_avistamiento)[0]
data_detalle = dbd.get_detalle_avistamiento(data[0])
comuna = dbd.get_comuna(data[1])[0]
region = dbd.get_region(comuna[2])[0]

header = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Informe</title>
    <link href="../static/styles/style.css" rel="stylesheet">
    <link href="../static/styles/styleAvistamientos.css" rel="stylesheet">
    </head>
<body>
"""
main = f"""
    <main class="main-informe">
        <div class="container">
            <H1>Informe de avistamiento</H1>
        </div>
        <div class="secciones-informe">Lugar:</div>
            <div class="contenido-informe">
                <p><b>Región: </b>{str(region[1])}</p>
                <p><b>Comuna: </b>{str(comuna[1])}</p>
                <p><b>Sector: </b>{str(data[3])}</p>
            </div>
        <div class="secciones-informe">Datos de contacto: </div>
            <div class="contenido-informe">
                <p><b>Nombre: </b>{str(data[4])}</p>
                <p><b>Email: </b>{str(data[5])}</p>
                <p><b>Número de celular: </b>{str(data[6])}</p>

            </div>
        """
for d in data_detalle:
    foto_d = dbd.get_foto(d[0])
    foto = ""
    for f in foto_d:
        foto += f"""<img class='imagenes-informe' src='{str(f[1])}' alt='{str(f[2])}' onclick="expandir('{f[1]}','{f[2]}')">"""

    main += f"""
            <div class="secciones-informe">Información de avistamiento:</div>
                <div class="contenido-informe">
                    <p><b>Día y Hora: </b>{d[1]}</p>
                    <p><b>Tipo: </b>{d[2]}</p>
                    <p><b>Estado: </b>{d[3]}</p>
                    <p><b>Fotos: </b></p>
                </div>
                <div class="imagenes-informe-div">
                    {foto}
                </div>
        """

main += """
        <div class="botones">
            <button class="botones-info" onclick="location.href='listado_avistamientos.py?pag=1'">Volver a lista de avistamientos</button><br>
            <button class="botones-info" onclick="location.href='index.py'">Volver a inicio</button>
        </div>


        <div class="modal" id="modal1">
        <div class="modal-dialog">
            <div id="imagenes-modal"></div>
            <button class="close-modal" onclick="cerrar()">Cerrar</button>

        </div>
        </div>
    </main>
    """

footer = """
</main>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../static/scripts/scriptListado.js"></script>
    <script src="../static/scripts/modal.js"></script>
</body>
</html>
"""

print(header, file=utf8stdout)
print(main, file=utf8stdout)
print(footer, file=utf8stdout)

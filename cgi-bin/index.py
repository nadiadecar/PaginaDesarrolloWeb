#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
from base_general import pagina
cgitb.enable()
from avistamientos_db import Avistamientos


print("Content-type: text/html\r\n\r\n")
utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)

dbd = Avistamientos("localhost","cc500256_u","Ssemperris","cc500256_db")


exito = cgi.FieldStorage()

if len(exito.keys())>0:
    extra = """
            <div class="modal is-visible" id="modal1">
                <div class="modal-dialog">
                    <H1>Se ha guardado la iformación con éxito!</H1>
                    <div id="imagenes-modal">
                        <img id="imagenModal" src="../static/img/happy.png" alt='Gracias!'><br>
                    </div>
                    <button class="close-modal" onclick="cerrar(1)">Cerrar</button>
                </div>
            </div>
            """
else: extra = ""


#######################################################FUNCION AUXLIAR####################################################################
#esta función va a generar las filas de la tabla
def generadorTabla(n, data_avistamiento):
    main = ""
    for i in range(0, n):
        d = data_avistamiento[i]
        comuna = dbd.get_comuna(d[1])[0]
        detalle_d = dbd.get_detalle_avistamiento(d[0])[0]
        foto_d = dbd.get_foto(detalle_d[0])[0]
        foto = f"<img src={str(foto_d[1])} alt='{str(foto_d[2])}' width='320px' height='240px'>"
        fila = f"""
            <tr>
                <td>{str(detalle_d[1])}</td>
                <td>{str(comuna[1])}</td>
                <td>{str(d[3])}</td>
                <td>{str(detalle_d[2])}</td>
                <td>{foto}</td>
            </tr>

        """
        main += fila

    return main

############################################################IMPORTANTE####################################################################



avist = dbd.contar_avistamientos()
main = """<main class="main">
                <div class="container">
                    <H1>Bienvenido al registro de avistamiento para insectos, arácnidos y mariápodos.</H1>
                </div>"""

if avist==0:
    main += """
                <div class="container">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <H2>La página aún no contiene registros :(
                    <br>Conviértete en la primera persona en aportar!</H2>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                </div>
            </main>
    """


else:
    data_avistamiento = dbd.get_avistamientos()

    main += """
                <div>
                    <table>
                        <caption> Ultimos 5 avistamientos informados </caption>
                        <tr>
                            <th>Fecha - Hora</th>
                            <th>Comuna</th>
                            <th>Sector</th>
                            <th>Tipo</th>
                            <th>Foto</th>
                        </tr>
        """

    if avist > 4:
        main += generadorTabla(5,data_avistamiento)
    else:
        main += generadorTabla(len(data_avistamiento),data_avistamiento)


main += """
                </table>
                </div>
                """
if avist<5:
    main += """
            <br>
            <br>
            <br>
            <br>
    """

main += extra

main += """
            </main>
        """


style = """
        <link href="../static/styles/modal.css" rel="stylesheet">
        """

js = """
        <script src="../static/scripts/modal.js"></script>
    """

pagina(main,style,js)

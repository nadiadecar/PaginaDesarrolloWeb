#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
from avistamientos_db import Avistamientos
from base_general import pagina

cgitb.enable()

print("Content-type: text/html\r\n\r\n")

pag = int(cgi.FieldStorage()['pag'].value)  # Se extrae el número de la página actual

dbd = Avistamientos("localhost", "root", "", "cc500256_db")


####################################################################FUNCIÓN AUXILIAR#############################################################################
# Esta funón va a generar las filas de la tabla
def generadorTabla(m, n, data_avistamiento):
    main = ""
    for i in range(m, n):
        d = data_avistamiento[i]
        comuna = dbd.get_comuna(d[1])[0]
        detalle_d_raw = dbd.get_detalle_avistamiento(d[0])
        cont_foto = 0
        for p in detalle_d_raw:
            cont_foto += len(dbd.get_foto(p[0]))
        fila = f"""
            <tr onclick="cambiar({str(d[0])})">
                <td>{str(d[2])}</td>
                <td>{str(comuna[1])}</td>
                <td>{str(d[3])}</td>
                <td>{str(d[4])}</td>
                <td>{str(len(detalle_d_raw))}</td>
                <td>{str(cont_foto)}</td>
            </tr>

        """
        main += fila

    return main


avist = dbd.contar_avistamientos()

style = """
        <link href='../static/styles/styleAvistamientos.css' rel='stylesheet'>
        """

js = """<script src="../static/scripts/scriptListado.js"></script>"""

main = """
    <main class="main">
        <div class="container">
            <br>
            <H1>Avistamientos</H1>
            <br>
        </div>
"""

if avist == 0:
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
                        <caption> Avistamientos </caption>
                        <tr>
                            <th>Fecha - Hora</th>
                            <th>Comuna</th>
                            <th>Sector</th>
                            <th>Nombre contacto</th>
                            <th>Total avistamientos</th>
                            <th>Total fotos</th>
                        </tr>

            """

    if avist < 5:
        main += generadorTabla(0, len(data_avistamiento), data_avistamiento)

        main += """
                    </table>
                    </div>
                </main>
                """
        for i in range(avist, 5):
            main += """
                    <br>
                    <br>
                    <br
            """
    else:
        if avist > 5 * pag:
            main += generadorTabla(5 * (pag - 1), 5 * (pag), data_avistamiento)
            main += """
                        </table>
                    </div>
                </main>
            """
        else:
            main += generadorTabla(5 * (pag - 1), len(data_avistamiento), data_avistamiento)

            main += """
                        </table>
                    </div>
                </main>"""

            for i in range(len(data_avistamiento) % 5, 5):
                main += """
                    <br>
                    <br>
                    """

        main += """
            <div class="paginas">
                <ul>"""

        # Se calculan la cantidad de páginas necesarias para todos los datos
        cant_paginas = avist // 5
        if avist % 5 > 0:
            cant_paginas += 1

        if cant_paginas > 1:
            if pag > 2:
                main += f"<li><a href='listado_avistamientos.py?pag=1'><<</a></li>"

            if cant_paginas >= pag + 1:  # Existe al menos una página después de la actual
                if pag - 1 > 0:  # Si pag>1 -> existe pag-1
                    main += f"<li><a href='listado_avistamientos.py?pag={pag - 1}'><</a></li>"
                main += f"<li><a href='listado_avistamientos.py?pag={pag}'>{pag}</a></li>"
                main += f"<li><a href='listado_avistamientos.py?pag={pag + 1}'>></a></li>"
                if cant_paginas > pag + 1:
                    main += f"<li><a href='listado_avistamientos.py?pag={cant_paginas}'><</a></li>"

            else:  # estamos en la última página
                if pag - 1 > 0:  # Si pag>1 -> existe pag-1
                    main += f"<li><a href='listado_avistamientos.py?pag={pag - 1}'><</a></li>"
                main += f"<li><a href='listado_avistamientos.py?pag={pag}'>{pag}</a></li>"

        main += """
            </ul>
        </div>
        """

main += """
<div class="volver_inicio">
    <ul><li><a class="volver_inicio" href="index.py">Volver al inicio</a></li></ul>
</div>
"""

pagina(main, style, js)

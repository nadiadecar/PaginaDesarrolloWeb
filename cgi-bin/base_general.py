def pagina(main_1,style='',js=''):
    utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)
    principal = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Registro de especies</title>
            <link href="../static/styles/style.css" rel="stylesheet">
            {style}
        </head>
        <body>
            <header class="header">
                <div class="container menu-principal">
                    <span class="menu-icon">Menú</span>
                    <nav class="navigation">
                       <ul>
                           <li><a href="../FormularioAvistamiento.html">Informar avistamiento</a> </li>
                            <li><a href="listado_avistamientos.py?pag=1">Ver listado de avistamientos</a> </li>
                            <li><a href="../Estadísticas.html">Estadísticas</a> </li>
                       </ul>
                    </nav>
                </div>
            </header>
        """
    print(principal, file=utf8stdout)


    print(main_1, file=utf8stdout)

    footer = f"""
            <footer class="footer">
                <div class="container">
                    <h3>Contacto: + 569 XXXXXXXX</h3>
                </div>

            </footer>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="../static/scripts/scripts.js"></script>
            {js}

        </body>
        </html>"""

    print(footer, file=utf8stdout)
#!/usr/bin/python3
# -*- coding: utf-8 -*-


import cgi
from datetime import datetime
from avistamientos_db import Avistamientos
import cgitb

print("Content-type: text/html\r\n\r\n")

cgitb.enable()

now = datetime.now()
format = now.strftime("%Y-%m-%d %H:%M")
form = cgi.FieldStorage()

contiene = [0,
            0]  # Es una lista que va a almacenar un 1 en el caso de que haya algo en el campo celular y sector, respectivamente
if (form.keys().__contains__('celular')): contiene[0] = 1
if (form.keys().__contains__('sector')): contiene[1] = 1

# A continuación se calcularán la cantidad de avistamientos que se ingresaron
datos_ingresados = form.keys().__len__()
numero_avistamientos = int((datos_ingresados - 4 - contiene[0] - contiene[1]) / 4)
dbd = Avistamientos("localhost", "root", "", "cc500256_db")

if contiene[0] == 1:
    celular = form['celular'].value
else:
    celular = "-"

if contiene[1] == 1:
    sector = form['sector'].value
else:
    sector = "-"

data_avistamiento = (form['comuna'].value, format,
                     sector, form['nombre'].value,
                     form['email'].value, celular)
id_a = dbd.guardar_avistamiento(data_avistamiento)

for i in range(1, numero_avistamientos + 1):
    data_detalle = (form['dia-hora-avistamiento-' + str(i)].value,
                    form['tipo-avistamiento-' + str(i)].value,
                    form['estado-avistamiento-' + str(i)].value,
                    id_a,
                    form['foto-avistamiento-' + str(i)])
    respuesta = dbd.guardar_detalle(data_detalle)

print("Exito!")

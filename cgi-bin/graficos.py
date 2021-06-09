#!/usr/bin/python3
# -*- coding: utf-8 -*-


import cgi
import json
from datetime import datetime

from avistamientos_db import Avistamientos
import cgitb

print("Content-Type: text/plain; charset=UTF-8\r\n")

cgitb.enable()

form = cgi.FieldStorage()


dbd = Avistamientos("localhost", "root", "", "cc500256_db")

detalle_estado = dbd.get_detalle_avistamiento_estado()

graficos = {"linea": {}, "torta": {}, "barras": {}}

'''
estado_mes = {"Enero": {"vivo": 0, "muerto": 0, "no sé": 0}, "Febrero": {"vivo": 0, "muerto": 0, "no sé": 0},
              "Marzo": {"vivo": 0, "muerto": 0, "no sé": 0}, "Abril": {"vivo": 0, "muerto": 0, "no sé": 0},
              "Mayo": {"vivo": 0, "muerto": 0, "no sé": 0}, "Junio": {"vivo": 0, "muerto": 0, "no sé": 0},
              "Julio": {"vivo": 0, "muerto": 0, "no sé": 0}, "Agosto": {"vivo": 0, "muerto": 0, "no sé": 0},
              "Septiembre": {"vivo": 0, "muerto": 0, "no sé": 0}, "Octubre": {"vivo": 0, "muerto": 0, "no sé": 0},
              "Noviembre": {"vivo": 0, "muerto": 0, "no sé": 0}, "Diciembre": {"vivo": 0, "muerto": 0, "no sé": 0}}

meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
         "Septiembre", "Octubre", "Noviembre", "Diciembre"]

for i in detalle_estado:
    mes = int(i[1])
    estado_mes[meses[mes]][i[0]] += 1

graficos["barras"] = estado_mes
'''

estado = {"vivo": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "muerto": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          "no sé": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}

for i in detalle_estado:
    mes = int(i[1]) - 1
    estado[i[0]][mes] += 1

graficos["barras"] = estado

detalle_fecha = dbd.get_avistamientos_por_fecha()
fecha = {"fechas": [], "cantidades": []}

for i in range(0, len(detalle_fecha)):
    detalle_actual = detalle_fecha[i]
    fecha["fechas"] += [(detalle_actual[0]).strftime('%d-%m-%Y')]
    fecha["cantidades"] += [detalle_actual[1]]

graficos["linea"] = fecha

detalle_tipo = dbd.get_avistamientos_por_especie()
cant_tipos = {"no sé": 0, "insecto": 0, "arácnido": 0, "miriápodo": 0}

for i in detalle_tipo:
    cant_tipos[i[0]] = i[1]

graficos["torta"] = cant_tipos

print(json.dumps(graficos))

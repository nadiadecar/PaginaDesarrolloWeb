#!/usr/bin/python3
# -*- coding: utf-8 -*-


import cgi
import json
from datetime import datetime

from avistamientos_db import Avistamientos
import cgitb
from comunas_latitudes import *

print("Content-Type: text/plain; charset=UTF-8\r\n")

cgitb.enable()

form = cgi.FieldStorage()

dbd = Avistamientos("localhost", "root", "", "cc500256_db")

especificaciones = {}
comunas_registradas = dbd.get_comunas_avistamientos()
lista = []

for i in comunas_registradas:
    id = i[0]
    comuna_actual = dbd.get_comuna(id)[0][1]
    cant_fotos = dbd.get_fotos_por_comuna(id)
    listado = []
    respuesta = dbd.get_detalle_por_comuna(id)
    fotos = {}
    for n in respuesta:
        str_fecha = n[1].strftime("%d-%m-%Y %H:%M")
        nuevo_dato = (n[0], str_fecha, *n[2:])
        listado += [nuevo_dato]
        fotos[n[0]] = dbd.get_foto(n[0])

    for j in comunas_latitudes:
        if j["name"] == comuna_actual:
            especificaciones[comuna_actual] = {"latitud": j["lat"], "longitud": j["lng"], "cantidad_fotos": cant_fotos,
                                               "listado": listado, "fotos": fotos}

print(json.dumps(especificaciones))

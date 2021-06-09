#!/usr/bin/python3
# -*- coding: utf-8 -*-


import cgi
from avistamientos_db import Avistamientos
import cgitb

print("Content-Type: text/plain; charset=UTF-8\r\n")

cgitb.enable()

form = cgi.FieldStorage()

contiene = [0,
            0]  # Es una lista que va a almacenar un 1 en el caso de que haya algo en el campo celular y sector, respectivamente
if (form["celular"].value != None): contiene[0] = 1
if (form['sector'].value != None): contiene[1] = 1

# A continuación se calcularán la cantidad de avistamientos que se ingresaron
datos_ingresados = form.keys().__len__()
numero_avistamientos = int((datos_ingresados - 4 - contiene[0] - contiene[1]) / 4)
dbd = Avistamientos("localhost", "root", "", "cc500256_db")

contador = 0
error = ""

# Se opta por no revisar el formato de los inputs, ya que eso se revisa en el javascript y sería solo repetir código

valChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZzxcvbnmasdfghjklpoiuytrewq "
extraChars = "ñÑáÁéÉíÍóÓúÚü"
valNum = "+ 1234567890"
valCor = valChar[:len(valChar) - 1] + "@._-" + valNum[2:]
valFech = valNum[1:] + ":-"
tipo = ["no sé", "miriápodo", "insecto", "arácnido"]
estado = ["vivo", "muerto", "no sé"]

if contiene[1] == 1:
    for i in form['sector'].value:
        if i not in (valChar + extraChars):
            error += f"No se permite el carácter {i} en la sección 'sector'\n"

for i in form['nombre'].value:
    if i not in (valChar + extraChars):
        error += f"El carácter {i} no se permite en la variable 'nombre' \n"

for i in form['email'].value:
    if i not in valCor:
        error += f"EL carácter {i} no se permite en la variable 'correo'\n"

if '@' not in form['email'].value:
    error += "El correo debe contener el simbolo @\n"

if contiene[0] == 1:
    for i in form['celular'].value:
        if i not in valNum:
            error += "Numero de celular mla ingresado\n"

if len(dbd.get_comuna(form["comuna"].value)) != 1:
    error += "Seleccione una comuna válida"

if len(dbd.get_region(form["region"].value)) != 1:
    error += "Seleccione una region válida"

for i in range(1, numero_avistamientos + 1):
    for j in form['dia-hora-avistamiento-' + str(i)].value:
        if j not in valFech:
            error += f"Fecha del avistamiento {i} mal ingresada\n"

    if form['tipo-avistamiento-' + str(i)].value not in tipo:
        error += f"Por favor ingrese un 'tipo' válido en el avistamiento {i}\n"

    if form['estado-avistamiento-' + str(i)].value not in estado:
        error += f"Por favor ingrese un estado válido en el avistamiento {i}\n"

    conf = dbd.revisar(form['foto-avistamiento-' + str(i)])
    if conf != True:
        contador += 1
        error += conf

print(error)

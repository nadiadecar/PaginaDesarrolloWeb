#!/usr/bin/python3
# -*- coding: utf-8 -*-
import hashlib
import os
import filetype
import mysql.connector


MAX_FILE_SIZE = 10000 * 1000  # 10 MB


class Avistamientos:

    def __init__(self, host, user, password, database):
        self.db = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.db.cursor()

    def guardar_avistamiento(self, data):

        #Se guardan los datos en l tabla de avistamientos
        sql_avistamiento = """
            INSERT INTO avistamiento(comuna_id,dia_hora,sector,nombre,email,celular)
            VALUES (%s,%s,%s,%s,%s,%s)
        """
        self.cursor.execute(sql_avistamiento,data)
        self.db.commit()
        return self.cursor.getlastrowid()

    def guardar_detalle(self,data):
        sql_detalle = """
            INSERT INTO detalle_avistamiento(dia_hora,tipo,estado,avistamiento_id)
            VALUES (%s,%s,%s,%s)
        """

        self.cursor.execute(sql_detalle,data[:4])
        self.db.commit()
        id_detalle = self.cursor.getlastrowid()

        fileobj = data[4]

        sql_archivo = """
            INSERT INTO foto(ruta_archivo, nombre_archivo, detalle_avistamiento_id)
            VALUES (%s,%s,%s)
        """

        if not hasattr(fileobj, "file"): #En el caso de que sea más de una imagen la que se sube
            for i in range(0, len(fileobj)):
                file_name = fileobj[i].filename

                sql_contar = "SELECT COUNT(id) FROM foto"
                self.cursor.execute(sql_contar)
                total = self.cursor.fetchall()[0][0] + 1
                hash_archivo = str(total) + hashlib.sha256(file_name.encode()).hexdigest()[0:30]

                file_path = "../../media/" + hash_archivo
                open(file_path,'wb').write(fileobj[i].file.read())

                self.cursor.execute(sql_archivo, (str(file_path), file_name, id_detalle))
                self.db.commit()


        else:
            file_name = fileobj.filename

            sql_contar = "SELECT COUNT(id) FROM foto"
            self.cursor.execute(sql_contar)
            total = self.cursor.fetchall()[0][0] + 1
            hash_archivo = str(total) + hashlib.sha256(file_name.encode()).hexdigest()[0:30]

            file_path = '../../media/' + hash_archivo
            open(file_path, 'wb').write(fileobj.file.read())

            self.cursor.execute(sql_archivo, (str(file_path), file_name, id_detalle))
            self.db.commit()

        return "true"

    def revisar(self,fileobj):
        errores = ''

        if not hasattr(fileobj, "file"): #En el caso de que sea más de una imagen la que se sube
            for i in range(0, len(fileobj)):
                file_name = fileobj[i].filename
                if not file_name:
                    return'Ingrese un archivo válido\n'

                size = os.fstat(fileobj[i].file.fileno()).st_size
                if size > MAX_FILE_SIZE:
                    errores += f'Tamaño del archivo {file_name} excede los 10MB\n'

                sql_contar = "SELECT COUNT(id) FROM foto"
                self.cursor.execute(sql_contar)
                total = self.cursor.fetchall()[0][0] + 1
                hash_archivo = str(total) + hashlib.sha256(file_name.encode()).hexdigest()[0:30]

                file_path = "../../media/" + hash_archivo
                open(file_path,'wb').write(fileobj[i].file.read())

                tipo = filetype.guess(file_path)
                if (tipo.mime != 'image/png') and (tipo.mime != 'image/jpeg') and (tipo.mime != 'image/jprg'):
                    errores += f'El tipo del archivo {file_name} ingresado no corresponde a una imagen\n'

                os.remove(file_path)


        else:
            file_name = fileobj.filename
            if not file_name:
                return 'Ingrese un archivo válido\n'

            size = os.fstat(fileobj.file.fileno()).st_size
            if size > MAX_FILE_SIZE:
                errores += f'Tamaño del archivo {file_name} excede los 10MB\n'

            sql_contar = "SELECT COUNT(id) FROM foto"
            self.cursor.execute(sql_contar)
            total = self.cursor.fetchall()[0][0] + 1
            hash_archivo = str(total) + hashlib.sha256(file_name.encode()).hexdigest()[0:30]

            file_path = "../../media/" + hash_archivo
            open(file_path, 'wb').write(fileobj.file.read())

            tipo = filetype.guess(file_path)
            if (tipo.mime != 'image/png') and (tipo.mime != 'image/jpeg') and (tipo.mime != 'image/jprg'):
                errores += f'El tipo del archivo {file_name} ingresado no corresponde a una imagen\n'

            os.remove(file_path)

        if errores!='':
            return errores
        else:
            return True


    def get_avistamientos(self):
        sql = f'SELECT * FROM avistamiento ORDER BY id DESC'
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_detalle_avistamiento(self, avistamiento):
        sql2 = f'SELECT * FROM detalle_avistamiento WHERE avistamiento_id={avistamiento}'
        self.cursor.execute(sql2)
        return self.cursor.fetchall()

    def get_comuna(self, id_comuna):
        sql = f'SELECT * FROM comuna WHERE id={id_comuna}'
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_region(self, id_region):
        sql = f'SELECT * FROM region WHERE id={id_region}'
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_foto(self, detalle_avistamiento):
        sql = f'SELECT * FROM foto WHERE detalle_avistamiento_id={detalle_avistamiento}'
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def contar_avistamientos(self):
        sql = "SELECT COUNT(id) FROM avistamiento"
        self.cursor.execute(sql)
        return self.cursor.fetchall()[0][0]

    def get_avistamiento_id(self,id_avistameito):
        sql = f"SELECT * FROM avistamiento WHERE id={id_avistameito}"
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_avistamientos_por_fecha(self):
        sql = "SELECT DATE(dia_hora),COUNT(id) FROM detalle_avistamiento GROUP BY DATE(dia_hora) ORDER BY DATE(dia_hora)"
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_avistamientos_por_especie(self):
        sql = "SELECT tipo,COUNT(id) FROM detalle_avistamiento GROUP BY tipo"
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_detalle_avistamiento_estado(self):
        sql = "SELECT estado,MONTH(dia_hora) as mes FROM detalle_avistamiento"
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_comunas_avistamientos(self):
        sql = "SELECT DISTINCT comuna_id FROM avistamiento"
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def get_detalle_por_comuna(self,comuna):
        sql = f"SELECT * FROM avistamiento WHERE comuna_id={comuna}"
        self.cursor.execute(sql)
        ids = self.cursor.fetchall()
        detalles = []
        for i in ids:
            id = i[0]
            detalles += self.get_detalle_avistamiento(id)
        return detalles


    def get_fotos_por_comuna(self,comuna):
        detalles = self.get_detalle_por_comuna(comuna)

        cant_fotos = 0
        for j in detalles:
            id = j[0]
            cant_fotos += len(self.get_foto(id))

        return cant_fotos
let numero_avistamientos=1;
/* - - - - - - - - - - - - - - - - - - - - - - - - Se establece la fecha actual en el formato solicitado - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function fecha(){
    let miFecha = new Date();
    let hora = miFecha.getHours();
    let minuto = miFecha.getMinutes();
    let dia = miFecha.getDate();
    let mes = miFecha.getMonth()+1;
    let agno = miFecha.getFullYear();

    if(hora<10){hora="0"+hora}
    if(minuto<10){minuto="0"+minuto}
    if(dia<10){dia="0"+dia}
    if(mes<10){mes="0"+mes}

    return  (agno+"-"+mes+"-"+dia+" "+hora+":"+minuto);
}

document.getElementById("dia-hora-avistamiento-"+numero_avistamientos).value = fecha();


/* - - - - - - - - - - - - - - - - - - - - - - Agregar parámetros donde ingresar media - - - - - - - - - - - - - - - - - - - - -- - - */
function nuevaFoto(n){
    let fotos = document.getElementsByName("foto-avistamiento-"+n);
    if(fotos.length<5){
        let original = document.getElementById("foto-avistamiento-"+n+"-1")
        let nuevo=original.cloneNode(true);
        nuevo.id="foto-avistamiento-" + n + "-" + (fotos.length +1);
        let destino=document.getElementById("fotosIngresadas-"+n);
        destino.appendChild(nuevo);
        destino.innerHTML += "<br>"
    }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Se agrega una nueva sección de avistamientos  - - - - - - - - - - - - - - - - - - - - - */
function nuevoAvistamiento(){
    numero_avistamientos += 1;
    let original = document.getElementById("info-avistamiento-1");
    let nuevo=original.cloneNode(true);
    nuevo.id="info-avistamiento-" + (numero_avistamientos);
    let campos = nuevo.childNodes;
    let boton = "<button type=\"button\" onclick=\"nuevaFoto("+numero_avistamientos+")\">agregar otra foto</button>";
    for (let i = 0; i<campos.length; i++){
        if(campos[i].className === "entrada"){
            if(campos[i].id === "fotosIngresadas-1") {
                campos[i].id = "fotosIngresadas-" + numero_avistamientos;
                let id = campos[i].childNodes[3].id;
                let cons_id = id.substring(0,id.length-3);
                campos[i].childNodes[3].id = (cons_id + numero_avistamientos + "-1");
                let name = campos[i].childNodes[3].name
                let cons_name = name.substring(0,name.length-1);
                campos[i].childNodes[3].name = (cons_name + numero_avistamientos);
                campos[i].childNodes[5].remove();
                if((campos[i].childNodes.length)>5){
                    for(let j = campos[i].childNodes.length; j>5 ; j--){
                        campos[i].childNodes[5].remove();
                    }
                }
            } else{
                let id = campos[i].childNodes[3].id;
                let cons_id = id.substring(0,id.length-1);
                campos[i].childNodes[3].id = (cons_id + numero_avistamientos);
                let name = campos[i].childNodes[3].name
                let cons_name = name.substring(0,name.length-1);
                campos[i].childNodes[3].name = (cons_name + numero_avistamientos);
            }
        }else if (campos[i].className === "Avistamiento"){
            let nod = campos[i].childNodes[0];
            let text = nod.textContent.substring(0,25);
            nod.textContent = text + numero_avistamientos;
        }
    }
    let destino = document.getElementById("ingreso-datos");
    destino.appendChild(nuevo);
    document.getElementById('fotosIngresadas-'+numero_avistamientos).innerHTML += boton;
}

/* - - - - - - - - - - - - - - - - - Se crean las opciones para las comunas según la región seleccionada - - - - - - - - - - -  - - - - - - - - - - -  - */
let chile = {
"regiones": [
    {
        "nombre": "opt_0",
        "comunas" : [[]]
    },
    {
        "nombre": "opt_1",
        "comunas": [["10301","Camiña"], ["10302","Huara"], ["10303","Pozo Almonte"], ["10304","Iquique"], ["10305","Pica"], ["10306","Colchane"], ["10307","Alto Hospicio"]]
    },
    {
        "nombre": "opt_2",
        "comunas": [ ["20101","Tocopilla"], ["20102","María Elena"], ["20201","Ollagüe"], ["20202","Calama"], ["20203","San Pedro de Atacama"], ["20301","Sierra Gorda"], ["20302","Mejillones"], ["20303","Antofagasta"],["20304","Taltal"]]
    },
    {
        "nombre": "opt_3",
        "comunas": [["30101","Diego de Almagro"], ["30102","Chañaral"], ["30201","Caldera"], ["30202","Copiapó"], ["30203","Tierra Amarilla"], ["30301","Huasco"], ["30302","Freirina"],["30303","Vallenar"], ["30304","Alto del Carmen"]]
    },
    {
        "nombre": "opt_4",
        "comunas": [["40101","La Higuera"], ["40102","La Serena"], ["40103","Vicuña"], ["40104","Paiguano"], ["40105","Coquimbo"], ["40106","Andacollo"], ["40201","Río Hurtado"], ["40202","Ovalle"], ["40203","Monte Patria"], ["40204","Punitaqui"], ["40205","Combarbalá"], ["40301","Mincha"], ["40302","Illapel"], ["40303","Salamanca"], ["40304","Los Vilos"], ["40305","Canela"]]
    },
    {
        "nombre": "opt_5",
        "comunas":[["50101","Petorca"],["50102","Cabildo"],["50103","Papudo"],["50104","La Ligua"],["50105","Zapallar"],["50201","Putaendo"],["50202","Santa María"],["50203","San Felipe"],["50204","Panquehue"],["50205","Catemu"],["50206","Llay Llay"],["50301","Nogales"],["50302","La Calera"],["50303","Hijuelas"],["50304","La Cruz"],["50305","Quillota"],["50306","Olmué"],["50307","Limache"],["50401","Los Andes"],["50402","Rinconada"],["50403","Calle Larga"],["50404","San Esteban"],["50501","Puchuncaví"],["50502","Quintero"],["50503","Viña del Mar"],["50504","Villa Alemana"],["50505","Quilpué"],["50506","Valparaíso"],["50507","Juan Fernández"],["50508","Casablanca"],["50509","Concón"],["50601","Isla de Pascua"],["50701","Algarrobo"],["50702","El Quisco"],["50703","El Tabo"],["50704","Cartagena"],["50705","San Antonio"],["50706","Santo Domingo"]]

    },
    {
        "nombre": "opt_6",
        "comunas": [["60101","Mostazal"],["60102","Codegua"],["60103","Graneros"],["60104","Machalí"],["60105","Rancagua"],["60106","Olivar"],["60107","Doñihue"],["60108","Requínoa"],["60109","Coinco"],["60110","Coltauco"],["60111","Quinta de Tilcoco"],["60112","Las Cabras"],["60113","Rengo"],["60114","Peumo"],["60115","Pichidegua"],["60116","Malloa"],["60117","San Vicente"],["60201","Navidad"],["60202","La Estrella"],["60203","Marchihue"],["60204","Pichilemu"],["60205","Litueche"],["60206","Paredones"],["60301","San Fernando"],["60302","Peralillo"],["60303","Placilla"],["60304","Chimbarongo"],["60305","Palmilla"],["60306","Nancagua"],["60307","Santa Cruz"],["60308","Pumanque"],["60309","Chépica"],["60310","Lolol"]]
    },
    {
        "nombre": "opt_7",
        "comunas": [["70101","Teno"],["70102","Romeral"],["70103","Rauco"],["70104","Curicó"],["70105","Sagrada Familia"],["70106","Hualañé"],["70107","Vichuquén"],["70108","Molina"],["70109","Licantén"],["70201","Río Claro"],["70202","Curepto"],["70203","Pelarco"],["70204","Talca"],["70205","Pencahue"],["70206","San Clemente"],["70207","Constitución"],["70208","Maule"],["70209","Empedrado"],["70210","San Rafael"],["70301","San Javier"],["70302","Colbún"],["70303","Villa Alegre"],["70304","Yerbas Buenas"],["70305","Linares"],["70306","Longaví"],["70307","Retiro"],["70308","Parral"],["70401","Chanco"],["70402","Pelluhue"],["70403","Cauquenes"]]
    },
    {
        "nombre": "opt_8",
        "comunas": [["80201","Tomé"],["80202","Florida"],["80203","Penco"],["80204","Talcahuano"],["80205","Concepción"],["80206","Hualqui"],["80207","Coronel"],["80208","Lota"],["80209","Santa Juana"],["80210","Chiguayante"],["80211","San Pedro de la Paz"],["80212","Hualpén"],["80301","Cabrero"],["80302","Yumbel"],["80303","Tucapel"],["80304","Antuco"],["80305","San Rosendo"],["80306","Laja"],["80307","Quilleco"],["80308","Los Angeles"],["80309","Nacimiento"],["80310","Negrete"],["80311","Santa Bárbara"],["80312","Quilaco"],["80313","Mulchén"],["80314","Alto Biobío"],["80401","Arauco"],["80402","Curanilahue"],["80403","Los Alamos"],["80404","Lebu"],["80405","Cañete"],["80406","Contulmo"],["80407","Tirúa"]]
    },
    {
        "nombre": "opt_9",
        "comunas":[["90101","Renaico"],["90102","Angol"],["90103","Collipulli"],["90104","Los Sauces"],["90105","Purén"],["90106","Ercilla"],["90107","Lumaco"],["90108","Victoria"],["90109","Traiguén"],["90110","Curacautín"],["90111","Lonquimay"],["90201","Perquenco"],["90202","Galvarino"],["90203","Lautaro"],["90204","Vilcún"],["90205","Temuco"],["90206","Carahue"],["90207","Melipeuco"],["90208","Nueva Imperial"],["90209","Saavedra"],["90210","Cunco"],["90211","Freire"],["90212","Pitrufquén"],["90213","Teodoro Schmidt"],["90214","Gorbea"],["90215","Pucón"],["90216","Villarrica"],["90217","Toltén"],["90218","Curarrehue"],["90219","Loncoche"],["90220","Padre Las Casas"],["90221","Cholchol"]]
    },
    {
        "nombre": "opt_10",
        "comunas": [["100201","San Pablo"],["100202","San Juan de la Costa"],["100203","Osorno"],["100204","Puyehue"],["100205","Río Negro"],["100206","Purranque"],["100207","Puerto Octay"],["100301","Frutillar"],["100302","Fresia"],["100303","Llanquihue"],["100304","Puerto Varas"],["100305","Los Muermos"],["100306","Puerto Montt"],["100307","Maullín"],["100308","Calbuco"],["100309","Cochamó"],["100401","Ancud"],["100402","Quemchi"],["100403","Dalcahue"],["100404","Curaco de Vélez"],["100405","Castro"],["100406","Chonchi"],["100407","Queilén"],["100408","Quellón"],["100409","Quinchao"],["100410","Puqueldón"],["100501","Chaitén"],["100502","Futaleufú"],["100503","Palena"],["100504","Hualaihué"]]
    },
    {
        "nombre": "opt_11",
        "comunas": [["110101","Guaitecas"],["110102","Cisnes"],["110103","Aysén"],["110201","Coyhaique"],["110202","Lago Verde"],["110301","Río Ibáñez"],["110302","Chile Chico"],["110401","Cochrane"],["110402","Tortel"],["110403","O'Higgins"]]
    },
    {
        "nombre": "opt_12",
        "comunas":[["120101","Torres del Paine"],["120102","Puerto Natales"],["120201","Laguna Blanca"],["120202","San Gregorio"],["120203","Río Verde"],["120204","Punta Arenas"],["120301","Porvenir"],["120302","Primavera"],["120303","Timaukel"],["120401","Antártica"],["120402","Cabo de Hornos"]]
    },
    {
        "nombre": "opt_13",
        "comunas":[["130101","Tiltil"],["130102","Colina"],["130103","Lampa"],["130201","Conchalí"],["130202","Quilicura"],["130203","Renca"],["130204","Las Condes"],["130205","Pudahuel"],["130206","Quinta Normal"],["130207","Providencia"],["130208","Santiago"],["130209","La Reina"],["130210","Ñuñoa"],["130211","San Miguel"],["130212","Maipú"],["130213","La Cisterna"],["130214","La Florida"],["130215","La Granja"],["130216","Independencia"],["130217","Huechuraba"],["130218","Recoleta"],["130219","Vitacura"],["130220","Lo Barnechea"],["130221","Macul"],["130222","Peñalolén"],["130223","San Joaquín"],["130224","La Pintana"],["130225","San Ramón"],["130226","El Bosque"],["130227","Pedro Aguirre Cerda"],["130228","Lo Espejo"],["130229","Estación Central"],["130230","Cerrillos"],["130231","Lo Prado"],["130232","Cerro Navia"],["130301","San José de Maipo"],["130302","Puente Alto"],["130303","Pirque"],["130401","San Bernardo"],["130402","Calera de Tango"],["130403","Buin"],["130404","Paine"],["130501","Peñaflor"],["130502","Talagante"],["130503","El Monte"],["130504","Isla de Maipo"],["130601","Curacaví"],["130602","María Pinto"],["130603","Melipilla"],["130604","San Pedro"],["130605","Alhue"],["130606","Padre Hurtado"]]
    },
    {
        "nombre": "opt_14",
        "comunas": [["100101","Lanco"],["100102","Mariquina"],["100103","Panguipulli"],["100104","Máfil"],["100105","Valdivia"],["100106","Los Lagos"],["100107","Corral"],["100108","Paillaco"],["100109","Futrono"],["100110","Lago Ranco"],["100111","La Unión"],["100112","Río Bueno"]]
    },
    {
        "nombre": "opt_15",
        "comunas": [["10201","Arica"], ["10202","Camarones"], ["10102","Putre"], ["10101","General Lagos"]]
    },
    {
        "nombre": "opt_16",
        "comunas": [["80101","Cobquecura"],["80102","Ñiquén"],["80103","San Fabián"],["80104","San Carlos"],["80105","Quirihue"],["80106","Ninhue"],["80107","Treguaco"],["80108","San Nicolás"],["80109","Coihueco"],["80110","Chillán"],["80111","Portezuelo"],["80112","Pinto"],["80113","Coelemu"],["80114","Bulnes"],["80115","San Ignacio"],["80116","Ránquil"],["80117","Quillón"],["80118","El Carmen"],["80119","Pemuco"],["80120","Yungay"],["80121","Chillán Viejo"]]
    }]
};
/*--------------------------------------------------------------------LLENANDO LA LISTA DE COMUNAS -------------------------------------------------------------------------*/
function llenarListaComunas(id){
    let num = id.substring(id.length -1, id.lenght)
    let region = document.getElementById(id).value;
    let comunas;
    if(num!=="n"){
        comunas = document.getElementById("comuna-"+num);
    }else{
        comunas = document.getElementById("comuna");
    }

    let mis_ops = chile.regiones[region];
    let mis_comunas = mis_ops.comunas;
    let cantidad_comunas = mis_comunas.length;
    while(comunas.options.length > 0){ //Se limpia el select de las opciones ingresadas anteriormente
        for(let k=0; k<comunas.options.length;k++){
        comunas.options[k].remove();
        }
    }
    comunas.options[0] = new Option("Seleccione una comuna","0");
    for(let i = 0; i<cantidad_comunas; i++) {
        comunas.options[i + 1] = new Option(mis_comunas[i][1],mis_comunas[i][0]);
    }
}

/*------------------------------------------------------------------------------FUNCIONES AUXILIARES----------------------------------------------------------------------*/
function esComuna(comuna_sel, mis_ops) {
    for(let i=0; i<mis_ops.length; i++){
        if (comuna_sel === mis_ops[i][0]){
            return true;
    }}
    return false;
}

function validarImagen(imagen){
    let st = imagen.value;
    let largo = st.length;
    let extVal = ["jpg", "png"];
    let ext = st.substring(largo-3,largo);
    return extVal.includes(ext)
}

function validarFecha(ingresada){
    let agno = ingresada.substring(0,4);
    let mes = ingresada.substring(5,7);
    let dia = ingresada.substring(8,10);

    let hora = ingresada.substring(10,12);
    let minutos = ingresada.substring(13,15);

    let prueba = new Date(agno,mes,dia,hora,minutos);

    let total = agno + mes + dia + hora + minutos;

    return prueba.toString() === "Invalid Date" || total.length!==12; //por el momento no me voy a preocupar de febrero y sus agnos bisiestos
}

/*---------------------------------------------------------------------- VALIDADOR ----------------------------------------------------------------------------------*/

function validador(){
    let errores = "";
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let celular = document.getElementById("celular").value;
    let region = document.getElementById("region").value;
    let comuna_sel = document.getElementById("comuna").value;
    let sector = document.getElementById("sector").value;

    /*------------------------------------------- NOMBRE -------------------------------------------------*/
    if (nombre.length >200 || nombre.length <1 || !/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.exec(nombre)){
        errores += "El nombre informado no es correcto\n";
        document.getElementById("nombre").style.borderColor = "red";
    }

    /*------------------------------------------- EMAIL -------------------------------------------------*/
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())){
        errores += "El correo ingresado no cumple con el formato solicitado\n";
        document.getElementById("email").style.borderColor = "red";
    }

    /*------------------------------------------- CELULAR -------------------------------------------------*/
    const reCel = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if(!reCel.test(celular) && celular.length>0){
        errores += "El número de telefono ingresado no cumple con el formato estandar\n";
        document.getElementById("celular").style.borderColor = "red";
    }

    /*------------------------------------------- REGION -------------------------------------------------*/
    const reg = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
    if (region === "0" || !reg.includes(region)) {
        errores += "Porfavor seleccione una región válida\n";
        document.getElementById("region").style.borderColor = "red";
        }

    /*------------------------------------------- COMUNA -------------------------------------------------*/
    mis_ops = chile.regiones[region]

    if (comuna_sel === "0" || !esComuna(comuna_sel,mis_ops.comunas)) {
            errores += "Porfavor seleccione una comuna válida\n";
            document.getElementById("comuna").style.borderColor = "red";
    }

    /*------------------------------------------- SECTOR -------------------------------------------------*/
    if (sector.length > 100) {
            errores += "El sector ingresado sobrepasa la cantidad de carácteres permitidos\n";
            document.getElementById("sector").style.borderColor = "red";
        }


    /*------------------------------------------- AVISTAMIENTOS -------------------------------------------------*/
    for(let i=1; i<=numero_avistamientos;i++ ){
        let tipoDoc;
        let estadoDoc;
        let fotosDoc;
        let fechaDoc;

        tipoDoc="tipo-avistamiento-"+i;
        estadoDoc = "estado-avistamiento-"+i;
        fotosDoc = "foto-avistamiento-"+i;
        fechaDoc = "dia-hora-avistamiento-"+i;

        let tipo = document.getElementById(tipoDoc).value;
        let estado = document.getElementById(estadoDoc).value;
        let fotos = document.getElementsByName(fotosDoc);
        let fecha = document.getElementById(fechaDoc).value.replaceAll(" ","");

        let op_tipo = ["no sé","insecto","miriápodo","arácnido"];

        if(tipo===0 || !op_tipo.includes(tipo) ){
            errores += "Ingrese un tipo valido para el avistamiento n°"+i+"\n";
            document.getElementById(tipoDoc).style.borderColor = "red";
        }

        let op_estado = ["no sé", "vivo", "muerto"];
        if(estado===0 ||!op_estado.includes(estado) ){
            errores += "Ingrese un estado valido para el avistamiento n°"+i+"\n";
            document.getElementById(estadoDoc).style.borderColor = "red";
        }
        if(fotos.length >1){
            for (let i=0; i<fotos.length; i++){
                if(!validarImagen(fotos[i])){
                    errores += "Solo se aceptan archivos con formato .png o .jpg\n";
                    if(i===0){
                        document.getElementById(fotosDoc+"-"+(i+1)).style.background = "red";
                    }else{
                        document.getElementById(fotosDoc+"-"+(i+1)).style.background = "red";
                    }}
                else{
                    if(i===0){
                        document.getElementById(fotosDoc+"-"+(i+1)).style.background = null;
                    }else{
                        document.getElementById(fotosDoc+"-"+(i+1)).style.background = null;
                    }

                    }}

        }

        if (fotos.length === 1){
            if(fotos[0].value===""){
                errores += "Porfavor ingrese mínimo una imagen del avistamiento n°"+i+"\n";
                document.getElementById(fotosDoc+"-"+1).style.background = "red";
            }
            else if(!validarImagen(fotos[0])){
                errores += "Solo se aceptan archivos con formato .png o .jpg\n";
                document.getElementById(fotosDoc+"-"+1).style.background = "red";
            }else{
                document.getElementById(fotosDoc+"-"+1).style.background = null;
            }
        }

        if(validarFecha(fecha)){
            errores += "La fecha del avistamiento n° "+i+" esta mal ingresada\n";
            document.getElementById(fechaDoc).style.borderColor = "red";
        }
    }

    if(errores.length===0){
       confirmacion();
    }else{
        muestra(errores)
    }
}

/* - - - - Alerta de confirmación del envio del formulario - - - - */
function confirmacion(){
    swal({
        text: "¿Esta seguro que desea enviar la información?",
        buttons: {
            confirm: "Si, estoy total y absolutamente seguro",
            cancel: "No estoy segurto, quiero volver al formulario",
        }
    }).then((aceptaForm) => {
        if (aceptaForm){
            const data = new FormData(document.getElementById('formularioAvistamientos'));
            fetch("cgi-bin/revisar_info.py",{
                method: 'POST',
                body: data
            })
                .then(function (response){
                    if(response.ok){
                        return response.text();
                    } else{
                        console.info('error extraño');
                    }
                })
                .then(function(texto){
                    if(texto.length<5){
                        fetch("cgi-bin/guardar_avistamiento.py",{
                            method: 'POST',
                            body: data
                        }).then(function (response){
                            if(response.ok){
                                document.getElementById("formularioAvistamientos").submit();
                            }else{console.log("No se cargaron los archivos")}
                        })

                    }else{
                        muestra(texto);
                    }
                })
        }
    })
}



function muestra(err){
    swal(err);
}



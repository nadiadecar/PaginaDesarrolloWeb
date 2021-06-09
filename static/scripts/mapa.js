let mymap = L.map(document.getElementById('mapid')).setView([-33.4513, -70.6653], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.{extra}.i9RVctpvJXWN14FAVdCl0w'
}).addTo(mymap);

function obtenerDatos(){
    let datos = {};
    let data = new FormData();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'mapa.py');

    xhr.onload = function (data) {
        let info = data.currentTarget.responseText;
        datos = JSON.parse(info);
        agregarCosas(datos);
    };

    xhr.onerror = function () {
        console.log("Te echaste la página ewe")
    }
    xhr.send(data);

}

obtenerDatos();

function agregarCosas(datos){
    for(i in datos){
        let com_act = datos[i];
        var marker = L.marker([com_act["latitud"], com_act["longitud"]],{title:com_act["cantidad_fotos"]}).addTo(mymap);

        let listado = "<style>.imgPop{max-height: 40px; margin: 1px 2px;} .popTh{background-color:#FF5E5EFF; padding-top: 0; padding-bottom: 0;} .popA{color: cyan; text-decoration: none;} .popTd{padding-top: 0; padding-bottom: 0;}</style>" +
                        "<table style='width: 96%'><tr><th class='popTh'>Fecha - Hora</th><th class='popTh'>Tipo</th><th class='popTh'>Estado</th><th class='popTh'>Ver más</th></tr><tr><th class='popTh' colspan='4'>Fotos</th></tr>";
        let datos_listado = com_act["listado"];
        let imagenes = com_act["fotos"];
        for(let n = 0; n<datos_listado.length; n++){
            let final = datos_listado[n];
            let imagenes_avist = imagenes[final[0]];
            listado += "<tr><td class='popTd'>"+final[1]+"</td class='popTd'><td class='popTd'>"+final[2]+"</td class='popTd'><td class='popTd'>"+final[3]+"</td class='popTd'><td class='popTd'><a class='popA' href='info_avistamiento.py?av=" + final[4] +
                "' target='_blank'>Ver avistamiento</a></td class='popTd'></tr>";
            let fotos = "";
            for(let pic = 0; pic < imagenes_avist.length; pic++ ){
                let actual = imagenes_avist[pic]
                fotos += "<img class='imgPop' src='"+actual[1]+"' alt='"+actual[2]+"'>"
            }
            listado += "<tr><td class='popTd' colspan='4'>"+fotos+"</td class='popTd'></tr>"
        }


        marker.bindPopup(listado, {maxWidth: "10px",});

    }



}

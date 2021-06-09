
function obtenerDatos(){
    let datos = {};
    let data = new FormData();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'cgi-bin/graficos.py');

    xhr.onload = function (data) {
        let info = data.currentTarget.responseText;
        datos = JSON.parse(info);
        crearGraficos(datos)
    };

    xhr.onerror = function () {
        console.log("Te echaste la página ewe")
    }
    xhr.send(data);

}

obtenerDatos()

function crearGraficos(datos){
    let linea = datos["linea"];
    let barra = datos["barras"];
    let torta = datos["torta"];


    Highcharts.setOptions({
     colors: ['#ff5873','#1fffc1', '#9941fd','#25B0ECFF','#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263',      '#6AF9C4']
    });


    Highcharts.chart('container-1', {

        title: {
            text: 'Avistamientos por día'
        },

        /*subtitle: {
            text: 'Source: thesolarfoundation.com'
        },*/

        yAxis: {
            title: {
                text: 'Avistamientos'
            }
        },

        xAxis: {
            accessibility: {
                rangeDescription: 'Fecha'
            },
            categories: linea["fechas"],
            title:{
                text: 'Fecha'
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },

        series: [{
            name: "Cantidades",
            data: linea["cantidades"]
        } ],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });


    Highcharts.chart('container-2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Número de avistamientos según especie'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y: f}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: ''
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.1f}'
                }
            }
        },
        series: [{
            name: 'Tipos',
            colorByPoint: true,
            data: [{
                name: 'Insecto',
                y: torta["insecto"]
            }, {
                name: 'Arácnido',
                y: torta['arácnido']
            }, {
                name: 'Miriápodo',
                y: torta['miriápodo']
            }, {
                name: 'No sé',
                y: torta['no sé']
            }]
        }]
    });

    Highcharts.chart('container-3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estado de los seres avistados según el mes'
        },
        xAxis: {
            categories: [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad de avistamietos'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{serie.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Vivo',
            data: barra["vivo"]

        }, {
            name: 'Muerto',
            data: barra["muerto"]

        }, {
            name: 'No sé',
            data: barra["no sé"]

        }]
    });

    let graficos = document.getElementsByClassName("highcharts-container");

    for (let i=0; i<graficos.length-1; i++){
        graficos[i].style["position"] = "static"
    }

}








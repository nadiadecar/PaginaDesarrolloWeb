function cambiar(indice){
    location.href="info_avistamiento.py?av="+(indice);
}

function expandir(src,alt){
    let modal = document.getElementById("modal1");
    let div = document.getElementById("imagenes-modal");

    const img = document.createElement("img");
    img.src=src;
    img.alt=alt;
    img.id = "imagenModal";
    div.appendChild(img);

    modal.classList.add("is-visible");
}
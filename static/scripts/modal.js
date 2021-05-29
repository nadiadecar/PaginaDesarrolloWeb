function cerrar(i= 0) {
    let modal = document.getElementById("modal1");
    let div = document.getElementById("imagenes-modal");
    let img = document.getElementById("imagenModal");
    if (i === 0) {
        div.removeChild(img);
    }
    modal.classList.remove("is-visible");
}
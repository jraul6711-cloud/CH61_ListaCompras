const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const contadorProductos = document.getElementById("contadorProductos");
const totalProductos = document.getElementById("totalProductos");
let cont = 0;
let totalEnProductos = 0;
const precioTotal = document.getElementById("precioTotal");
const productosTotal = document.getElementById("productosTotal");
const tablaListaCompras = document.getElementById("tablaListaCompras");
// const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody");
const cuerpoTabla = tablaListaCompras.querySelector("tbody");
let costoTotal = 0;

function validar_cantidad(cantidad) {
    if (cantidad.length == 0) {
        return false;
    }// length == 0

    if (isNaN(cantidad)) {
        return false;
    }// isNaN

    if (Number(cantidad) <= 0) {
        return false;
    }// <= 0

    return true;
}// Validar cantidad

function get_precio() {
    return Math.round(Math.random() * 10000) / 100;
}// get_precio

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true; // bandera
    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";

    // Si el campo queda vacío
    if (txtName.value.length < 3) {
        txtName.style.border = "solid red";
        alertValidacionesTexto.innerHTML = "<strong>El nombre del producto no es correcto</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } // Si Name == "" o bien Name length < 3

    if (!validar_cantidad(txtNumber.value)) {
        txtNumber.style.border = "solid red";
        alertValidacionesTexto.innerHTML += "<br/><strong>La cantidad no es correcta</strong>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }//!validarCantidad

    if (isValid == true) {
        let precio = get_precio();
        let row = `<tr>
<td>${cont}</td>
<td>${txtName.value}</td>
<td>${txtNumber.value}</td>
<td>${precio}</td>
</tr>`;
        console.log(precio);
        cont++;
        totalEnProductos = Number(txtNumber.value);
        costoTotal += precio * Number(txtNumber.value);

        cuerpoTabla.insertAdjacentHTML("beforeend", row)
        contadorProductos.innerText = cont;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = new Intl.NumberFormat("es-MX",
            { style: "currency", currency: "MXN" }).format(costoTotal);

        let resumen = {
            "cont": cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        };

        localStorage.setItem("resumen", JSON.stringify(resumen));

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }// isValid
}); // btnAgregar click

window.addEventListener("load", function (event) {
    event.preventDefault();
    if (resumen != null) {
        let resumen = this.localStorage.getItem("resumen");
        cont = resumen.cont;
        totalEnProductos = resumen.totalEnProductos;
        costoTotal = resumen.costoTotal;
    }// !null

    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX",
        { style: "currency", currency: "MXN" }).format(costoTotal);
}); //window load
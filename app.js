const btnInicio = document.getElementById("btnInicio");
const btnFoto = document.getElementById("btnFoto");
const btnFinalizar = document.getElementById("btnFinalizar");
const btnEnviar = document.getElementById("btnEnviar");

const estado = document.getElementById("estado");
const foto = document.getElementById("foto");
const vistaFoto = document.getElementById("vistaFoto");


// Datos del reporte
let reporte = {
    inicio: null,
    foto: null,
    finalizacion: null
};


// 📍 INICIAR ACTIVIDAD
btnInicio.addEventListener("click", function () {

    estado.textContent = "📍 Obteniendo ubicación...";

    if (!navigator.geolocation) {

        estado.textContent =
            "❌ Este dispositivo no permite obtener ubicación.";

        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (posicion) {

            const fecha = new Date();

            reporte.inicio = {

                fecha: fecha.toLocaleDateString(),

                hora: fecha.toLocaleTimeString(),

                latitud: posicion.coords.latitude,

                longitud: posicion.coords.longitude

            };

            estado.innerHTML =
                "✅ Actividad iniciada<br>" +
                "🕐 Hora: " + reporte.inicio.hora + "<br>" +
                "📍 Ubicación registrada";

            console.log("Inicio:", reporte.inicio);
        },

        function () {

            estado.textContent =
                "⚠️ Debes permitir el acceso a la ubicación.";

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

});


// 📸 TOMAR FOTOGRAFÍA
btnFoto.addEventListener("click", function () {

    foto.click();

});


// 📸 CUANDO SE SELECCIONA LA FOTO
foto.addEventListener("change", function () {

    if (foto.files.length === 0) {

        return;
    }

    const archivo = foto.files[0];

    reporte.foto = archivo;

    vistaFoto.innerHTML =
        "✅ Fotografía registrada<br>" +
        "📷 " + archivo.name;

    estado.textContent =
        "✅ Fotografía preparada para el reporte.";

    console.log("Fotografía:", archivo);

});


// 📍 FINALIZAR ACTIVIDAD
btnFinalizar.addEventListener("click", function () {

    estado.textContent =
        "📍 Obteniendo ubicación final...";

    if (!navigator.geolocation) {

        estado.textContent =
            "❌ Este dispositivo no permite obtener ubicación.";

        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (posicion) {

            const fecha = new Date();

            reporte.finalizacion = {

                fecha: fecha.toLocaleDateString(),

                hora: fecha.toLocaleTimeString(),

                latitud: posicion.coords.latitude,

                longitud: posicion.coords.longitude

            };

            estado.innerHTML =
                "✅ Actividad finalizada<br>" +
                "🕐 Hora: " + reporte.finalizacion.hora + "<br>" +
                "📍 Ubicación final registrada";

            console.log(
                "Finalización:",
                reporte.finalizacion
            );

        },

        function () {

            estado.textContent =
                "⚠️ Debes permitir el acceso a la ubicación.";

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

});


// 📤 ENVIAR REPORTE
btnEnviar.addEventListener("click", function () {

    console.log("Reporte completo:", reporte);

    if (!reporte.inicio) {

        estado.textContent =
            "⚠️ Primero debes iniciar la actividad.";

        return;
    }

    if (!reporte.foto) {

        estado.textContent =
            "⚠️ Primero debes tomar la fotografía.";

        return;
    }

    if (!reporte.finalizacion) {

        estado.textContent =
            "⚠️ Primero debes finalizar la actividad.";

        return;
    }

    estado.innerHTML =
        "✅ Reporte completo<br>" +
        "📍 Inicio registrado<br>" +
        "📸 Fotografía registrada<br>" +
        "📍 Finalización registrada";

});
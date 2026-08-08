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

btnEnviar.addEventListener("click", async function () {

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

    estado.textContent =
        "☁️ Preparando reporte...";

    try {

        // Convertir fotografía a Base64
        const fotoBase64 =
            await convertirFoto(reporte.foto);

        const datos = {

            persona: document.getElementById("nombrePersona").value.trim(),

            inicio: reporte.inicio,

            finalizacion: reporte.finalizacion,

            foto: {

                nombre: reporte.foto.name,

                tipo: reporte.foto.type,

                contenido: fotoBase64

            }

        };

        console.log("Datos preparados:", datos);

        // URL DE NUESTRA APLICACIÓN DE APPS SCRIPT
        const URL_APPS_SCRIPT =
            "https://script.google.com/macros/s/AKfycbzoUD6lVv1LSdBkerjvawRsqhduxjkYcGLb6bJeg6iEYzwc2Fc8xIPb4p4BIQEgXEKb/exec";

        estado.textContent =
            "☁️ Enviando reporte...";

        // Crear formulario invisible
        const formulario =
            document.createElement("form");

        formulario.method = "POST";

        formulario.action =
            URL_APPS_SCRIPT;

        formulario.target =
            "iframeEnvio";

        formulario.style.display =
            "none";


        // Campo que recibirá Apps Script
        const campo =
            document.createElement("input");

        campo.type = "hidden";

        campo.name = "datos";

        campo.value =
            JSON.stringify(datos);


        formulario.appendChild(campo);


        // Crear iframe invisible
        const iframe =
            document.createElement("iframe");

        iframe.name =
            "iframeEnvio";

        iframe.style.display =
            "none";


        document.body.appendChild(iframe);

        document.body.appendChild(formulario);


        // Enviar
        formulario.submit();


        // Mostrar confirmación
        setTimeout(function () {

            estado.innerHTML =
                "✅ <strong>Reporte enviado.</strong><br>" +
                "📍 Inicio registrado<br>" +
                "📸 Fotografía registrada<br>" +
                "📍 Finalización registrada";

            console.log(
                "Reporte enviado a Apps Script."
            );

        }, 3000);


    } catch (error) {

        console.error(error);

        estado.textContent =
            "❌ No fue posible enviar el reporte.";

    }

});


// 📸 Convertir fotografía a Base64

function convertirFoto(archivo) {

    return new Promise(function (resolve, reject) {

        const lector =
            new FileReader();

        lector.onload = function () {

            const resultado =
                lector.result;

            const base64 =
                resultado.split(",")[1];

            resolve(base64);

        };

        lector.onerror = function () {

            reject(
                new Error(
                    "No se pudo leer la fotografía."
                )
            );

        };

        lector.readAsDataURL(archivo);

    });

}

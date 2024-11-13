// Date picker en español
//; (function ($) {
//    $.fn.datepicker.dates['es'] = {
//        days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
//        daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
//        daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
//        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
//        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
//        today: "Hoy"
//    };
//}(jQuery));

const select2esp = {
    noResults: function () {
        return 'No hay resultados'
    },
    searching: function () {
        return 'Buscando...'
    },
    inputTooShort: function () {
        return 'Ingrese al menos 2 caracteres'
    }
}

const toastrOptions = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function Volver() {
    if (window.history.length == 1) {
        window.close()
    } else {
        window.history.back()
    }
}

function CambiarCIA() {
    let fd = new FormData()
    fd.set('cia', $('#CIA').val())
    fetch(`${HOME_URL}/CambiarCIA`,
        {
            method: 'POST',
            body: fd
        })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                window.location.reload()
            } else {
                toastr.warning('Compañía no válida', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}
function mostrarToast(tipo, texto) {

    const toast = bootstrap.Toast.getOrCreateInstance($("#kt_docs_toast_toggle"));
    $("#toasttype").text(tipo)
    $("#toasttext").text(texto)
    toast.show();
}

function scrollToTableRight() {
    const table = document.querySelector('.dataTables_scrollBody')
    if (table) {
        console.log(table)
        //table.scrollTo(table.scrollWidth, 0)
        table.scrollTo({
            left: 2500
        })
    }
}

function scrollToTableLeft() {
    const table = document.querySelector('.dataTables_scrollBody')
    if (table) {
        //table.scrollTo(0, table.scrollWidth)
        table.scrollTo({
            left: 0
        })
    }
}
$(document).ready(() => {
    $('#CIA').select2({
        placeholder: "Seleccione una compañía",
    });
    $('#CIA').on('change', () => {
        CambiarCIA()
    })
})
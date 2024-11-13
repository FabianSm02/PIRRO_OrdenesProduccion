
var documentosParaBatch = []

var template;

var KTDatatablesServerSide = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;

    // Private functions
    var initDatatable = function () {
        dt = $("#miTabla").DataTable({
            searchDelay: 500,
            processing: true,
            stateSave: false,
            scrollX: true,
            //data: requisiciones,
            responsive: false,

            //serverSide: true,
            language: {
                lengthMenu: "Mostrando _MENU_ registros por página",
                zeroRecords: "No se encontraron registros",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No se encontraron registros",
                infoFiltered: "(de un total de _MAX_ registros)"
            },
            ajax: {
                url: `${REQUISICIONES_URL}/ObtenerOrdenesProduccion`,
                dataSrc: "",
                contentType: 'application/json',
                data: {
                    fechaInicio: $('#rangoFechas').val().split(' - ')[0].split('/').reverse().join('-'),
                    fechaFin: $('#rangoFechas').val().split(' - ')[1].split('/').reverse().join('-'),
                    orden: $('#requisicion').val(),
                    articulo: $('#articulo').val(),
                    bodega: $('#bodega').val(),
                    estado: $('#estado').val(),
                    usuario: $('#solicitante').val()
                }
            },
            columns: [
                {
                    "data": null,
                    "defaultContent": ``
                },
                {
                    "data": null,
                    "defaultContent": `<a href="javascript:;"><i class="fa fa-caret-right verSubtabla" style="width: 10px;"></i></a>`
                },
                {
                    "data": "DOCUMENTO",
                },
                { "data": "ARTICULO_COMPLETO", },
                { "data": "BODEGA", },
                { "data": "CANTIDAD", },
                { "data": "UNIDAD_DE_MEDIDA", },
                { "data": "HOJAS", },
                { "data": "REFERENCIA", },
           /*     { "data": "LINEAS" },*/
                { "data": "FECHA_STR", },
                { "data": "USUARIO", },
                { "data": "ESTADO", },
                { "data": "APROBADOR", },
                //{ "data": "ESTADO" },
                //{ "data": "SOLICITANTE" },
                //{ "data": "ASIENTO" },
                {
                    "data": null,
                },
            ],
            columnDefs: [
                //{
                //    targets: [1, 5],
                //    responsivePriority: 1,
                //    visible: false
                //},
                {
                    targets: 0,
                    orderable: false,
                    render: function (data, type, row) {
                        return `
                            <div class="form-check form-check-sm form-check-custom form-check-solid">
                                <input class="form-check-input" type="checkbox" value="${row.DOCUMENTO}" estado="${row.ESTADO}" />
                            </div>`;
                    }
                },
                {
                    targets: 11,
                    orderable: false,
                    visible: true,
                    render: function (data) {
                        const ESTADO = {
                            "S": { 'titulo': 'Aprobado', 'class': ' badge-light-success ' },
                            "N": { 'titulo': 'No aprobado', 'class': ' badge-light-warning ' },
                            "Aplicado": { 'titulo': 'Aplicado', 'class': ' badge-light-primary ' },
                        };
                        return `<span class="badge ${ESTADO[data].class} badge-lg">${ESTADO[data].titulo}</span>`;
                    }
                },
                {
                    targets: 12,
                    orderable: false,
                    visible: true,
                    render: function (data, type, row) {
                        return `${row.APROBADOR} - ${row.FECHA_APROBACION}`;
                    }
                },

                //{
                //    targets: 8,
                //    orderable: false,
                //    render: function (data, type, row) {
                //        const ESTADOICON = {
                //            "S": { 'icono': 'la-check', 'class': ' badge-light-success ', 'color': 'text-success' },
                //            "N": { 'icono': 'la-cogs', 'class': ' badge-light-warning ', 'color': 'text-warning' },
                //            "Aplicado": { 'icono': 'la-box', 'class': ' badge-light-primary ', 'color': 'text-primary' },
                //        };
                //        return `<span class="badge ${ESTADOICON[row.ESTADO].class} badge-lg"><i class="las ${ESTADOICON[row.ESTADO].icono} ${ESTADOICON[row.ESTADO].color} fs-2x"></i></span>`;
                //    }
                //},


                {
                    targets: 13,
                    orderable: false,
                    render: function (data, type, row) {
                        let btns = ``
                        if ((ORDEN_PRODUCCION && rolUsuario == 3 && row.ESTADO == "S") || (ORDEN_PRODUCCION && rolUsuario == 1 && row.ESTADO == "S")) {
                            btns += `
                                <a href="${REQUISICIONES_URL}/Detalles?Orden=${row.DOCUMENTO}"  class="btn btn-sm btn-clean btn-icon mr-2" title="Información de la orden" >
	                             <span class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo1/dist/../src/media/svg/icons/Code/Info-circle.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <rect x="0" y="0" width="24" height="24"/>
                                        <circle fill="currentColor" opacity="0.3" cx="12" cy="12" r="10"/>
                                        <rect fill="currentColor" x="11" y="10" width="2" height="7" rx="1"/>
                                        <rect fill="currentColor" x="11" y="7" width="2" height="2" rx="1"/>
                                    </g>
                                </svg><!--end::Svg Icon--></span>
	                        </a>`
                        }

                        if ((ORDEN_PRODUCCION && rolUsuario == 3 && row.ESTADO == "N") || (ORDEN_PRODUCCION && rolUsuario == 1 && row.ESTADO == "N")) {
                        btns += `
                                <a href="${REQUISICIONES_URL}/Detalles?Orden=${row.DOCUMENTO}"  class="btn btn-sm btn-clean btn-icon mr-2" title="Editar orden" >
	                           <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/art/art005.svg-->
                                <span class="svg-icon svg-icon-warning svg-icon-1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.3" d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z" fill="currentColor"/>
                                    <path d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z" fill="currentColor"/>
                                </svg>
                                </span>
                                <!--end::Svg Icon-->
	                        </a>`
                        }
                        if ((row.ESTADO == "N" && ORDEN_PRODUCCION && rolUsuario == 2) || (row.ESTADO == "N" && ORDEN_PRODUCCION && rolUsuario == 1)) {
                            btns +=
                                `<a href="javascript:;"  onclick="aprobarOrdenProduccion('${row.DOCUMENTO}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Aprobar orden" >
	                           <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/art/art005.svg-->
                                <span class="svg-icon svg-icon-success svg-icon-1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.3" d="M10.3 14.3L11 13.6L7.70002 10.3C7.30002 9.9 6.7 9.9 6.3 10.3C5.9 10.7 5.9 11.3 6.3 11.7L10.3 15.7C9.9 15.3 9.9 14.7 10.3 14.3Z" fill="currentColor"/>
                                <path d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM11.7 15.7L17.7 9.70001C18.1 9.30001 18.1 8.69999 17.7 8.29999C17.3 7.89999 16.7 7.89999 16.3 8.29999L11 13.6L7.70001 10.3C7.30001 9.89999 6.69999 9.89999 6.29999 10.3C5.89999 10.7 5.89999 11.3 6.29999 11.7L10.3 15.7C10.5 15.9 10.8 16 11 16C11.2 16 11.5 15.9 11.7 15.7Z" fill="currentColor"/>
                                </svg>
                                </span>
                                <!--end::Svg Icon-->
	                        </a>`
                        }

                        if ((row.ESTADO == "N" && ORDEN_PRODUCCION && rolUsuario == 2) || (row.ESTADO == "N" && ORDEN_PRODUCCION && rolUsuario == 1) || (row.ESTADO == "N" && ORDEN_PRODUCCION && rolUsuario == 3)) {
                        btns +=   `<a href="javascript:;" onclick="eliminarOrdenProduccion('${row.DOCUMENTO}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Eliminar orden" >
	                           <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/art/art005.svg-->
                                <span class="svg-icon svg-icon-danger svg-icon-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>
                                        <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>
                                        <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>
                                    </svg>
                                </span>
                                <!--end::Svg Icon-->
	                        </a>`
                        }
                        return btns;


                    }
                },
                {
                    //targets: [2], // el índice de la columna que deseamos ocultar
                    visible: false, // ocultar la columna en vista web
                    responsivePriority: 1 // dar prioridad 1 a la ocultación en vista móvil
                }
            ],
            // Add data-filter attribute
            //createdRow: function (row, data, dataIndex) {
            //    $(row).find('td:eq(4)').attr('data-filter', data.CreditCardType);
            //}
        });
        table = dt.$;

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {
            //initToggleToolbar();
            //toggleToolbars();
            //handleDeleteRows();
            //KTMenu.createInstances();
            const container = document.querySelector('#miTabla');
            const checkboxes = container.querySelectorAll('[type="checkbox"]');
            // Toggle delete selected toolbar
            checkboxes.forEach(c => {
                // Checkbox on click event
                c.addEventListener('click', function () {
                    setTimeout(function () {
                        ManejarCantidadCheckboxes();
                    }, 50);
                });
            });
        });
    }
    $('#checkAll').on('click', function () {

        var isChecked = $("#checkAll").prop('checked');
        if (isChecked) {
            setTimeout(function () {
                ObtenerSeleccion();
            }, 50);
            //ObtenerSeleccion()

        } else {
            $(".multi").addClass("d-none")
        }
       
    });

    // Add a click event handler to the checkboxes in the body (tbody)
    $('#miTabla').on('click', 'input[type="checkbox"]', function () {
        // Check or uncheck the "checkAll" checkbox in the header based on the checkboxes in the body
        var allChecked = dt.column(0).nodes().to$().find('input[type="checkbox"]:checked').length === dt.data().length;
        $('#checkAll').prop('checked', allChecked);

    });

    var ManejarCantidadCheckboxes = () => {
        // Select all delete buttons

        // Select refreshed checkbox DOM elements

        const container = document.querySelector('#miTabla');
        const allCheckboxes = container.querySelectorAll('[type="checkbox"]');

        // Detect checkboxes state & count
        let checkedState = false;
        let count = 0;

        // Count checked boxes
        allCheckboxes.forEach(c => {
            if (c.checked) {
                checkedState = true;
                count++;
            }
        });
        if (checkedState) {

            ObtenerSeleccion()

        } else {
            $(".multi").addClass("d-none")
        }

    }


    var Filtros = function () {

        $('#kt_datatable_search_query').on('keyup', function () {
            //const val = $(this).val() == '0' ? '' : $(this).val()
            dt.search($(this).val()).draw();
        });
     
    }


    var subtabla = function () {
        $('#miTabla tbody').on('click', '.verSubtabla', function () {
            var tr = $(this).closest('tr');
            var row = dt.row(tr);
            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                //construirsubtabla(subtabladatos);
                let datos = row.data()
                row.child(`
                    <table class="table  table-row-dashed fs-6 gy-4" id="subtabla${datos.DOCUMENTO}">
                        <thead>
                            <tr class="text-start text-gray-600 fw-bold fs-7 text-uppercase gs-0">
                                <th class="text-left "></th>
                                <th class="text-left ">Línea</th>
                                <th class="text-left min-w-450">Artículo</th>
                                <th class="text-left ">Bodega</th>
                                <th class="text-left ">Teórico</th>
                                <th class="text-left ">Real</th>
                                <th class="text-left ">Diferencia</th>
                                <th class="text-left ">Existencia</th>
                                <th class="text-left ">Consumido</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 fw-semibold">
                        </tbody>
                    </table>
                `).show();

                //<th class="text-left ">Costo unitario</th>
                //<th class="text-left ">Costo total</th>
                $(`#subtabla${datos.DOCUMENTO}`).DataTable({
                    //data: datos.ARTICULOS,
                    ajax: {
                        url: `${REQUISICIONES_URL}/ObtenerOrdenesProduccionLineas?orden=${datos.DOCUMENTO}`,
                        dataSrc: ""
                    },
                    destroy: true,
                    responsive: true,
                    columns: [


                        {
                            "data": null, "width": "10px",
                            "defaultContent": ``
                        },
                        { "data": "LINEA", "width": "60px" },
                        { "data": "ARTICULO", "width": "300px" },
                        { "data": "BODEGA", "width": "80px" },
                        { "data": "HORA_INICIO", "width": "80px" },
                        { "data": "HORA_FIN", "width": "80px" },
                        { "data": "TIEMPO_TEORICO", "width": "80px" },
                        {
                            "data": "EXISTENCIA", "width": "80px"
                        },
                        {
                            "data": "CONSUMIDO", "width": "80px"
                        },
                        //{ "data": "CENTRO_COSTO", "width": "150px" },
                        //{
                        //    "data": "CUENTA_CONTABLE", "width": "150px"
                        //},
                    ],


                    columnDefs: [
                        {
                            targets: 2,
                            orderable: false,
                            render: function (data, type, row) {
                                return `${row.ARTICULO} - ${row.ARTICULO_NOMBRE}`;
                            }
                        },
                        //{
                        //    targets: 6,
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        return `${row.CENTRO_COSTO} - ${row.CENTRO_COSTO_NOMBRE}`;
                        //    }
                        //},
                        //{
                        //    targets: 7,
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        return `${row.CUENTA_CONTABLE} - ${row.CUENTA_CONTABLE_NOMBRE}`;
                        //    }
                        //},
                        {
                            targets: [2, 5], // el índice de la columna que deseamos ocultar
                            visible: true, // ocultar la columna en vista web
                            responsivePriority: 1 // dar prioridad 1 a la ocultación en vista móvil
                        }
                        //{
                        //    targets: 8,
                        //    orderable: false,
                        //    render: function (data, type, row) {
                        //        return `${(row.CANTIDAD * row.COSTO_FISCAL_LOCAL).toFixed(2)}`;
                        //    }
                        //},
                    ],

                });

                $(`#subtabla${datos.DOCUMENTO}_wrapper`).addClass("ms-20")
                //row.child(construirsubtabla(row.data().LINEAS)).show();
                tr.addClass('shown');
            }
        });
    }

    // Public methods
    return {
        init: function () {
            initDatatable();

            //ListenerCheckboxes();
            subtabla();
            Filtros();
        },
        reload: function () {
            dt.ajax.reload()
        },
        reset: function () {
            dt.destroy()
            initDatatable();
        }
    }
}();


function eliminarOrdenProduccion(orden) {
    Swal.fire({
        title: `¿Desea eliminar la orden de producción ${orden}?`,
        icon: "error",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then((result) => {
        if (result.value) {
            confirmarEliminarOrden(orden);
        }
    })
}

function aprobarOrdenProduccion(orden) {
    Swal.fire({
        title: `¿Desea aprobar la orden de producción ${orden}?`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aprobar",
        customClass: {
            cancelButton: "btn fw-bold btn-active-secondary",
            confirmButton: "btn fw-bold btn-success",
        }
    }).then((result) => {
        if (result.value) {
            confirmarAprobarOrden(orden);
        }
    })
}


function confirmarAprobarOrden(orden) {
    let fd = new FormData()
    fd.set('orden', orden)
    const url = `${REQUISICIONES_URL}/AprobarOrdenProduccion`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Orden aprobada correctamente', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('No se pudo aprobar la orden', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}

function ObtenerSeleccion() {
    documentosParaBatch = []
    $("#miTabla input:checkbox:checked").each(function () {
        
        documentosParaBatch.push({
            documento: $(this).val(),
            estado: $(this).attr('estado')
        })
    });

    if (documentosParaBatch.length > 0) {
        for (var i = 0; i < documentosParaBatch.length; i++) {
            if (documentosParaBatch[i].documento == '1' ) {
                documentosParaBatch = documentosParaBatch.splice(1)
            } 
        }
    }

    if (documentosParaBatch.length > 0) {
        for (var i = 0; i < documentosParaBatch.length; i++) {
            if ((documentosParaBatch[i].estado == 'N' && ORDEN_PRODUCCION == '1' && rolUsuario == '2') || documentosParaBatch[i].estado == 'N' && ORDEN_PRODUCCION == '1' && rolUsuario == '1') {
                $(".multi").removeClass('d-none')
            } else {
                $(".multi").addClass('d-none')
                i = documentosParaBatch.length;
            }
        }
    } else {
        $(".multi").addClass('d-none')
    }
}

function ConfirmarAprobarEnBatch() {
    Swal.fire({
        title: `¿Desea aprobar las órdenes de producción seleccionadas?`,
        icon: "success",
        showCancelButton: true,
        buttonsStyling: false,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aprobar",
        customClass: {
            cancelButton: "btn fw-bold btn-active-secondary",
            confirmButton: "btn fw-bold btn-success",
        }
    }).then((result) => {
        if (result.value) {
            AprobarEnBatch();
        }
    })
}

function ConfirmarEliminarEnBatch() {
    Swal.fire({
        title: `¿Desea eliminar las órdenes de producción seleccionadas?`,
        icon: "error",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
            confirmButton: "btn fw-bold btn-danger",
            cancelButton: "btn fw-bold btn-active-secondary"
        }
    }).then((result) => {
        if (result.value) {
            EliminarEnBatch();
        }
    })
}


async function AprobarEnBatch() {
    let fd = new FormData();
    fd.set('lineas', JSON.stringify(documentosParaBatch))

    const bodyO = {
        documentosParaBatch
    }

    const url = `${REQUISICIONES_URL}/AprobarOrdenProduccionBatch`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyO)
        })
        const result = await response.json()
        if (result == 1) {
            toastr.success('Órdenes aprobadas correctamente', 'Éxito', toastrOptions)
            $(".multi").addClass('d-none')
            KTDatatablesServerSide.reload()
        } else {
            toastr.warning('No se pudo aprobar en batch', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err)
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
    }

}


async function EliminarEnBatch() {
    let fd = new FormData();
    fd.set('lineas', JSON.stringify(documentosParaBatch))

    const bodyO = {
        documentosParaBatch
    }

    const url = `${REQUISICIONES_URL}/EliminarOrdenProduccionBatch`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyO)
        })
        const result = await response.json()
        if (result == 1) {
            toastr.success('Órdenes eliminadas correctamente', 'Éxito', toastrOptions)
            $(".multi").addClass('d-none')
            KTDatatablesServerSide.reload()
        } else {
            toastr.warning('No se pudo aprobar en batch', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err)
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
    }

}

function confirmarEliminarOrden(orden) {
    let fd = new FormData()
    fd.set('orden', orden)
    const url = `${REQUISICIONES_URL}/EliminarOrdenProduccion`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Orden eliminada correctamente', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('No se pudo eliminar la orden', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}


function ManejarFiltrosBotones() {
    $('#requisicion').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#articulo').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#bodega').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#estado').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#solicitante').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })

    $('#rangoFechas').on('change', () => {
        KTDatatablesServerSide.reset()
        documentosParaBatch = []
        ObtenerSeleccion()
    })
}

$(document).ready(function () {
    ManejarFiltrosBotones()
    $("#rangoFechas").daterangepicker({
        locale: {
            format: 'DD/MM/YYYY',
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            fromLabel: 'Desde',
            toLabel: 'Hasta',
            customRangeLabel: 'Rango personalizado',
            daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            firstDay: 1
        }
    });
    //initDropzone()
    KTDatatablesServerSide.init()

});

function guardar() {
    toastr.success('Se han guardado los cambios', 'Éxito', toastrOptions)
}

function buscarArticulo() {
    let articulo = articulos.find(element => element.ARTICULO == $('#codigoarticulo').val());
    setExistencia()
    $("#articuloconsumo").val(articulo.ARTICULO).trigger("change")
}

function setExistencia() {
    $("#existencia").val(Math.floor(Math.random() * 96) + 5)


}
function setExistenciaA() {
    //$("#existencia").val(Math.floor(Math.random() * 96) + 5)


}

function agregarLinea() {
    var _articulo = $('#articuloconsumo').val()
    var _bodega = $('#bodegconsumoa').val()
    var _cantidad = $('#cantcons').val()
    var _horaInicio = $('#horainicio').val()
    var _horaFin = $('#horafin').val()
    //var _centroCosto = $('#centrocosto2').val()
    //var _cuentaContable = $('#cuentacontable2').val()


    if (_articulo == '') {
        toastr.warning('Debe seleccionar un articulo', 'Alerta', toastrOptions)
        return
    } else if (_bodega == '') {
        toastr.warning('Debe seleccionar una bodega', 'Alerta', toastrOptions)
        return
    } else if (_cantidad == '' || _cantidad <= 0) {
        toastr.warning('Debe digitar una cantidad válida', 'Alerta', toastrOptions)
        return
    //} else if (_centroCosto == '') {
    //    toastr.warning('Debe seleccionar una centro de costo', 'Alerta', toastrOptions)
    //    return
    //} else if (_cuentaContable == '') {
    //    toastr.warning('Debe seleccionar una cuenta contable', 'Alerta', toastrOptions)
    //    return
    } else if (_horaInicio == '') {
        toastr.warning('Debe digitar una hora de inicio válida', 'Alerta', toastrOptions)
        return
    } else if (_horaFin == '') {
        toastr.warning('Debe digitar una hora fin válida', 'Alerta', toastrOptions)
        return
    }

    InsertarLineaOrdenProduccion()
}


var KTDatatablesServerSide = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;

    // Private functions
    var initDatatable = function () {
        dt = $('#miTabla').DataTable({

            responsive: false,
            pageLength: 100,
            //"data": lineas,
            language: {
                lengthMenu: "Mostrando _MENU_ registros por página",
                zeroRecords: "No se encontraron registros",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No se encontraron registros",
                infoFiltered: "(de un total de _MAX_ registros)"
            },

            ajax: {
                url: `${REQUISICIONES_URL}/ObtenerLineasOrdenProduccion?Orden=${Orden}`,
                dataSrc: "",
                contentType: 'application/json'
            },

            "columns": [
                {
                    "data": null,
                    "defaultContent": ``
                },
                { "data": "ARTICULO",  },
                { "data": "BODEGA", "width": "200px" },
                { "data": "HORA_INICIO", "width": "200px" },
                { "data": "HORA_FIN", "width": "200px" },
                { "data": "TIEMPO_TEORICO", "width": "100px" },
                { "data": "EXISTENCIA", "width": "100px" },
                { "data": "CONSUMIDO",  },
                //{ "data": "CENTRO_COSTO",  },
                //{ "data": "CUENTA_CONTABLE",  },
                { "data": null,  },
            ],
            columnDefs: [
                {
                    targets: 1,
                    orderable: false,
                    render: function (data, type, row) {
                        return `${row.ARTICULO} - ${row.ARTICULO_NOMBRE}`;
                    }
                },

                {
                    targets: 2,
                    orderable: false,
                    render: function (data, type, row) {
                        let opciones = ''
                        let estadoOpcion = ''

                        const estado = $('#estado').val()

                        if (estado == "S") {
                            estadoOpcion = "disabled"
                        } else {
                            estadoOpcion = ""
                        }

                        const bodegas = ObtenerBodegasXArticuloParaLineas(row.ARTICULO)

                        for (const item of bodegas) {
                            opciones += `<option value="${item.BODEGA}" ${row.BODEGA == item.BODEGA ? 'selected' : ''}>${item.COMPLETO}</option>`
                        }

                        return `
                                <select  name="bodegconsumoa_${row.LINEA}" onchange="actualizarBodega('${row.DOCUMENTO_INV}','${row.LINEA}')" ${estadoOpcion} class="form-select bodega bodegconsumo${row.ARTICULO} data-control="select2" data-placeholder="Seleccione una bodega" onchange="setExistenciaA('${row.ARTICULO}')">
                                    ${opciones}
                                </select>`;
                    }
                },
                {
                    targets: 3,
                    orderable: false,
                    render: function (data, type, row) {
                        let estadoOpcion = ''

                        const estado = $('#estado').val()

                        if (estado == "S") {
                            estadoOpcion = "disabled"
                        } else {
                            estadoOpcion = "disabled"
                        }

                        return `<input id="horainicio_${row.LINEA}" type="time" ${estadoOpcion} onblur="actualizarHoraInicio('${row.DOCUMENTO_INV}','${row.LINEA}')"   class="form-control" placeholder="Cantidad" value="${data}" />`;
                    }
                },
                {
                    targets: 4,
                    orderable: false,
                    render: function (data, type, row) {
                        let estadoOpcion = ''

                        const estado = $('#estado').val()

                        if (estado == "S") {
                            estadoOpcion = "disabled"
                        } else {
                            estadoOpcion = ""
                        }

                        return `<input id="horafin_${row.LINEA}" type="time" ${estadoOpcion} onblur="actualizarHoraFin('${row.DOCUMENTO_INV}','${row.LINEA}')"   class="form-control" placeholder="Cantidad" value="${data}" />`;
                    }
                },
                {
                    targets: 7,
                    orderable: false,
                    render: function (data, type, row) {
                        let estadoOpcion = ''

                        const estado = $('#estado').val()

                        if (estado == "S") {
                            estadoOpcion = "disabled"
                        } else {
                            estadoOpcion = ""
                        }

                        return `<input id="cantidada_${row.LINEA}" type="number" ${estadoOpcion} onchange="actualizarCantidad('${row.DOCUMENTO_INV}','${row.LINEA}')"   class="form-control" placeholder="Cantidad" value="${data}" />`;
                    }
                },
                //{
                //    targets: 5,
                //    orderable: false,
                //    render: function (data, type, row) {
                //        let opciones = ''

                //        let estadoOpcion = ''

                //        const estado = $('#estado').val()

                //        if (estado == "S") {
                //            estadoOpcion = "disabled"
                //        } else {
                //            estadoOpcion = ""
                //        }

                //        const centrosCosto = document.querySelectorAll('#centrocosto2 option')

                //        for (const item of centrosCosto) {
                //            opciones += item.outerHTML.replace('<option', `<option ${row.CENTRO_COSTO == item.value ? 'selected' : ''}`)
                //        }

                //        return `<select name="centrocostoa_${row.LINEA}" onchange="actualizarCentroCosto('${row.DOCUMENTO_INV}','${row.LINEA}')" ${estadoOpcion} class="form-select centroCosto centrocosto${row.ARTICULO}" data-control="select2" data-placeholder="Seleccione un centro costo">
                //                    ${opciones}
                //                </select>`;
                //    }
                //},
                //{
                //    targets: 6,
                //    orderable: false,
                //    render: function (data, type, row) {
                //        let opciones = '<option></option>'

                //        let estadoOpcion = ''

                //        const estado = $('#estado').val()

                //        if (estado == "S") {
                //            estadoOpcion = "disabled"
                //        } else {
                //            estadoOpcion = ""
                //        }

                //        const cuentasContables = ObtenerCuentasContablesXCentroCostoParaLineas(row.CENTRO_COSTO)

                //        for (const item of cuentasContables) {
                            
                //            opciones += `<option value="${item.CUENTA_CONTABLE}" ${row.CUENTA_CONTABLE == item.CUENTA_CONTABLE ? 'selected' : ''}>${item.COMPLETO}</option>`
                //        }

                //        return `<select name="cuentacontablea_${row.LINEA}" ${estadoOpcion} onchange="actualizarCuentaContable('${row.DOCUMENTO_INV}','${row.LINEA}')" class="form-select cuentaContable cuentacontable${row.ARTICULO}" data-control="select2" data-placeholder="Seleccione una cuenta contable">
                //                   ${opciones}
                //                </select>`;
                //    }
                //},

                {
                    targets: 8,
                    orderable: false,
                    render: function (data, type, row) {
                        let btns = ``
                        if (row.ESTADO == "N") {
                            btns += `
                            <a href="javascript:;" onclick="eliminarLinea('${row.DOCUMENTO_INV}','${row.LINEA}', '${row.ARTICULO}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Eliminar línea" >
	                           <!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/metronic/html/releases/2023-01-26-051612/core/html/src/media/icons/duotune/art/art005.svg-->
                                <span class="svg-icon svg-icon-danger svg-icon-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor"/>
                                        <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor"/>
                                        <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor"/>
                                    </svg>
                                </span>
                                <!--end::Svg Icon-->
	                        </a>`}
                        return btns;
                    }
                },
                {
                   // targets: [1,4,7], // el índice de la columna que deseamos ocultar
                    visible: true, // ocultar la columna en vista web
                    responsivePriority: 1 // dar prioridad 1 a la ocultación en vista móvil
                }
            ],
        });
        table = dt.$;

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {
            //initToggleToolbar();
            //toggleToolbars();
            //handleDeleteRows();
            //KTMenu.createInstances();
            $('.bodega').select2({
                placeholder: "Seleccione una bodega"
            })
            $('.centroCosto').select2({
                placeholder: "Seleccione una centro de costo"
            })
            $('.cuentaContable').select2({
                placeholder: "Seleccione una cuenta contable"
            })
        });
    }

   



    // Public methods
    return {
        init: function () {
            initDatatable();
        },
        reload: function () {
            dt.ajax.reload()
        },
    }
}();

function eliminarLinea(documento, linea, articulo) {
    Swal.fire({
        title: '¿Desea eliminar esta línea?',
        text: 'Artículo: ' + articulo + '',
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
            confirmarEliminarLinea(documento, linea);
        }
    })
}

async function actualizarCuentaContable(documento, linea) {
    let fd = new FormData()
    var _cuentaContable = $("select[name='cuentacontablea_" + linea + "']").val()

    fd.set('orden', documento)
    fd.set('linea', linea)
    fd.set('cuentaContable', _cuentaContable)

    try {
        const url = `${REQUISICIONES_URL}/EditarCuentaContableOrdenProduccionLinea`
        const response = await fetch(url, {
            method: 'POST',
            body: fd
        })

        const result = await response.json()

        if (result == 1) {
            toastr.success('Cuenta contable actualizada', 'Éxito', toastrOptions)
            KTDatatablesServerSide.reload()
        } else {
            toastr.warning('No se pudo actualizar la cuenta contable', 'Alerta', toastrOptions)
        }

    } catch (err) {
        console.error(err)
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
    }
}


function actualizarBodega(documento, linea) {
    let fd = new FormData()
    var _bodega=  $("select[name='bodegconsumoa_" + linea + "']").val()

    fd.set('orden', documento)
    fd.set('linea', linea)
    fd.set('bodega', _bodega)

    const url = `${REQUISICIONES_URL}/EditarBodegaOrdenProduccionLinea`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Bodega actualizada', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('No se pudo actualizar la bodega', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}

function actualizarCantidad(documento, linea) {
    let fd = new FormData()
    let cantidad = $(`#cantidada_${linea}`).val()

    if (cantidad == '' || cantidad <= 0) {
        toastr.warning('Debe digitar una cantidad válida', 'Alerta', toastrOptions)
        return
    }

    fd.set('orden', documento)
    fd.set('linea', linea)
    fd.set('cantidad', cantidad)

    const url = `${REQUISICIONES_URL}/EditarCantidadOrdenProduccionLinea`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Cantidad actualizada', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('No se pudo actualizar la bodega', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}


function actualizarHoraInicio(documento, linea) {
    let fd = new FormData()
    let hora = $(`#horainicio_${linea}`).val()

    if (hora == '' || hora <= 0) {
        toastr.warning('Debe digitar una hora válida', 'Alerta', toastrOptions)
        return
    }

    fd.set('orden', documento)
    fd.set('linea', linea)
    fd.set('hora', hora)

    const url = `${REQUISICIONES_URL}/EditarHoraInicioOrdenProduccionLinea`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Hora de inicio actualizada', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('No se pudo actualizar la hora', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}


function actualizarHoraFin(documento, linea) {
    let fd = new FormData()
    let hora = $(`#horafin_${linea}`).val()

    if (hora == '' || hora <= 0) {
        toastr.warning('Debe digitar una hora válida', 'Alerta', toastrOptions)
        return
    }

    fd.set('orden', documento)
    fd.set('linea', linea)
    fd.set('hora', hora)

    const url = `${REQUISICIONES_URL}/EditarHoraFinOrdenProduccionLinea`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Hora de fin actualizada', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('No se pudo actualizar la hora', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}

async function actualizarCentroCosto(documento, linea) {
    let fd = new FormData()
    var _centroCosto = $("select[name='centrocostoa_" + linea + "']").val()

    fd.set('orden', documento)
    fd.set('linea', linea)
    fd.set('centroCosto', _centroCosto)

    try {
        const url = `${REQUISICIONES_URL}/EditarCentroCostoOrdenProduccionLinea`
        const response = await fetch(url, {
            method: 'POST',
            body: fd
        })

        const result = await response.json()

        if (result == 1) {
            toastr.success('Centro de costo actualizado', 'Éxito', toastrOptions)
            KTDatatablesServerSide.reload()
        } else {
            toastr.warning('No se pudo actualizar el centro de costo', 'Alerta', toastrOptions)
        }

    } catch(err) {
        console.error(err)
        toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
    }

   
}

function confirmarEliminarLinea(documento, linea) {
    let fd = new FormData()
    fd.set('documento', documento)
    fd.set('linea', linea)
    const url = `${REQUISICIONES_URL}/EliminarLineaOrdenProduccion`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Línea eliminada correctamente', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
            } else {
                toastr.warning('No se pudo eliminar la línea', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}

function ObtenerBodegaParaSeleccionarAlSeleccionarArticulo() {
    $.ajax({
        url: `${REQUISICIONES_URL}/ObtenerBodegasXArticuloParaSeleccionar`,
        data: {
            articulo: $('#articulo').val()
        },
        async: false,
        type: "POST",
        dataType: "json",
        success: function (data) {
            $('#txtCentroCosto').val(data[0].CTR_INVENTARIO).trigger("change")
        }
    });
}


function CrearOrdenProduccion() {
    var formData = new FormData();
    var _articulo = $('#articuloproducir').val()
    var _receta = $('#recetaproducir').val()
    var _bodega = $('#bodegadestino').val()
    var _cantidad = $('#cantidadAProducir').val()
    var _hojas = $('#hojasAProducir').val()
    var _referencia = $('#txtreferencia').val()

    if (_articulo == "") {
        toastr.warning('Debe seleccionar un articulo', 'Alerta', toastrOptions)
        return
    } else if (_receta == "") {
        toastr.warning('Debe seleccionar una receta', 'Alerta', toastrOptions)
        return
    } else if (_bodega == "") {
        toastr.warning('Debe seleccionar una bodega', 'Alerta', toastrOptions)
        return
    } else if (_cantidad == '' || _cantidad <= 0) {
        toastr.warning('Debe digitar una cantidad válida', 'Alerta', toastrOptions)
        return
    } else if (_hojas == '' || _cantidad <= 0) {
        toastr.warning('Debe digitar una cantidad de hojas válida', 'Alerta', toastrOptions)
        return
    }


    formData.append('articulo', _articulo);
    formData.append('receta', _receta);
    formData.append('bodega', _bodega);
    formData.append('cantidad', _cantidad);
    formData.append('hojas', _hojas);
    formData.append('referencia', _referencia);

    const url = `${REQUISICIONES_URL}/InsertarOrdenProduccion`
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data == "1") {
                toastr.success('Orden de producción creada correctamente', 'Éxito', toastrOptions)
                //KTDatatablesServerSide.reload()
                ObtenerUltimaOrdenProduccion()
            } else {
                toastr.warning('Ocurrio un error', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}


function InsertarLineaOrdenProduccion() {
    var formData = new FormData();
    var _articulo = $('#articuloconsumo').val()
    var _bodega = $('#bodegconsumoa').val()
    var _cantidad = $('#cantcons').val()
    var _horaInicio = $('#horainicio').val()
    var _horaFin = $('#horafin').val()
    var _documento = $('#documentoOrden').val()
    var _localizacion = $('#localizacion').val()
    //var _centroCosto = $('#centrocosto2').val()
    //var _cuentaContable = $('#cuentacontable2').val()


    formData.append('articulo', _articulo);
    formData.append('bodega', _bodega);
    formData.append('cantidad', _cantidad);
    formData.append('horaInicio', _horaInicio);
    formData.append('horaFin', _horaFin);
    formData.append('documento', _documento);
    formData.append('localizacion', _localizacion);
    //formData.append('centroCosto', _centroCosto);
    //formData.append('cuentaContable', _cuentaContable);

    const url = `${REQUISICIONES_URL}/InsertarOrdenProduccionLinea`
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data == "1") {
                toastr.success('Se agregó la línea correctamente', 'Éxito', toastrOptions)
                KTDatatablesServerSide.reload()
                $('#articuloconsumo').val('').trigger('change')
                $('#cantcons').val('')
                $('#bodegconsumoa').val('').trigger('change')
                $('#existencia').val('0')

                const fecha = new Date()
                const horas = fecha.getHours() < 10 ? `0${fecha.getHours()}` : fecha.getHours().toString()
                const minutos = fecha.getMinutes() < 10 ? `0${fecha.getMinutes()}` : fecha.getMinutes().toString()
                $('#horainicio').val(`${horas}:${minutos}`)
                $('#horafin').val(`${horas}:${minutos}`)
                //$('#centrocosto2').val('').trigger('change')
                //$('#cuentacontable2').val('').trigger('change')
            } else {
                toastr.warning('Ocurrio un error', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}

async function ObtenerExistenciasXBodega(articulo) {
    try {
        const url = `${REQUISICIONES_URL}ObtenerBodegasXArticulo?articulo=${articulo}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.error(e)
        return []
    }
}

function ObtenerBodegasXArticuloParaLineas(articulo) {
    return BODEGAS_ARTICULO.filter(item => item.ARTICULO === articulo)
}

function ObtenerCuentasContablesXCentroCostoParaLineas(centroCosto) {
    return CUENTAS_CONTABLE_X_CENTRO_COSTO.filter(item => item.CENTRO_COSTO === centroCosto)
}


function ObtenerUltimaOrdenProduccion() {
    $.ajax({
        url: `${REQUISICIONES_URL}/ObtenerUltimaOrdenProduccion`,
        async: false,
        type: "GET",
        success: function (data) {
            setTimeout(function () { window.location.href = `${REQUISICIONES_URL}/Detalles?Orden=${data[0].DOCUMENTO}` }, 1500);
        }
    });
}

async function ObtenerCuentasContablesXCentroCosto(centroCosto) {
    try {
        const url = `${REQUISICIONES_URL}/ObtenerCuentasContablesXCentroCosto?centroCosto=${centroCosto}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.error(e)
        return []
    }
}

async function ObtenerBodegasXArticulo(articulo) {
    try {
        const url = `${REQUISICIONES_URL}/ObtenerBodegasXArticulo?articulo=${articulo}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.error(e)
        return []
    }
}

async function ObtenerRecetasXArticulo(articulo) {
    try {
        const url = `${REQUISICIONES_URL}/ObtenerRecetasXArticulo?articulo=${articulo}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (e) {
        console.error(e)
        return []
    }
}

$(document).ready(function () {
    $('#codigoarticulo').on("input", buscarArticulo);
    KTDatatablesServerSide.init()

    $('#centrocosto2').on('change', async function (e) {
        const cuentasContables = await ObtenerCuentasContablesXCentroCosto(e.target.value)
        let html = '<option></option>'


        for (const item of cuentasContables) {
           // const seleccionado = (item.CUENTA_CONTABLE === cuentaContableSeleccionada) ? 'selected' : ''

           // html += `<option ${seleccionado} value="${item.CUENTA_CONTABLE}">${item.COMPLETO}</option>`
            html += `<option value="${item.CUENTA_CONTABLE}">${item.COMPLETO}</option>`
        }

        $('#cuentacontable2').html(html)
        $('#cuentacontable2').select2({
            placeholder: "Seleccione un cuenta contable"
        })
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#articuloproducir').on('change', async function (e) {
        const bodegas = await ObtenerBodegasXArticulo(e.target.value)
        let html = '<option></option>'


        for (const item of bodegas) {
            // const seleccionado = (item.CUENTA_CONTABLE === cuentaContableSeleccionada) ? 'selected' : ''

            // html += `<option ${seleccionado} value="${item.CUENTA_CONTABLE}">${item.COMPLETO}</option>`
            html += `<option value="${item.BODEGA}">${item.COMPLETO}</option>`
        }

        $('#bodegadestino').html(html)
        $('#bodegadestino').select2({
            placeholder: "Seleccione una bodega"
        })

        $.ajax({
            url: `${REQUISICIONES_URL}/ObtenerBodegasXArticuloParaSeleccionar`,
            data: {
                articulo: $('#articuloproducir').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#bodegadestino').val(data[0].BODEGA).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#articuloproducir').on('change', async function (e) {
        const recetas = await ObtenerRecetasXArticulo(e.target.value)
        let html = '<option></option>'


        for (const item of recetas) {
            // const seleccionado = (item.CUENTA_CONTABLE === cuentaContableSeleccionada) ? 'selected' : ''

            // html += `<option ${seleccionado} value="${item.CUENTA_CONTABLE}">${item.COMPLETO}</option>`
            html += `<option value="${item.RECETA}">${item.RECETA}</option>`
        }

        $('#recetaproducir').html(html)
        $('#recetaproducir').select2({
            placeholder: "Seleccione una receta"
        })

        $.ajax({
            url: `${REQUISICIONES_URL}/ObtenerRecetasXArticuloParaSeleccionar`,
            data: {
                articulo: $('#articuloproducir').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#recetaproducir').val(data[0].RECETA).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#articuloconsumo').on('change', async function (e) {
        const bodegas = await ObtenerBodegasXArticulo(e.target.value)
        let html = '<option></option>'


        for (const item of bodegas) {
            // const seleccionado = (item.CUENTA_CONTABLE === cuentaContableSeleccionada) ? 'selected' : ''

            // html += `<option ${seleccionado} value="${item.CUENTA_CONTABLE}">${item.COMPLETO}</option>`
            html += `<option value="${item.BODEGA}">${item.COMPLETO}</option>`
        }

        $('#bodegconsumoa').html(html)
        $('#bodegconsumoa').select2({
            placeholder: "Seleccione una bodega"
        })

        $.ajax({
            url: `${REQUISICIONES_URL}/ObtenerBodegasXArticuloParaSeleccionar`,
            data: {
                articulo: $('#articuloconsumo').val()
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function (data) {
                $('#bodegconsumoa').val(data[0].BODEGA).trigger("change")
            }
        });
    })

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#bodegconsumoa').on('change', async function (e) {
        var formData = new FormData();
        var _articulo = $('#articuloconsumo').val()
        var _bodega = $('#bodegconsumoa').val()

        if (_articulo == "") {
            return
        }

        formData.append('articulo', _articulo);
        formData.append('bodega', _bodega);

        const url = `${REQUISICIONES_URL}/ObtenerExistenciasXArticulo`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                $('#existencia').val(data)
                //if (data == 0) {
                //    toastr.warning('No hay existencias de este árticulo en la bodega seleccionada', 'Alerta', toastrOptions)
                //}
            })
            .catch(err => {
                console.error(err)
                toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
            })
    })
});

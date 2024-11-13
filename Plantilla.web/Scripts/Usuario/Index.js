//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Usuarios++++++++++++++++++++++++++++++++++++++++
let tipo_rol = $('#FiltroRol').val();
var KTTablaUsuarios = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;

    // Private functions
    var initDatatable = function () {
        dt = $("#tablaUsuarios").DataTable({
            searchDelay: 500,
            processing: true,
            stateSave: false,
            scrollX: true,
            pageLength: 50,

            "bDestroy": true,
            destroy: true,
            //ESTO ES PARA USAR LA DATA DE PRUEBA
            //data: usuarios,
            language: {
                lengthMenu: "Mostrando _MENU_ registros por página",
                zeroRecords: "No se encontraron registros",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No se encontraron registros",
                infoFiltered: "(de un total de _MAX_ registros)"
            },
            ajax: {
                url: `${USUARIO_URL}/ObtenerUsuarios`,
                dataSrc: "",
                contentType: 'application/json',
                data: {
                    rol: $('#FiltroRol').val()
                }
            },


            //ESTE METODO ES EL DE AJAX
            //ajax: {
            //    url: `${USUARIO_URL}/GetUsuarios`,
            //    dataSrc: "",
            //    contentType: 'application/json',
            //    data: function (d) {
            //        d.tipo_rol = tipo_rol
            //    }
            //},
            columns: [


                { "data": "USUARIO" },

                { "data": "NOMBRE" },
                {
                    "data": "ROL"
                },
                {
                    "data": "ROL_DESCRIPCION"
                },
                {
                    "data": "ESTADO",
                },

                {
                    "data": null,
                },
            ],
            columnDefs: [


                {
                    targets: 4,
                    orderable: false,
                    render: function (data, type, row) {
                        if (row.ESTADO == 'S') {
                            return `<span class="badge badge-lg  badge-light-primary">Activo</span>`
                        } else {
                            return `<span class="badge badge-lg  badge-light-danger">Inactivo</span>`
                        }
                    }
                },
                {
                    targets: 5,
                    orderable: false,
                    render: function (data, type, row) {
                        let btns = ``

                        if (USUARIOS) {
                            btns += `
	                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon me-2" title="Editar usuario"  onclick="EditarUsuario('${row.USUARIO}', '${row.NOMBRE}', '${row.ROL}')">
						        <span class="svg-icon svg-icon-warning svg-icon-2x"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo1/dist/../src/media/svg/icons/General/Settings-2.svg--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
							          <svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" >
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"/>
                                                <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>
                                                <rect fill="currentColor" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>
                                            </g>
                                        </svg>
						        </svg><!--end::Svg Icon--></span>
				            </a>
	                    `;
                            if (row.ESTADO == "S") {
                                btns +=
                                    `<a onclick="ConfirmarCambiarEstadoUsuario('${row.USUARIO}','N')" class="btn btn-sm btn-clean btn-icon me-2" title="Desactivar">
	                                <span class="svg-icon svg-icon-danger svg-icon-2x">
                                        <svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" >
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"/>
                                                <circle fill="currentColor" opacity="0.3" cx="12" cy="12" r="10"/>
                                                <path d="M12.0355339,10.6213203 L14.863961,7.79289322 C15.2544853,7.40236893 15.8876503,7.40236893 16.2781746,7.79289322 C16.6686989,8.18341751 16.6686989,8.81658249 16.2781746,9.20710678 L13.4497475,12.0355339 L16.2781746,14.863961 C16.6686989,15.2544853 16.6686989,15.8876503 16.2781746,16.2781746 C15.8876503,16.6686989 15.2544853,16.6686989 14.863961,16.2781746 L12.0355339,13.4497475 L9.20710678,16.2781746 C8.81658249,16.6686989 8.18341751,16.6686989 7.79289322,16.2781746 C7.40236893,15.8876503 7.40236893,15.2544853 7.79289322,14.863961 L10.6213203,12.0355339 L7.79289322,9.20710678 C7.40236893,8.81658249 7.40236893,8.18341751 7.79289322,7.79289322 C8.18341751,7.40236893 8.81658249,7.40236893 9.20710678,7.79289322 L12.0355339,10.6213203 Z" fill="currentColor"/>
                                            </g>
                                        </svg>
                                    </span>
							    </a>`

                            } else {
                                btns +=
                                    `<a onclick="ConfirmarCambiarEstadoUsuario('${row.USUARIO}','S')" class="btn btn-sm btn-clean btn-icon mr-2" title="Activar">
	                            <span class="svg-icon svg-icon-success svg-icon-2x">
                                    <svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" >
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <circle fill="currentColor" opacity="0.3" cx="12" cy="12" r="10"/>
                                            <path d="M16.7689447,7.81768175 C17.1457787,7.41393107 17.7785676,7.39211077 18.1823183,7.76894473 C18.5860689,8.1457787 18.6078892,8.77856757 18.2310553,9.18231825 L11.2310553,16.6823183 C10.8654446,17.0740439 10.2560456,17.107974 9.84920863,16.7592566 L6.34920863,13.7592566 C5.92988278,13.3998345 5.88132125,12.7685345 6.2407434,12.3492086 C6.60016555,11.9298828 7.23146553,11.8813212 7.65079137,12.2407434 L10.4229928,14.616916 L16.7689447,7.81768175 Z" fill="currentColor" fill-rule="nonzero"/>
                                        </g>
                                    </svg>
                                </span>
							</a>`
                            }
                        }
                        return btns
                    }
                },

            ],
            //}
        });
        table = dt.$;

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {

        });
    }
    var Filtros = function () {

        $('#kt_datatable_search_query').on('keyup', function () {
            //const val = $(this).val() == '0' ? '' : $(this).val()
            dt.search($(this).val()).draw();
        });
      
    }

    var resetTable = function () {
        //dt = $("#miTabla").DataTable();

        setTimeout(() => {

            dt.ajax.reload();
        }, 100)

        dt.clear().draw()
    }





    // Public methods
    return {
        init: function () {
            initDatatable();
            Filtros();
            //setTimeout(() => { ListenerCheckboxes() }, 5000)

        },
        reload: function () {
            dt.ajax.reload()
        },
        reset: function () {
            dt.destroy()
            this.init()
        }

    }
}();
function EditarUsuario(USUARIO, NOMBRE, ROL) {
    $('#UsuarioEditar').val(USUARIO).trigger('change')
    //$('#UsuarioEditarInput').val(usuario)
    //$("#UsuarioEditar").prop("disabled", true);
    $('#EditarColaborador').val(NOMBRE).trigger('change')
    $('#RolUsuarioEditar').val(ROL).trigger('change')
    $('#modalEditarUsuario').modal('show')
}
function ValidarGuardarUsuario(form) {
    let fd = new FormData(form)
    let result = true
    if (fd.get('UsuarioInsertar') == '') {
        toastr.warning('Debe seleccionar un usuario', 'Alerta', toastrOptions)
        result = false
    } else if (fd.get('RolInsertar') == '') {
        toastr.warning('Debe seleccionar un rol', 'Alerta', toastrOptions)
        result = false
    }
    return result
}


function GuardarUsuario() {
    let fd = new FormData()
    fd.set('Usuario', $('#UsuarioEditar').val())
    fd.set('Rol', $('#RolUsuarioEditar').val())
    const url = `${USUARIO_URL}/ActualizarUsuario`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Usuario modificado correctamente', 'Éxito', toastrOptions)
                KTTablaUsuarios.reload()
                $('#modalEditarUsuario').modal('hide')
                //$('#modalEditarUsuario').modal('hide')
                //$('#modalUsuario').modal('hide')
            }
            //else if (data == 2) {
            //    toastr.warning('El usuario no es válido', 'Alerta', toastrOptions)
            //} else if (data == 3) {
            //    toastr.warning('El colaborador no es válido', 'Alerta', toastrOptions)
            //}
            else {
                toastr.warning('No se pudo actualizar el usuario', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.warning('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}

function ConfirmarCambiarEstadoUsuario(usuario, nuevoEstado) {
    let titulo = '¿Deesea activar el usuario ' +usuario+'?'
    let icon = 'success'
    let confirmButtonText = 'Activar'
    let boton = "btn fw-bold btn-success"

    if (nuevoEstado == 'N') {
        titulo = '¿Desea desactivar el usuario ' + usuario + '?'
        icon = 'warning'
        confirmButtonText = 'Desactivar'
        boton = "btn fw-bold btn-danger"
    }
    Swal.fire({
        title: titulo,
        icon: icon,
        showCancelButton: true,
        buttonsStyling: false,
        cancelButtonText: "Cancelar",
        confirmButtonText: confirmButtonText,
        customClass: {
            cancelButton: "btn fw-bold btn-active-secondary",
            confirmButton: boton,
        }
    }).then((result) => {
        if (result.value) {
            CambiarEstadoUsuario(usuario, nuevoEstado)
        }
    })
}

function CambiarEstadoUsuario(usuario, estado) {
    let fd = new FormData()
    fd.set('usuario', usuario)
    fd.set('estado', estado)
    const url = `${USUARIO_URL}/ActualizarEstadoUsuario`
    const exitoString = estado == 'S' ? 'Usuario activado correctamente' : 'Usuario desactivado correctamente'
    const errorString = estado == 'S' ? 'No se pudo activar el usuario' : 'No se pudo desactivar el usuario'
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success(exitoString, 'Éxito', toastrOptions)
                KTTablaUsuarios.reload()
            } else {
                toastr.warning(errorString, 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Ha ocurrido un error, por favor inténtelo de nuevo más tarde', 'Error', toastrOptions)
        })
}

function CrearUsuario() {
    //$('#UsuarioInsertar').val(null).trigger('change')
    $('#EmpleadoInsertar').val(null).trigger('change')
    $('#RolUsuarioInsertar').val(null).trigger('change')
    $('#modalInsertarUsuario').modal('show')
}


function RegistrarNuevoUsuario() {
    let fd = new FormData()
    fd.set('usuario', $('#UsuarioParaInsertar').val())
    fd.set('rol', $('#RolParaInsertar').val())

    const url = `${USUARIO_URL}/InsertarUsuario`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Usuario agregado correctamente', 'Éxito', toastrOptions)
                KTTablaUsuarios.reload()
                $('#UsuarioParaInsertar').val('').trigger('change')
                $('#RolParaInsertar').val('').trigger('change')
                $('#modalInsertarUsuario').modal('hide')
                //$('#modalEditarUsuario').modal('hide')
                //$('#modalUsuario').modal('hide')
            }
            //else if (data == 2) {
            //    toastr.warning('El usuario no es válido', 'Alerta', toastrOptions)
            //} else if (data == 3) {
            //    toastr.warning('El colaborador no es válido', 'Alerta', toastrOptions)
            //}
            else {
                toastr.warning('No se pudo agregar el usuario', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.warning('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}



var KTTablaRoles = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;

    // Private functions
    var initDatatable = function () {
        dt = $("#tablaRoles").DataTable({
            searchDelay: 500,
            processing: true,
            stateSave: false,
            scrollX: true,
            pageLength: 50,

            "bDestroy": true,
            destroy: true,
            //ESTO ES PARA USAR LA DATA DE PRUEBA
           // data: roles,
            language: {
                lengthMenu: "Mostrando _MENU_ registros por página",
                zeroRecords: "No se encontraron registros",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No se encontraron registros",
                infoFiltered: "(de un total de _MAX_ registros)"
            },
            ajax: {
                url: `${USUARIO_URL}/ObtenerRoles`,
                dataSrc: "",
                contentType: 'application/json'
            },


            //ESTE METODO ES EL DE AJAX
            //ajax: {
            //    url: `${USUARIO_URL}/ObtenerRolesMantenimiento`,
            //    dataSrc: "",
            //    contentType: 'application/json',
            //    data: function (d) {
            //    }
            //},
            columns: [


                { "data": "ROL" },

                { "data": "DESCRIPCION" },

                {
                    "data": null,
                },
            ],
            columnDefs: [


                //{
                //    targets: 6,
                //    orderable: false,
                //    render: function (data, type, row) {
                //        if (row.ACTIVO == 'A') {
                //            return `<span class="badge badge-lg  badge-light-primary">Activo</span>`
                //        } else {
                //            return `<span class="badge badge-lg  badge-light-danger">Inactivo</span>`
                //        }
                //    }
                //},
                {
                    targets: 2,
                    orderable: false,
                    render: function (data, type, row) {
                        let btns = ``
                        if (USUARIOS) {
                            btns += `
	                       <a onclick="EditarRol(${row.ROL},'${row.DESCRIPCION}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Editar">
	                                <span class="svg-icon svg-icon-warning svg-icon-2x">
                                        <svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" >
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"/>
                                                <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>
                                                <rect fill="currentColor" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>
                                            </g>
                                        </svg>
                                    </span>
							    </a>
	                    `};
                            return btns
                    }
                },

            ],
            //}
        });
        table = dt.$;

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {

        });
    }
    var resetTable = function () {
        //dt = $("#miTabla").DataTable();

        setTimeout(() => {

            dt.ajax.reload();
        }, 100)

        dt.clear().draw()
    }





    // Public methods
    return {
        init: function () {
            initDatatable();
            //setTimeout(() => { ListenerCheckboxes() }, 5000)

        },
        reload: function () {
            dt.ajax.reload()
        },
        reset: function () {
            dt.destroy()
            this.init()
        }

    }
}();

function EditarRol(ROL, DESCRIPCION) {
    /*console.log(ROL,DESCRIPCION,COMENTARIO)*/
    $('#EditarRolId').val(ROL)
    $('#EditarRolDescripcion').val(DESCRIPCION)
    /* $("#EditarRolDescripcion").attr("disabled", "disabled")*/
    $('#EditarRolComentario').val(DESCRIPCION)
    $('#modalEditarRol2').modal('show')
}
function ValidarGuardarRol(form) {
    let fd = new FormData(form)
    let result = true
    if (fd.get('Descripcion') == '') {
        toastr.warning('Debe ingresar un nombre para el rol', 'Alerta', toastrOptions)
        result = false
    }
    return result
}

function ActualizarRol() {
    let fd = new FormData()
    var _rol = $('#EditarRolId').val()
    var _descripcion = $('#EditarRolComentario').val()


    fd.append('rol', _rol);
    fd.append('descripcion', _descripcion);


    const url = `${USUARIO_URL}/ActualizarRol`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Rol modificado correctamente', 'Éxito', toastrOptions)
                KTTablaRoles.reload()

                $('#modalInsertarRol').modal('hide')
                $("#modalEditarRol2").modal('hide')
            } else {
                toastr.warning('El rol no es válido', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Ha ocurrido un error, por favor inténtelo más tarde', 'Error', toastrOptions)
        })
}


function InsertarRol() {
    let fd = new FormData()
    var _descripcion = $('#InsertarDescripcion').val()

    fd.append('descripcion', _descripcion);


    const url = `${USUARIO_URL}/InsertarRol`
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data == 1) {
                toastr.success('Rol agregado correctamente', 'Éxito', toastrOptions)

                $('#modalInsertarRol').modal('hide')
                $("#modalEditarRol2").modal('hide')
                $('#InsertarDescripcion').val('')
                try {
                    KTTablaRoles.init()
                    KTTablaPermisos.init()
                } catch (error) {
                    KTTablaRoles.reload()
                    KTTablaPermisos.reload()
                }
            } else {
                toastr.warning('No se pudo agregar el rol', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            console.error(err)
            toastr.error('Ha ocurrido un error, por favor inténtelo más tarde', 'Error', toastrOptions)
        })
}


function CrearRol() {
    $('#modalInsertarRol').modal('show')
}




var KTTablaPermisos = function () {
    // Shared variables
    var table;
    var dt;
    var filterPayment;

    // Private functions
    var initDatatable = function () {
        dt = $("#tablaPermisos").DataTable({
            searchDelay: 500,
            processing: true,
            stateSave: false,
            scrollX: true,
            pageLength: 50,

            "bDestroy": true,
            destroy: true,
            //ESTO ES PARA USAR LA DATA DE PRUEBA
            //data: permisos,

            language: {
                lengthMenu: "Mostrando _MENU_ registros por página",
                zeroRecords: "No se encontraron registros",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No se encontraron registros",
                infoFiltered: "(de un total de _MAX_ registros)"
            },

            ajax: {
                url: `${USUARIO_URL}/ObtenerPermisos`,
                dataSrc: "",
                contentType: 'application/json'
            },
            columns: [


                { "data": "ROL" },

                { "data": "ORDEN_PRODUCCION" },
                { "data": "USUARIOS" },
                {
                    "data": null,
                },
            ],
            columnDefs: [


                {
                    targets: 0,
                    orderable: false,
                    render: function (data, type, row) {
                        return `${row.DESCRIPCION}`

                    }
                },
                {
                    targets: 1,
                    orderable: false,
                    render: function (data, type, row) {
                        return SetIcono(row.ORDEN_PRODUCCION)

                    }
                },
                {
                    targets: 2,
                    orderable: false,
                    render: function (data, type, row) {
                        return SetIcono(row.USUARIOS)

                    }
                },
                {
                    targets: 3,
                    orderable: false,
                    render: function (data, type, row) {

                        let permisos = [
                            Number(row.ORDEN_PRODUCCION),
                            Number(row.USUARIOS),
                            Number(row.ROL)
                        ]

                        let btns = ``

                        if (USUARIOS) {
                            btns += `
	                       <a onclick="EditarPermisos('${JSON.stringify(permisos)}')" class="btn btn-sm btn-clean btn-icon mr-2" title="Editar">
	                                <span class="svg-icon svg-icon-warning svg-icon-2x">
                                        <svg xmlns = "http://www.w3.org/2000/svg" xmlns: xlink = "http://www.w3.org/1999/xlink" width = "24px" height = "24px" viewBox = "0 0 24 24" version = "1.1" >
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"/>
                                                <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>
                                                <rect fill="currentColor" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>
                                            </g>
                                        </svg>
                                    </span>
							    </a>
	                    `};
                        return btns
                    }
                },

            ],
            //}
        });
        table = dt.$;

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on('draw', function () {

        });
    }
    var resetTable = function () {
        //dt = $("#miTabla").DataTable();

        setTimeout(() => {

            dt.ajax.reload();
        }, 100)

        dt.clear().draw()
    }





    // Public methods
    return {
        init: function () {
            initDatatable();
            //setTimeout(() => { ListenerCheckboxes() }, 5000)

        },
        reload: function () {
            dt.ajax.reload()
        },
        reset: function () {
            dt.destroy()
            this.init()
        }

    }
}();

function SetIcono(permiso) {
    let html = ''
    if (parseInt(permiso) === 1) {
        html = `<span class="svg-icon svg-icon-primary svg-icon-2x" title="Administrar">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24"/>
                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="currentColor"/>
                        </g>
                    </svg>
                </span>`
    } else if (parseInt(permiso) === 2) {
        html = `<span class="svg-icon svg-icon-success svg-icon-2x" title="Listar">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24"/>
                            <path d="M10.5,5 L19.5,5 C20.3284271,5 21,5.67157288 21,6.5 C21,7.32842712 20.3284271,8 19.5,8 L10.5,8 C9.67157288,8 9,7.32842712 9,6.5 C9,5.67157288 9.67157288,5 10.5,5 Z M10.5,10 L19.5,10 C20.3284271,10 21,10.6715729 21,11.5 C21,12.3284271 20.3284271,13 19.5,13 L10.5,13 C9.67157288,13 9,12.3284271 9,11.5 C9,10.6715729 9.67157288,10 10.5,10 Z M10.5,15 L19.5,15 C20.3284271,15 21,15.6715729 21,16.5 C21,17.3284271 20.3284271,18 19.5,18 L10.5,18 C9.67157288,18 9,17.3284271 9,16.5 C9,15.6715729 9.67157288,15 10.5,15 Z" fill="currentColor"/>
                            <path d="M5.5,8 C4.67157288,8 4,7.32842712 4,6.5 C4,5.67157288 4.67157288,5 5.5,5 C6.32842712,5 7,5.67157288 7,6.5 C7,7.32842712 6.32842712,8 5.5,8 Z M5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 C6.32842712,10 7,10.6715729 7,11.5 C7,12.3284271 6.32842712,13 5.5,13 Z M5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 C6.32842712,15 7,15.6715729 7,16.5 C7,17.3284271 6.32842712,18 5.5,18 Z" fill="currentColor" opacity="0.3"/>
                        </g>
                    </svg>
                </span>`
    } else {
        html = `<span class="svg-icon svg-icon-danger svg-icon-2x" title="Sin permisos">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24"/>
                            <path d="M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M19.0710678,4.92893219 L19.0710678,4.92893219 C19.4615921,5.31945648 19.4615921,5.95262146 19.0710678,6.34314575 L6.34314575,19.0710678 C5.95262146,19.4615921 5.31945648,19.4615921 4.92893219,19.0710678 L4.92893219,19.0710678 C4.5384079,18.6805435 4.5384079,18.0473785 4.92893219,17.6568542 L17.6568542,4.92893219 C18.0473785,4.5384079 18.6805435,4.5384079 19.0710678,4.92893219 Z" fill="currentColor" fill-rule="nonzero" opacity="0.3"/>
                        </g>
                    </svg>
                </span>`
    }
    return html
}

function EditarPermisos(permisos) {
    permisos = JSON.parse(permisos)
    //console.log(permisos)

    $(`#rd-ordenProduccion-${permisos[0]}`).prop("checked", true)
    $(`#rd-usuarios-${permisos[1]}`).prop("checked", true)
    $('#p-rol').val(permisos[2])
    $('#modalEditarPermisos').modal('show')
}
function RecargarTabla(index) {
    if (index == 1) {
        try {
            KTTablaUsuarios.init()
        } catch (error) {
            KTTablaUsuarios.reset()
        }
    }
    if (index == 2) {
        try {
            KTTablaRoles.init()
        } catch (error) {
            KTTablaRoles.reset()
        }
    }
    if (index == 3) {
        try {
            KTTablaPermisos.init()
        } catch (error) {
            KTTablaPermisos.reset()
        }
    }
}


function GuardarPermisos() {
    var formData = new FormData();

    var _rol = $('#p-rol').val();
    var _ordenProduccion = $('input[name="ordenProduccion"]:checked').val();
    var _usuarios = $('input[name="usuarios"]:checked').val();


    formData.append('rol', _rol);
    formData.append('orden_produccion', _ordenProduccion);
    formData.append('usuarios', _usuarios);


    const url = `${USUARIO_URL}/ActualizarPermisos`
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data == "1") {
                toastr.success('Se actualizaron los permisos correctamente', 'Éxito', toastrOptions)
                /* BuscarPermisosRol()*/
                KTTablaPermisos.reload()
                $('#modalEditarPermisos').modal('hide')
            } else {
                toastr.warning('No se pudieron actualizar los permisos', 'Alerta', toastrOptions)
            }
        })
        .catch(err => {
            /*console.error(err)*/
            toastr.warning('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
        })
}

function ManejarFiltros() {
    $('.filtro').on('change', () => {
        ActualizarFiltros()
        RecargarTabla(1)


    });
}


function ActualizarFiltros() {
    tipo_rol = $('#FiltroRol').val();

}
function ManejarBotones() {
    $('#btn-editar-usuario').on('click', (e) => {

        e.preventDefault()
        const form = document.querySelector('#frm-editar-usuario')
        if (ValidarGuardarUsuario(form)) {
            GuardarUsuario()
        }
    })

    $('#btn-insertar-usuario').on('click', (e) => {
        e.preventDefault()
        //toastr.success(`Usuario insertado con éxito`, "Éxito", toastrOptions)
        //$("#modalInsertarUsuario").modal('hide')
        const form = document.querySelector('#frm-insertar-usuario')
        if (ValidarGuardarUsuario(form)) {
            RegistrarNuevoUsuario()
        }
    })
    $('#btn-editar-rol').on('click', (e) => {
        e.preventDefault()
        const form = document.querySelector('#frm-editar-rol')
        if (ValidarGuardarRol(form)) {
            ActualizarRol()
        }
        /* toastr.success(`Rol editado con éxito`, "Éxito", toastrOptions)*/
        $("#modalEditarRol2").modal('hide')
    })
    $('#btn-insertar-rol').on('click', (e) => {
        e.preventDefault()
        const form = document.querySelector('#frm-insertar-rol')
        if (ValidarGuardarRol(form)) {
            InsertarRol()
        }
    })

    $('#btn-guardar-permisos').on('click', (e) => {
        e.preventDefault()
        GuardarPermisos()
        //toastr.success('Se cambiaron los permisos del rol', 'Éxito', toastrOptions)
        $('#modalEditarPermisos').modal('hide')

    })
}
$(document).ready(function () {

    KTTablaUsuarios.init()
    ManejarBotones();
    ManejarFiltros();
});
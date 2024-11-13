const Login = (fd, btn) => {
    const url = `${RURL}Index`
    // Show loading indication
    btn.attr('data-kt-indicator', 'on');
    btn.attr('disabled', true);

    // Disable button to avoid multiple click 
    //btn.disabled = true;
    //btn.addClass('spinner spinner-right pr-12 spinner-sm spinner-white').attr('disabled', true);
    fetch(url, {
        method: 'POST',
        body: fd
    })
        .then(res => res.json())
        .then(data => {
            if (data === 1) {
                toastr.success('Acceso exitoso', 'Bienvenido', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else if (data === 2) {
                toastr.warning('Usuario o contraseña invalido', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 3) {
                toastr.warning('El usuario no tiene permisos en esta compañía', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 4) {
                toastr.warning('El usuario no está activo en el sistema', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 5) {
                toastr.error('No tiene una licencia del sistema válida', 'Error', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 6) {
                toastr.warning('Error al leer la licencia', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 7) {
                toastr.error('La licencia del sistema ha caducado, contacte con Produsoft', 'Error', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            } else if (data === 8) {
                toastr.warning('El usuario cuenta con un rol sin permisos', 'Alerta', toastrOptions)
                btn.removeAttr('data-kt-indicator');
                btn.attr('disabled', false);
            }
        }).catch(err => {
            toastr.error('Error en la petición! recargue e intente de nuevo', 'Error', toastrOptions)
            btn.removeAttr('data-kt-indicator');
            btn.attr('disabled', false);
            console.error(err)
        })
}


const HandleFormSubmits = () => {
    $('#kt_sign_in_submit').click((e) => {
        e.preventDefault()
        const btn = $('#kt_sign_in_submit')
        const form = document.querySelector('#login-form')
        let fd = new FormData(form)
        if (fd.get('usuario') == '') {

            //mostrarToast('Alerta', 'Debe ingresar su usuario')
            toastr.warning('Debe ingresar su usuario', 'Alerta', toastrOptions)
        } else if (fd.get('contrasena') == '') {

            //mostrarToast('Alerta', 'Debe ingresar su contraseña')
            toastr.warning('Debe ingresar su contraseña', 'Alerta', toastrOptions)
        } else if (fd.get('cia') == '') {
            //mostrarToast('Alerta', 'Debe seleccionar una compañía')
            toastr.warning('Debe seleccionar una compañía', 'Alerta', toastrOptions)
        } else {
            Login(fd, btn)
        }
    })
}

function guardarUsuario() {

    let bandera = false
    const _iden = "999999999";
    const _nombre = $('#nomb').val();
    const _usuario = $('#idusuario').val();
    const _email = $('#correo_electronico').val();
    const _pass = $('#password').val();
    const _rpass = $('#rpasssword').val();
    const _terminos = $('#Terminos').is(':checked');
    const formulario = [_iden, _nombre, _usuario, _email, _pass]
    /*console.log(_terminos);*/
    if (formulario.includes('')) {
        toastr.warning('Se deben completar todos los campos.', 'Alerta!', toastrOptions)
        return
    }
    if (_pass != _rpass) {
        toastr.warning('Las contraseñas no coinciden.', 'Alerta!', toastrOptions)
        return
    }

    //if (!_terminos) {
    //    toastr.warning('Debe aceptar los terminos y condiciones', 'Alerta!', toastrOptions)
    //    return
    //}

    Dajax(`${RURL}ValidaExistenciaUsuario`, //_url + _sistema + "Login/ValidaExistenciaUsuario",
        "POST", { usuario: _usuario, correo: _email, identificacion: _iden }, function (response) {
            if (response.responseJSON) {
                bandera = false;
                if (response.responseJSON.message == "Éxito") {
                    if (response.responseJSON.data.EXISTE == 1) {
                        toastr.warning('El usuario ya existe.', 'Error', toastrOptions)
                        usuarioExistente = false;
                        bandera = false

                    } else {
                        if (response.responseJSON.data.EXISTE == 2) {
                            toastr.warning("El correo electrónico ya está en uso, intente otro correo electrónico.", "Error", toastrOptions);
                            usuarioExistente = false;
                            bandera = false
                        } else {
                            if (response.responseJSON.data.EXISTE == 3) {
                                toastr.warning("El número de identificiación ya está en uso, intente con otro.", "Error", toastrOptions);
                                usuarioExistente = false;
                                bandera = false

                            } else {
                                usuarioExistente = true;
                                bandera = true
                            }
                        }
                    }
                    //bandera = true;
                } else {
                    usuarioExistente = false;
                    bandera = true;
                }
            }

            if (bandera) {
                Dajax(`${RURL}RegistrarUsuario`,
                    "POST", { CEDULA: _iden, NOMBRE: _nombre, USUARIO: _usuario, EMAIL: _email, PASS: _pass }, function (response) {
                        if (response.responseJSON.message == "Exito") {
                            toastr.success('El usuario se ha registrado correctamente', 'Bienvenido', toastrOptions);
                        } else {
                            toastr.warning('No se ha podido registrar el usuario debido a un error', 'Error', toastrOptions)
                        }
                    });
            }

        });
    setTimeout(() => { window.location.reload(); }, 2000)
    // $("#CambiarestadoPedido").modal("hide")
    /*KTDataTable.reset();*/
}
function registrar() {

    $('#login-signin').addClass("d-none")
    $('#register-confirm').addClass("d-none")
    $('#login-signup').removeClass("d-none")
    $('#login-signup').addClass("d-flex")
    $('#tipoide').select2({
        placeholder: "Seleccione un tipo",
    })
};

function forgot() {

    $('#login-signin').addClass("d-none")
    $('#login-signup').addClass("d-none")
    $('#register-confirm').removeClass("d-none")
    $('#register-confirm').addClass("d-flex")
};

function reg() {
    toastr.success(`Usuario registrado con éxito`, "Éxito", toastrOptions)
    setTimeout(() => { window.location.reload(); }, 3000)
};
function send() {
    toastr.success(`Se ha enviado el correo con éxito`, "Éxito", toastrOptions)
    setTimeout(() => { window.location.reload(); }, 3000)
};

var vercontra = false
$('#basic-addon2').click((e) => {
    e.preventDefault()
    if (!vercontra) {
        vercontra = true;
        $("#icono").removeClass("la-eye-slash")
        $("#icono").addClass("la-eye")
        $("#passwordL").attr("type", "text")
    } else {
        vercontra = false;

        $("#icono").removeClass("la-eye")
        $("#icono").addClass("la-eye-slash")
        $("#passwordL").attr("type", "password")
    }
})
$(document).ready(() => {
    $('#CIA').select2({
        placeholder: "Seleccione una compañía",
    })
    HandleFormSubmits()
})
using Plantilla.core.Entities;
using Plantilla.core.Manager;
using System;
using System.Web.Configuration;
using System.Web.Mvc;
using ProdusoftLicenseValidation;
using Plantilla.web.Util;

namespace Plantilla.web.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            Manager.SetLogDirectory(Server.MapPath("~/Log"));
            return View();
        }

        [HttpPost]
        public JsonResult Index(string usuario, string contrasena)
        {
            LicenseValidation licenseValidation = new LicenseValidation();
            if (!licenseValidation.ExitsLicense())
            {
                return Json(5); //No existe la licencia
            }

            string mensaje = licenseValidation.ValidateLicense();
            if (mensaje == "Error al leer la licencia.")
            {
                return Json(6); //Error al leer la licencia
            }

            if (mensaje != "Licencia Válida")
            {
                return Json(7); //Licencia caducó
            }

            return Login(usuario, contrasena);

        }

        /*Este proyecto cuenta con un filtro de sesión el cual se encuentra en Filter/VerifySession.cs*/
        [HttpPost]
        public JsonResult Login(string usuario, string contrasena)
        {
            string cia = "PIRRO";
            string result = LoginManager.ValidarUsuarioSoftland(usuario, contrasena);
            result = result.Equals("1") ? result : LoginManager.ValidarUsuario(usuario, contrasena, cia);
            if (result.Equals("1"))
            {
                string activo = LoginManager.ValidarUsuarioActivo(usuario, cia);
                if (activo.Equals("S"))
                {
                    PROC_VAL_USUARIO_ROLResult permisos = LoginManager.ValidarUsuarioRol(usuario, cia);
                    if (!string.IsNullOrEmpty(permisos.NOMBRE))
                    {
                        Session["Rol"] = permisos.ROL;
                        Session["RolDescripcion"] = permisos.DESCRIPCION;
                        Session["Usuario"] = permisos.USUARIO;
                        Session["Correo"] = permisos.CORREO;
                        Session["Nombre"] = permisos.NOMBRE;
                        Session["CIA"] = "PIRRO";


                        PROC_OBT_USUARIO_PERMISOSResult accesos = LoginManager.GetPermisosPorUsuario(permisos.ROL.GetValueOrDefault(), cia);//Permisos por rol
                        if (accesos != null)
                        {
                            Session["ORDEN_PRODUCCION"] = accesos.ORDEN_PRODUCCION;
                            Session["USUARIOS"] = accesos.USUARIOS;

                            if (Session["ORDEN_PRODUCCION"].ToString() == "3" && Session["USUARIOS"].ToString() == "3")
                            {
                                return Json(8); // SIN PERMISOS
                            }

                        }
                        return Json(1); //LOGIN COMPLETO
                    }
                    else
                    {
                        return Json(3); // SIN PERMISOS
                    }
                }
                else
                {
                    return Json(4); // USUARIO INACTIVO
                }
            }
            else
            {
                return Json(2); // LIGIN FALLIDO
            }
        }

        public ActionResult Logout()
        {
            Session["Usuario"] = null;
            return RedirectToAction("Index", "Login");
        }
    }
}
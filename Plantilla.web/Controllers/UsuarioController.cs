using Plantilla.core.Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Plantilla.web.Controllers
{
    public class UsuarioController : Controller
    {
        // GET: Usuario
        public ActionResult Index()
        {
            string cia = Session["CIA"].ToString();

            //Si el usuario no tiene permiso para ver el index no puede accerde por link
            if (Session["USUARIOS"].ToString() == "3")
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.Roles = UsuarioManager.ObtenerRoles(cia);
            ViewBag.ListaUsuariosInsertar = UsuarioManager.ObtenerUsuariosEnSoftlandNoEnSistema(cia);
            return View();
        }

        [HttpGet]
        public JsonResult ObtenerUsuarios(
           int rol
      )
        {
            string cia = Session["CIA"].ToString();
            var result = UsuarioManager.ObtenerUsuarios(
                rol, cia
            );
            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }


        [HttpGet]
        public JsonResult ObtenerRoles()
        {
            string cia = Session["CIA"].ToString();
            var result = UsuarioManager.ObtenerRoles(
                cia
            );
            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        [HttpGet]
        public JsonResult ObtenerPermisos()
        {
            string cia = Session["CIA"].ToString();
            var result = UsuarioManager.ObtenerPermisos(
                cia
            );
            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        public JsonResult ActualizarEstadoUsuario(string usuario, string estado)
        {
            string cia = Session["CIA"].ToString();

            var result = UsuarioManager.ActualizarEstadoUsuario(usuario, estado, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult ActualizarRol(int rol, string descripcion)
        {
            string cia = Session["CIA"].ToString();

            var result = UsuarioManager.ActualizarRol(rol, descripcion, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult ActualizarUsuario(string usuario, int rol)
        {
            string cia = Session["CIA"].ToString();

            var result = UsuarioManager.ActualizarUsuario(usuario, rol, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult InsertarUsuario(string usuario, int rol)
        {
            string cia = Session["CIA"].ToString();

            var result = UsuarioManager.InsertarUsuario(usuario, rol, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult InsertarRol(string descripcion)
        {
            string cia = Session["CIA"].ToString();

            var result = UsuarioManager.InsertarRol(descripcion, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult ActualizarPermisos(int rol, int orden_produccion, int usuarios)
        {
            string cia = Session["CIA"].ToString();

            var result = UsuarioManager.ActualizarPermisos(rol, orden_produccion, usuarios, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }
    }
}
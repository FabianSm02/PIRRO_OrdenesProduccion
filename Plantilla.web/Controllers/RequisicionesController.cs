using Plantilla.core.Entities;
using Plantilla.core.Manager;
using Plantilla.web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Plantilla.web.Controllers
{
    public class RequisicionesController : Controller
    {
        // GET: Requisiciones
        public ActionResult Index()
        {
            string cia = Session["CIA"].ToString();
            
            //Si el usuario no tiene permiso para ver el index no puede accerde por link
            if (Session["ORDEN_PRODUCCION"].ToString() == "3")
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.ListaUsuarios = RequisicionesManager.ObtenerUsuariosOrdenesProduccionFiltro(cia);
            ViewBag.ListaOrdenes = RequisicionesManager.ObtenerOrdenesProduccionFiltro(cia);
            ViewBag.ListaBodegas = RequisicionesManager.ObtenerBodegas(cia);
            ViewBag.ListaArticulosProducir = RequisicionesManager.ObtenerArticulosAProducir(cia);
            return View();
        }
        // GET: Requisiciones
        public ActionResult Detalles(string Orden)
        {
            string cia = Session["CIA"].ToString();

            //Si el usuario no tiene permiso para ver el index no puede accerde por link
            if ((Session["ORDEN_PRODUCCION"].ToString() != "1" && Session["Rol"].ToString() != "1") || (Session["ORDEN_PRODUCCION"].ToString() == "1" && Session["Rol"].ToString() != "3" && Session["Rol"].ToString() != "1") )
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.ListaBodegas = RequisicionesManager.ObtenerBodegas(cia);
            ViewBag.SiguienteConsecutivo = RequisicionesManager.ObtenerSiguienteConsecutivoOrdenProduccion(cia);
            ViewBag.ListaArticulosAProducir = RequisicionesManager.ObtenerArticulosAProducir(cia);
            ViewBag.ListaRecetasAProducir = RequisicionesManager.ObtenerRecetasAProducir(cia);
            ViewBag.ListaCentrosCosto = RequisicionesManager.ObtenerCentrosCosto(cia);
            ViewBag.ListaCuentasContables = RequisicionesManager.ObtenerCuentasContables(cia);
            ViewBag.ListaArticulosAConsumir = RequisicionesManager.ObtenerArticulosAConsumir(cia);
            ViewBag.ListaBodegasXArticulo = RequisicionesManager.ObtenerBodegasXArticulo(cia);
            ViewBag.ListaCuentasContablesXCentroCosto = RequisicionesManager.ObtenerCuentasContablesXCentroCosto(cia);

            if (!string.IsNullOrEmpty(Orden))
            {
                PROC_OBT_ORDEN_PRODUCCIONResult result = RequisicionesManager.ObtenerOrdenProduccion(Orden, cia);
                if (result == null)
                {
                    return Redirect("~/Error/Err404");
                }

                ViewBag.Detalle = result;
            }

            return View();
        }

        [HttpGet]
        public JsonResult ObtenerOrdenesProduccion(
            string fechaInicio, string fechaFin, string orden, string articulo, string bodega, string estado,
           string usuario
       )
        {
            orden = string.IsNullOrEmpty(orden) || orden == "0" ? null : orden;
            usuario = string.IsNullOrEmpty(usuario) || usuario == "0" ? null : usuario;
            estado = string.IsNullOrEmpty(estado) || estado == "0" ? null : estado;
            articulo = string.IsNullOrEmpty(articulo) || articulo == "0" ? null : articulo;
            bodega = string.IsNullOrEmpty(bodega) || bodega == "0" ? null : bodega;
            string cia = Session["CIA"].ToString();
            var result = RequisicionesManager.ObtenerOrdenesProduccion(
                fechaInicio, fechaFin, orden, articulo, bodega, estado,
                        usuario, cia
            );
            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        [HttpGet]
        public JsonResult ObtenerOrdenesProduccionLineas(
            string orden
            )
        {
            string cia = Session["CIA"].ToString();
            var result = RequisicionesManager.ObtenerOrdenesProduccionLineas(
               orden, cia
            );
            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        public JsonResult ObtenerLineasOrdenProduccion(string Orden)
        {
            string cia = Session["CIA"].ToString();

            List<PROC_OBT_ORDENES_PRODUCCION_LINEASResult> result = RequisicionesManager.ObtenerOrdenesProduccionLineas(Orden, cia);



            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        public JsonResult ObtenerBodegasXArticulo(string articulo)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.ObtenerBodegasXArticulo(articulo, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult ObtenerRecetasXArticulo(string articulo)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.ObtenerRecetasXArticulo(articulo, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult ObtenerBodegasXArticuloParaSeleccionar(string articulo)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.ObtenerBodegasXArticuloParaSeleccionar(articulo, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult ObtenerRecetasXArticuloParaSeleccionar(string articulo)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.ObtenerRecetasXArticuloParaSeleccionar(articulo, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult ObtenerCuentasContablesXCentroCosto(string centroCosto)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.ObtenerCuentasContablesXCentroCosto(centroCosto, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult InsertarOrdenProduccion(string articulo, string receta, string bodega, string cantidad, string hojas, string referencia)
        {
            string cia = Session["CIA"].ToString();

            string usuario = Session["Usuario"].ToString();

            var result = RequisicionesManager.InsertarOrdenProduccion(articulo, receta, bodega, cantidad, hojas, usuario, referencia, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult InsertarOrdenProduccionLinea(string articulo, string bodega, string cantidad, string horaInicio, string horaFin, string documento, string localizacion)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.InsertarOrdenProduccionLinea(articulo, bodega, cantidad, horaInicio, horaFin, documento, localizacion, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult EliminarLineaOrdenProduccion(string documento, int linea)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.EliminarLineaOrdenProduccion(documento, linea, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult EliminarOrdenProduccion(string orden)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.EliminarOrdenProduccion(orden, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult AprobarOrdenProduccion(string orden)
        {
            string cia = Session["CIA"].ToString();

            string usuario = Session["Usuario"].ToString();

            var result = RequisicionesManager.AprobarOrdenProduccion(orden, usuario, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        [HttpPost]
        public JsonResult AprobarOrdenProduccionBatch(
            List<OrdenBatch> documentosParaBatch
            )
        {
            if (documentosParaBatch.Count == 0)
            {
                return Json(2);
            }
            string cia = Session["CIA"].ToString();
            string result;
            foreach (var item in documentosParaBatch)
            {
                result = RequisicionesManager.AprobarOrdenProduccion(
                    item.documento,
                    Session["Usuario"].ToString(),
                    cia
                );
            }
            return Json(1);
        }

        [HttpPost]
        public JsonResult EliminarOrdenProduccionBatch(
           List<OrdenBatch> documentosParaBatch
           )
        {
            if (documentosParaBatch.Count == 0)
            {
                return Json(2);
            }
            string cia = Session["CIA"].ToString();
            string result;
            foreach (var item in documentosParaBatch)
            {
                result = RequisicionesManager.EliminarOrdenProduccion(
                    item.documento,
                    cia
                );
            }
            return Json(1);
        }

        public JsonResult EditarBodegaOrdenProduccionLinea(string orden, int linea, string bodega)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.EditarBodegaOrdenProduccionLinea(orden, linea, bodega, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult EditarCantidadOrdenProduccionLinea(string orden, int linea, string cantidad)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.EditarCantidadOrdenProduccionLinea(orden, linea, cantidad, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult EditarHoraInicioOrdenProduccionLinea(string orden, int linea, string hora)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.EditarHoraInicioOrdenProduccionLinea(orden, linea, hora, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult EditarHoraFinOrdenProduccionLinea(string orden, int linea, string hora)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.EditarHoraFinOrdenProduccionLinea(orden, linea, hora, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult EditarCentroCostoOrdenProduccionLinea(string orden, int linea, string centroCosto)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.EditarCentroCostoOrdenProduccionLinea(orden, linea, centroCosto, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult EditarCuentaContableOrdenProduccionLinea(string orden, int linea, string cuentaContable)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.EditarCuentaContableOrdenProduccionLinea(orden, linea, cuentaContable, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult ObtenerUltimaOrdenProduccion()
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.ObtenerUltimaOrdenProduccion(cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult ObtenerExistenciasXArticulo(string articulo, string bodega)
        {
            string cia = Session["CIA"].ToString();

            var result = RequisicionesManager.ObtenerExistenciasXArticulo(articulo, bodega, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }
    }
}
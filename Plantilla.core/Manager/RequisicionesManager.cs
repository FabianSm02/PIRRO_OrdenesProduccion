using Plantilla.core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Plantilla.core.Manager
{
    public class RequisicionesManager : Manager
    {
        public static List<PROC_OBT_ORDENES_PRODUCCIONResult> ObtenerOrdenesProduccion(
           string fechaInicio, string fechaFin, string orden, string articulo, string bodega, string estado,
           string usuario, string cia
       )
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_ORDENES_PRODUCCIONResult> result = new List<PROC_OBT_ORDENES_PRODUCCIONResult>();
                try
                {
                    result = context.PROC_OBT_ORDENES_PRODUCCION(
                        fechaInicio, fechaFin, orden, articulo, bodega, estado,
                        usuario, cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_ORDENES_PRODUCCION", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_ORDENES_PRODUCCION_LINEASResult> ObtenerOrdenesProduccionLineas(
        string orden, string cia
    )
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_ORDENES_PRODUCCION_LINEASResult> result = new List<PROC_OBT_ORDENES_PRODUCCION_LINEASResult>();
                try
                {
                    result = context.PROC_OBT_ORDENES_PRODUCCION_LINEAS(
                        orden, cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_ORDENES_PRODUCCION_LINEAS", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_ORDENES_PRODUCCION_FILTROResult> ObtenerOrdenesProduccionFiltro(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_ORDENES_PRODUCCION_FILTROResult> result = new List<PROC_OBT_ORDENES_PRODUCCION_FILTROResult>();
                try
                {
                    result = context.PROC_OBT_ORDENES_PRODUCCION_FILTRO(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_ORDENES_PRODUCCION_FILTRO", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_USUARIOS_ORDENES_PRODUCCION_FILTROResult> ObtenerUsuariosOrdenesProduccionFiltro(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_USUARIOS_ORDENES_PRODUCCION_FILTROResult> result = new List<PROC_OBT_USUARIOS_ORDENES_PRODUCCION_FILTROResult>();
                try
                {
                    result = context.PROC_OBT_USUARIOS_ORDENES_PRODUCCION_FILTRO(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_USUARIOS_ORDENES_PRODUCCION_FILTRO", e);
                    return null;
                }
            }
        }

        public static PROC_OBT_SIGUIENTE_CONSECUTIVO_ORDENES_PRODUCCIONResult ObtenerSiguienteConsecutivoOrdenProduccion(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                PROC_OBT_SIGUIENTE_CONSECUTIVO_ORDENES_PRODUCCIONResult result = new PROC_OBT_SIGUIENTE_CONSECUTIVO_ORDENES_PRODUCCIONResult();
                try
                {
                    result = context.PROC_OBT_SIGUIENTE_CONSECUTIVO_ORDENES_PRODUCCION(
                         cia
                    ).FirstOrDefault();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_ORDEN_PRODUCCION", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_BODEGASResult> ObtenerBodegas(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_BODEGASResult> result = new List<PROC_OBT_BODEGASResult>();
                try
                {
                    result = context.PROC_OBT_BODEGAS(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_BODEGAS", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_BODEGAS_X_ARTICULOResult> ObtenerBodegasXArticulo(string cia)
        {
            return ObtenerBodegasXArticulo(null, cia);
        }

        public static List<PROC_OBT_BODEGAS_X_ARTICULOResult> ObtenerBodegasXArticulo(string articulo, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_BODEGAS_X_ARTICULOResult> result = new List<PROC_OBT_BODEGAS_X_ARTICULOResult>();
                try
                {
                    result = context.PROC_OBT_BODEGAS_X_ARTICULO(
                        articulo,
                        cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_BODEGAS_X_ARTICULO", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONARResult> ObtenerRecetasXArticulo(string cia)
        {
            return ObtenerRecetasXArticulo(null, cia);
        }

        public static List<PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONARResult> ObtenerRecetasXArticulo(string articulo, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONARResult> result = new List<PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONARResult>();
                try
                {
                    result = context.PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONAR(
                        articulo,
                        cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONAR", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_BODEGAS_X_ARTICULO_PARA_SELECCIONARResult> ObtenerBodegasXArticuloParaSeleccionar(string articulo, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_BODEGAS_X_ARTICULO_PARA_SELECCIONARResult> result = new List<PROC_OBT_BODEGAS_X_ARTICULO_PARA_SELECCIONARResult>();
                try
                {
                    result = context.PROC_OBT_BODEGAS_X_ARTICULO_PARA_SELECCIONAR(
                        articulo,
                        cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_BODEGAS_X_ARTICULO_PARA_SELECCIONAR", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONARResult> ObtenerRecetasXArticuloParaSeleccionar(string articulo, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONARResult> result = new List<PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONARResult>();
                try
                {
                    result = context.PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONAR(
                        articulo,
                        cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_RECETAS_X_ARTICULO_PARA_SELECCIONAR", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_ARTICULOS_A_CONSUMIRResult> ObtenerArticulosAConsumir(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_ARTICULOS_A_CONSUMIRResult> result = new List<PROC_OBT_ARTICULOS_A_CONSUMIRResult>();
                try
                {
                    result = context.PROC_OBT_ARTICULOS_A_CONSUMIR(
                        cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_ARTICULOS_A_CONSUMIR", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_CENTROS_DE_COSTOResult> ObtenerCentrosCosto(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_CENTROS_DE_COSTOResult> result = new List<PROC_OBT_CENTROS_DE_COSTOResult>();
                try
                {
                    result = context.PROC_OBT_CENTROS_DE_COSTO(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_CENTROS_DE_COSTO", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_CUENTAS_CONTABLESResult> ObtenerCuentasContables(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_CUENTAS_CONTABLESResult> result = new List<PROC_OBT_CUENTAS_CONTABLESResult>();
                try
                {
                    result = context.PROC_OBT_CUENTAS_CONTABLES(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_CUENTAS_CONTABLES", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_ARTICULOS_A_PRODUCIRResult> ObtenerArticulosAProducir(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_ARTICULOS_A_PRODUCIRResult> result = new List<PROC_OBT_ARTICULOS_A_PRODUCIRResult>();
                try
                {
                    result = context.PROC_OBT_ARTICULOS_A_PRODUCIR(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_ARTICULOS_A_PRODUCIR", e);
                    return null;
                }
            }
        }


        public static List<PROC_OBT_RECETAS_A_PRODUCIRResult> ObtenerRecetasAProducir(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_RECETAS_A_PRODUCIRResult> result = new List<PROC_OBT_RECETAS_A_PRODUCIRResult>();
                try
                {
                    result = context.PROC_OBT_RECETAS_A_PRODUCIR(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_RECETAS_A_PRODUCIR", e);
                    return null;
                }
            }
        }

        public static PROC_OBT_ORDEN_PRODUCCIONResult ObtenerOrdenProduccion(string orden, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                PROC_OBT_ORDEN_PRODUCCIONResult result = new PROC_OBT_ORDEN_PRODUCCIONResult();
                try
                {
                    result = context.PROC_OBT_ORDEN_PRODUCCION(
                        orden,
                         cia
                    ).FirstOrDefault();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_ORDEN_PRODUCCION", e);
                    return null;
                }
            }
        }

        public static string InsertarOrdenProduccion(string articulo, string receta, string bodega, string cantidad, string hojas, string usuario, string referencia, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_INS_ORDEN_PRODUCCION(articulo, receta, bodega, Convert.ToDecimal(cantidad), Convert.ToDecimal(hojas), usuario, referencia, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_INS_ORDEN_PRODUCCION", e);
                }
                return result;
            }

        }

        public static string InsertarOrdenProduccionLinea(string articulo, string bodega, string cantidad, string horaInicio, string horaFin, string documento, string localizacion,
           string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_INS_ORDEN_PRODUCCION_LINEA(articulo, bodega, Convert.ToDecimal(cantidad), horaInicio, horaFin, documento, localizacion, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_INS_ORDEN_PRODUCCION_LINEA", e);
                }
                return result;
            }

        }

        public static string EliminarLineaOrdenProduccion(string documento, int linea, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_DEL_ORDEN_PRODUCCION_LINEA(documento, linea, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_DEL_ORDEN_PRODUCCION_LINEA", e);
                }
                return result;
            }

        }

        public static string EliminarOrdenProduccion(string orden, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_DEL_ORDEN_PRODUCCION(orden, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_DEL_ORDEN_PRODUCCION", e);
                }
                return result;
            }

        }

        public static string AprobarOrdenProduccion(string orden, string usuario, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_EDI_APROBAR_ORDEN_PRODUCCION(orden, usuario, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_DEL_ORDEN_PRODUCCION", e);
                }
                return result;
            }

        }

        public static string EditarBodegaOrdenProduccionLinea(string orden, int linea, string bodega, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_EDI_BODEGA_ORDEN_PRODUCCION_LINEA(orden, linea, bodega, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_BODEGA_ORDEN_PRODUCCION_LINEA", e);
                }
                return result;
            }

        }

        public static string EditarCantidadOrdenProduccionLinea(string orden, int linea, string cantidad, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                  
                    result = context.PROC_EDI_CANTIDAD_ORDEN_PRODUCCION_LINEA(orden, linea, Convert.ToDecimal(cantidad), cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_CANTIDAD_ORDEN_PRODUCCION_LINEA", e);
                }
                return result;
            }

        }

        public static string EditarHoraInicioOrdenProduccionLinea(string orden, int linea, string hora, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {

                    result = context.PROC_EDI_HORA_INICIO_ORDEN_PRODUCCION_LINEA(orden, linea, hora, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_HORA_INICIO_ORDEN_PRODUCCION_LINEA", e);
                }
                return result;
            }

        }

        public static string EditarHoraFinOrdenProduccionLinea(string orden, int linea, string hora, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {

                    result = context.PROC_EDI_HORA_FIN_ORDEN_PRODUCCION_LINEA(orden, linea, hora, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_HORA_FIN_ORDEN_PRODUCCION_LINEA", e);
                }
                return result;
            }

        }

        public static string EditarCentroCostoOrdenProduccionLinea(string orden, int linea, string centroCosto, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_EDI_CENTRO_COSTO_ORDEN_PRODUCCION_LINEA(orden, linea, centroCosto, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_CENTRO_COSTO_ORDEN_PRODUCCION_LINEA", e);
                }
                return result;
            }

        }

        public static string EditarCuentaContableOrdenProduccionLinea(string orden, int linea, string cuentaContable, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_EDI_CUENTA_CONTABLE_ORDEN_PRODUCCION_LINEA(orden, linea, cuentaContable, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_CUENTA_CONTABLE_ORDEN_PRODUCCION_LINEA", e);
                }
                return result;
            }

        }


        public static List<PROC_OBT_ULTIMA_ORDEN_PRODUCCIONResult> ObtenerUltimaOrdenProduccion(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_ULTIMA_ORDEN_PRODUCCIONResult> result = new List<PROC_OBT_ULTIMA_ORDEN_PRODUCCIONResult>();
                try
                {
                    result = context.PROC_OBT_ULTIMA_ORDEN_PRODUCCION(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_ULTIMA_ORDEN_PRODUCCION", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_CUENTAS_CONTABLES_X_CENTRO_COSTOResult> ObtenerCuentasContablesXCentroCosto(string cia)
        {
            return ObtenerCuentasContablesXCentroCosto(null, cia);
        }

        public static List<PROC_OBT_CUENTAS_CONTABLES_X_CENTRO_COSTOResult> ObtenerCuentasContablesXCentroCosto(string centroCosto, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_CUENTAS_CONTABLES_X_CENTRO_COSTOResult> result = new List<PROC_OBT_CUENTAS_CONTABLES_X_CENTRO_COSTOResult>();
                try
                {
                    result = context.PROC_OBT_CUENTAS_CONTABLES_X_CENTRO_COSTO(
                        centroCosto,
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_CUENTAS_CONTABLES_X_CENTRO_COSTO", e);
                    return null;
                }
            }
        }

        public static decimal ObtenerExistenciasXArticulo(string articulo, string bodega, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                decimal result = 0;
                try
                {
                    result = context.PROC_OBT_EXISTENCIAS_X_ARTICULO(
                        articulo,
                        bodega,
                         cia
                    ).FirstOrDefault().EXISTENCIA.Value;
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_EXISTENCIAS_X_ARTICULO", e);
                    return 0;
                }
            }
        }
    }
}

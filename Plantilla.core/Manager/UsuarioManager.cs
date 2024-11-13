using Plantilla.core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Plantilla.core.Manager
{
    public class UsuarioManager : Manager
    {
        public static List<PROC_OBT_USUARIOSResult> ObtenerUsuarios(
          int rol, string cia
      )
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_USUARIOSResult> result = new List<PROC_OBT_USUARIOSResult>();
                try
                {
                    result = context.PROC_OBT_USUARIOS(
                        rol, cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_USUARIOS", e);
                    return null;
                }
            }
        }

        public static string ActualizarEstadoUsuario(string usuario, string estado, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_EDI_ESTADO_USUARIO(usuario, estado, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_ESTADO_USUARIO", e);
                }
                return result;
            }

        }

        public static string ActualizarUsuario(string usuario, int rol, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_EDI_USUARIO(usuario, rol, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_USUARIO", e);
                }
                return result;
            }

        }

        public static string ActualizarRol(int rol, string descripcion, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_EDI_DESCRIPCION_ROL(rol, descripcion, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_DESCRIPCION_ROL", e);
                }
                return result;
            }

        }

        public static string InsertarUsuario(string usuario, int rol, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_INS_USUARIO(usuario, rol, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_INS_USUARIO", e);
                }
                return result;
            }

        }

        public static string InsertarRol(string descripcion, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_INS_ROL(descripcion, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_INS_ROL", e);
                }
                return result;
            }

        }

        public static string ActualizarPermisos(int rol, int orden_produccion, int usuarios, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_EDI_PERMISOS(rol, orden_produccion, usuarios, cia).ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    result = null;
                    WriteLog("PROC_EDI_PERMISOS", e);
                }
                return result;
            }

        }

        public static List<PROC_OBT_ROLESResult> ObtenerRoles(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_ROLESResult> result = new List<PROC_OBT_ROLESResult>();
                try
                {
                    result = context.PROC_OBT_ROLES(
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
                    WriteLog("PROC_OBT_ROLES", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_PERMISOSResult> ObtenerPermisos(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_PERMISOSResult> result = new List<PROC_OBT_PERMISOSResult>();
                try
                {
                    result = context.PROC_OBT_PERMISOS(
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
                    WriteLog("PROC_OBT_PERMISOS", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_USUARIOS_PARA_INSERTARResult> ObtenerUsuariosEnSoftlandNoEnSistema(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_USUARIOS_PARA_INSERTARResult> result = new List<PROC_OBT_USUARIOS_PARA_INSERTARResult>();
                try
                {
                    result = context.PROC_OBT_USUARIOS_PARA_INSERTAR(
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
                    WriteLog("PROC_OBT_USUARIOS_PARA_INSERTAR", e);
                    return null;
                }
            }
        }
    }
}

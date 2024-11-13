using Plantilla.core.Entities;
using System;
using System.Linq;

namespace Plantilla.core.Manager
{
    public class LoginManager: Manager
    {
        public static string ValidarUsuarioSoftland(string usuario, string contrasena)
        {

            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                try
                {
                    string result = context.PROC_VAL_USUARIO_SOFTLAND(usuario, contrasena).First().VALID.ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_VAL_USUARIO_SOFTLAND", e);
                    return null;
                }
            }
        }

        public static string ValidarUsuario(string usuario, string contrasena, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                try
                {
                    string result = context.PROC_VAL_USUARIO(usuario, contrasena, cia).First().VALID.ToString();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_VAL_USUARIO", e);
                    return null;
                }
            }
        }

        public static string ValidarUsuarioActivo(string usuario, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                try
                {
                    string result = context.PROC_VAL_USUARIO_ACTIVO(usuario, cia).First().ACTIVO;
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_VAL_USUARIO_ACTIVO", e);
                    return null;
                }
            }
        }

        public static PROC_VAL_USUARIO_ROLResult ValidarUsuarioRol(string usuario, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                PROC_VAL_USUARIO_ROLResult result = new PROC_VAL_USUARIO_ROLResult();
                try
                {
                    result = context.PROC_VAL_USUARIO_ROL(usuario, cia).First();
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_VAL_USUARIO_ROL", e);
                }
                return result;
            }
        }

        public static PROC_OBT_USUARIO_PERMISOSResult GetPermisosPorUsuario(int rol, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                PROC_OBT_USUARIO_PERMISOSResult result = new PROC_OBT_USUARIO_PERMISOSResult();
                try
                {
                    result = context.PROC_OBT_USUARIO_PERMISOS(rol, cia).FirstOrDefault();
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_USUARIO_PERMISOS", e);
                }
                return result;
            }
        }

    }
}

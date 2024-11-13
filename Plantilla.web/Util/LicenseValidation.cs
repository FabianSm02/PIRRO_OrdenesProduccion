using System;
using ProdusoftLicenseValidation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Plantilla.core.Manager;

namespace Plantilla.web.Util
{
    public class LicenseValidation : Manager
    {
        private readonly string License = HttpContext.Current.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["license"]);
        private readonly string Certificate = HttpContext.Current.Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["certificate"]);
        private readonly string LicenseKey = System.Configuration.ConfigurationManager.AppSettings["licensekey"];


        public bool ExitsLicense()
        {
            return File.Exists(License) && File.Exists(Certificate);
        }

        public string ValidateLicense()
        {
            try
            {
                ProdusoftLicenseValidation.Tools.License license = Validator.Validate(Certificate, LicenseKey, License);
                DateTime justTime = LongtoDate(license.timeToLive);

                if (justTime.AddDays(14) < DateTime.Now)
                {
                    SetConnectionString(null);
                    return "La Licencia ha caducado, favor renovar el plan, más información info@produsoftcr.com";
                }
                else
                {
                    SetConnectionString(license.connectionString);
                    return "Licencia Válida";
                }

            }
            catch (Exception ex)
            {
                string e = ex.Message;
                e = e.Replace(Environment.NewLine, " ");
                e = e.Replace('"', ' ');
                e = e.Replace("'", " ");
                WriteLog("ValidateLicense", e);
                if (ex.InnerException != null)
                {
                    e = ex.InnerException.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("ValidateLicense", e);
                }
                SetConnectionString(null);
                return "Error al leer la licencia.";
            }

        }

        private DateTime LongtoDate(long time)
        {
            DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime date = start.AddMilliseconds(time).ToLocalTime();
            return date;
        }

    }
}
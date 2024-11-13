using System.Web;
using System.Web.Optimization;

namespace Plantilla.web
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            //Login sin crtl + shift + r
            bundles.Add(new Bundle("~/bundles/LoginIndex").Include(
                        "~/Scripts/Login/Index.js"
                        ));
            //Requisiciones sin crtl + shift + r
            bundles.Add(new Bundle("~/bundles/RequisicionesIndex").Include(
                        "~/Scripts/Requisiciones/Index.js"
                        ));
            bundles.Add(new Bundle("~/bundles/RequisicionesDetalles").Include(
                        "~/Scripts/Requisiciones/Detalles.js"
                        ));
            //Usuarios sin crtl + shift + r
            bundles.Add(new Bundle("~/bundles/UsuariosIndex").Include(
                        "~/Scripts/Usuario/Index.js"
                        ));
        }
    }
}

using Plantilla.web.Controllers;
using System.Web;
using System.Web.Mvc;

namespace Plantilla.web.Filter
{
    public class VerifySession : ActionFilterAttribute
    {
        /*Revisa si tiene sesión no deja entrar al controlador de login y sino tiene sesión no solamente puede entrar al controlador de login*/
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string oUser = (string)HttpContext.Current.Session["Usuario"];
            if (filterContext.Controller is LoginController == false && oUser == null)
            {
                filterContext.HttpContext.Response.Redirect("~/Login");
            }else if (filterContext.Controller is LoginController && oUser != null) {
                filterContext.HttpContext.Response.Redirect("~/Home");
            }
            base.OnActionExecuting(filterContext);
        }
    }
}
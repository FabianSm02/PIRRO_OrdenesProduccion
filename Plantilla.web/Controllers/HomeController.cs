using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Plantilla.web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Session["ORDEN_PRODUCCION"].ToString() != "3")
            {
                return Redirect("~/Requisiciones");
            }
            else if (Session["USUARIOS"].ToString() != "3")
            {
                return Redirect("~/Usuario");
            }
            else
            {
                Session["Usuario"] = null;
                return Redirect("~/Login");
            }
        }
    }
}

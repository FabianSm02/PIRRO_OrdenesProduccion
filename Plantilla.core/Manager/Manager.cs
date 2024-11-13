using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using Plantilla.core.Entities;

namespace Plantilla.core.Manager
{
    public class Manager
    {
        protected static string logDirectory;
        protected static string Connection;


        //public static List<PROC_OBT_CIASResult> GetCIAS()
        //{
        //    List<PROC_OBT_CIASResult> result = new List<PROC_OBT_CIASResult>();
        //    try
        //    {
        //        result = context.PROC_OBT_CIAS().ToList();
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        string e = ex.Message;
        //        e = e.Replace(Environment.NewLine, " ");
        //        e = e.Replace('"', ' ');
        //        e = e.Replace("'", " ");
        //        WriteLog("PROC_OBT_CIAS", e);
        //        return result;
        //    }
        //}
        public static void SetLogDirectory(string path)
        {
            logDirectory = path;
        }

        public static void SetConnectionString(string connection)
        {
            Connection = connection;
        }

        public static void WriteLog(string controller, string message)
        {
            string fileName = string.Format("{0}\\{1}.txt", logDirectory, DateTime.Now.ToString("dd-MM-yyyy"));
            string content = string.Format("{0} {1} {2}\n",
                    DateTime.Now.ToString(),
                    controller,
                    message
                );

            if (File.Exists(fileName))
            {
                content += File.ReadAllText(fileName).ToString();
            }
            File.WriteAllText(fileName, content);
        }

    }
}

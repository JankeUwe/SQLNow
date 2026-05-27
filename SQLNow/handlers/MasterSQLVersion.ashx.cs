using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using dhtmlxConnectors;

namespace SQLNow.handlers
{
    public class MasterSQLVersion : dhtmlxRequestHandler
    {
        private static readonly string ConnStr =
            ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString;

        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            if (context.Request.HttpMethod == "POST")
            {
                HandleCrud(context);
                return null;
            }

            return new dhtmlxGridConnector(
                "[dbo].[SQLVersion]",
                "productversion, sqlversion",
                "productversion",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConnStr
            );
        }

        private void HandleCrud(HttpContext ctx)
        {
            ctx.Response.ContentType = "text/plain";
            string action = ctx.Request.Form["action"] ?? "";
            string rowid  = ctx.Request.Form["rowid"]  ?? "";

            try
            {
                using (var con = new SqlConnection(ConnStr))
                {
                    con.Open();
                    SqlCommand cmd;
                    switch (action)
                    {
                        case "insert":
                            cmd = new SqlCommand(
                                "INSERT INTO [dbo].[SQLVersion] (productversion,sqlversion) VALUES (@pv,@sv)", con);
                            cmd.Parameters.AddWithValue("@pv", ctx.Request.Form["productversion"] ?? "");
                            cmd.Parameters.AddWithValue("@sv", ctx.Request.Form["sqlversion"]     ?? "");
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "update":
                            cmd = new SqlCommand(
                                "UPDATE [dbo].[SQLVersion] SET sqlversion=@sv WHERE productversion=@id", con);
                            cmd.Parameters.AddWithValue("@sv", ctx.Request.Form["sqlversion"] ?? "");
                            cmd.Parameters.AddWithValue("@id", rowid);
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "delete":
                            cmd = new SqlCommand(
                                "DELETE FROM [dbo].[SQLVersion] WHERE productversion=@id", con);
                            cmd.Parameters.AddWithValue("@id", rowid);
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        default:
                            ctx.Response.Write("ERROR: Unbekannte Aktion");
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                ctx.Response.Write("ERROR: " + ex.Message);
            }
        }
    }
}

using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using dhtmlxConnectors;

namespace SQLNow.handlers
{
    public class MasterCustomer : dhtmlxRequestHandler
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
                "[dbo].[Customer]",
                "Name, NameLong, Address, Zip, City, Notes",
                "CustomerId",
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
                                "INSERT INTO [dbo].[Customer] (Name,NameLong,Address,Zip,City,Notes) " +
                                "VALUES (@n,@nl,@a,@z,@c,@no)", con);
                            cmd.Parameters.AddWithValue("@n",  ctx.Request.Form["Name"]     ?? "");
                            cmd.Parameters.AddWithValue("@nl", ctx.Request.Form["NameLong"] ?? "");
                            cmd.Parameters.AddWithValue("@a",  ctx.Request.Form["Address"]  ?? "");
                            cmd.Parameters.AddWithValue("@z",  ctx.Request.Form["Zip"]      ?? "");
                            cmd.Parameters.AddWithValue("@c",  ctx.Request.Form["City"]     ?? "");
                            cmd.Parameters.AddWithValue("@no", ctx.Request.Form["Notes"]    ?? "");
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "update":
                            cmd = new SqlCommand(
                                "UPDATE [dbo].[Customer] SET Name=@n,NameLong=@nl,Address=@a,Zip=@z,City=@c,Notes=@no " +
                                "WHERE CustomerId=@id", con);
                            cmd.Parameters.AddWithValue("@n",  ctx.Request.Form["Name"]     ?? "");
                            cmd.Parameters.AddWithValue("@nl", ctx.Request.Form["NameLong"] ?? "");
                            cmd.Parameters.AddWithValue("@a",  ctx.Request.Form["Address"]  ?? "");
                            cmd.Parameters.AddWithValue("@z",  ctx.Request.Form["Zip"]      ?? "");
                            cmd.Parameters.AddWithValue("@c",  ctx.Request.Form["City"]     ?? "");
                            cmd.Parameters.AddWithValue("@no", ctx.Request.Form["Notes"]    ?? "");
                            cmd.Parameters.AddWithValue("@id", rowid);
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "delete":
                            cmd = new SqlCommand(
                                "DELETE FROM [dbo].[Customer] WHERE CustomerId=@id", con);
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

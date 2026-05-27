using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using dhtmlxConnectors;

namespace SQLNow.handlers
{
    public class MasterCompType : dhtmlxRequestHandler
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
                "[dbo].[ManagedEntityCompType]",
                "ManagedEntityTypeRowId, ManagedEntityTypeSystemName",
                "ManagedEntityTypeRowId",
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
                                "INSERT INTO [dbo].[ManagedEntityCompType] (ManagedEntityTypeRowId,ManagedEntityTypeSystemName) " +
                                "VALUES (@id,@n)", con);
                            cmd.Parameters.AddWithValue("@id", ctx.Request.Form["ManagedEntityTypeRowId"]     ?? "");
                            cmd.Parameters.AddWithValue("@n",  ctx.Request.Form["ManagedEntityTypeSystemName"] ?? "");
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "update":
                            cmd = new SqlCommand(
                                "UPDATE [dbo].[ManagedEntityCompType] SET ManagedEntityTypeSystemName=@n " +
                                "WHERE ManagedEntityTypeRowId=@id", con);
                            cmd.Parameters.AddWithValue("@n",  ctx.Request.Form["ManagedEntityTypeSystemName"] ?? "");
                            cmd.Parameters.AddWithValue("@id", rowid);
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "delete":
                            cmd = new SqlCommand(
                                "DELETE FROM [dbo].[ManagedEntityCompType] WHERE ManagedEntityTypeRowId=@id", con);
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

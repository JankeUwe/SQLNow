using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using dhtmlxConnectors;

namespace SQLNow.handlers
{
    public class MasterSQLEntityType : dhtmlxRequestHandler
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
                "[dbo].[ManagedSQLEntityType]",
                "ManagedEntityTypeRowId, ManagedEntityTypeSystemName, Description, ManagedEntityTypeSQLId, Aktiv",
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
                                "INSERT INTO [dbo].[ManagedSQLEntityType] " +
                                "(ManagedEntityTypeRowId,ManagedEntityTypeSystemName,Description,ManagedEntityTypeSQLId,Aktiv) " +
                                "VALUES (@rid,@sn,@d,@sid,@ak)", con);
                            cmd.Parameters.AddWithValue("@rid", ctx.Request.Form["ManagedEntityTypeRowId"]      ?? "");
                            cmd.Parameters.AddWithValue("@sn",  ctx.Request.Form["ManagedEntityTypeSystemName"] ?? "");
                            cmd.Parameters.AddWithValue("@d",   ctx.Request.Form["Description"]                 ?? "");
                            cmd.Parameters.AddWithValue("@sid", ctx.Request.Form["ManagedEntityTypeSQLId"]      ?? "");
                            cmd.Parameters.AddWithValue("@ak",  ctx.Request.Form["Aktiv"] ?? "1");
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "update":
                            cmd = new SqlCommand(
                                "UPDATE [dbo].[ManagedSQLEntityType] SET " +
                                "ManagedEntityTypeSystemName=@sn,Description=@d,ManagedEntityTypeSQLId=@sid,Aktiv=@ak " +
                                "WHERE ManagedEntityTypeRowId=@id", con);
                            cmd.Parameters.AddWithValue("@sn",  ctx.Request.Form["ManagedEntityTypeSystemName"] ?? "");
                            cmd.Parameters.AddWithValue("@d",   ctx.Request.Form["Description"]                 ?? "");
                            cmd.Parameters.AddWithValue("@sid", ctx.Request.Form["ManagedEntityTypeSQLId"]      ?? "");
                            cmd.Parameters.AddWithValue("@ak",  ctx.Request.Form["Aktiv"] ?? "1");
                            cmd.Parameters.AddWithValue("@id",  rowid);
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "delete":
                            cmd = new SqlCommand(
                                "DELETE FROM [dbo].[ManagedSQLEntityType] WHERE ManagedEntityTypeRowId=@id", con);
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

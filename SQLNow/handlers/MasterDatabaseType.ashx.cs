using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using dhtmlxConnectors;

namespace SQLNow.handlers
{
    public class MasterDatabaseType : dhtmlxRequestHandler
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
                "[dbo].[ManagedEntityDatabaseType]",
                "ManagedEntityTypeRowId, ManagedEntityTypeGuid, ManagementPackRowId, ManagedEntityTypeSystemName, ManagedEntityTypeDefaultName, ManagedEntityTypeDefaultDescription, Aktive",
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
                                "INSERT INTO [dbo].[ManagedEntityDatabaseType] " +
                                "(ManagedEntityTypeRowId,ManagedEntityTypeGuid,ManagementPackRowId," +
                                "ManagedEntityTypeSystemName,ManagedEntityTypeDefaultName,ManagedEntityTypeDefaultDescription,Aktive) " +
                                "VALUES (@rid,@guid,@mpid,@sn,@dn,@dd,@ak)", con);
                            cmd.Parameters.AddWithValue("@rid",  ctx.Request.Form["ManagedEntityTypeRowId"]           ?? "");
                            cmd.Parameters.AddWithValue("@guid", ctx.Request.Form["ManagedEntityTypeGuid"]            ?? "");
                            cmd.Parameters.AddWithValue("@mpid", ctx.Request.Form["ManagementPackRowId"]              ?? "");
                            cmd.Parameters.AddWithValue("@sn",   ctx.Request.Form["ManagedEntityTypeSystemName"]      ?? "");
                            cmd.Parameters.AddWithValue("@dn",   ctx.Request.Form["ManagedEntityTypeDefaultName"]     ?? "");
                            cmd.Parameters.AddWithValue("@dd",   ctx.Request.Form["ManagedEntityTypeDefaultDescription"] ?? "");
                            cmd.Parameters.AddWithValue("@ak",   ctx.Request.Form["Aktive"] ?? "1");
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "update":
                            cmd = new SqlCommand(
                                "UPDATE [dbo].[ManagedEntityDatabaseType] SET " +
                                "ManagedEntityTypeGuid=@guid,ManagementPackRowId=@mpid," +
                                "ManagedEntityTypeSystemName=@sn,ManagedEntityTypeDefaultName=@dn," +
                                "ManagedEntityTypeDefaultDescription=@dd,Aktive=@ak " +
                                "WHERE ManagedEntityTypeRowId=@id", con);
                            cmd.Parameters.AddWithValue("@guid", ctx.Request.Form["ManagedEntityTypeGuid"]            ?? "");
                            cmd.Parameters.AddWithValue("@mpid", ctx.Request.Form["ManagementPackRowId"]              ?? "");
                            cmd.Parameters.AddWithValue("@sn",   ctx.Request.Form["ManagedEntityTypeSystemName"]      ?? "");
                            cmd.Parameters.AddWithValue("@dn",   ctx.Request.Form["ManagedEntityTypeDefaultName"]     ?? "");
                            cmd.Parameters.AddWithValue("@dd",   ctx.Request.Form["ManagedEntityTypeDefaultDescription"] ?? "");
                            cmd.Parameters.AddWithValue("@ak",   ctx.Request.Form["Aktive"] ?? "1");
                            cmd.Parameters.AddWithValue("@id",   rowid);
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "delete":
                            cmd = new SqlCommand(
                                "DELETE FROM [dbo].[ManagedEntityDatabaseType] WHERE ManagedEntityTypeRowId=@id", con);
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

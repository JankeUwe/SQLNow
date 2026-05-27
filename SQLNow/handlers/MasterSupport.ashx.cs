using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using dhtmlxConnectors;

namespace SQLNow.handlers
{
    public class MasterSupport : dhtmlxRequestHandler
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
                "[dbo].[Support]",
                "VersionNr, ReleaseDate, EndOfMainstream, EndofExtended",
                "VersionNr",
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
                                "INSERT INTO [dbo].[Support] (VersionNr,ReleaseDate,EndOfMainstream,EndofExtended) " +
                                "VALUES (@vn,@rd,@em,@ee)", con);
                            cmd.Parameters.AddWithValue("@vn", ctx.Request.Form["VersionNr"]       ?? "");
                            cmd.Parameters.AddWithValue("@rd", ctx.Request.Form["ReleaseDate"]      ?? "");
                            cmd.Parameters.AddWithValue("@em", ctx.Request.Form["EndOfMainstream"]  ?? "");
                            cmd.Parameters.AddWithValue("@ee", ctx.Request.Form["EndofExtended"]    ?? "");
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "update":
                            cmd = new SqlCommand(
                                "UPDATE [dbo].[Support] SET ReleaseDate=@rd,EndOfMainstream=@em,EndofExtended=@ee " +
                                "WHERE VersionNr=@id", con);
                            cmd.Parameters.AddWithValue("@rd", ctx.Request.Form["ReleaseDate"]     ?? "");
                            cmd.Parameters.AddWithValue("@em", ctx.Request.Form["EndOfMainstream"] ?? "");
                            cmd.Parameters.AddWithValue("@ee", ctx.Request.Form["EndofExtended"]   ?? "");
                            cmd.Parameters.AddWithValue("@id", rowid);
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "delete":
                            cmd = new SqlCommand(
                                "DELETE FROM [dbo].[Support] WHERE VersionNr=@id", con);
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

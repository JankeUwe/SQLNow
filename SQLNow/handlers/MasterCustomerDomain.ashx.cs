using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using dhtmlxConnectors;

namespace SQLNow.handlers
{
    public class MasterCustomerDomain : dhtmlxRequestHandler
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

            // CustomerName und CustomerShortName sind berechnete Spalten - nur lesen
            return new dhtmlxGridConnector(
                "[dbo].[CustomerDomain]",
                "CustomerName, DomainDnsName, JumpServer1, JumpServer2, JumpServer3, JumpServer4, Notes",
                "DomainId",
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
                                "INSERT INTO [dbo].[CustomerDomain] (CustomerId,DomainDnsName,JumpServer1,JumpServer2,JumpServer3,JumpServer4,Notes) " +
                                "VALUES (@cid,@dns,@j1,@j2,@j3,@j4,@no)", con);
                            cmd.Parameters.AddWithValue("@cid", ctx.Request.Form["CustomerId"]    ?? "");
                            cmd.Parameters.AddWithValue("@dns", ctx.Request.Form["DomainDnsName"] ?? "");
                            cmd.Parameters.AddWithValue("@j1",  ctx.Request.Form["JumpServer1"]   ?? "");
                            cmd.Parameters.AddWithValue("@j2",  ctx.Request.Form["JumpServer2"]   ?? "");
                            cmd.Parameters.AddWithValue("@j3",  ctx.Request.Form["JumpServer3"]   ?? "");
                            cmd.Parameters.AddWithValue("@j4",  ctx.Request.Form["JumpServer4"]   ?? "");
                            cmd.Parameters.AddWithValue("@no",  ctx.Request.Form["Notes"]         ?? "");
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "update":
                            cmd = new SqlCommand(
                                "UPDATE [dbo].[CustomerDomain] SET DomainDnsName=@dns,JumpServer1=@j1,JumpServer2=@j2," +
                                "JumpServer3=@j3,JumpServer4=@j4,Notes=@no WHERE DomainId=@id", con);
                            cmd.Parameters.AddWithValue("@dns", ctx.Request.Form["DomainDnsName"] ?? "");
                            cmd.Parameters.AddWithValue("@j1",  ctx.Request.Form["JumpServer1"]   ?? "");
                            cmd.Parameters.AddWithValue("@j2",  ctx.Request.Form["JumpServer2"]   ?? "");
                            cmd.Parameters.AddWithValue("@j3",  ctx.Request.Form["JumpServer3"]   ?? "");
                            cmd.Parameters.AddWithValue("@j4",  ctx.Request.Form["JumpServer4"]   ?? "");
                            cmd.Parameters.AddWithValue("@no",  ctx.Request.Form["Notes"]         ?? "");
                            cmd.Parameters.AddWithValue("@id",  rowid);
                            cmd.ExecuteNonQuery();
                            ctx.Response.Write("OK");
                            break;

                        case "delete":
                            cmd = new SqlCommand(
                                "DELETE FROM [dbo].[CustomerDomain] WHERE DomainId=@id", con);
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

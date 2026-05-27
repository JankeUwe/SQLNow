using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using dhtmlxConnectors;
using System.Configuration;

namespace SQLNow.handlers
{
    /// <summary>
    /// Zusammenfassungsbeschreibung für SQLServer
    /// </summary>
    public class SQLServer : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "SQLServer",
                "[SQLMandantName], [Domain],[Maschine], [Type], [PrincipalName], [InstanceName], [TcpPorts], [Version],  [VersionNr],[EndOfMainstream], ServicePackVersion, [Edition], [Account], [AuthenticationMode], [AuditLevel], [InstallPath],[MasterDatabaseLocation],[ToolsPath]",
                "ManagedEntityRowId",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );
            connector.BeforeSelect += new EventHandler(connector_BeforeSelect);

            return connector;
        }
       
        void connector_BeforeSelect(object sender, EventArgs e)
        {
            this.Connector.Request.OrderBy.Add(
               //sorts the "SQLMandantName" field in the ascending order
               new OrderByField((TableField)"SQLMandantName", "ASC")
            );
        }

    }
}

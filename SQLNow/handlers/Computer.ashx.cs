using dhtmlxConnectors;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SQLNow.handlers
{
    /// <summary>
    /// Zusammenfassungsbeschreibung für Computer
    /// </summary>
    public class Computer : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "vComputerGrid",
                "[SQLCustomer],[DomainDnsName],[Maschine],[NetbiosComputerName],[DNSName],[IPAddress],[PhysicalProcessors],[LogicalProcessors],[VirtualMachineName],SQLMonitoringType,NotFoundSince",
                "ManagedEntityRowId",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );
           // connector.BeforeSelect += new EventHandler(connector_BeforeSelect);
            return connector;
        }

        void connector_BeforeSelect(object sender, EventArgs e)
        {

            var context = HttpContext.Current;
            var str = context.Request.QueryString["DomainID"];

            this.Connector.Request.Rules.Add(new FieldRule("DomainID", Operator.Equals, str)
            );

        }
    }
}
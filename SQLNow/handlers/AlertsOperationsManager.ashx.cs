using dhtmlxConnectors;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SQLNow.handlers
{
    /// <summary>
    /// Zusammenfassungsbeschreibung für AlertsOperationsManager
    /// </summary>
    public class AlertsOperationsManager : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "vAlertsOperationsManager",
                "[symbol],[SQLMandantName],[category],[Maschine],[InstanceName],[Alertname],[Displayname],[Fullname],[ResolutionStateName],[timeRaised],[TimeResolved],[TicketId],[TSYS]",
                "[AlertID]",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );
            connector.BeforeSelect += new EventHandler(connector_BeforeSelect);
            return connector;
        }

        void connector_BeforeSelect(object sender, EventArgs e)
        {
            this.Connector.Request.OrderBy.Add(new OrderByExpression("timeRaised DESC"));

        }
    }
}
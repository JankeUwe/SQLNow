using dhtmlxConnectors;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SQLNow.handlers
{
    /// <summary>
    /// Zusammenfassungsbeschreibung für Alerts
    /// </summary>
    public class Alerts : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "vAlert",
                "[Maschine],[InstanceName],[category],[ResolutionStateName],[Alertname],[displayname],[timeRaised],[TimeResolved],[TicketId]" ,
                "AlertID",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );
            connector.BeforeSelect += new EventHandler(connector_BeforeSelect);
            return connector;
        }

        void connector_BeforeSelect(object sender, EventArgs e)
        {

            var context = HttpContext.Current;
            var str = context.Request.QueryString["Maschine"];

            this.Connector.Request.Rules.Add(new FieldRule("Maschine", Operator.Like, str)
            );

        }
    }
}
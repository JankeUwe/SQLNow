using dhtmlxConnectors;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SQLNow.handlers
{
    /// <summary>
    /// Zusammenfassungsbeschreibung für AlertsOperationsManagerDW
    /// </summary>
    public class AlertsOperationsManagerDW : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "vAlertsOperationsManagerDW",
                "[Category],[DisplayName],[Alertname],[AlertDescription],[RaisedDateTime],[Severity],[priority],[RepeatCount]",
                "AlertGuid",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );
            connector.BeforeSelect += new EventHandler(connector_BeforeSelect);
            return connector;
        }

        void connector_BeforeSelect(object sender, EventArgs e)
        {

            var context = HttpContext.Current;
            var str = context.Request.QueryString["ManagedEntityRowId"];

            this.Connector.Request.Rules.Add(new FieldRule("ManagedEntityRowId", Operator.Equals, str)
            );

            this.Connector.Request.OrderBy.Add(new OrderByExpression("RaisedDateTime DESC"));

        }
    }
}
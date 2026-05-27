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
    /// Zusammenfassungsbeschreibung für EditionChart
    /// </summary>
    public class EditionChart : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxChartConnector(
                "vEdition",
                "Edition,Anzahl",
                "Edition",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );

            return connector;
        }
    }
}
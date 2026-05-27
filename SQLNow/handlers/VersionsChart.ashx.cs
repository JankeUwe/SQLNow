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
    /// Zusammenfassungsbeschreibung für VersionsChart
    /// </summary>
    public class VersionsChart : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxChartConnector(
                "vVersionen",
                "VersionNr,Anzahl",
                "VersionNr",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );

            return connector;
        }
    }
}
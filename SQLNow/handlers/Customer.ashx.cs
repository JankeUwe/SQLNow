using dhtmlxConnectors;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SQLNow.handlers
{
    /// <summary>
    /// Zusammenfassungsbeschreibung für Customer
    /// </summary>
    public class Customer : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "CustomerDomain",
                "DomainDnsName, JumpServer1, JumpServer2, Notes",
                "DomainId",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString,
                "CustomerName, CustomerShortName"
            );

            return connector;
        }

    }
}
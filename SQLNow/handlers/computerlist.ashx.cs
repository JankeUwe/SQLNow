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
    /// Connector body
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    public class computerlist : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "vComputer",
                "NetbiosComputerName,CategoryName,HostType",
                "ManagedEntityRowId",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FITSSN2SNowConnectionString"].ConnectionString
            );
            connector.BeforeSelect += new EventHandler(connector_BeforeSelect);
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





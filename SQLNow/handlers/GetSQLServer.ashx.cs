using dhtmlxConnectors;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SQLNow.handlers
{
    /// <summary>
    /// Zusammenfassungsbeschreibung für GetSQLServer
    /// </summary>
    public class GetSQLServer : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var ct = HttpContext.Current;
            var str =  ct.Request.QueryString["TopLevelHostManagedEntityRowId"] ;

            var connector = new dhtmlxGridConnector(
                "SELECT property, wert FROM [dbo].[SQLPropList](" + str + ")",
                "property",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );
            connector.BeforeSelect += new EventHandler(connector_BeforeSelect);
            return connector;
        }


        void connector_BeforeSelect(object sender, EventArgs e)
        {
            this.Connector.Request.OrderBy.Add(
               //sorts the "property" field in the descending order
               new OrderByField((TableField)"property", "ASC")
            );
        }

    }
}
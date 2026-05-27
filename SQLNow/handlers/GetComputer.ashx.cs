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
    /// Zusammenfassungsbeschreibung für GetComputer
    /// </summary>
    public class GetComputer : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var ct = HttpContext.Current;   
            var str = "'"+ct.Request.QueryString["Maschine"] +"'" ;
            
            var connector = new dhtmlxGridConnector(
                "SELECT property, wert FROM [dbo].[ComputerPropList](" + str + ")",
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
               //sorts the "PrintableName" field in the descending order
               new OrderByField((TableField)"property", "ASC")
            );
        }


    }
}
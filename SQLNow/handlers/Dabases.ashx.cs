using dhtmlxConnectors;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SQLNow.handlers
{
    /// <summary>
    /// Zusammenfassungsbeschreibung für Dabases
    /// </summary>
    public class Dabases : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "[vDatabases]",
                "symbol, DatabaseName, Owner, RecoveryModel, Collation, DatabaseAutogrow, LogAutogrow, Updateability, UserAccess, NotFoundSince",
                "ManagedEntityRowId",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );
            connector.BeforeSelect += new EventHandler(connector_BeforeSelect);
            connector.BeforeRender += new EventHandler<ItemPrerenderEventArgs<dhtmlxGridDataItem>>(connector_ItemPrerender);
            return connector;
        }

        void connector_BeforeSelect(object sender, EventArgs e)
        {

            var context = HttpContext.Current;
            var str = context.Request.QueryString["Id"];

            this.Connector.Request.Rules.Add(new FieldRule("TopLevelHostManagedEntityRowId", Operator.Equals, str)
            );

        }

        void connector_ItemPrerender(object sender, ItemPrerenderEventArgs<dhtmlxGridDataItem> e)
        {
            if (e.DataItem.DataFields["NotFoundSince"] == null)
                e.DataItem.BgColor = "gray";
        }
    }
}

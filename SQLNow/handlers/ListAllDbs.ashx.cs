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
    /// Zusammenfassungsbeschreibung für ListAllDbs
    /// </summary>
    public class ListAllDbs : dhtmlxRequestHandler
    {
        public override IdhtmlxConnector CreateConnector(HttpContext context)
        {
            var connector = new dhtmlxGridConnector(
                "[vDatabasesList]",
                "symbol,TopLevelHostManagedEntityRowId,DatabaseName,PrincipalName,InstanceName,Owner,RecoveryModel,Collation,DatabaseAutogrow,LogAutogrow,Updateability,UserAccess,NotFoundSince",
                "ManagedEntityRowId",
                dhtmlxDatabaseAdapterType.SqlServer2005,
                ConfigurationManager.ConnectionStrings["FSQLConnectionString"].ConnectionString
            );

            return connector;
        }

    }
}

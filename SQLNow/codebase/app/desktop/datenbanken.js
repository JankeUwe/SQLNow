var grid_Databaselist = null;
var grid_sqlproperties = null;
var main_dbs_layout;
var cell_SqlServer;
var cell_dbslist
var cell_Host;
var grid_Hostproperties;

function DbsInit(cell) {
      mainToolbar.clearAll();
      var actvId = mainSidebar.getActiveItem();
    mainToolbar.loadStruct("codebase/toolbar/Datenbanken.xml", function(){
          mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(actvId).getText().text }));
      });

    
    

    if (main_dbs_layout == null) {
         main_dbs_layout = cell.attachLayout("3T")

        cell_dbslist = main_dbs_layout.cells('a');
        cell_dbslist.hideHeader();
        grid_Databaselist = cell_dbslist.attachGrid();
        grid_Databaselist.setIconsPath('./codebase/imgs/');
        grid_Databaselist.setImagePath(image_path);
        grid_Databaselist.setHeader(["", "TopLevelHostManagedEntityRowId", "<i class='fa-solid fa-database'></i> Database", "<i class='fa-solid fa-building'></i> Principal", "<i class='fa-solid fa-server'></i> Instance", "<i class='fa-solid fa-user'></i> Owner", "RecoveryModel", "Collation", "DBSAutogrow", "LogAutogrow", "Updateability", "UserAccess", "<i class='fa-solid fa-clock'></i> NotFoundSince"]);
        grid_Databaselist.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
        grid_Databaselist.attachHeader(",,#text_filter,#select_filter,#text_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,");
        grid_Databaselist.setColAlign('center,left,left,left,left,left,center,left,center,center,center,center,right');
        grid_Databaselist.enableResizing('true,true,true,true,true,true,true,true,true,true,true,true,true');
        grid_Databaselist.setColSorting('na,str,str,str,str,str,str,str,str,str,str,str,date');
        grid_Databaselist.setColumnMinWidth('50', 0);
        grid_Databaselist.setInitWidths('50,100,250,*,150,250,100,100,100,100,100,100,150');
        grid_Databaselist.enableSmartRendering(true);
        grid_Databaselist.attachEvent("onRowSelect", FillSQLServerProperties);
        grid_Databaselist.setColumnHidden(1, true);  // TopLevelHostManagedEntityRowId verbergen
        grid_Databaselist.enableAlterCss("even", "uneven");

   


        grid_Databaselist.init();

        grid_Databaselist.attachEvent("onXLE", function () {
            grid_Databaselist.forEachRow(function (id) {
                grid_Databaselist.cells(id, 0).setValue("<i class='fa-solid fa-database'></i>");
            });
        });

        cell_SqlServer = main_dbs_layout.cells('b');
        cell_SqlServer.setText('SQL-Server');
        cell_SqlServer.setCollapsedText('SQL-Server');
        grid_sqlproperties = cell_SqlServer.attachGrid();
        grid_sqlproperties.setIconsPath('./codebase/imgs/');



        cell_Host = main_dbs_layout.cells('c');
        cell_Host.setText("Server")
        cell_Host.setCollapsedText('Server');
        grid_Hostproperties = cell_Host.attachGrid();
        grid_Hostproperties.setIconsPath('./codebase/imgs/');


        Initcell_SqlServerList(); 
        InitcellHostlist();
        

        

    }
    doOnRefreshDatabases();     
  

}


window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {
    if (id == "datenbanken") DbsInit(cell);
});



function Initcell_SqlServerList() {
    grid_sqlproperties.setHeader(["Eigenschaft", "Wert"])
    grid_sqlproperties.init();
    grid_sqlproperties.setInitWidths("150,*")
    grid_sqlproperties.setColTypes("ro,ro");

}

function InitcellHostlist() {
    grid_Hostproperties.setHeader(["Eigenschaft", "Wert"])
    grid_Hostproperties.init();
    grid_Hostproperties.setInitWidths("150,*")
    grid_Hostproperties.setColTypes("ro,ro");



}

function DoOnCopyDb() {
     grid_Databaselist.printView();
}

function DoOnDbExport() { grid_Databaselist.toExcel("handlers/Generate.ashx") }

function doOnRefreshDatabases() {
    
    cell_dbslist.progressOn();
    grid_Databaselist.load("handlers/ListAllDbs.ashx?Id=", function () {
        grid_Databaselist.selectRow(0, true, false, true); // select first row
        cell_dbslist.progressOff();

      

    });
}   


function FillSQLServerProperties(id) {
    
    cell_SqlServer.progressOn
    value = grid_Databaselist.cells(id, 1).getValue();
    grid_sqlproperties.clearAll();
    grid_sqlproperties.load("handlers/GetSQLServer.ashx?TopLevelHostManagedEntityRowId=" + value, function () {
       cell_SqlServer.progressOff();
    });

    cell_Host.progressOn();
    value = grid_Databaselist.cells(id, 3).getValue();
    grid_Hostproperties.clearAll();
    grid_Hostproperties.load("handlers/GetComputer.ashx?Maschine=" + value, function () {
        cell_Host.progressOff();
    });




}




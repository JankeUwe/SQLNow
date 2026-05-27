var main_layout;
var grid_search;
var sub_layout;
var grid_Computer;
var cell_computer;
var grid_Server;
var cell_Server;
var grid_dbs;
var cell_dbs;


function SQLServerInit(cell) {

    mainToolbar.clearAll();
    var actvId = mainSidebar.getActiveItem();

    mainToolbar.loadStruct("codebase/toolbar/SQLServer.xml", function () {
        mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(actvId).getText().text }));
        mainToolbar.attachEvent("onClick", function (id) {
            if (id === "Refresh") FillSQLServerlist();
            if (id === "Copy")    DoOnCopy();
            if (id === "Copy1")   autohide();
        });
    });



    if (main_layout == null) {

        //mainLayout
        main_layout = cell.attachLayout("3T")


        cell_Server = main_layout.cells('a');
        cell_Server.setText('Ermittlete SQL-Server');
        cell_Server.setCollapsedText('Ermittlete SQL-Server');
        grid_Server = cell_Server.attachGrid();
        grid_Server.setIconsPath('./codebase/imgs/');
        InitGridSQLServer();



        cell_dbs = main_layout.cells('b');
        cell_dbs.setText('Datenbanken auf SQL-Server');
        cell_dbs.setCollapsedText('Datenbanken SQL-Server');
        grid_dbs = cell_dbs.attachGrid();
        grid_dbs.setIconsPath('./codebase/imgs/');
        InitDbsList();
        
      


        var Computer = main_layout.cells('c');
        Computer.setText('Computer');
        Computer.setCollapsedText('Host zum SQL-Server');
        grid_Computer = Computer.attachGrid();
        grid_Computer.setIconsPath('./codebase/imgs/');
        initComputer();
        



           
            

    }
    FillSQLServerlist();
}









function InitGridSQLServer() {
    grid_Server.setHeader(["<i class='fa-solid fa-desktop'></i>", "<i class='fa-solid fa-building'></i> Mandant", "<i class='fa-solid fa-globe'></i> Domain", "<i class='fa-solid fa-server'></i> Maschine", "Type", "<i class='fa-solid fa-user'></i> Principal", "<i class='fa-solid fa-database'></i> Instance", "TcpPorts", "<i class='fa-solid fa-tag'></i> Version", "VersionNr", "<i class='fa-solid fa-calendar'></i> EndOfMainstream", "ServicePack", "Edition", "Account", "Authentication", "AuditLevel"]);
    grid_Server.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
    grid_Server.setColSorting("na,str,str,str,str,str,str,str,str,str,date,str,str,str,str,str");
    grid_Server.attachHeader(",#connector_select_filter,#connector_text_filter,#connector_select_filter,#connector_text_filter,#connector_select_filter,#connector_select_filter,#connector_select_filter,#connector_select_filter,#connector_select_filter,#connector_select_filter,#connector_select_filter,#connector_select_filter,#connector_text_filter,#connector_select_filter,#connector_select_filter");
    grid_Server.setInitWidths('40,220,140,*,80,*,110,80,90,80,90,80,90,180,160,80');

    grid_Server.setColAlign("center,left,left,left,left,left,left,right,right,right,right,right,left,left,left,center");
    grid_Server.attachEvent("onRowSelect", FillDetails);
    grid_Server.setImagePath(image_path);

    grid_Server.attachEvent('onEditCell', function (stage, rId, cInd, nValue, oValue) {
        if (stage == 2) return false;
    });

    grid_Server.enableExcelKeyMap();
    grid_Server.attachFooter(",,Total,{#stat_count},#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan");
    grid_Server.init();
    grid_Server.enableAlterCss("even", "uneven");

    grid_Server.attachEvent("onXLE", function () {
        grid_Server.forEachRow(function (id) {
            grid_Server.cells(id, 0).setValue("<i class='fa-solid fa-database'></i>");
        });
    });
}


function FillSQLServerlist() {
    grid_Server.clearAll();
    grid_Computer.clearAll();
    grid_dbs.clearAll();
    cell_Server.progressOn();
   
    grid_Server.load("handlers/SQLServer.ashx", function () {
        grid_Server.selectRow(0, true, false, true); // select first row
        cell_Server.progressOff();
    });
}


function InitDbsList(){
    grid_dbs.setHeader(["", "<i class='fa-solid fa-database'></i> DatabaseName", "<i class='fa-solid fa-user'></i> Owner", "RecoveryModel", "Collation", "DBAutogrow", "LogAutogrow", "Updateability", "UserAccess", "<i class='fa-solid fa-clock'></i> NotFoundSince"])
    grid_dbs.setImagePath(image_path);
    grid_dbs.setColTypes("icon,ro,ro,ro,ro,ro,ro,ro,ro,ro");
    grid_dbs.setColSorting(",str,str,str,str,str,str,str,str,str");
    grid_dbs.setInitWidths("50,240,90,*,140,*,*,*,*,*");
    grid_dbs.attachHeader(",#select_filter,#text_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#select_filter,#text_filter");
    grid_dbs.init();
    grid_dbs.enableAlterCss("even", "uneven");
    grid_dbs.attachFooter("Databases,#cspan,{#stat_count},#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan");

    grid_dbs.attachEvent('onEditCell', function (stage, rId, cInd, nValue, oValue) {
        if (stage == 2) return false;
    });

    grid_dbs.enableExcelKeyMap();
}

function initComputer() {
    grid_Computer.setHeader(["<i class='fa-solid fa-tag'></i> Eigenschaft", "<i class='fa-solid fa-info-circle'></i> Wert"])
    grid_Computer.setColTypes("ro,ro");
    grid_Computer.attachEvent('onEditCell', function (stage, rId, cInd, nValue, oValue) {
        if (stage == 2) return false;
    });
    grid_Computer.init();
    grid_Computer.enableAlterCss("even", "uneven");

    grid_Computer.attachEvent("onXLE", function (grid_obj, count) {

        grid_Computer.forEachRow(function (id) {
            //your code here
            //id - row's id
            
            if (id == 'SQLMonitoringType') {
                if (grid_Computer.cells(id, 1).getValue() == 0) {

                    grid_Computer.setRowColor(id, "#EAB34B");
                    grid_Computer.setRowTextBold(id);
                    
                }
            }



            if (id == 'SQLMandant') {
                if (grid_Computer.cells(id, 1).getValue() == '') {

                    grid_Computer.setRowColor(id, "#EAB34B");
                    grid_Computer.setRowTextBold(id);

                }
            }



        });



    });


}

function autohide() {
    
    mainSidebar.setHeader =true
    mainSidebar.autohide();
}


function DoOnCopy() {
    var selectedId = grid_Server.getSelectedRowId() 

    grid_Server.printView();
    
    
}

function DoOnExport() {
    grid_Server.toExcel("handlers/Generate.ashx")
 
} 

function FillDetails(id) {
    grid_dbs.clearAll();
    grid_Computer.clearAll();

    cell_dbs.progressOn();
    value = grid_Server.cells(id, 2).getValue();  
     grid_dbs.load("handlers/Dabases.ashx?Id=" + id, function () {
        grid_dbs.selectRow(0, true, false, true); // select first row
        cell_dbs.progressOff();
    });

    
    grid_Computer.load("handlers/GetComputer.ashx?Maschine=" + value, function () {
        grid_Computer.selectRow(0, true, false, true); // select first row

    });

}


window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {
    if (id == "sqlserver") SQLServerInit(cell);
});
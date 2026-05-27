var main_maschine_layout;
var cell_maschine;
var grid_maschine;
var cell_alerts;
var grid_alert_History;
var grid_maintain;
var cell_maintain;


function MaschineInit(cell) {
    mainToolbar.clearAll();
    var actvId = mainSidebar.getActiveItem();
    mainToolbar.loadStruct("codebase/toolbar/maschine.xml", function () {
        mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(actvId).getText().text }));
    });



    if (main_maschine_layout == null) {
        main_maschine_layout = cell.attachLayout("2E")
        cell_maschine = main_maschine_layout.cells('a');
        cell_maschine.setText('Server mit SQL Installationen');
        cell_maschine.setCollapsedText('Server mit SQL Installationen');
        grid_maschine = cell_maschine.attachGrid();
        grid_maschine.setIconsPath('./codebase/imgs/');
        cell_alerts = main_maschine_layout.cells('b');

        var tabbar_1 = cell_alerts.attachTabbar();

        tabbar_1.addTab('tab_1', 'Alert History');
        var tab_1 = tabbar_1.cells('tab_1');
        tab_1.setActive();

        tabbar_1.addTab('tab_2', 'Maitainnance History');
        var tab_2 = tabbar_1.cells('tab_2');


        cell_alerts = main_maschine_layout.cells('b');
      

        grid_alert_History = tab_1.attachGrid();
        grid_alert_History.setIconsPath('./codebase/imgs/');


        
        grid_maintain = tab_2.attachGrid();
        grid_maintain.setIconsPath('./codebase/imgs/');

        
        InitGridMaschine();
        initGridAlertHistory();
        InitGridMaintain();
    }





    loadMachinen();

}

function InitGridMaschine() {
    grid_maschine.setHeader(["<i class='fa-solid fa-desktop'></i>", "<i class='fa-solid fa-building'></i> Mandant", "<i class='fa-solid fa-globe'></i> Domain", "<i class='fa-solid fa-server'></i> Maschine", "NetbiosName", "DNSName", "IPAddress", "PhysicalCPU", "LogicalCPU", "VirtualMachineName", "<i class='fa-solid fa-chart-bar'></i> SQLMonitoringType", "<i class='fa-solid fa-clock'></i> NotFoundSince"]);
    grid_maschine.attachHeader(",#connector_select_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_select_filter,#connector_text_filter")
    grid_maschine.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
    grid_maschine.setColSorting("na,str,str,str,str,str,str,str,str,str,str,date");
    grid_maschine.setInitWidths('40,220,150,180,150,*,200,80,80,160,140,140');
    grid_maschine.setColAlign("center,left,left,left,left,left,left,right,right,left,center,right");
    grid_maschine.setImagePath(image_path)
    grid_maschine.attachEvent("onRowSelect", fillMaschineEvents);

    grid_maschine.attachEvent('onEditCell', function (stage, rId, cInd, nValue, oValue) {
        if (stage == 2) return false;
    });

    grid_maschine.init();
    grid_maschine.enableAlterCss("even", "uneven");
    grid_maschine.enableExcelKeyMap();

    grid_maschine.attachEvent("onXLE", function () {
        grid_maschine.forEachRow(function (id) {
            grid_maschine.cells(id, 0).setValue("<i class='fa-solid fa-desktop'></i>");
        });
    });
}

function initGridAlertHistory() {
    grid_alert_History.setHeader(["<i class='fa-solid fa-tag'></i> Category", "<i class='fa-solid fa-server'></i> DisplayName", "<i class='fa-solid fa-bell'></i> Alertname", "AlertDescription", "<i class='fa-solid fa-clock'></i> Raised", "<i class='fa-solid fa-exclamation-triangle'></i> Severity", "Priority", "RepeatCount"]);
    grid_alert_History.attachHeader("#connector_text_filter,#connector_select_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter,#connector_text_filter")
    grid_alert_History.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro");
    grid_alert_History.setImagePath(image_path)
    grid_alert_History.setColSorting("str,str,str,str,date,str,str,str");
    grid_alert_History.setInitWidths('260,260,260,*,120,90,90,90');
    grid_alert_History.setDateFormat("%d.%m.%Y");
    grid_alert_History.attachEvent('onEditCell', function (stage, rId, cInd, nValue, oValue) {
        if (stage == 2) return false;
    });

    grid_alert_History.init();
    grid_alert_History.enableAlterCss("even", "uneven");
    grid_alert_History.enableExcelKeyMap();
}

function InitGridMaintain() {
    grid_maintain.setHeader(["<i class='fa-solid fa-server'></i> DisplayName", "<i class='fa-solid fa-play'></i> Start", "<i class='fa-solid fa-stop'></i> End", "ScheduledEnd", "<i class='fa-solid fa-user'></i> UserId", "<i class='fa-solid fa-comment'></i> Comment"]);
    grid_maintain.setColTypes("ro,ro,ro,ro,ro,ro");
    grid_maintain.setColSorting("str,date,date,date,str,str");
    grid_maintain.setInitWidths('360,120,120,120,200,*');
    grid_maintain.setImagePath(image_path)
    grid_maintain.attachHeader("#select_filter,#text_filter,#text_filter,#text_filter,#select_filter,#text_filter");
    grid_maintain.attachEvent('onEditCell', function (stage, rId, cInd, nValue, oValue) {
        if (stage == 2) return false;
    });

    grid_maintain.init();
    grid_maintain.enableAlterCss("even", "uneven");
    grid_maintain.enableExcelKeyMap();
}






function loadMachinen() {

    grid_maschine.clearAll();
    cell_maschine.progressOn();


    grid_maschine.load("handlers/computer.ashx", function () {
        grid_maschine.selectRow(0, true, false, true); // select first row
   
        cell_maschine.progressOff();
    });


}


function fillMaschineEvents(id) {

    grid_alert_History.clearAll();

   
    grid_alert_History.load("handlers/AlertsOperationsManagerDW.ashx?ManagedEntityRowId=" + id, function () {
        grid_alert_History.selectRow(0, true, false, true); // select first row

    });
    grid_maintain.clearAll();
    grid_maintain.load("handlers/Maintain.ashx?ManagedEntityRowId=" + id, function () {
        grid_maintain.selectRow(0, true, false, true); // select first row

    });



}





window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {

    if (id == "maschine") MaschineInit(cell);
});
var alert_layout = null;
var alert_grid = null;
var cell_alert = null;

function alertInit(cell) {
    mainToolbar.clearAll();
    var actvId = mainSidebar.getActiveItem();
    mainToolbar.loadStruct("codebase/toolbar/alert.xml", function () {
        mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(actvId).getText().text }));
    });

    
    if (alert_layout == null) {
        alert_layout = cell.attachLayout("1C")

        cell_alert = alert_layout.cells('a');
        cell_alert.setText('Alerts mit Ticket');
        cell_alert.setCollapsedText('Alerts mit Ticket');
        alert_grid = cell_alert.attachGrid();

        alert_grid.setHeader(["", "<i class='fa-solid fa-building'></i> Mandant", "<i class='fa-solid fa-tag'></i> Category", "<i class='fa-solid fa-server'></i> Maschine", "<i class='fa-solid fa-database'></i> Instance", "<i class='fa-solid fa-bell'></i> Alert", "Display", "Fullname", "<i class='fa-solid fa-circle-info'></i> State", "<i class='fa-solid fa-clock'></i> Raised", "Resolved", "<i class='fa-solid fa-ticket'></i> Ticket", "System"]);
        alert_grid.setImagePath(image_path);
        alert_grid.attachHeader(",#select_filter,#select_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#select_filter,#text_filter,#text_filter,#text_filter,#select_filter");
        alert_grid.setColTypes("icon,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
        alert_grid.setColSorting(",str,str,str,str,str,str,str,str,str,str,str,str");
        alert_grid.setInitWidths("50,220,90,220,140,*,*,*,90,120,120,110,100");
        alert_grid.init();
        alert_grid.enableAlterCss("even", "uneven");
        alert_grid.enableExcelKeyMap();
        alert_grid.attachEvent('onEditCell', function (stage, rId, cInd, nValue, oValue) {
            if (stage == 2) return false;
        });

        
    }


    loadAlerts();



}
function loadAlerts() {
    alert_grid.load("handlers/AlertsOperationsManager.ashx", function () {
        alert_grid.selectRow(0, true, false, true); // select first row

    });

}
function DoOnCopyAlert() { alert_grid.printView(); }


window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {

    if (id == "alerts") alertInit(cell);
});
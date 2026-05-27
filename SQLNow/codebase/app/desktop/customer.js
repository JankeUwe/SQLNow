var main_customer_layout;
var cell_customer;
var grid_customer;

function CustomerInit(cell) {
    mainToolbar.clearAll();
    var actvId = mainSidebar.getActiveItem();
    mainToolbar.loadStruct("codebase/toolbar/customer.xml", function () {
        mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(actvId).getText().text }));
    });

    if (main_customer_layout == null) {
        main_customer_layout = cell.attachLayout("1C")

        cell_customer = main_customer_layout.cells('a');
        cell_customer.setText('Kunden und Domains');
        cell_customer.setCollapsedText('Kunden und Domains');
        grid_customer = cell_customer.attachGrid();
        grid_customer.setIconsPath('./codebase/imgs/');

        InitGridCustomer();
    }

    loadCustomers();
}

function InitGridCustomer() {
    grid_customer.setHeader(["<i class='fa-solid fa-desktop'></i>", "<i class='fa-solid fa-building'></i> Name", "<i class='fa-solid fa-id-badge'></i> KurzName", "<i class='fa-solid fa-globe'></i> DomainDnsName", "JumpServer1", "JumpServer2", "<i class='fa-solid fa-comment'></i> Notes"]);
    grid_customer.setImagePath(image_path);
    grid_customer.setColSorting("na,str,str,str,str,str,str");
    grid_customer.setColTypes("ro,ro,ro,ro,ro,ro,ro");
    grid_customer.setInitWidths("40,220,120,200,160,160,*");
    grid_customer.attachHeader(",#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,");
    grid_customer.init();
    grid_customer.enableAlterCss("even", "uneven");
    grid_customer.enableExcelKeyMap();

    grid_customer.attachEvent("onXLE", function () {
        grid_customer.forEachRow(function (id) {
            grid_customer.cells(id, 0).setValue("<i class='fa-solid fa-building'></i>");
        });
    });
}

function groupCustomer() {
    grid_customer.groupBy(1);
    mainToolbar.enableItem("collapse");
    mainToolbar.enableItem("expand");
    mainToolbar.enableItem("ungroup");
    mainToolbar.disableItem("group");
}

function ungroupCustomer() {
    grid_customer.unGroup();
    mainToolbar.disableItem("collapse");
    mainToolbar.disableItem("expand");
    mainToolbar.disableItem("ungroup");
    mainToolbar.enableItem("group");
}

function CollapseCustomer() {
    grid_customer.collapseAllGroups();
}

function ExpandCustomer() {
    grid_customer.expandAllGroups();
}

function loadCustomers() {
    grid_customer.clearAll();
    cell_customer.progressOn();

    grid_customer.load("handlers/Customer.ashx", function () {
        grid_customer.selectRow(0, true, false, true);
        mainToolbar.disableItem("collapse");
        mainToolbar.disableItem("expand");
        mainToolbar.disableItem("ungroup");
        mainToolbar.enableItem("group");
        cell_customer.progressOff();
    });
}

window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {
    if (id == "customer") CustomerInit(cell);
});

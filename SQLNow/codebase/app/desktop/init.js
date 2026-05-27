var mainSidebar;
var mainToolbar;
var mainStatusBar;
var image_path;


var iconsPath = {
    dhx_skyblue: "skyblue",
    dhx_web: "web",
    dhx_terrace: "terrace",
    material: "material"
};

skin ='material'
dhtmlx.compat("dnd");
dhtmlXCalendarObject.prototype.langData["de"] = {
    dateformat: "%d.%m.%Y",
    monthesFNames: [
        "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
        "August", "September", "Oktober", "November", "Dezember"
    ],
    monthesSNames: [
        "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
    ],
    daysFNames: [
        "Sonntag", "Montag", "Dienstag", "Mittwoch",
        "Donnerstag", "Freitag", "Samstag"
    ],
    daysSNames: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    weekstart: 1,
    weekname: "w"
};

function appInit(skin) {
    if (!skin) skin = "dhx_web";
   
    image_path = "skins/" + iconsPath[skin] + "/imgs/";
    
    // init sidebar
    mainSidebar = new dhtmlXSideBar({
        parent: document.body,
        icons_path: "codebase/app/imgs/sidebar/",
        width: 180,
        template: "tiles",
        header: true,
        items: [
            { id: "maschine", text: "Server", icon: "cpu.png" },
            { id: "sqlserver", text: "SQL Server", icon: "CPU-02.png" },
            { id: "datenbanken", text: "Datenbanken", icon: "Data-Network.png" },
                        { id: "verteilung", text: "Verteilung", icon: "Chart - 04.png" },
            { type: "separator" },
            { id: "customer", text: "Kunden", icon: "Customer.png" },
            { type: "separator" },
            { id: "stammdaten", text: "Stammdaten", icon: "Database.png" }
            
            
            
            
            
        ]
    });

    // init toolbar
    mainToolbar = mainSidebar.attachToolbar({
        icons_size: 24,
        iconset: "awesome",
        items: [
			{ type: "text", id: "info", text: "&nbsp;" }
        ]
    });

    mainStatusBar = mainSidebar.attachStatusBar({ text: "" });

    mainSidebar.attachEvent("onSelect", function (id) {
        mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(id).getText().text }));
        window.dhx4.callEvent("onSidebarSelect", [id, this.cells(id)]);


        //alert(id);
    });

    mainSidebar.cells("maschine").setActive(true);

   


}

function appUnload() {
    if (mainSidebar !== null && mainSidebar.unload != null) {
        mainSidebar.unload();
        mainSidebar = null;
    }
}

window.dhx4.attachEvent("init", appInit);
window.dhx4.attachEvent("unload", appUnload);
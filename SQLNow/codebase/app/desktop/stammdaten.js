// ============================================================
//  Stammdaten - CRUD fuer 8 Referenztabellen
// ============================================================

var sd_layout    = null;
var sd_tabbar    = null;
var sd_activeTab = "tab_customer";
var sd_grids     = {};

var sd_tabs = [
    {
        id:        "tab_customer",
        label:     "Kunden",
        handler:   "handlers/MasterCustomer.ashx",
        header:    ["Name", "Kurzname", "Adresse", "PLZ", "Stadt", "Notizen"],
        colTypes:  "ro,ro,ro,ro,ro,ro",
        colWidths: "200,120,200,80,160,*",
        fields: [
            { name: "Name",     label: "Name",     type: "text",     required: true  },
            { name: "NameLong", label: "Kurzname", type: "text",     required: false },
            { name: "Address",  label: "Adresse",  type: "text",     required: false },
            { name: "Zip",      label: "PLZ",      type: "text",     required: false },
            { name: "City",     label: "Stadt",    type: "text",     required: false },
            { name: "Notes",    label: "Notizen",  type: "textarea", required: false }
        ]
    },
    {
        id:        "tab_customerdomain",
        label:     "Domains",
        handler:   "handlers/MasterCustomerDomain.ashx",
        header:    ["Kunde", "Domain", "JumpServer 1", "JumpServer 2", "JumpServer 3", "JumpServer 4", "Notizen"],
        colTypes:  "ro,ro,ro,ro,ro,ro,ro",
        colWidths: "180,200,140,140,140,140,*",
        fields: [
            { name: "CustomerId",    label: "Kunden-ID",    type: "text",     required: true  },
            { name: "DomainDnsName", label: "Domain",       type: "text",     required: true  },
            { name: "JumpServer1",   label: "JumpServer 1", type: "text",     required: false },
            { name: "JumpServer2",   label: "JumpServer 2", type: "text",     required: false },
            { name: "JumpServer3",   label: "JumpServer 3", type: "text",     required: false },
            { name: "JumpServer4",   label: "JumpServer 4", type: "text",     required: false },
            { name: "Notes",         label: "Notizen",      type: "textarea", required: false }
        ]
    },
    {
        id:        "tab_excludedb",
        label:     "Exclude DB",
        handler:   "handlers/MasterExcludeDB.ashx",
        header:    ["Datenbankname"],
        colTypes:  "ro",
        colWidths: "*",
        fields: [
            { name: "Name", label: "Datenbankname", type: "text", required: true }
        ]
    },
    {
        id:        "tab_comptype",
        label:     "Comp-Typ",
        handler:   "handlers/MasterCompType.ashx",
        header:    ["ID", "SystemName"],
        colTypes:  "ro,ro",
        colWidths: "80,*",
        fields: [
            { name: "ManagedEntityTypeRowId",      label: "ID",         type: "text", required: true },
            { name: "ManagedEntityTypeSystemName", label: "SystemName", type: "text", required: true }
        ]
    },
    {
        id:        "tab_dbtype",
        label:     "DB-Typ",
        handler:   "handlers/MasterDatabaseType.ashx",
        header:    ["RowId", "Guid", "MP-RowId", "SystemName", "DefaultName", "Beschreibung", "Aktiv"],
        colTypes:  "ro,ro,ro,ro,ro,ro,ro",
        colWidths: "70,260,80,220,180,*,50",
        fields: [
            { name: "ManagedEntityTypeRowId",              label: "RowId (aus SCOM)",    type: "text",     required: true,  isPk: true  },
            { name: "ManagedEntityTypeGuid",               label: "GUID (aus SCOM)",     type: "text",     required: true,  isPk: false },
            { name: "ManagementPackRowId",                 label: "ManagementPack-RowId",type: "text",     required: true,  isPk: false },
            { name: "ManagedEntityTypeSystemName",         label: "SystemName",          type: "text",     required: true,  isPk: false },
            { name: "ManagedEntityTypeDefaultName",        label: "DefaultName",         type: "text",     required: false, isPk: false },
            { name: "ManagedEntityTypeDefaultDescription", label: "Beschreibung",        type: "textarea", required: false, isPk: false },
            { name: "Aktive",                              label: "Aktiv (0/1)",         type: "text",     required: false, isPk: false }
        ]
    },
    {
        id:        "tab_sqlentity",
        label:     "SQL-Entity",
        handler:   "handlers/MasterSQLEntityType.ashx",
        header:    ["RowId", "SystemName", "Beschreibung", "SQL-ID", "Aktiv"],
        colTypes:  "ro,ro,ro,ro,ro",
        colWidths: "70,220,*,100,50",
        fields: [
            { name: "ManagedEntityTypeRowId",      label: "RowId (aus SCOM)", type: "text",     required: true,  isPk: true  },
            { name: "ManagedEntityTypeSystemName", label: "SystemName",       type: "text",     required: true,  isPk: false },
            { name: "Description",                 label: "Beschreibung",     type: "textarea", required: false, isPk: false },
            { name: "ManagedEntityTypeSQLId",      label: "SQL-ID",           type: "text",     required: false, isPk: false },
            { name: "Aktiv",                       label: "Aktiv (0/1)",      type: "text",     required: false, isPk: false }
        ]
    },
    {
        id:        "tab_sqlversion",
        label:     "SQL-Version",
        handler:   "handlers/MasterSQLVersion.ashx",
        header:    ["Produktversion", "SQL-Version"],
        colTypes:  "ro,ro",
        colWidths: "200,*",
        fields: [
            { name: "productversion", label: "Produktversion", type: "text", required: true },
            { name: "sqlversion",     label: "SQL-Version",    type: "text", required: true }
        ]
    },
    {
        id:        "tab_support",
        label:     "Support",
        handler:   "handlers/MasterSupport.ashx",
        header:    ["Version-Nr", "Release", "End Mainstream", "End Extended"],
        colTypes:  "ro,ro,ro,ro",
        colWidths: "120,120,140,140",
        fields: [
            { name: "VersionNr",       label: "Version-Nr",     type: "text", required: true  },
            { name: "ReleaseDate",     label: "Release-Datum",  type: "text", required: false },
            { name: "EndOfMainstream", label: "End Mainstream", type: "text", required: false },
            { name: "EndofExtended",   label: "End Extended",   type: "text", required: false }
        ]
    }
];


// ---- Init -------------------------------------------------------

function StammdatenInit(cell) {
    mainToolbar.clearAll();
    var actvId = mainSidebar.getActiveItem();
    mainToolbar.loadStruct("codebase/toolbar/stammdaten.xml", function () {
        mainToolbar.setItemText("info", window.dhx4.template(
            "<span style='font-weight:bold;font-size:14px;'>#text#</span>",
            { text: mainSidebar.cells(actvId).getText().text }
        ));
        mainToolbar.attachEvent("onClick", function (id) {
            if (id === "New")     stammdatenNew();
            if (id === "Edit")    stammdatenEdit();
            if (id === "Delete")  stammdatenDelete();
            if (id === "Refresh") stammdatenRefresh();
        });
    });

    if (sd_layout === null) {
        sd_layout = cell.attachLayout("1C");
        var cellA = sd_layout.cells("a");
        cellA.hideHeader();

        sd_tabbar = cellA.attachTabbar();

        // Tab hinzufuegen und Grid sofort anhaengen -- genau wie in maschine.js
        var tab_customer = sd_tabbar.addTab("tab_customer", "Kunden");
        var cell_customer = sd_tabbar.cells("tab_customer");
        cell_customer.setActive();
        var g0 = cell_customer.attachGrid();
        g0.setImagePath(image_path);
        g0.setHeader(sd_tabs[0].header);
        g0.setColTypes(sd_tabs[0].colTypes);
        g0.setInitWidths(sd_tabs[0].colWidths);
        g0.enableSmartRendering(true);
        g0.init();
        g0.enableAlterCss("even", "uneven");
        sd_grids["tab_customer"] = g0;

        var tab_customerdomain = sd_tabbar.addTab("tab_customerdomain", "Domains");
        var cell_customerdomain = sd_tabbar.cells("tab_customerdomain");
        var g1 = cell_customerdomain.attachGrid();
        g1.setImagePath(image_path);
        g1.setHeader(sd_tabs[1].header);
        g1.setColTypes(sd_tabs[1].colTypes);
        g1.setInitWidths(sd_tabs[1].colWidths);
        g1.enableSmartRendering(true);
        g1.init();
        g1.enableAlterCss("even", "uneven");
        sd_grids["tab_customerdomain"] = g1;

        var tab_excludedb = sd_tabbar.addTab("tab_excludedb", "Exclude DB");
        var cell_excludedb = sd_tabbar.cells("tab_excludedb");
        var g2 = cell_excludedb.attachGrid();
        g2.setImagePath(image_path);
        g2.setHeader(sd_tabs[2].header);
        g2.setColTypes(sd_tabs[2].colTypes);
        g2.setInitWidths(sd_tabs[2].colWidths);
        g2.enableSmartRendering(true);
        g2.init();
        g2.enableAlterCss("even", "uneven");
        sd_grids["tab_excludedb"] = g2;

        var tab_comptype = sd_tabbar.addTab("tab_comptype", "Comp-Typ");
        var cell_comptype = sd_tabbar.cells("tab_comptype");
        var g3 = cell_comptype.attachGrid();
        g3.setImagePath(image_path);
        g3.setHeader(sd_tabs[3].header);
        g3.setColTypes(sd_tabs[3].colTypes);
        g3.setInitWidths(sd_tabs[3].colWidths);
        g3.enableSmartRendering(true);
        g3.init();
        g3.enableAlterCss("even", "uneven");
        sd_grids["tab_comptype"] = g3;

        var tab_dbtype = sd_tabbar.addTab("tab_dbtype", "DB-Typ");
        var cell_dbtype = sd_tabbar.cells("tab_dbtype");
        var g4 = cell_dbtype.attachGrid();
        g4.setImagePath(image_path);
        g4.setHeader(sd_tabs[4].header);
        g4.setColTypes(sd_tabs[4].colTypes);
        g4.setInitWidths(sd_tabs[4].colWidths);
        g4.enableSmartRendering(true);
        g4.init();
        g4.enableAlterCss("even", "uneven");
        sd_grids["tab_dbtype"] = g4;

        var tab_sqlentity = sd_tabbar.addTab("tab_sqlentity", "SQL-Entity");
        var cell_sqlentity = sd_tabbar.cells("tab_sqlentity");
        var g5 = cell_sqlentity.attachGrid();
        g5.setImagePath(image_path);
        g5.setHeader(sd_tabs[5].header);
        g5.setColTypes(sd_tabs[5].colTypes);
        g5.setInitWidths(sd_tabs[5].colWidths);
        g5.enableSmartRendering(true);
        g5.init();
        g5.enableAlterCss("even", "uneven");
        sd_grids["tab_sqlentity"] = g5;

        var tab_sqlversion = sd_tabbar.addTab("tab_sqlversion", "SQL-Version");
        var cell_sqlversion = sd_tabbar.cells("tab_sqlversion");
        var g6 = cell_sqlversion.attachGrid();
        g6.setImagePath(image_path);
        g6.setHeader(sd_tabs[6].header);
        g6.setColTypes(sd_tabs[6].colTypes);
        g6.setInitWidths(sd_tabs[6].colWidths);
        g6.enableSmartRendering(true);
        g6.init();
        g6.enableAlterCss("even", "uneven");
        sd_grids["tab_sqlversion"] = g6;

        var tab_support = sd_tabbar.addTab("tab_support", "Support");
        var cell_support = sd_tabbar.cells("tab_support");
        var g7 = cell_support.attachGrid();
        g7.setImagePath(image_path);
        g7.setHeader(sd_tabs[7].header);
        g7.setColTypes(sd_tabs[7].colTypes);
        g7.setInitWidths(sd_tabs[7].colWidths);
        g7.enableSmartRendering(true);
        g7.init();
        g7.enableAlterCss("even", "uneven");
        sd_grids["tab_support"] = g7;

        sd_tabbar.attachEvent("onTabClick", function (id) {
            sd_activeTab = id;
            stammdatenLoad(id);
        });
    }

    stammdatenLoad(sd_activeTab);
}


function stammdatenLoad(tabId) {
    var cfg = _sdGetCfg(tabId);
    var g   = sd_grids[tabId];
    if (!cfg || !g) return;
    g.clearAll();
    g.load(cfg.handler, function () {
        if (g.getRowsNum() > 0) g.selectRow(0, true, false, true);
    });
}

function stammdatenRefresh() {
    stammdatenLoad(sd_activeTab);
}


// ---- CRUD -------------------------------------------------------

function stammdatenNew() {
    var cfg = _sdGetCfg(sd_activeTab);
    if (!cfg) return;
    _sdOpenForm(cfg, null);
}

function stammdatenEdit() {
    var cfg = _sdGetCfg(sd_activeTab);
    if (!cfg) return;
    var g     = sd_grids[sd_activeTab];
    var rowId = g.getSelectedRowId();
    if (!rowId) {
        dhtmlx.alert({ text: "Bitte zuerst einen Datensatz auswaehlen.", title: "Hinweis" });
        return;
    }
    var vals = { "__rowid": rowId };
    for (var ci = 0; ci < cfg.fields.length; ci++) {
        vals[cfg.fields[ci].name] = g.cells(rowId, ci).getValue();
    }
    _sdOpenForm(cfg, vals);
}

function stammdatenDelete() {
    var cfg = _sdGetCfg(sd_activeTab);
    if (!cfg) return;
    var g     = sd_grids[sd_activeTab];
    var rowId = g.getSelectedRowId();
    if (!rowId) {
        dhtmlx.alert({ text: "Bitte zuerst einen Datensatz auswaehlen.", title: "Hinweis" });
        return;
    }
    var firstVal = g.cells(rowId, 0).getValue();
    dhtmlx.confirm({
        title:  "Datensatz loeschen",
        text:   "Eintrag [" + firstVal + "] wirklich loeschen?",
        ok:     "Ja",
        cancel: "Nein",
        callback: function (result) {
            if (!result) return;
            _sdAjax(cfg.handler, { action: "delete", rowid: rowId }, function (ok, msg) {
                if (ok) {
                    stammdatenLoad(sd_activeTab);
                } else {
                    dhtmlx.alert({ text: "Fehler: " + msg, title: "Fehler" });
                }
            });
        }
    });
}


// ---- Formular ---------------------------------------------------

function _sdOpenForm(cfg, vals) {
    var isNew = (vals === null);
    var title = isNew ? "Neuer Eintrag" : "Bearbeiten";

    if (!window._sdWin) window._sdWin = new dhtmlXWindows();
    var winId = "sd_form_win";
    if (window._sdWin.window(winId)) window._sdWin.window(winId).close();

    var formH = 100 + cfg.fields.length * 46;
    var w = window._sdWin.createWindow(winId, 100, 50, 500, formH);
    w.setText(title);
    w.setModal(true);
    w.center();

    var tabId  = cfg.id;
    var action = isNew ? "insert" : "update";
    var rowid  = (vals && vals["__rowid"]) ? vals["__rowid"] : "";

    var html = "<div style='padding:16px;font-family:Arial,sans-serif;font-size:13px;overflow-y:auto;'>";
    html += "<table style='width:100%;border-collapse:collapse;'>";

    for (var i = 0; i < cfg.fields.length; i++) {
        var f = cfg.fields[i];
        var v = (vals && vals[f.name] !== undefined) ? _sdHtmlEscape(String(vals[f.name])) : "";
        html += "<tr><td style='width:130px;padding:6px 8px 6px 0;font-weight:bold;white-space:nowrap;'>";
        html += f.label + (f.required ? " *" : "");
        html += "</td><td style='padding:4px 0;'>";
        var roAttr  = (!isNew && f.isPk) ? " readonly style='width:96%;padding:4px;border:1px solid #ccc;border-radius:3px;background:#f0f0f0;'" : " style='width:96%;padding:4px;border:1px solid #ccc;border-radius:3px;'";
        if (f.type === "textarea") {
            html += "<textarea id='sd_f_" + f.name + "' rows='3'" + roAttr + ">" + v + "</textarea>";
        } else {
            html += "<input type='text' id='sd_f_" + f.name + "' value='" + v + "'" + roAttr + "/>";
        }
        html += "</td></tr>";
    }

    html += "</table>";
    html += "<div style='margin-top:12px;text-align:right;'>";
    html += "<button onclick=\"_sdSave('" + tabId + "','" + action + "','" + rowid + "')\" ";
    html += "style='padding:6px 18px;background:#2e86c1;color:#fff;border:none;border-radius:3px;cursor:pointer;margin-right:8px;'>Speichern</button> ";
    html += "<button onclick=\"window._sdWin.window('sd_form_win').close()\" ";
    html += "style='padding:6px 18px;background:#888;color:#fff;border:none;border-radius:3px;cursor:pointer;'>Abbrechen</button>";
    html += "</div></div>";

    w.attachHTMLString(html);
}

function _sdSave(tabId, action, rowid) {
    var cfg = _sdGetCfg(tabId);
    if (!cfg) return;

    var data = { action: action, rowid: rowid };
    for (var i = 0; i < cfg.fields.length; i++) {
        var f  = cfg.fields[i];
        var el = document.getElementById("sd_f_" + f.name);
        if (!el) continue;
        if (f.required && el.value.trim() === "") {
            dhtmlx.alert({ text: "Pflichtfeld '" + f.label + "' fehlt.", title: "Hinweis" });
            return;
        }
        data[f.name] = el.value;
    }

    _sdAjax(cfg.handler, data, function (ok, msg) {
        if (ok) {
            if (window._sdWin && window._sdWin.window("sd_form_win"))
                window._sdWin.window("sd_form_win").close();
            stammdatenLoad(tabId);
        } else {
            dhtmlx.alert({ text: "Fehler: " + msg, title: "Fehler" });
        }
    });
}


// ---- Hilfsroutinen ----------------------------------------------

function _sdGetCfg(tabId) {
    for (var i = 0; i < sd_tabs.length; i++) {
        if (sd_tabs[i].id === tabId) return sd_tabs[i];
    }
    return null;
}

function _sdHtmlEscape(s) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function _sdAjax(url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        var ok = (xhr.status === 200 && xhr.responseText.indexOf("ERROR") === -1);
        callback(ok, xhr.responseText);
    };
    var parts = [];
    for (var k in data) {
        if (data.hasOwnProperty(k))
            parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
    }
    xhr.send(parts.join("&"));
}


// ---- Sidebar-Event ----------------------------------------------

window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {
    if (id === "stammdaten") StammdatenInit(cell);
});

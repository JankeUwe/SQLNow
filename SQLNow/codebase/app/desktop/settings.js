var frmSettings;

function SettingsInit(cell) {
    mainToolbar.clearAll();
    var actvId = mainSidebar.getActiveItem();
    mainToolbar.loadStruct("codebase/toolbar/settings.xml", function () {
        mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(actvId).getText().text }));
    });


    if (frmSettings == null) {

        frmSettings = cell.attachForm(settingsFormStruct.settings);
        frmSettings.setSizes = frmSettings.centerForm;
        frmSettings.setSizes();


        frmSettings.enableLiveValidation(true);

        var dp = new dataProcessor("handlers/settings.ashx");
        dp.setUpdateMode("off");
        dp.init(frmSettings);

        frmSettings.attachEvent("onChange",
            function(name, value) {
                mainToolbar.enableItem("save");
            });




    }

    frmSettings.load('handlers/settings.ashx?id=1', function() {
        mainToolbar.disableItem("save");
    });

}


function doOnSaveSettings() {
    frmSettings.save();
   

}





window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {
  
    if (id == "settings") SettingsInit(cell);
});
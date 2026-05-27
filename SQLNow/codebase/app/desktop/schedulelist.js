
var theScheduler = null;

function ScheduleInit(cell) {

    mainToolbar.clearAll();
    var actvId = mainSidebar.getActiveItem();
    mainToolbar.loadStruct("codebase/toolbar/schedule.xml", function () {
        mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(actvId).getText().text }));
    });

    if (theScheduler == null) {


        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.config.first_hour = 8;
        scheduler.config.multi_day = true;
        scheduler.config.date_step = "7";
        scheduler.locale.labels.section_type = "Details";
        scheduler.config.readonly_form = true;
        scheduler.config.show_quick_info = true;

        scheduler.config.lightbox.sections = [
				{ name: "description", height: 130, map_to: "text", type: "textarea", focus: true },
				{ name: "type", height: 40, type: "textarea", map_to: "details", default_value: "Planned visit" },
				{ name: "time", height: 72, type: "time", map_to: "auto" }
        ];




        theScheduler = cell.attachScheduler(new Date(), "month");
        theScheduler.setLoadMode("year");



        theScheduler.attachEvent("onDblClick", function (id) {

            scheduler.config.readonly_form = true;

            return true;//do not cancel ligthbox
        });

    }

    refreshSchedule();


}


window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {
    if (id == "schedule") ScheduleInit(cell);
});

function refreshSchedule() {
    theScheduler.clearAll();
    theScheduler.load("handlers/schedulelist.ashx" + "?uid=" + scheduler.uid());

}
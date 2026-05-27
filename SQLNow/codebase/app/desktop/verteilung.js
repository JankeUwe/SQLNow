var main_chart_layout;
var chart_1;
var chart_2;
var chart_3;
function VerteilungInit(cell) {
    mainToolbar.clearAll();
    var actvId = mainSidebar.getActiveItem();
    mainToolbar.loadStruct("codebase/toolbar/settings.xml", function () {
        mainToolbar.setItemText("info", window.dhx4.template("<span style='font-weight: bold; font-size: 14px;'>#text#</span>", { text: mainSidebar.cells(actvId).getText().text }));
    });


    if (main_chart_layout == null) {
        main_chart_layout = cell.attachLayout("1C")
        var cell_chart = main_chart_layout.cells('a');
        cell_chart.hideHeader();

        var tabbar_1 = cell_chart.attachTabbar();
        tabbar_1.enableAutoReSize(true,true);


        tabbar_1.setOffsets({
            top: 10,
            right: 20,
            bottom: 30,
            left: 20
        });

        tabbar_1.addTab('tab_1', 'Versionen');
        var tab_1 = tabbar_1.cells('tab_1');
        tab_1.setActive();


        tabbar_1.addTab('tab_2', 'Editionen');
        var tab_2 = tabbar_1.cells('tab_2');


        tabbar_1.addTab('tab_3', 'Mandanten');
        var tab_3 = tabbar_1.cells('tab_3');


        //tabbar_1.addTab('tab_4', 'tab_4');
        //var tab_4 = tabbar_1.cells('tab_4');
     
        tabbar_1.setSizes();

        chart_1 = tab_1.attachChart({
            view: 'pie',
             label: "#Anzahl#",
             labelLines: true,
             pieInnerText: "#VersionNr#",

            tooltip: {
                template: '#Anzahl#'
             },

            legend: { "template": "#VersionNr#", width: 75, "marker": { "type": "square", "width": 25, "height": 10 } },
            gradient: false,
            value: '#Anzahl#'
         });

        
        chart_2 = tab_2.attachChart({
            view: 'pie',
            label: "#Anzahl#",
            labelLines: true,

         


            tooltip: {
                template: '#Edition#'
            },


            legend: { "template": "#Edition#", width: 300,"marker": { "type": "square", "width": 25, "height": 10 } },
            gradient: false,
            value: '#Anzahl#'
        });


        chart_3 = tab_3.attachChart({
            view: 'pie',
            label: "#Mandant#",
            labelLines: true,
            pieInnerText: "#Anzahl#",
            tooltip: {
                template: '#Mandant#'
            },


            legend: { "template": "#Mandant#", width: 300, "marker": { "type": "square", "width": 25, "height": 10 } },
            gradient: false,
            value: '#Anzahl#'
        });

        

        chart_1.load("handlers/VersionsChart.ashx");
        chart_2.load("handlers/EditionChart.ashx");
        chart_3.load("handlers/MandantChart.ashx");


    }

  

}







window.dhx4.attachEvent("onSidebarSelect", function (id, cell) {
  
    if (id == "verteilung") VerteilungInit(cell);
});
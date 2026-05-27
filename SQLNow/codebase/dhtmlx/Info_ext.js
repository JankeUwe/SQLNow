var myPopup;
function extendInfo(frm) {
    frm.attachEvent("onInfo", function (name, e) {
        if (myPopup == null) myPopup = new dhtmlXPopup({ mode: "bottom" });
        myPopup.attachHTML("<div style='width:200px;'>" + this.getUserData(name, "info") + "</div>");
        var t = e.target || e.srcElement;
        var x = window.dhx4.absLeft(t);
        var y = window.dhx4.absTop(t);
        var w = t.offsetWidth;
        var h = t.offsetHeight;
        myPopup.show(x, y, w, h);
    });

}
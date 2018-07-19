"use strict";

var getArgs = function getArgs() {
    var args = {};
    var match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while ((match = reg.exec(search)) !== null) {
        args[match[1]] = match[2];
    }
    return args;
};

var init_modal = function init_modal(key, a) {
    var item = json[key][a];
    var quote = item["quote"] ? "<h3>\u201C" + item["quote"] + "\u201D</h3><br />" : "";
    $("#m_title").text(item["title"]);
    $("#m_body").html(quote + "<p>" + item["content"].replace(/\n/g, "</p><p>"));
    $("#m_unformatted_body")[0].value = item["content"].replace(/<(S*?)[^>]*>.*?|<.*? \/>/g, "");
};

var is_electron_app = navigator.userAgent.indexOf("Electron") > -1;
var is_Firefox = navigator.userAgent.indexOf("Firefox") > -1;
var is_Chrome = navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Safari") > -1 && !(navigator.userAgent.indexOf("Edge") > -1);

var json = rubao_json;

var keys = _.keys(json);
var card_deck = $("#card-deck");
keys.shift();

for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    var items = _.keys(json[key]);

    var item_html = "";

    for (var a = 0; a < items.length; a++) {
        var item = json[key][a];

        var audio = "";
        if (item["audio"]) {
            audio = "<br /><a href=\"" + json["url"] + item["audio"] + ".mp3\" target=\"_blank\" class=\"download_music\" download><i class=\"fa fa-download\" aria-hidden=\"true\"></i></a>\n        <audio class=\"audio" + (is_Firefox ? "_Firefox" : "") + "\" src=\"" + json["url"] + item["audio"] + ".mp3\" controls></audio>";
        }

        item_html += "<li class=\"list-group-item grey chang " + (is_Chrome || is_electron_app ? "chang_chrome" : " ") + "\">\n        <a data-toggle=\"modal\" href=\"#modal\" data-target=\"#modal\" onclick=\"init_modal('" + key + "','" + a + "');\" class=\"show_modal_a\">" + item["title"] + "</a>\n        " + audio + "\n        </li>";
    }

    var html = "\n    <div class=\"card\">\n        <h5 class=\"card-header\">" + key + "</h5>\n        <ul class=\"list-group list-group-flush\">\n            " + item_html + "\n        </ul>\n    </div>\n    <p> &nbsp;</p>";
    card_deck.append(html);

    if (!is_Firefox) {
        $(".download_music").hide();
    }
}

$('#modal').on('hidden.bs.modal', function (e) {
    $("#m_body").html(" ");
});
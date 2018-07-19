'use strict';

var is_electron_app = navigator.userAgent.indexOf("Electron") > -1;
var clipboard, dialog, path, copy;

if (is_electron_app) {
    var _require = require('electron'),
        clipboard = _require.clipboard;

    var dialog = require('electron').remote.dialog;

    var path = require("path");

    var copy = function copy() {
        var text = $("#m_unformatted_body")[0].value;
        console.log(text);
        clipboard.writeText(text);

        var messages = ['\u9632\u6C11\u4E4B\u53E3\uFF0C\u751A\u4E8E\u9632\u5DDD\u3002', "别看你今天闹得欢，小心啊，今后拉清单", "敢同恶鬼争高下，不向霸王让寸分。", "年青人呐，都是靡靡之音呐，都是轻歌曼舞啊。我跟你说长大了都没出息。这个呀，就是得豪迈！"];

        dialog.showMessageBox({
            type: "info",
            buttons: ["确定"],
            defaultId: 0,
            title: '\u590D\u5236\u6210\u529F!',
            message: messages[Math.round(Math.random() * (messages.length - 1))],
            icon: path.join(__dirname, "icon.png")
        });
    };
} else {
    $("#copy").remove();
}
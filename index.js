const getArgs = () => {
    var args = {};
    var match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while ((match = reg.exec(search)) !== null) {
        args[match[1]] = match[2];
    }
    return args;
}

const init_modal = (key, a) => {
    var item = json[key][a]
    var quote = item["quote"] ? `<h3>“${item["quote"]}”</h3><br />` : ""
    var video = item["video"] ? `<video src="${json["url"]}videos/${item["video"]}" class="modal_media" preload="Metadata" controls=""></video>` : ""
    $("#m_title").text(item["title"])
    $("#m_body").html(quote + "<p>" + item["content"].replace(/\n/g, "</p><p>") +"</p>"+ video)
    $("#m_unformatted_body")[0].value = item["content"].replace(/<(S*?)[^>]*>.*?|<.*? \/>/g, "")
}


var is_electron_app = navigator.userAgent.indexOf("Electron") > -1
const is_Firefox = navigator.userAgent.indexOf("Firefox") > -1;
const is_Chrome = (navigator.userAgent.indexOf("Chrome") > -1) && navigator.userAgent.indexOf("Safari") > -1 && !(navigator.userAgent.indexOf("Edge") > -1);


const json = rubao_json

var keys = _.keys(json)
var card_deck = $("#card-deck")
keys.shift()

for (var i = 0; i < keys.length; i++) {
    var key = keys[i]

    var items = _.keys(json[key])

    var item_html = ""


    for (var a = 0; a < items.length; a++) {
        var item = json[key][a]

        var audio = ""
        if (item["audio"]) {
            audio = `<br /><a href="${json["url"]}sounds/${item["audio"]}.mp3" target="_blank" class="download_music" download><i class="fa fa-download" aria-hidden="true"></i></a>
        <audio class="audio${is_Firefox ? "_Firefox" : ""}" src="${json["url"]}sounds/${item["audio"]}.mp3" controls></audio>`
        }

        item_html += `<li class="list-group-item grey chang ${is_Chrome || is_electron_app ? "chang_chrome" : " "}">
        <a data-toggle="modal" href="#modal" data-target="#modal" onclick="init_modal('${key}','${a}');" class="show_modal_a">${item["title"]}</a>
        ${audio}
        </li>`
    }

    var html = `
    <div class="card">
        <h5 class="card-header">${key}</h5>
        <ul class="list-group list-group-flush">
            ${item_html}
        </ul>
    </div>
    <p> &nbsp;</p>`;
    card_deck.append(html);

    if (!is_Firefox) {
        $(".download_music").hide()
    }

}






$('#modal').on('hidden.bs.modal', function (e) {
    $("#m_body").html(" ")
})

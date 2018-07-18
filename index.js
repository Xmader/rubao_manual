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
    $("#m_title").text(item["title"])
    $("#m_body").html(quote + "<p>" + item["content"].replace(/\n/g, "</p><p>"))
    $("#m_unformatted_body")[0].value = item["content"].replace(/<(S*?)[^>]*>.*?|<.*? \/>/g, "")
}


var is_electron_app = navigator.userAgent.indexOf("Electron") > -1
const is_Firefox = navigator.userAgent.indexOf("Firefox") > -1;
const is_Chrome = (navigator.userAgent.indexOf("Chrome") > -1) && window.chrome;


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
            audio = `<a href="${json["url"]}${item["audio"]}.mp3" target="_blank" class="download_music" download><i class="fa fa-download" aria-hidden="true"></i></a>
        <audio class="audio${is_Firefox ? "_Firefox" : ""}" src="${json["url"]}${item["audio"]}.mp3" controls></audio>`
        }

        item_html += `<li class="list-group-item grey chang ${is_Chrome || is_electron_app ? "chang_chrome" : " "}">
        <a data-toggle="modal" href="#modal" data-target="#modal" onclick="init_modal('${key}','${a}');">${item["title"]}</a>
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

}






$('#modal').on('hidden.bs.modal', function (e) {
    $("#m_body").html(" ")
})

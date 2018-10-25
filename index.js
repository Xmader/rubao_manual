
// 网页内全屏视频

const full_screen_video = () => {
    $("#modal").after($(".modal_media"))
    $(".modal_media")
        .addClass("full_screen_video")
        .after(`<button type="button" class="btn btn-primary" onclick="exit_full_screen_video()" id="exit_full_screen_video">退出网页内全屏</button>`)
}

const exit_full_screen_video = () => {
    $("#exit_full_screen_video").remove()
    $(".modal_media").removeClass("full_screen_video")
    $("#m_body").append($(".modal_media"))
}


const init_modal = (key, a) => {
    if (typeof _cordova == "undefined") { $("#full_screen_video").show() } else { $("#full_screen_video").hide() }
    var item = json[key][a]
    var quote = item["quote"] ? `<h3>“${item["quote"]}”</h3><br />` : ""
    var video = item["video"] ? `<video src="${json["url"]}videos/${item["video"]}.mp4" class="modal_media" preload="Metadata" controls=""></video>` : ($("#full_screen_video").hide() ? "" : "")
    $("#m_title").text(item["title"])
    $("#m_body").html(quote + "<p>" + item["content"].replace(/\n/g, "</p><p>") + "</p>" + video)
    $("#m_unformatted_body")[0].value = item["content"].replace(/<(S*?)[^>]*>.*?|<.*? \/>/g, "")
}

const is_Firefox = navigator.userAgent.indexOf("Firefox") > -1;

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
            audio = `<a href="${json["url"]}sounds/${item["audio"]}.mp3" target="_blank" class="download_music" download><i class="fa fa-download" aria-hidden="true"></i></a>
        <audio class="audio${is_Firefox ? "_Firefox" : ""}" src="${json["url"]}sounds/${item["audio"]}.mp3" controls></audio>`
        }

        item_html += `<li class="list-group-item grey chang">
        <a data-toggle="modal" href="#modal" data-target="#modal" onclick="init_modal('${key}','${a}');" class="show_modal_a"><span class="audio_title">${item["title"]}</span></a>
        ${audio}
        </li>`
    }

    var html = `
    <div class="card">
        <h5 class="card-header">${key}</h5>
        <ul class="list-group list-group-flush">
            ${item_html}
        </ul>
    </div>`;
    card_deck.append(html);

    $(".list-group-item.chang").css("padding-bottom", $("audio").height() + 23 + "px")
    if (!is_Firefox) {
        $(".download_music").hide()
    }

}






$('#modal').on('hidden.bs.modal', function (e) {
    $("#m_body").html(" ")
})

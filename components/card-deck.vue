<!--
/*!
 * 乳包指南
 * https://ru-bao.github.io/rubao_manual/
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * card-deck.vue
 * 
*/
-->
<template>
    <div id="card-deck">
        <div class="card" v-for="card of cards">
            <h5 class="card-header">{{card.header}}</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item grey chang" v-for="item of card.items" :style="{'padding-bottom': item.src ? (audio_element_height + 23 + 'px') : null, 'height': (audio_element_height + 6 + 'px')}">
                    <a v-if="item.onclick" class="audio_title" href="javascript:;" @click="item.onclick()">
                        {{item.title}}
                    </a>
                    <span v-else style="color: #747473;">{{item.title}}</span>

                    <a v-if="is_Firefox && item.src" :href="item.src" target="_blank" class="download_music" download>
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </a>
                    <audio v-if="item.src" :class="audio_class" :src="item.src" controls></audio>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import "../libs/String.prototype.includes.polyfill.js"
import "../libs/Object.assign.polyfill.js"
import "../libs/Object.entries.polyfill.js"

export default {
    data: function () {
        return ({
            is_Firefox: (navigator.userAgent.indexOf("Firefox") > -1),
            audio_element_height: this.$_get_audio_element_height(),
            _raw_cards: [],
            cards: []
        })
    },
    computed: {
        audio_class: function () { return `audio${this.is_Firefox ? "_Firefox" : ""}` }
    },
    methods: {
        $_get_audio_element_height: () => {
            const audio_element = document.createElement("audio")
            audio_element.controls = true
            document.body.appendChild(audio_element)
            const height = document.getElementsByTagName("audio")[0].clientHeight
            document.body.removeChild(audio_element)
            return height
        },
        json_callback: function (data) { // 解析资源文件，显示内容
            const self = this

            Object.entries(data).forEach(([header, items]) => {

                const card_items = items.map(item => {
                    return ({
                        title: item.title,
                        src: `sounds/${item.audio}.mp3`,
                        onclick: self.$root.$refs.modal_base.init_modal(item)
                    })
                })

                const card = {
                    header,
                    items: card_items
                }

                self.cards.push(card)
            })

            this._raw_cards = this.cards

        },
        search: function (keyword = "", cards = this._raw_cards) {
            window.scrollTo(0, 0) // 页面滚动到顶部

            if (!keyword) {
                this.cards = this._raw_cards
                return
            }

            const flat_items = cards
                .map(card => card.items)
                .reduce((l, a) => l.concat(a))

            let new_items = flat_items
                .sort((a, b) => a.title.localeCompare(b.title))
                .filter(str => str.title.includes(keyword))

            new_items = new_items.length == 0 ? [{ title: "未找到符合条件的结果", onclick: null, src: null }] : new_items

            this.cards = [
                {
                    header: "搜索结果：",
                    items: new_items
                }
            ]

        }
    }
}

</script>

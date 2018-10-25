/*!
 * 乳包指南
 * https://ru-bao.github.io/rubao_manual/
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * Source Code: https://github.com/Xmader/rubao_manual
 * 
*/

// const Vue = require("vue/dist/vue.js")
import Vue from "vue/dist/vue.runtime.min.js"
import components from "./components/components.js"
import rubao_resources from "./rubao.js"

const vm = new Vue({
    el: "#app",
    components,
    render: function (h) {
        return (
            <main>
                <top-nav ref="top_nav"></top-nav>

                <div class="container">
                    <card-deck ref="card_deck"></card-deck>
                </div>

                <modal-base ref="modal_base"></modal-base>
            </main>
        )
    },
    mounted: function () { this.init() },
    methods: {
        init: function () { // 初始化页面
            this.$refs.card_deck.json_callback(rubao_resources)
        }
    }
})

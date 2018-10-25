<!--
/*!
 * 乳包指南
 * https://ru-bao.github.io/rubao_manual/
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * modal-base.vue - 模态框(对话框)Vue组件
 * 
*/
-->

<template>
    <div>
        <div class="modal" :class="{ show: show }" :style="{'display': show ? 'block' : 'none', 'padding-right': $_getScrollbarWidth() + 'px' }" tabindex="-1" :aria-hidden="show ? null : true" role="dialog" id="modal" @click.self="hide()">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="m_title">{{title}}</h5>
                        <button type="button" class="close" aria-label="Close" @click="hide()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" v-if="show" ref="modal_body">
                        <template v-if="quote">
                            <h3>“{{quote}}”</h3>
                            <br />
                        </template>

                        <p id="m_body" v-html="body"></p>

                        <video v-if="video" :src="video" class="modal_media" preload="auto" controls></video>
                    </div>
                    <div class="modal-footer">
                        <button v-if="video && !$_using_cordova()" type="button" class="btn btn-primary" @click="full_screen_video()" id="full_screen_video">网页内全屏视频</button>
                        <a v-if="video" :href="video" target="_blank" class="btn btn-primary download_video" :download="$_using_cordova() ? null : ''">下载视频</a>
                        <button type="button" class="btn btn-secondary" @click="hide()">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <button v-if="full_screen" type="button" class="btn btn-primary" @click="exit_full_screen_video()" id="exit_full_screen_video">退出网页内全屏</button>

        <div class="modal-backdrop show" v-if="show"></div>
    </div>
</template>

<script>
import "../libs/Object.assign.polyfill.js"

export default {
    data: () => ({
        show: false,
        title: "",
        quote: "",
        body: "",
        video: "",
        full_screen: false
    }),
    watch: {
        show: function ($_show) {
            const classList = document.body.classList
            const elements = [
                document.body,
                document.getElementById("bottom-nav"),
                document.getElementsByClassName("search")[0]
            ]

            if ($_show) {
                elements.forEach(e => e.style["padding-right"] = this.$_getScrollbarWidth() + "px")
                classList.add("modal-open")
            } else {
                elements.forEach(e => e.style["padding-right"] = "")
                classList.remove("modal-open")
            }
        }
    },
    methods: {
        $_using_cordova() {
            return !!window._cordova
        },
        $_getScrollbarWidth: () => { // 获取滚动条宽度
            const scrollDiv = document.createElement("div")
            scrollDiv.className = "modal-scrollbar-measure"
            document.body.appendChild(scrollDiv)
            const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
            document.body.removeChild(scrollDiv)
            return scrollbarWidth
        },
        hide: function () { this.show = false },
        init_modal: function (item) { // 初始化对话框
            return () => Object.assign(this, {
                show: true,
                type: 1,
                quote: item.quote,
                title: item.title,
                video: item.video && `videos/${item.video}.mp4`,
                body: "<p>" + item.content.replace(/\n/g, "</p><p>") + "</p>",
                full_screen: false
            })
        },
        full_screen_video: function () { // 网页内全屏视频
            this.full_screen = true

            const e = this.$refs.video

            document.body.appendChild(e)
            e.classList.add("full_screen_video")
        },
        exit_full_screen_video: function () { // 退出网页内全屏视频
            this.full_screen = false

            const e = this.$refs.video
            const modal_body = this.$refs.modal_body

            modal_body.appendChild(e)
            e.classList.remove("full_screen_video")
        },

    }
}

</script>
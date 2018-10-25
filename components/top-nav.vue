<!--
/*!
 * 乳包指南
 * https://ru-bao.github.io/rubao_manual/
 * 
 * Copyright (c) 2018 Xmader
 * Released under the MIT license
 * 
 * top-nav.js - 顶部导航条Vue组件
 * 
*/
-->

<template>
    <nav class="navbar navbar-dark bg-primary top-nav">
        <img :src="'icon.jpg'" class="icon">

        <span class="navbar-brand">

            <a href="#">乳包指南</a>
        </span>

        <div class="search form-inline">
            <i class="fa fa-search" aria-hidden="true" @click="search_toggle()"></i>
            <input v-if="search_open" @keypress.esc="search_open = false; search_keyword = ''" v-model.trim="search_keyword" type="text" class="form-control" :placeholder="'搜索'">
        </div>
    </nav>
</template>


<script>
export default {
    data: () => ({
        search_open: false,
        search_keyword: ""
    }),
    watch: {
        search_keyword: function (keyword) {
            this.$root.$refs.card_deck.search(keyword)
        }
    },
    methods: {
        search_toggle: function () {
            this.search_open = !this.search_open
            this.search_keyword = ""
        }
    }
}
</script>

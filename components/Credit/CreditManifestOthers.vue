<template>
    <div v-if="pageEnv.creditInfo.length > 0">
        <h1>Credit Information</h1>
        <p>This page includes the content from the following sources. The contents are copied from their original source and then probably being modified to suit this page.</p>
        <div class="credit-manifest-box">
            <div>
                <div v-for="(info, key) of pageEnv.creditInfo">
                    <table class="credit-info-table">
                        <tr v-if="info.origin">
                            <td>Origin</td>
                            <td>
                                <a
                                    v-if="info.link || info.doi"
                                    :href="info.link || info.doi"
                                    target="_blank"
                                >{{ info.origin }}</a>
                                <span v-else>{{ info.origin }}</span>
                            </td>
                        </tr>
                        <tr v-if="info.doi">
                            <td>doi</td>
                            <td>
                                <a :href="info.doi" target="_blank">{{ info.doi }}</a>
                            </td>
                        </tr>
                        <tr v-if="info.author">
                            <td>Author</td>
                            <td>
                                <span v-for="(author, key) of info.author">{{ author.name }}</span>
                            </td>
                        </tr>

                        <tr v-if="info.license">
                            <td>License</td>
                            <td>
                                <a
                                    :href="'https://www.bing.com/search?q=' + info.license + ' license'"
                                    target="_blank"
                                >{{ info.license }}</a>
                            </td>
                        </tr>
                        <template v-for="(value, key) of info">
                            <tr v-if="!filteredKey(key)">
                                <td>{{ key }}</td>
                                <td>{{ value }}</td>
                            </tr>
                        </template>
                        <tr>
                            <td>Position</td>
                            <td>
                                <a :href="'#' + 'credit-info-' + info.id">Go to credit position</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, computed } from "vue"
const pageEnv = inject('pageEnv')

const filteredKeyList = ["src", "id", "author", "origin", "license"]
function filteredKey(key) {
    return filteredKeyList.indexOf(key) >= 0
}
</script>
<style lang="sass">

.credit-info-table
    margin: auto
    min-width: 60%
.credit-info-table
    border-collapse: collapse
    tr td
        border: 1px solid black
        border-collapse: collapse
        text-align: center
        
</style>
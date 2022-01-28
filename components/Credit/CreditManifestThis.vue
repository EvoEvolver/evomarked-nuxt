<template>
    <div>
        <div v-if="pageEnv.gitRepoUrl">
            <h1>Source code</h1>
            This project's source code is available <a :href="pageEnv.gitRepoUrl" target="_blank"> here</a>.
        </div>
        <div v-if="pageEnv.license">
            <h1>License</h1>
            This open-source work is licensed under the
            <template v-if="typeof pageEnv.license != 'string'">
                <a :href="pageEnv.license.link" target="_blank">{{ pageEnv.license.title }}</a>.
            </template>
            <template v-else>{{ pageEnv.license }}</template>
        </div>
    </div>
</template>
<script setup>
import { inject, computed } from "vue"
const pageEnv = inject('pageEnv')
</script>
<style lang="sass">

</style>
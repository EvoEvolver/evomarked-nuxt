<template>
    <span v-if="info.author">
        Author:
        <span v-for="(item,key) of info.author">{{ item.name }}</span>.
    </span> Retrieved
    <span v-if="info.origin">from {{ info.origin }}</span>
    <span v-if="info.license"> under license {{ info.license }}.</span>
    <span v-if="info.modified || info.modifier">
        Modified
        <span v-if="info.modifier">
            by
            <span v-for="(item,key) of info.modifier">{{ item.name || item }}</span>.
        </span>
    </span>
</template>
<script setup>
defineProps({
    info: {}
})
</script>
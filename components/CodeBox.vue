<template>
    <div :id="id" class="code-box">
        <pre><code v-html="highlightedCode" :class="className"></code></pre>
        <pre class="lang-tag" v-if="lang != 'plaintext'"><code style="background-color:rgba(255, 255, 255, 0);">{{ lang }}</code></pre>
    </div>
</template>

<script setup>
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/common';

const props = defineProps({
    code: {
        default: ""
    },
    lang: {
        default: "plaintext"
    },
    id: {},
    ignoreIllegals: {
        type: Boolean,
        default: true,
    },
})
const language = ref(props.lang)
watch(() => props.language, (newLanguage) => {
    language.value = newLanguage
})

const cannotDetectLanguage = computed(() => !hljs.getLanguage(language.value))

const className = computed(() => {
    if (cannotDetectLanguage.value) {
        return ''
    } else {
        return `hljs ${language.value}`
    }
})

const highlightedCode = computed(() => {
    // No idea what language to use, return raw code
    if (cannotDetectLanguage.value) {
        console.warn(`The language "${language.value}" you specified could not be found.`)
        return escapeHtml(props.code)
    }

    const result = hljs.highlight(props.code, {
        language: language.value,
        ignoreIllegals: props.ignoreIllegals,
    })

    return result.value

})
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
}
</script>

<style lang="sass" scoped>
@import "./Layout/vars"

@media (max-width: $small-screen-width)
    pre > code
        font-size: $normal-font-size*0.9

.lang-tag
    position: absolute
    right: 0.2rem
    bottom: -1rem
    color: rgba(0, 0, 0, 0.267)

.code-box
    @extend %scroll-box
    position: relative
    width: 100%
    z-index: 0

</style>
import katex from "katex/dist/katex.mjs";

export default function initPage(pageEnv, vueProvide) {
    vueProvide("katexAPI",katex)
    //document.title = pageEnv.title || "EvoMark Project"
    return
}
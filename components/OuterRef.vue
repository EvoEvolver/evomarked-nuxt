<template>
  <a :href="pageURL">
    <slot>{{ idName || "Here" }}</slot>
  </a>
</template>

<script setup>
const props = defineProps({
  page: String,
  label: String
})
import { inject, computed } from "vue"
const globalEnv = inject('globalEnv')

const matchedPage = computed(() => {
  if (props.page)
    return props.page
  if (!globalEnv.value)
    return null

  for (let page in globalEnv.value.idNames) {
    if (globalEnv.value.idNames[page][props.label]) {
      return page
    }
  }
})

const idName = computed(() => {
  if (!globalEnv.value)
    return
  let pageDict
  if(props.page)
    pageDict = globalEnv.value.idNames[props.page]
  else
    pageDict = globalEnv.value.idNames[matchedPage.value]

  if (!pageDict)
    return "Page" + props.page + "not found"
  if(!props.label)
    return globalEnv.value.pageInfo[props.page].title
  let labelDict = pageDict[props.label]
  if (!labelDict)
    return
  // Display the title if there is one
  if(labelDict.title)
    return labelDict.tagName + ": " + labelDict.title
  else
    return labelDict.tagName + " " + labelDict.index.join(".") +"(other page)"

})

const pageURL = computed(()=>{
    let URL = props.page || matchedPage.value
    if(URL=="index")
      URL = "/"
    if(props.label)
      URL += "#" + props.label
    return URL
})
</script>

<style>
</style>
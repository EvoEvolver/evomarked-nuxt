<template>
  <div v-if="pageEnv" class="abstract">
    <p v-for="(item, index) of paragraphs" :key="index">
      {{ item }}
    </p>
  </div>
</template>

<script>
export default {
  inject: ["pageEnv"],
  computed: {
    paragraphs: function () {
      if(!this.pageEnv.abstract) return ["No abstract defined"];
      let paragraphs = this.pageEnv.abstract.split("\n\n")
      for(let i in paragraphs){
        paragraphs[i] = paragraphs[i].trim()
      }
      paragraphs=paragraphs.filter(para => para!=="")
      return paragraphs
    },
  },
};
</script>

<style lang="sass">
@import "./Layout/vars.sass"

.abstract
    @extend %block
    text-align: left
    p
        margin: 0
        margin-bottom: 0.2rem
        hyphens: auto

    &>:first-child::before
        content: 'Abstract: '
        font-weight: bold

</style>
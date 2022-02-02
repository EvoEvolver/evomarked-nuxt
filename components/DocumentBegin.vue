<template>
  <Html>
    <Head>
      <Title>{{ (pageEnv.title || pageEnv.projectTitle ) || "Evomark Project" }}</Title>
    </Head>
      <NavBar></NavBar>
  </Html>
</template>

<script setup>
import { inject } from 'vue'
const pageEnv = inject('pageEnv')
</script>

<style lang="sass">
@import "./Layout/vars"
article
    margin: auto
    max-width: 50rem

    padding-top: 1.5rem
    padding-bottom: 5rem

    font-family: "Times New Roman", Times, serif
    font-size: 1.2rem
body
    margin: 0px
    padding: 0px
    -webkit-print-color-adjust: exact !important
    

@media (max-width: $small-screen-width)
    article
        padding-right: 0.3rem
        padding-left: 0.3rem

@media (min-width: $small-screen-width)
    article
        padding-right: 2rem
        padding-left: 2rem

.title
    font-size: 2rem

a
    text-decoration: none
    color: $link-color

a:visited
    color: $link-color

h1
    margin: 1rem
    text-align: center
    font-size: 1.7rem
h2
    margin: 1rem
    text-align: center
    font-size: 1.6rem
h3, h4, h5, h6
    margin: 1rem
    text-align: center

.katex
    font-size: 1em !important

.divider
    text-align: center
    font-size: 1.7em
    margin: auto
    display: block
    &::before
        content: "* * *"
</style>

<style src="./Layout/block.sass" lang="sass">
</style>
<style src="./Layout/inline.sass" lang="sass">
</style>
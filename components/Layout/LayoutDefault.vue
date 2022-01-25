<template>
    <slot></slot>
</template>

<style src="./block.sass" lang="sass"></style>
<style src="./inline.sass" lang="sass"></style>

<style lang="sass">

@import "./vars"

body
    margin: 0px
    padding: 0px
    -webkit-print-color-adjust: exact !important

article
    margin: auto
    max-width: 50rem
    //border: 3px solid gray
    padding-right: 2rem
    padding-left: 2rem
    //padding-top: 2rem
    padding-bottom: 20rem

    font-family: "Times New Roman", Times, serif
    font-size: 1.2rem

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
<template>
    <nav>
        <div id="navbar">
            <span class="navbar-left">
                <span>
                    <NavBarDropdown>
                        <template v-slot:title>
                            <img class="navicon" src="./chapters.svg" alt="chapters" />
                        </template>
                        <template v-slot:content>
                            <NavBarContentTable :pageInfoList="pageInfoList"/>
                        </template>
                    </NavBarDropdown>
                </span>

                <a href="/" class="navbar-item">
                    <img class="navicon" src="./home.svg" alt="homepage" />
                </a>

                <span class="navbar-title">{{ pageEnv.title }}</span>
            </span>

            <span class="navbar-right">
                <a
                    v-if="pageEnv.chatUrl"
                    class="navbar-item"
                    :href="pageEnv.chatUrl"
                    target="_blank"
                >
                    <img class="navicon" src="./chat.svg" style="fill: white;" alt="chat" />
                </a>
                <a
                    v-if="pageEnv.gitRepoUrl"
                    class="navbar-item"
                    :href="pageEnv.gitRepoUrl"
                    target="_blank"
                >
                    <img class="navicon" src="./git.svg" style="fill: white;" alt="git" />
                </a>
                <span class="navbar-item">
                    <FullScreenPanel>
                        <DocumentInfo></DocumentInfo>
                        <template v-slot:icon>
                            <img
                                class="navicon"
                                src="../Icons/info-white.svg"
                                style="fill: white;"
                                alt="info"
                            />
                        </template>
                    </FullScreenPanel>
                </span>
            </span>
        </div>
        <div style="padding: 1.5rem;"></div>
    </nav>
</template>

<script setup>
import { inject, computed, onMounted } from "vue"

const pageEnv = inject('pageEnv')
const globalEnv = inject('globalEnv')

const pageInfoList = computed(() => {
    if (!globalEnv.value)
        return null
    let pageInfo = globalEnv.value.pageInfo
    let pageKeyList = pageEnv.linearize
    if (!pageKeyList) {
        pageKeyList = Object.keys(pageInfo)
    }
    let pageList = []
    for (let key of pageKeyList) {
        pageList.push([key, pageInfo[key]])
    }
    return pageList
})
onMounted(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos || currentScrollPos < 10) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-60px";
        }
        prevScrollpos = currentScrollPos;
    }

})

</script>

<style lang="sass" scoped>

@import "../Layout/vars"

#navbar
    background-color: $nav-bar-background-color // Black background color */
    position: fixed //Make it stick/fixed */
    top: 0 // Stay on top
    width: 100% // Full width */
    transition: top 0.3s // Transition effect when sliding down (and up) */
    z-index: 10

/* Style the navbar links */
.navbar-item
    display: block
    color: white
    text-align: center
    padding: 0.8rem
    text-decoration: none

.navbar-left > span
    float: left
.navbar-left > a
    float: left
.navbar-right > a
    float: right
.navbar-right > span
    float: right

.navicon
    display: inline
    height: 1.5rem
    pedding: 0px

.navbar-item:hover
    background-color: $focus-color
    color: black

.navbar-title
    display: block
    color: white
    text-align: center
    padding: 0.8rem
    text-decoration: none

@media (max-width: $small-screen-width)
    .navbar-title
        display: none

@media print
    #navbar
        display: none

</style>
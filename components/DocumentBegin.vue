<template>
<Head>
        <Title> {{pageEnv.title || "Evomark Project"}} </Title>
      </Head>
</template>

<script>
export default {
inject: ["pageEnv"],
}
</script>

<style>
</style>
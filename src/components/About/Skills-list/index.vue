<template lang="pug">
.skills-list
    .skills-title {{skillType}}
    table.skills-table
        skill-item(
            v-for="n in 3",
            :key="n"
        )
</template>
<script>
export default {
    props: {
        skillType: String
    },
    components: {
        skillItem: require('./Skil-item')
    }
};
</script>
<style lang='scss' scoped>
    .skills-title {
        font-weight: 700;
        margin-bottom: 25px;
    }
    .skills-table {
        margin-left: 25px;
        margin-bottom: 30px;
    }
</style>
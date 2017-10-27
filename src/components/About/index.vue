<template lang="pug">
.about
    h2 Страница "Обо мне"
    skills-list(
        v-for="(skill, index) in skills",
        :key="index",
        :skillType="skill"
    )
        
</template>
<script>
export default {
    data: function () {
        return {
            skills: [
                "Frontend",
                "Backend",
                "Workflow"
            ]
        }
    },
    created() {
        console.log(this)
    },
    components: {
        skillsList: require('./Skills-list')
    }
}
</script>
<style lang='scss' src='./style.scss' scoped></style>

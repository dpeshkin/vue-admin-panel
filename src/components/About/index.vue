<template lang="pug">
.about
    h2 Страница "Обо мне"
    skills-list(
        v-for="(skill, index) in skillsList",
        :skills='getSkills',
        :key="index",
        :skillType="skill",
        @addSkill="addSkill"
    )
        
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { $eventBus } from '../../main'

export default {
    data: function () {
        return {
            skillsList: [
                "Frontend",
                "Backend",
                "Workflow"
            ]
        }
    },
    computed: {
        ...mapGetters(['getSkills'])
    },
    methods: {
        ...mapActions(['fetchSkills']),
        ...mapMutations(['addNewSkill', 'removeSavedSkill']),
        addSkill(skill) {
            this.addNewSkill(skill);
        }
    },
    created() {
        this.fetchSkills();
        $eventBus.$on('removeSkill', id => {
            this.removeSavedSkill(id);
        })
    },
    components: {
        skillsList: require('./Skills-list')
    }
}
</script>
<style lang='scss' src='./style.scss' scoped></style>

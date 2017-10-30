<template lang="pug">
.skill-item
    tr
        td {{skill.name}}
        td
            input(
                type='text',
                :value='skill.percents'
            )
        td %
            button(
                type="button",
                @click="removeSkill(skill.id)"
            ) Удалить
</template>
<script>
import { $eventBus } from '../../../../main'

export default {
    props: {
        skill: Object
    },
    methods: {
        removeSkill(id) {
            $eventBus.$emit('removeSkill', id)
        }
    }
}
</script>
<style lang='scss' scoped></style>
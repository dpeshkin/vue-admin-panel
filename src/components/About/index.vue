<template lang="pug">
.about
    h2 Страница "Обо мне"
    .skills-list
        .skills-title Frontend
        table.skills-table
            tr
                td Html
                td
                    input(type='text')
                td %
            tr
                td CSS3
                td
                    input(type='text')
                td %

        .skills-title Backend
        table.skills-table
            tr
                td PHP
                td
                    input(type='text')
                td %
            tr
                td mongo.db
                td
                    input(type='text')
                td %
</template>
<script>
export default {
    
}
</script>
<style lang='scss' src='./style.scss' scoped></style>
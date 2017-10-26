<template lang="pug">
    .tabs
        ul.list
            li.item(v-for='tab in tabs')
                a(href='').link {{tab}}
</template>
<script>
export default {
    data: function() {
        return {
            tabs: ['Таб 1', 'Таб 2', 'Таб 3', 'Таб 4']
        }
    }
}
</script>
<style lang="scss" src='./style.scss' scoped></style>
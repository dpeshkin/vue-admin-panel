<template lang="pug">
    .tabs
        ul.list
            li.item(v-for='tab in tabs')
                router-link(
                    :to='tab.href'
                ).link {{tab.name}}
</template>
<script>
export default {
    data: function() {
        return {
            tabs: [
                {name: "About" , href: '/'},
                {name: "Blog" , href: '/blog'},
                {name: "Works" , href: '/works'},
            ]
        }
    }
}
</script>
<style lang="scss" src='./style.scss' scoped></style>
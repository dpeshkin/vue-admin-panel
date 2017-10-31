<template lang="pug">
.skills-list
    .skills-title {{skillType}}
    table.skills-table
        skill-item(
            v-for="(skill, index) in skills",
            v-if="checkSkillType(skillType)==skill.type"
            :key="index",
            :skill="skill"
        )
        .buttons
            input(
                type='text',
                v-model="newSkill",
                :class="{error : validation.hasError('newSkill')}"
            )
            button(
                @click="addSkill(skillType)",
                :disabled="validation.hasError('newSkill')"
            ) Добавить
            div {{ validation.firstError('newSkill')}}
</template>
<script>
import { Validator } from "simple-vue-validator";
export default {
  mixins: [require("simple-vue-validator").mixin],
  data: function() {
    return {
      newSkill: ""
    };
  },
  validators: {
    newSkill(value) {
      return Validator.value(value).required("Скилл не может быть пустым!");
    }
  },
  props: {
    skillType: String,
    skills: Array
  },
  methods: {
    addSkill(skillType) {
      this.$validate().then(success => {
        if (!success) return; // если валидация не прошла скилл не добавится

        this.$emit("addSkill", {
          id: Math.round(Math.random() * 10),
          name: this.newSkill,
          percents: 0,
          type: this.checkSkillType(skillType)
        }),
        this.newSkill = "";
		this.validation.reset(); // обнуляем валидацию
      });
    },
    checkSkillType(skillType) {
      switch (skillType) {
        case "Frontend":
          return 1;
        case "Workflow":
          return 2;
        case "Backend":
          return 3;
      }
    }
  },
  components: {
    skillItem: require("./Skill-item")
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
.error {
  border: solid 1px red;
}
</style>
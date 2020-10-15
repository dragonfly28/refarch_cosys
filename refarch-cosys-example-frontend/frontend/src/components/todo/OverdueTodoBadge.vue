<template>
  <v-badge color="error" overlap dot v-model="isTodosOverdue">
    <slot />
  </v-badge>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: mapGetters(["isTodosOverdue"]),
})
export default class OverdueTodoBadge extends Vue {
  mounted() {
    this.$store.dispatch("updateTodos");
  }
  @Watch("isTodosOverdue")
  overdue(old: any, new_: any) {
    //console.log(old, new_);
  }
}
</script>

<style scoped></style>

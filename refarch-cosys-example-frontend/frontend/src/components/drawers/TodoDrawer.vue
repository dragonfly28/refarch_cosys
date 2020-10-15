<template>
  <v-navigation-drawer app right clipped v-model="value">
    <v-progress-linear
      v-if="isTodosLoading"
      indeterminate
      color="accent"
    ></v-progress-linear>
    <v-list>
      <v-subheader>ToDos</v-subheader>
      <template v-for="(project, index) in overdueTodos">
        <v-list-item
          :key="`todo-project-${project.id}`"
          @click.stop="openProject(project)"
        >
          <v-list-item-content>
            <v-list-item-title class="mb-1">
              <v-icon color="error" v-if="todoDueInDays(project) < 1" small>
                mdi-exclamation-thick
              </v-icon>
              {{ project.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="mb-1">
              <v-icon class="mr-1" x-small color="grey">mdi-folder-open</v-icon>
              {{ project.description }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1">
              <v-icon class="mr-1" x-small color="grey">
                {{ getCalendarItemForProject(project) }}
              </v-icon>
              {{ getDueInDaysLabel(project) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          v-if="index < todos.length - 1"
          :key="`divider-${project.id}`"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import moment from "moment";
import { Project } from "@/types/Project";
import projectservice from "@/api/projectservice";
import { mapGetters } from "vuex";

@Component({
  computed: mapGetters(["isTodosLoading", "overdueTodos"]),
})
export default class TodoDrawer extends Vue {
  @Prop()
  value: boolean = false;

  todos: Project[] = [];

  private mounted() {
    this.$store.dispatch("updateTodos");
  }

  @Watch("value")
  private onValueUpdate(newValue: boolean, oldValue: boolean) {
    if (newValue) this.$store.dispatch("updateTodos");
  }

  private openProject(project: Project) {
    this.$router.push({
      name: "projectview",
      params: {
        projectid: project.id!.toString(),
      },
    });
  }

  private todoDueInDays(project: Project): number {
    let dueDateMoment = moment(project.dueDate);
    let todayMoment = moment(new Date());
    return dueDateMoment.diff(todayMoment, "days");
  }

  private formatDate(project: Project) {
    return moment(project.dueDate).format("Do MMMM YYYY");
  }

  private getDueInDaysLabel(project: Project): string {
    if (this.todoDueInDays(project) > 2)
      // mehr als zwei Tage noch hin -> Datum anzeigen
      return `Fällig am ${this.formatDate(project)}`;
    if (this.todoDueInDays(project) > 0) {
      // zwischen 2 und 1 Tagen -> x Tage anzeigen
      let en = "en";
      if (Math.abs(this.todoDueInDays(project)) === 1) en = "";
      return `Fällig in ${this.todoDueInDays(project)} Tag${en}`;
    }
    if (this.todoDueInDays(project) === 0) return "Heute fällig";
    let e = "e";
    if (Math.abs(this.todoDueInDays(project)) === 1) e = "";
    return `${Math.abs(this.todoDueInDays(project))} Tag${e} im Verzug`;
  }

  private getCalendarItemForProject(project: Project): string {
    return (
      "mdi-calendar-" + (this.todoDueInDays(project) < 1 ? "alert" : "month")
    );
  }
}
</script>

<style scoped></style>

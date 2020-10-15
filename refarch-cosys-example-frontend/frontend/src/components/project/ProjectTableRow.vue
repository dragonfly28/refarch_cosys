<template>
  <tr @click="openProject">
    <td>{{ project.name }}</td>
    <td>{{ project.description }}</td>
    <td><project-status-chip :status="project.status" /></td>
    <td>
      <v-btn icon @click.stop="editProject"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn icon @click.stop="deleteProject"><v-icon>mdi-delete</v-icon></v-btn>
    </td>
  </tr>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/types/Project";
import ProjectStatusChip from "@/components/project/ProjectStatusChip.vue";

@Component({
  components: {
    ProjectStatusChip,
  },
})
export default class ProjectListElement extends Vue {
  @Prop()
  project!: Project;

  openProject() {
    this.$emit("open");
  }

  deleteProject() {
    this.$emit("delete");
  }

  editProject() {
    this.$emit("edit");
  }
}
</script>

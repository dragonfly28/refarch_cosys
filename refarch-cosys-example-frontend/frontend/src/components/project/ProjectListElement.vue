<template>
  <v-list-item @click.stop="openProject">
    <v-list-item-avatar>
      <v-icon class="grey lighten-1 white--text">mdi-folder</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ project.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ project.description }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <project-status-chip :status="project.status" />
    <list-actions
      :entity="project"
      @edit="editProject"
      @open="openProject"
      @delete="deleteProject"
    />
  </v-list-item>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/types/Project";
import ProjectStatusChip from "@/components/project/ProjectStatusChip.vue";
import ListActions from "@/components/util/ListActions.vue";

@Component({
  components: {
    ListActions,
    ProjectStatusChip,
  },
})
export default class ProjectListElement extends Vue {
  @Prop()
  project!: Project;

  openProject() {
    this.$emit("open");
  }

  editProject() {
    this.$emit("edit");
  }

  deleteProject() {
    this.$emit("delete");
  }
}
</script>

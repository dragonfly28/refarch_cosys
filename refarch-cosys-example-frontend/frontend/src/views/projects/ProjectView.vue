<template>
  <v-container>
    <v-card flat class="ma-1 px-2">
      <template>
        <v-card-title>
          {{ project.name }}
          <span class="pl-2">
            <project-status-chip :status="project.status"></project-status-chip>
          </span>
          <span class="pl-2">
            <referat-chips :referat="project.referat"></referat-chips>
          </span>
          <v-spacer></v-spacer>
          <v-btn icon large color="accent" @click="edit">
            <v-icon large>mdi-square-edit-outline</v-icon>
          </v-btn>
          <v-btn icon large color="accent" @click="openDeleteDialog">
            <v-icon large>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-tabs grow>
            <v-tab>Allgemein</v-tab>
            <v-tab>Architektur</v-tab>
            <v-tab>Besonderheiten</v-tab>
            <v-tab>Mitglieder</v-tab>
            <v-tab-item>
              <project-tab-basic
                :project="project"
                :projectLoading="projectLoading"
                class="pt-4"
              />
            </v-tab-item>
            <v-tab-item>
              <project-tab-architecture
                :project="project"
              ></project-tab-architecture>
            </v-tab-item>
            <v-tab-item>
              <project-tab-feature v-model="project" class="pt-4" />
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <div>
                  <project-tab-members
                    :projectId="project.id"
                  ></project-tab-members>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </template>
    </v-card>
    <delete-dialog
      v-model="deleteDialogVisible"
      :descriptor-string="project.name"
      :is-loading-animation="deleteDialogLoading"
      @delete="deleteProject"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import projectservice from "@/api/projectservice";
import { Project } from "@/types/Project";
import ProjectStatusChip from "@/components/project/ProjectStatusChip.vue";
import ReferatChips from "@/components/project/ReferatChips.vue";
import ProjectTabBasic from "@/components/project/view/ProjectTabBasic.vue";
import ProjectTabFeature from "@/components/project/view/ProjectTabFeature.vue";
import ProjectTabMembers from "@/components/project/view/ProjectTabMembers.vue";
import ProjectTabArchitecture from "@/components/project/view/ProjectTabArchitecture.vue";
import DeleteDialog from "@/components/util/DeleteDialog.vue";

@Component({
  components: {
    DeleteDialog,
    ProjectTabFeature,
    ProjectTabBasic,
    ProjectStatusChip,
    ReferatChips,
    ProjectTabMembers,
    ProjectTabArchitecture,
  },
})
export default class ProjectView extends Vue {
  headers = [
    "Vorname",
    "Nachname",
    "E-Mail-Adresse",
    "Rollen",
    "Status",
    "Aktionen",
  ];
  project: Project = {};
  projectLoading: boolean = true;

  deleteDialogVisible = false;
  deleteDialogLoading = false;

  mounted() {
    this.getProject(this.$route.params.projectid);
  }

  @Watch("$route.params.projectid")
  private loadProject() {
    const id = this.$route.params.projectid;
    this.getProject(id);
  }

  async getProject(id: string) {
    await projectservice
      .getSingleProject(id)
      .then((response: Project) => {
        if (response) {
          this.project = response;
        }
      })
      .catch((error: any) => {
        this.$store.dispatch("snackbar/showMessage", error);
      });
    this.projectLoading = false;
  }

  edit() {
    this.$router.push({
      name: "project.edit",
      params: { id: this.project.id!.toString() },
    });
  }

  openDeleteDialog() {
    this.deleteDialogVisible = true;
  }

  deleteProject() {
    this.deleteDialogLoading = true;
    projectservice
      .deleteProject(this.project.id!)
      .then(() => {
        this.$router.push({ name: "projects" });
      })
      .catch((e) => {
        this.$store.dispatch("snackbar/showMessage", e);
      })
      .finally(() => {
        this.deleteDialogVisible = false;
        this.deleteDialogLoading = false;
      });
  }
}
</script>
<style scoped></style>

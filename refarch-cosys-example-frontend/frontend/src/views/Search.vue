<template>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex justify-space-between">
        <div>Suchergebnisse für "{{ query }}"</div>
        <v-btn icon @click="$store.commit('SET_DRAWER_VISIBLE', true)">
          <v-badge
            color="warning"
            overlap
            dot
            v-if="$store.getters.isFiltering"
          >
            <v-icon>mdi-filter-variant</v-icon>
          </v-badge>
          <v-icon v-else>mdi-filter-variant</v-icon>
        </v-btn>
      </v-card-title>
      <v-skeleton-loader
        :types="{ skeleton: 'heading,list-item@4,heading,list-item@4' }"
        type="skeleton"
        transition="fade-transition"
        :loading="busy"
      >
        <v-list two-line subheader>
          <v-subheader class="subtitle-1">Projekte</v-subheader>
          <template v-for="(project, index) in filteredProjects">
            <project-list-element
              :key="JSON.stringify(project)"
              :project="project"
              @open="openProject(project)"
              @edit="editProject(project)"
              @delete="openDeleteDialog(project)"
            />
            <v-divider
              class="divider"
              v-if="index + 1 < projects.length"
              :key="JSON.stringify(project) + 'divider'"
            />
          </template>
          <div class="pl-4 body-2" v-if="projects.length === 0">
            Keine Projekte gefunden
          </div>
          <v-subheader class="subtitle-1">Personen</v-subheader>
          <template v-for="(person, index) in persons">
            <person-list-element
              :person="person"
              :key="JSON.stringify(person)"
            />
            <v-divider
              class="divider"
              v-if="index + 1 < persons.length"
              :key="JSON.stringify(person) + 'divider'"
            />
          </template>
          <div class="pl-4 body-2" v-if="persons.length === 0">
            Keine Personen gefunden
          </div>
        </v-list>
      </v-skeleton-loader>
    </v-card>
    <v-navigation-drawer
      app
      right
      :value="$store.getters.isDrawerVisible"
      @input="$store.commit('SET_DRAWER_VISIBLE', $event)"
      temporary
    >
      <filter-drawer-content />
    </v-navigation-drawer>
    <delete-dialog
        v-model="deleteDialogVisible"
        :descriptor-string="deleteDialogDescriptor"
        :is-loading-animation="deleteDialogLoading"
        @delete="deleteProject"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import { Project } from "@/types/Project";
import projectservice from "@/api/projectservice";
import PersonListElement from "@/components/person/PersonListElement.vue";
import PersonService from "@/api/PersonService";
import { Person } from "@/types/Person";
import FilterDrawerContent from "@/components/drawers/FilterDrawerContent.vue";
import moment from "moment";
import ProjectListElement from "@/components/project/ProjectListElement.vue";
import DeleteDialog from '@/components/util/DeleteDialog.vue';

@Component({
  components: {DeleteDialog, FilterDrawerContent, PersonListElement, ProjectListElement },
})
export default class Search extends Vue {
  query: string = "";
  busy = false;
  projects: Project[] = [];
  persons: Person[] = [];

  deleteDialogVisible = false;
  deleteDialogDescriptor = "";
  deleteDialogLoading = false;
  projectToBeDeleted: Project | null = null;

  get filteredProjects() {
    return this.projects
      .filter((project) =>
        this.$store.getters.getTechnologies.every((tech: string) =>
          project.techs!.includes(tech)
        )
      )
      .filter(
        (project) =>
          !(project.projectstart && this.$store.getters.getStartDate) ||
          moment(project.projectstart).isAfter(this.$store.getters.getStartDate)
      )
      .filter(
        (project) =>
          !(project.projectend && this.$store.getters.getEndDate) ||
          moment(project.projectend).isBefore(this.$store.getters.getEndDate)
      );
  }

  mounted() {
    this.search();
  }

  @Watch("$route")
  onRouteChange() {
    this.search();
  }

  search() {
    this.query = this.$route.query.query as string;
    this.busy = true;
    Promise.all([this.getProjects(), this.getPersons()]).finally(
      () => (this.busy = false)
    );
  }

  getProjects() {
    return projectservice
      .search(this.query)
      .then((projects) => (this.projects = projects))
      .catch((error: any) => {
        this.$store.dispatch("snackbar/showMessage", error);
      });
  }

  getPersons() {
    return PersonService.search(this.query)
      .then((persons) => (this.persons = persons))
      .catch((error: any) => {
        this.$store.dispatch("snackbar/showMessage", error);
      });
  }

  openProject(project: Project) {
    this.$router.push({
      name: "projectview",
      params: { projectid: `${project.id}` },
    });
  }

  editProject(project: Project) {
    this.$router.push({
      name: "project.edit",
      params: { id: project.id!.toString() },
    });
  }

  openDeleteDialog(project: Project) {
    this.projectToBeDeleted = project;
    this.deleteDialogDescriptor = project.name!;
    this.deleteDialogVisible = true;
  }

  deleteProject() {
    if (this.projectToBeDeleted && this.projectToBeDeleted.id) {
      this.deleteDialogLoading = true;
      projectservice
        .deleteProject(this.projectToBeDeleted.id)
        .then(() => {
          this.projects.splice(
            this.projects.indexOf(this.projectToBeDeleted!),
            1
          );
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
}
</script>

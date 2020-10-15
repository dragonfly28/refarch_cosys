<template>
  <v-container>
    <v-card flat>
      <v-card-title>Projekte</v-card-title>

      <!-- Listendarstellung -->
      <v-list
        two-line
        v-infinite-scroll="onInfiniteScroll"
        v-if="$store.getters.isProjectsList"
      >
        <template
          v-if="!($store.getters.isProjectsPaginationPagination && busy)"
        >
          <template v-for="(project, index) in projects">
            <project-list-element
              :key="JSON.stringify(project)"
              :project="project"
              @delete="openDeleteDialog(project)"
              @open="openProject(project)"
              @edit="editProject(project)"
            />
            <v-divider
              class="divider"
              v-if="index + 1 < projects.length"
              :key="JSON.stringify(project) + 'divider'"
            ></v-divider>
          </template>
        </template>
        <template v-if="$store.getters.isProjectsPaginationPagination && busy">
          <v-skeleton-loader
            v-for="index in 5"
            loading
            type="list-item-avatar-two-line"
            :key="`skeleton-list-${index}`"
          />
        </template>
      </v-list>

      <!-- Tabellendarstellung -->
      <v-simple-table
        v-infinite-scroll="onInfiniteScroll"
        v-if="$store.getters.isProjectsTable"
      >
        <thead>
          <tr>
            <th>Projektname</th>
            <th>Kurzbeschreibung</th>
            <th>Status</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-if="!($store.getters.isProjectsPaginationPagination && busy)"
          >
            <project-table-row
              v-for="project in projects"
              :project="project"
              :key="JSON.stringify(project)"
              @open="openProject(project)"
              @delete="openDeleteDialog(project)"
              @edit="editProject(project)"
            />
          </template>
          <template v-else>
            <tr v-for="i in 5" :key="`skeleton-table-${i}`">
              <td v-for="j in 4" :key="`skeleton-table-${i}-${j}`">
                <v-skeleton-loader type="table-cell" loading />
              </td>
            </tr>
          </template>
        </tbody>
      </v-simple-table>

      <div class="d-flex align-center flex-column">
        <v-btn
          v-if="
            $store.getters.isProjectsPaginationButton &&
            !busy &&
            !allPagesLoaded
          "
          @click="onInfiniteButtonPress"
          text
          color="primary"
        >
          Mehr laden
        </v-btn>
      </div>
      <v-progress-linear
        v-if="busy"
        indeterminate
        color="accent"
      ></v-progress-linear>
      <div class="caption pl-4">
        <div v-if="!busy && (projects === undefined || projects.length < 1)">
          Aktuell stehen keine Daten zur Verfügung
        </div>
        <v-list-item
          v-if="allPagesLoaded || $store.getters.isProjectsPaginationPagination"
        >
          <v-list-item-content class="caption d-flex justify-center"
            >{{ totalElements }} Einträge insgesamt</v-list-item-content
          >
        </v-list-item>
      </div>
      <v-pagination
        :value="pageIndex + 1"
        @input="onPaginationPageChange($event - 1)"
        :length="totalPages"
        v-if="$store.getters.isProjectsPaginationPagination"
      ></v-pagination>
    </v-card>

    <!--Button: Hinzufügen-->
    <v-tooltip top>
      <template #activator="{ on }">
        <v-btn
          id="create-project"
          bottom
          right
          fixed
          fab
          dark
          color="accent"
          v-on="on"
          :to="{ path: '/createproject' }"
          style="z-index: 100;"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Hinzufügen</span>
    </v-tooltip>
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
import projectservice from "@/api/projectservice";
import ProjectListElement from "@/components/project/ProjectListElement.vue";
import { Project } from "@/types/Project";
import ProjectTableRow from "@/components/project/ProjectTableRow.vue";
import DeleteDialog from "@/components/util/DeleteDialog.vue";

@Component({
  components: {
    DeleteDialog,
    ProjectTableRow,
    ProjectListElement,
  },
})
export default class Projects extends Vue {
  busy = false;
  totalPages = -1; // Wird nach dem Laden der ersten Page überschrieben
  totalElements = 0; // Wird nach dem Laden der ersten Page überschrieben
  size = 20;

  projects: Project[] = [];
  pageIndex = 0;

  deleteDialogVisible = false;
  deleteDialogDescriptor = "";
  deleteDialogLoading = false;
  projectToBeDeleted: Project | null = null;

  mounted() {
    this.setupProjectLists();
  }

  @Watch("$store.state.config.projectsPaginationStyle")
  setupProjectLists() {
    this.projects = [];
    this.pageIndex = 0;
    this.getProjects(0);
  }

  getProjects(page: number) {
    this.busy = true;
    return projectservice
      .getProjects(page, this.size)
      .then((response) => {
        this.totalPages = response.page.totalPages;
        this.totalElements = response.page.totalElements;
        const projects = response._embedded ? response._embedded.projects : [];
        if (this.$store.getters.isProjectsPaginationPagination) {
          this.projects = projects;
        } else {
          this.projects.push(...projects);
        }
      })
      .catch((error: any) => {
        this.$store.dispatch("snackbar/showMessage", error);
      })
      .finally(() => (this.busy = false));
  }

  onInfiniteScroll() {
    if (
      this.$store.getters.isProjectsPaginationInfinite &&
      !this.busy &&
      this.pageIndex + 1 < this.totalPages
    ) {
      this.getProjects(++this.pageIndex);
    }
  }

  onInfiniteButtonPress() {
    this.getProjects(++this.pageIndex);
  }

  onPaginationPageChange(index: number) {
    this.pageIndex = index;
    this.getProjects(this.pageIndex);
  }

  get allPagesLoaded() {
    return this.pageIndex + 1 >= this.totalPages && !this.busy;
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
          this.totalElements--;
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

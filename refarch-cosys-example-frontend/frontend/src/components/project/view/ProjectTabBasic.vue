<template>
  <v-card flat>
    <div v-if="projectLoading">
      <v-skeleton-loader type="table"></v-skeleton-loader>
    </div>
    <div v-else class="mb-4">
      <div class="d-flex flex-row mb-4 mt-2">
        <badge
          v-if="project.projectstart || project.projectend"
          class="ml-4"
          color="#4CAF50"
          fontColor="black"
          :title="durationValue"
          :subtitle="durationUnit"
          :tooltip="durationTooltipText"
        ></badge>
        <badge
          v-if="project.km"
          class="ml-4"
          color="#4CAF50"
          :title="project.km"
          :subtitle="'KM'"
          :tooltip="'Kundencenter'"
          fontColor="black"
        ></badge>
        <badge
          class="ml-4 mb-4"
          color="#4CAF50"
          :title="project.km83 ? '✔' : 'X'"
          :subtitle="'KM83'"
          fontColor="black"
        ></badge>
      </div>

      <b>Beschreibung:</b>
      {{ project.description }}
    </div>
    <v-divider></v-divider>
    <v-subheader class="subtitle-1 pl-0">Weiterführende Links</v-subheader>
    <div v-if="areLinksAvailable">
      <p v-if="project.repositoryLink">
        <v-btn color="primary" @click="openLink(project.repositoryLink)" text
          >Gitlab <v-icon class="ml-2" small>mdi-open-in-new</v-icon></v-btn
        >
      </p>
      <p v-if="project.iteraplanLink">
        <v-btn color="primary" @click="openLink(project.iteraplanLink)" text
          >Iteraplan <v-icon class="ml-2" small>mdi-open-in-new</v-icon></v-btn
        >
      </p>
      <v-btn
        v-if="project.testEnvironmentLink"
        @click="showTestenvironmentData = true"
        color="primary"
        text
        >Testumgebung<v-icon class="ml-2" small>mdi-open-in-new</v-icon>
      </v-btn>
      <testenvironment-dialog
        v-model="showTestenvironmentData"
        :project="project"
      ></testenvironment-dialog>
    </div>
    <div v-else>
      <p>
        <b>Keine Links vorhanden</b>
      </p>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/types/Project";
import moment from "moment";
import TestenvironmentDialog from "@/components/util/TestenvironmentDialog.vue";
import Badge from "@/components/util/Badge.vue";

@Component({
  components: {
    TestenvironmentDialog,
    Badge,
  },
})
export default class ProjectTabBasic extends Vue {
  @Prop()
  project!: Project;
  @Prop()
  projectLoading!: boolean;
  showTestenvironmentData: boolean = false;

  formattedDate(date: Date) {
    return date ? moment(date).format("L") : "Keine Angabe";
  }

  openLink(url: string) {
    window.open(url, "_blank");
  }

  get durationTooltipText() {
    return (
      this.formattedDate(this.project!.projectstart!) +
      " - " +
      this.formattedDate(this.project!.projectend!)
    );
  }

  get durationUnit(): string {
    let timeObject = this.duration;
    return timeObject.unit;
  }

  get durationValue(): number {
    let timeObject = this.duration;
    return Math.floor(timeObject.value);
  }

  get duration(): { unit: string; value: number } {
    if (!(this.project.projectstart && this.project.projectend))
      return {
        unit: "Tage",
        value: 0,
      };
    const start = moment(this.project.projectstart, "YYYY-MM-DD");
    const end = moment(this.project.projectend, "YYYY-MM-DD");
    if (moment.duration(end.diff(start)).asYears() >= 1) {
      return {
        unit: "Jahre",
        value: moment.duration(end.diff(start)).asYears(),
      };
    } else if (moment.duration(end.diff(start)).asMonths() >= 1) {
      return {
        unit: "Monate",
        value: moment.duration(end.diff(start)).asMonths(),
      };
    } else {
      return {
        unit: "Tage",
        value: moment.duration(end.diff(start)).asDays(),
      };
    }
  }

  get areLinksAvailable() {
    return (
      this.project.repositoryLink ||
      this.project.iteraplanLink ||
      this.project.testEnvironmentLink
    );
  }
}
</script>

<style scoped></style>

<template>
  <v-card flat>
    <feature-list
      v-model="value.features"
      @editFeature="showFeatureDialog"
      @createFeature="showFeatureDialog"
      @removeFeature="showDeleteDialog"
    />
    <feature-dialog
      :show="featureDialogVisible"
      :loading="featureDialogLoading"
      :feature="featureToEdit"
      :index="indexToEdit"
      @save="saveFeature"
      @cancel="featureDialogVisible = false"
    />
    <delete-dialog
      v-model="deleteDialogVisible"
      :is-loading-animation="deleteDialogLoading"
      :descriptor-string="!!featureToDelete ? featureToDelete.name : undefined"
      @delete="deleteFeature"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/types/Project";
import FeatureDialog from "@/components/project/FeatureDialog.vue";
import Feature from "@/types/Feature";
import { Levels } from "@/api/error";
import FeatureList from "@/components/project/FeatureList.vue";
import projectservice from "@/api/projectservice";
import DeleteDialog from "@/components/util/DeleteDialog.vue";

@Component({
  components: {
    DeleteDialog,
    FeatureList,
    FeatureDialog,
  },
})
export default class ProjectTabFeature extends Vue {
  @Prop()
  value!: Project;

  private featureToEdit: Feature | null = null;
  private indexToEdit: number | null = null;
  private featureToDelete: Feature | null = null;
  private indexToDelete: number | null = null;
  private featureDialogVisible: boolean = false;
  private featureDialogLoading = false;
  private deleteDialogVisible: boolean = false;
  private deleteDialogLoading = false;

  private showDeleteDialog(feature: Feature, index: number) {
    this.featureToDelete = feature;
    this.indexToDelete = index;
    this.deleteDialogVisible = true;
  }

  private showFeatureDialog(feature: Feature = {}, index = -1) {
    this.featureToEdit = feature;
    this.indexToEdit = index;
    this.featureDialogVisible = true;
  }

  private saveFeature(feature: Feature, index: number) {
    this.featureDialogLoading = true;
    const safetyCopy = this.copyOfFeatures();
    let successMessage: string;
    if (index > -1) {
      this.value.features!.splice(index, 1, feature);
      successMessage = "Besonderheit wurde erfolgreich bearbeitet.";
    } else {
      this.value.features!.push(feature);
      successMessage = "Besonderheit wurde erfolgreich hinzugefügt.";
    }
    projectservice
      .putProject(this.value)
      .then((project) => {
        this.value = project;
        this.$store.dispatch("updateTodos");
        this.$store.dispatch("snackbar/showMessage", {
          level: Levels.INFO,
          message: successMessage,
        });
      })
      .catch((reason) => {
        this.value.features = safetyCopy;
        this.$store.dispatch("snackbar/showMessage", reason);
      })
      .finally(() => {
        this.featureDialogLoading = false;
        this.featureDialogVisible = false;
      });
  }

  private copyOfFeatures() {
    const features: Feature[] = [];
    this.value.features!.forEach((feature) => features.push({ ...feature }));
    return features;
  }

  private deleteFeature() {
    this.deleteDialogLoading = true;
    const safetyCopy = this.copyOfFeatures();
    this.value.features!.splice(this.indexToDelete!, 1);
    projectservice
      .putProject(this.value)
      .then((project) => {
        this.value = project;
        this.$store.dispatch("updateTodos");
        this.$store.dispatch("snackbar/showMessage", {
          level: Levels.INFO,
          message: "Besonderheit wurde erfolgreich gelöscht.",
        });
      })
      .catch((reason) => {
        this.value.features = safetyCopy;
        this.$store.dispatch("snackbar/showMessage", reason);
      })
      .finally(() => {
        this.deleteDialogLoading = false;
        this.deleteDialogVisible = false;
      });
  }
}
</script>

<style scoped></style>

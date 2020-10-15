<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        Projekt anlegen<span v-if="project.name">: {{ project.name }}</span>
      </v-card-title>
      <project-form-stepper
        v-model="project"
        :docs="docs"
        :memberships="memberships"
        @save="save"
        @cancel="cancel"
        :saving="saving"
      ></project-form-stepper>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import ProjectFormStepper from "@/components/project/form/ProjectFormStepper.vue";
import { Project } from "@/types/Project";
import projectservice from "@/api/projectservice";
import DocumentService from "@/api/DocumentService";
import MembershipService from "@/api/MembershipService";
import Membership from "@/types/Membership";
import Document from "@/types/Document";
import DeltaList from "@/utils/DeltaList";

@Component({
  components: {
    ProjectFormStepper,
  },
})
export default class ProjectCreate extends Vue {
  project: Project = {
    features: [],
  };
  memberships: DeltaList<Membership> = new DeltaList<Membership>();
  docs: DeltaList<Document> = new DeltaList<Document>();
  saving: boolean = false;

  cancel() {
    this.$router.push({ name: "projects" });
  }

  async save() {
    this.saving = true;
    try {
      const project = await projectservice.postProject(this.project);
      await DocumentService.post(
        project.id!,
        this.docs.addedValues.filter((doc) => doc.file).map((doc) => doc.file!)
      );
      this.memberships.addedValues.forEach(
        (membership) => (membership.projectId = project.id)
      );
      for (let membership of this.memberships.addedValues) {
        await MembershipService.postMembership(membership);
      }
      this.$store.dispatch("updateTodos");
      this.$store.dispatch("snackbar/showMessage", {
        level: "success",
        message: `Das Projekt wurde erfolgreich gespeichert.`,
      });
      this.$router.push({
        name: "projectview",
        params: { projectid: "" + project.id },
      });
    } catch (error) {
      this.$store.dispatch("snackbar/showMessage", error);
    }
    this.saving = false;
  }
}
</script>
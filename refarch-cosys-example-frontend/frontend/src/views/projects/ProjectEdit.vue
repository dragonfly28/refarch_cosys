<template>
  <v-container>
    <v-skeleton-loader
      :types="{ skeleton: 'heading,table-thead,image' }"
      type="skeleton"
      :loading="loading"
    >
      <v-card flat>
        <v-card-title>
          Projekt bearbeiten
          <span v-if="project.name">: {{ project.name }}</span>
        </v-card-title>
        <project-form-stepper
          v-model="project"
          :memberships="memberships"
          :docs="docs"
          @save="save"
          @cancel="cancel"
          :saving="saving"
        />
      </v-card>
    </v-skeleton-loader>
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
export default class ProjectEdit extends Vue {
  project: Project = {
    features: [],
  };
  memberships: DeltaList<Membership> = new DeltaList<Membership>();
  docs: DeltaList<Document> = new DeltaList<Document>();
  loading: boolean = false;
  saving: boolean = false;

  mounted() {
    const id = this.$route.params.id;
    this.loading = true;
    Promise.all([
      DocumentService.getDocuments(id).then(
        (docs) => (this.docs = new DeltaList<Document>(docs))
      ),
      projectservice
        .getSingleProject(id)
        .then((project) => (this.project = project)),
      MembershipService.getMembershipsWithPerson(id).then(
        (memberships) =>
          (this.memberships = new DeltaList<Membership>(memberships))
      ),
    ]).finally(() => (this.loading = false));
  }

  cancel() {
    this.$router.push({
      name: "projectview",
      params: { projectid: "" + this.project.id },
    });
  }

  async save() {
    this.saving = true;
    try {
      await projectservice.putProject(this.project);
      await DocumentService.post(
        this.project.id!,
        this.docs.addedValues.filter((doc) => doc.file).map((doc) => doc.file!)
      );
      this.docs.editedValues.forEach(doc => DocumentService.put(doc.id!, doc.file!));
      this.docs.removedValues.forEach(doc => DocumentService.delete(doc.id!));
      this.memberships.allValues.forEach(
        (membership) => (membership.projectId = this.project.id)
      );
      for (const membership of this.memberships.addedValues) {
        await MembershipService.postMembership(membership);
      }
      for (const membership of this.memberships.editedValues) {
        await MembershipService.putMembership(membership);
      }
      for (const membership of this.memberships.removedValues) {
        await MembershipService.deleteMembership(membership.id!);
      }
      this.$store.dispatch("updateTodos");
      this.$store.dispatch("snackbar/showMessage", {
        level: "success",
        message: `Das Projekt wurde erfolgreich gespeichert.`,
      });
      this.$router.push({
        name: "projectview",
        params: { projectid: "" + this.project.id },
      });
    } catch (error) {
      this.$store.dispatch("snackbar/showMessage", error);
    }
    this.saving = false;
  }
}
</script>

<template>
  <v-container>
    <v-card flat>
      <v-card-title>Person anlegen</v-card-title>
      <v-card-text>
        <PersonForm
          v-model="person"
          @save="save"
          :is-loading-animation="isLoadingAnimation"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Person } from "@/types/Person";
import { Levels } from "@/api/error";
import PersonForm from "@/components/person/PersonForm.vue";
import PersonService from "@/api/PersonService";

@Component({
  components: { PersonForm },
})
export default class PersonCreate extends Vue {
  private person: Person;
  private isLoadingAnimation = false;

  constructor() {
    super();
    this.person = {
      id: -1,
      firstname: "",
      name: "",
      email: "",
      department: "",
    };
  }

  private save() {
    this.isLoadingAnimation = true;
    PersonService.create(this.person)
      .then(() => {
        this.$store.dispatch("snackbar/showMessage", {
          level: Levels.INFO,
          message: "Person wurde erfolgreich angelegt.",
        });
        this.$router.replace({
          name: "people",
        });
      })
      .catch((err) => {
        this.$store.dispatch("snackbar/showMessage", err);
      })
      .finally(() => (this.isLoadingAnimation = false));
  }
}
</script>

<style scoped></style>

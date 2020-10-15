<template>
  <v-container>
    <v-card flat>
      <v-card-title>{{ personFullName }} bearbeiten</v-card-title>
      <v-card-text>
        <v-progress-linear
          v-if="!person"
          indeterminate
          color="accent"
        ></v-progress-linear>
        <PersonForm
          v-else
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
import { getPersonFullName, Person } from "@/types/Person";
import PersonForm from "@/components/person/PersonForm.vue";
import { Levels } from "@/api/error";
import PersonService from "@/api/PersonService";

@Component({
  components: { PersonForm },
})
export default class PersonEdit extends Vue {
  person: Person | null = null;

  isLoadingAnimation = false;

  constructor() {
    super();
  }

  created() {
    this.load();
  }

  private load() {
    PersonService.get(parseInt(this.$route.params.id))
      .then((person: Person) => {
        this.person = person;
      })
      .catch((err) => {
        this.$store.dispatch("snackbar/showMessage", err);
        this.$router.push({
          name: "people",
        });
      });
  }

  private save() {
    if (!this.person) return;
    this.isLoadingAnimation = true;
    PersonService.update(this.person)
      .then(() => {
        this.$store.dispatch("snackbar/showMessage", {
          level: Levels.INFO,
          message: "Person wurde erfolgreich bearbeitet.",
        });
        this.$router.push({
          name: "people",
        });
      })
      .catch((err) => {
        this.$store.dispatch("snackbar/showMessage", err);
      })
      .finally(() => (this.isLoadingAnimation = false));
  }

  get personFullName(): string {
    if (!this.person) return "Person";
    return getPersonFullName(this.person);
  }
}
</script>

<style scoped></style>

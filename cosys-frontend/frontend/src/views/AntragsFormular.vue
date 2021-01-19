<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex
        xs12
        mb-4
      >
        <h1 class="display-2 font-weight-bold mb-10">
          Und hier die AntragsForm...
          <AntragsForm />
        </h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AntragsForm from "@/components/AntragsForm.vue";

@Component({
  components: {AntragsForm},
})
export default class GetStarted extends Vue {
  dokumentationClicked = false;
  date: Date | null = null;
  valid = true;

  isDirty(): boolean {
    return !this.dokumentationClicked;
  }
}
</script>

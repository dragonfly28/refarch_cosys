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
          Ich bin die AntragsView...
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

export default class AntragsView extends Vue {
  
}
</script>

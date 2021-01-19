<template>
  <div>
    <v-form
      ref="form"
      v-model="formValid"
      @submit="save">
      <p>{{ message }}</p>
      <v-row>
        <v-col col="6">
          <v-text-field
            label="Vorname*"
            dense
            outlined
          />
        </v-col>
        <v-col col="6">
          <v-text-field
            label="Nachname*"
            dense
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="E-Mail Adresse*"
            dense
            outlined
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Abteilung*"
            dense
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-right">
          <v-btn
            text
            exact
            :to="{ name: 'people' }"
            class="ml-auto"
          >
            Abbrechen
          </v-btn>
          <v-btn
            color="primary"
            :loading="isLoadingAnimation"
            @click="save"
          >
            Speichern
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AntragsForm extends Vue {
  message = "Hallo, ich bin die AntragsForm!";

}
</script>

<style scoped>
</style>
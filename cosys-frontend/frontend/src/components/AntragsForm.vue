<template>
  <div>
    <v-form
      ref="form"
      @submit="save"
    >
      <p>{{ message }}</p>
      <v-row>
        <v-col col="6">
          <v-text-field
            label="Vorname*"
          />
        </v-col>
        <v-col col="6">
          <v-text-field label="Nachname*" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="E-Mail Adresse*" />
        </v-col>
        <v-col cols="6">
          <v-text-field label="Abteilung*" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-right">
          <v-btn id="bltdialog-btn-save" color="primary" text @click="createPdf">
            PDF erzeugen
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Antragsteller from "@/types/Antragsteller";

@Component
export default class AntragsForm extends Vue {
  message = "Hallo, ich bin die AntragsForm!";

  isOpen = false;

  @Prop()
  value!: Antragsteller;

  close(): void {
    this.isOpen = false;
  }

  cancel(): void {
    this.$emit("cancel");
    this.close();
  }

  createPdf(): void {
    console.log("createPdf aufgerufen!!!");
    const form = this.$refs.form as any;
    if (form.validate()) {
      this.$emit("save", this.value);
      this.close();
    } else {
      console.log("Bitte Fehleingaben korrigieren");
    }
  }
}
</script>

<style scoped>
</style>
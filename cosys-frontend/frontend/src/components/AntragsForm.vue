<template>
  <div>
    <v-form ref="form">
      <h5>Und ich die AntragsForm...</h5>
      <v-row>
        <v-col col="6">
          <v-text-field
            id="antrag-input-vorname"
            v-model="antrag.vorname"
            label="Vorname*"
            outlined
            counter="32"
            dense
            :rules="[rules.required, rules.min3, rules.maxLength(32)]"
          />
        </v-col>
        <v-col col="6">
          <v-text-field
            id="antrag-input-nachname"
            v-model="antrag.nachname"
            label="Nachname*"
            outlined
            counter="32"
            dense
            :rules="[rules.required, rules.min3, rules.maxLength(32)]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            id="antrag-input-email"
            v-model="antrag.email"
            label="Email*"
            outlined
            counter="32"
            dense
            :rules="[rules.required, rules.min3, rules.maxLength(32)]"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field 
            id="antrag-input-abteilung"
            v-model="antrag.abteilung"
            label="Abteilung*"
            outlined
            counter="32"
            dense
            :rules="[rules.required, rules.min3, rules.maxLength(32)]"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-right">
          <v-btn
            id="bltdialog-btn-save"
            color="primary"
            text
            @click="createPdf"
          >
            PDF erzeugen
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Antrag from "@/types/Antrag";

@Component
export default class AntragsForm extends Vue {

  value = new Antrag("Bob","Dabidu","bobbi@nixda.com","HO");

  get antrag(): Antrag {
    return this.value;
  }

  createPdf(): void {
    console.log("createPdf aufgerufen!!!");
    console.log(this.value);
  }

  rules: unknown = {
    required: (v: unknown) => !!v || "Eingabe ist erforderlich",
    min3: (v: string) => !v || v.length >= 3 || "Mindestens 3 Zeichen benötigt",
    maxLength: (len: number) => (v: string): string | boolean =>
      !v || v.length <= len || `Maximal ${len} Zeichen erlaubt.`,
  };
}
</script>

<style scoped>
</style>
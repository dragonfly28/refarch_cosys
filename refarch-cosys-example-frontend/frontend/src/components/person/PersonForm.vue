<template>
  <div>
    <v-form ref="form" v-model="formValid" @submit="save">
      <v-row>
        <v-col col="6">
          <v-text-field
            label="Vorname*"
            v-model="value.firstname"
            :rules="[RULE_REQUIRED]"
            dense
            outlined
          />
        </v-col>
        <v-col col="6">
          <v-text-field
            label="Nachname*"
            v-model="value.name"
            :rules="[RULE_REQUIRED]"
            dense
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="E-Mail Adresse*"
            v-model="value.email"
            :rules="[RULE_REQUIRED, RULE_MAIL]"
            dense
            outlined
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Abteilung*"
            v-model="value.department"
            :rules="[RULE_REQUIRED]"
            dense
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>Alle mit Sternchen* gekennzeichneten Felder sind Pflichtfelder.</p>
        </v-col>
        <v-col class="text-right">
          <v-btn text exact :to="{ name: 'people' }" class="ml-auto">
            Abbrechen
          </v-btn>
          <v-btn @click="save" color="primary" :loading="isLoadingAnimation">
            Speichern
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import { Person } from "@/types/Person";
import { Levels } from "@/api/error";
import rulesMixin from "@/mixins/rulesMixin";

@Component({})
export default class PersonForm extends Mixins(rulesMixin) {
  @Prop()
  value!: Person;

  @Prop()
  isLoadingAnimation: boolean = false;

  private formValid: boolean = false;

  private save(): void {
    (this.$refs.form as any).validate();
    if (!this.formValid) {
      this.$store.dispatch("snackbar/showMessage", {
        level: Levels.WARNING,
        message: "Das Formular ist nicht richtig ausgefüllt.",
      });
      return;
    }
    this.$emit("save");
  }
}
</script>

<style scoped></style>

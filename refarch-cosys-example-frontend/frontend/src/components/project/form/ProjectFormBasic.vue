<template>
  <v-form ref="form" v-model="valid" @input="$emit('valid', valid)">
    <v-row>
      <v-col>
        <configurable-v-text-field
          v-model="value.name"
          :counter="20"
          maxlength="20"
          :rules="[RULE_REQUIRED]"
          label="Projektname*"
          required
        ></configurable-v-text-field>
      </v-col>
      <v-col>
        <configurable-v-select
          v-model="value.status"
          :items="statusItems"
          :rules="[RULE_REQUIRED]"
          label="Status*"
          required
        ></configurable-v-select>
      </v-col>
    </v-row>

    <configurable-v-textarea
      v-model="value.description"
      :counter="500"
      maxlength="500"
      :rules="[RULE_REQUIRED]"
      :rows="1"
      label="Kurzbeschreibung*"
      required
    ></configurable-v-textarea>

    <v-checkbox
      v-model="value.km83"
      label="Projekt von KM83 betreut?"
      required
    ></v-checkbox>

    <v-row>
      <v-col>
        <configurable-v-select
          v-model="value.referat"
          :items="referatItems"
          label="Referat"
        >
        </configurable-v-select>
      </v-col>
      <v-col>
        <configurable-v-text-field
          v-model="value.km"
          label="Zuständiges KM"
          counter="4"
          maxlength="4"
        >
        </configurable-v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <configurable-v-text-field
          id="projectStart"
          v-model="value.projectstart"
          label="Projektstart"
          append-icon="mdi-calendar"
          type="date"
        >
        </configurable-v-text-field>
      </v-col>
      <v-col>
        <configurable-v-text-field
          id="projectEnd"
          v-model="value.projectend"
          label="Projektende"
          append-icon="mdi-calendar"
          type="date"
        >
        </configurable-v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <configurable-v-text-field
          v-model="value.iteraplanLink"
          label="Iteraplan-Link"
        ></configurable-v-text-field>
      </v-col>
      <v-col>
        <configurable-v-text-field
          v-model="value.repositoryLink"
          label="Gitlab-Link"
          append-icon="mdi-gitlab"
        ></configurable-v-text-field>
      </v-col>
    </v-row>

    <configurable-v-text-field
      v-model="value.testEnvironmentLink"
      label="Link zur Testumgebung"
      append-icon="mdi-cloud"
    ></configurable-v-text-field>

    <v-row>
      <v-col>
        <configurable-v-text-field
          v-model="value.testEnvironmentUser"
          label="Benutzername"
          append-icon="mdi-account"
        ></configurable-v-text-field>
      </v-col>
      <v-col>
        <configurable-v-text-field
          v-model="value.testEnvironmentPassword"
          label="Passwort"
          append-icon="mdi-lock"
        ></configurable-v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import { referatTypes, statusTypes } from "@/constants/constants";
import { Project } from "@/types/Project";
import rulesMixin from "@/mixins/rulesMixin";
import ConfigurableVTextField from "@/components/inputs/ConfigurableVTextField.vue";
import ConfigurableVTextarea from "@/components/inputs/ConfigurableVTextarea.vue";
import ConfigurableVSelect from "@/components/inputs/ConfigurableVSelect.vue";

@Component({
  components: {
    ConfigurableVTextField,
    ConfigurableVTextarea,
    ConfigurableVSelect,
  },
})
export default class ProjectFormBasic extends Mixins(rulesMixin) {
  @Prop()
  value!: Project;

  valid: boolean = false;
  statusItems: string[] = [];
  referatItems: string[] = [];

  mounted() {
    this.statusItems = statusTypes;
    this.referatItems = referatTypes;
  }
}
</script>

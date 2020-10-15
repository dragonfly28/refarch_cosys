<template>
  <v-form ref="form" v-model="valid" @input="$emit('valid', valid)">
    <configurable-v-combobox
      :items="techItems"
      clearable
      chips
      label="Technologien"
      multiple
      required
      v-model="value.techs"
    >
      <template #selection="selectedData">
        <v-chip
          :key="JSON.stringify(selectedData.item)"
          v-bind="selectedData.attrs"
          :input-value="selectedData.selected"
          :disabled="selectedData.disabled"
          close
          @click:close="selectedData.parent.selectItem(selectedData.item)"
        >
          <v-avatar
            class="accent white--text"
            left
            v-text="selectedData.item.slice(0, 1).toUpperCase()"
          ></v-avatar>
          {{ selectedData.item }}
        </v-chip>
      </template>
      <template #append-outer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-help-circle</v-icon>
          </template>
          <span
            >In einer Combobox können weitere Elemente eingeben und mit ENTER
            hinzugefügt werden.</span
          >
        </v-tooltip>
      </template>
    </configurable-v-combobox>
    <configurable-v-textarea
      counter="500"
      maxlength="500"
      label="Aufbau"
      required
      rows="1"
      v-model="value.aufbau"
    />
    <file-manager :docs="docs" />
  </v-form>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Project } from "@/types/Project";
import ConfigurableVCombobox from "@/components/inputs/ConfigurableVCombobox.vue";
import ConfigurableVTextarea from "@/components/inputs/ConfigurableVTextarea.vue";
import FileManager from "@/components/util/FileManager.vue";
import DeltaList from "@/utils/DeltaList";
import Document from "@/types/Document";
import { techTypes } from "@/constants/constants";

@Component({
  components: {
    FileManager,
    ConfigurableVCombobox,
    ConfigurableVTextarea,
  },
})
export default class ProjectFormArchitecture extends Vue {
  @Prop({ required: true })
  value!: Project;

  @Prop({ required: true })
  docs!: DeltaList<Document>;

  valid = false;
  techItems: string[] = techTypes;
}
</script>

<template>
  <v-list subheader>
    <v-subheader class="headline">Filter</v-subheader>
    <div class="px-4">
      <configurable-v-combobox
        :items="technologies"
        clearable
        chips
        label="Technologien"
        multiple
        required
        :value="$store.getters.getTechnologies"
        @input="$store.commit('SET_TECHNOLOGIES', $event)"
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
      </configurable-v-combobox>
    </div>
    <v-divider />
    <v-subheader class="subtitle-1">Projektlaufzeit</v-subheader>
    <div class="px-4">
      <configurable-v-text-field
        label="Von"
        append-icon="mdi-calendar"
        type="date"
        :value="$store.getters.getStartDate"
        @input="$store.commit('SET_START_DATE', $event)"
      />
      <configurable-v-text-field
        label="Bis"
        append-icon="mdi-calendar"
        type="date"
        :value="$store.getters.getEndDate"
        @input="$store.commit('SET_END_DATE', $event)"
      />
    </div>
  </v-list>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { techTypes } from "@/constants/constants";
import ConfigurableVCombobox from "@/components/inputs/ConfigurableVCombobox.vue";
import ConfigurableVTextField from "@/components/inputs/ConfigurableVTextField.vue";

@Component({
  components: {
    ConfigurableVTextField,
    ConfigurableVCombobox,
  },
})
export default class FilterDrawerContent extends Vue {
  technologies = techTypes;
}
</script>

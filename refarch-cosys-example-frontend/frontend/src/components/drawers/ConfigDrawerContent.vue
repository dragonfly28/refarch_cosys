<template>
  <v-list subheader>
    <v-subheader class="subtitle-1">Allgemein</v-subheader>
    <div class="px-4">
      <!-- Eingabefelder -->
      <configurable-v-select
        :items="inputStyles"
        :value="$store.state.config.inputStyle"
        @input="$store.commit('SET_INPUT_STYLE', $event)"
        chips
        deletable-chips
        label="Eingabefelder"
        multiple
        prepend-icon="mdi-form-textbox"
      />
      <!-- Suche -->
      <configurable-v-select
        :items="searchStyles"
        :value="$store.state.config.searchStyle"
        @input="$store.commit('SET_SEARCH_STYLE', $event)"
        label="Suche"
        prepend-icon="mdi-magnify"
      />
      <!-- Farbschema -->
      <configurable-v-select
        prepend-icon="mdi-palette-outline"
        :items="themes"
        label="Farbschema"
        :value="$store.getters.getThemeName"
        @input="$store.dispatch('SET_THEME', $event)"
      ></configurable-v-select>
      <!-- Dark Mode -->
      <v-switch
        label="Dark Mode"
        :input-value="$store.getters.isDarkMode"
        @change="$store.dispatch('SET_DARKMODE', $event)"
      ></v-switch>
    </div>

    <v-divider class="px-4"></v-divider>
    <v-subheader class="subtitle-1">Seitenspezifisch</v-subheader>
    <template v-if="$route.name === 'createproject'">
      <div class="px-4">
        <!-- Stepper Horizontal -->
        <v-switch
          class="mt-0"
          label="Stepper horizontal"
          :input-value="$store.getters.isHorizontalStepper"
          @change="$store.commit('SET_HORIZONTAL_STEPPER', $event)"
        ></v-switch>
        <!-- Stepper Editierbar -->
        <v-switch
          label="Stepper editierbar"
          :input-value="$store.getters.isEditableStepper"
          @change="$store.commit('SET_EDITABLE_STEPPER', $event)"
        >
          <template #append>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-help-circle</v-icon>
              </template>
              <span>Abgeschlossene Schritte lassen sich erneut editieren</span>
            </v-tooltip>
          </template>
        </v-switch>
      </div>
    </template>
    <template v-else-if="$route.name === 'projects'">
      <div class="px-4">
        <!-- Projektübersicht Nachladen -->
        <configurable-v-select
          :items="paginationStyles"
          :value="$store.state.config.projectsPaginationStyle"
          @input="$store.commit('SET_PROJECTS_PAGINATION_STYLE', $event)"
          label="Nachladen"
          prepend-icon="mdi-download"
        >
          <template #append-outer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">mdi-help-circle</v-icon>
              </template>
              <span
                >Legt fest, wie das Nachladen neuer Projekte ausgelöst werden
                soll</span
              >
            </v-tooltip>
          </template>
        </configurable-v-select>
        <!-- Projektübersicht Darstellung -->
        <div class="d-flex justify-space-between">
          <span class="subtitle-2">Darstellung: </span>
          <v-btn-toggle
            color="primary"
            mandatory
            @change="$store.commit('SET_PROJECTS_STYLE', $event)"
            :value="$store.state.config.projectsStyle"
          >
            <v-tooltip bottom>
              <template #default>
                Liste
              </template>
              <template #activator="{ on, attrs }">
                <v-btn small v-on="on" v-bind="attrs"
                  ><v-icon small>mdi-format-list-bulleted</v-icon></v-btn
                >
              </template>
            </v-tooltip>
            <v-tooltip bottom>
              <template #default>
                Tabelle
              </template>
              <template #activator="{ on, attrs }">
                <v-btn small v-on="on" v-bind="attrs"
                  ><v-icon small>mdi-table</v-icon></v-btn
                >
              </template>
            </v-tooltip>
          </v-btn-toggle>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-help-circle</v-icon>
            </template>
            <span>
              Legt fest, ob die Projekte mithilfe zweizweiliger Listenelementen
              oder in einer Tabelle dargestellt werden sollen
            </span>
          </v-tooltip>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="caption pl-4">
        Keine Einstellungen auf dieser Seite vorhanden
      </div>
    </template>
  </v-list>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ConfigurableVSelect from "@/components/inputs/ConfigurableVSelect.vue";
import {
  inputStyleTypes,
  paginationStyleTypes,
  searchStyleTypes,
  themeTypes,
} from "@/constants/constants";

@Component({
  components: {
    ConfigurableVSelect,
  },
})
export default class ConfigDrawerContent extends Vue {
  inputStyles = inputStyleTypes;
  paginationStyles = paginationStyleTypes;
  searchStyles = searchStyleTypes;
  themes = themeTypes;
}
</script>

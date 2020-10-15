<template>
  <v-autocomplete
    :items="suggestions"
    :loading="loading"
    :search-input="value"
    @update:search-input="$emit('input', $event)"
    color="black"
    clearable
    flat
    no-filter
    hide-details
    hide-no-data
    label="Suche"
    solo-inverted
    prepend-inner-icon="mdi-magnify"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="selectedResult"
    @keyup.enter="onEnter"
    ref="autocomplete"
    return-object
  >
    <template #selection>
      <span>
        <!-- Hauptsache irgendein Element, damit der search-input nach
        einer selection nicht gesetzt wird -->
      </span>
    </template>
  </v-autocomplete>
</template>
<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import projectservice from "@/api/projectservice";
import PersonService from "@/api/PersonService";
import { Project } from "@/types/Project";
import { Person } from "@/types/Person";

@Component
export default class SearchAutocomplete extends Vue {
  @Prop()
  value!: string;

  @Ref("autocomplete")
  autocomplete!: any;

  loading: boolean = false;
  projects: Project[] = [];
  persons: Person[] = [];
  searchTimer!: number;
  selectedResult: any = null;

  @Watch("selectedResult")
  onSelectedResult(selectedResult: { value: string; id: number }) {
    if (selectedResult) {
      if (selectedResult.id) {
        this.selectedResult = null;
        this.$router.push({
          name: "projectview",
          params: { projectid: "" + selectedResult.id },
        });
      } else {
        this.$emit("input", selectedResult.value);
        this.$emit("search");
      }
    }
  }

  get suggestions() {
    const suggestions = [];
    if (this.projects.length > 0) {
      suggestions.push({ header: "Projekte" });
      suggestions.push(
        ...this.projects.map((project) => ({
          text: project.name!,
          value: project.name!,
          id: project.id!,
        }))
      );
    }
    if (this.persons.length > 0) {
      suggestions.push({ header: "Personen" });
      suggestions.push(
        ...this.persons.map((person) => ({
          text: `${person.firstname} ${person.name}`,
          value: `${person.firstname} ${person.name}`,
        }))
      );
    }
    return suggestions;
  }

  @Watch("value")
  debounceSearch() {
    window.clearTimeout(this.searchTimer);
    this.searchTimer = window.setTimeout(this.search, 300);
  }

  search() {
    this.loading = true;
    Promise.all([
      projectservice.search(this.value).then((projects) => {
        return (this.projects = projects);
      }),
      PersonService.search(this.value).then((persons) => {
        return (this.persons = persons);
      }),
    ]).finally(() => (this.loading = false));
  }

  onEnter() {
    if (this.autocomplete) {
      this.autocomplete.isMenuActive = false;
    }
    this.$emit("search");
  }
}
</script>

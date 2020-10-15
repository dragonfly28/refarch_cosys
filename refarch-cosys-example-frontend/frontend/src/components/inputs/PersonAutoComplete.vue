<template>
  <configurable-v-autocomplete
    :items="filteredPersons"
    :loading="personsLoading"
    :rules="rules"
    :search-input.sync="personQuery"
    label="Person*"
    no-filter
    v-model="selectedPerson"
  >
    <template #no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Keine Daten</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #selection="selectedData">
      <v-chip
        :disabled="selectedData.disabled"
        :input-value="selectedData.selected"
        :key="JSON.stringify(selectedData.item)"
        v-bind="selectedData.attrs"
      >
        <mucatar-avatar class="mr-2" :person="selectedData.item" />
        {{ selectedData.item.firstname }}
        {{ selectedData.item.name }}
      </v-chip>
    </template>
    <template #item="data">
      <v-list-item-avatar>
        <mucatar-avatar :person="data.item" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ data.item.firstname }}
          {{ data.item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ data.item.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </configurable-v-autocomplete>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Person } from "@/types/Person";
import Membership from "@/types/Membership";
import ConfigurableVSelect from "@/components/inputs/ConfigurableVSelect.vue";
import ConfigurableVAutocomplete from "@/components/inputs/ConfigurableVAutocomplete.vue";
import PersonService from "@/api/PersonService";
import MucatarAvatar from "@/components/person/MucatarAvatar.vue";

@Component({
  components: {
    MucatarAvatar,
    ConfigurableVAutocomplete,
    ConfigurableVSelect,
  },
})
export default class PersonAutoComplete extends Vue {
  @Prop()
  value!: Person;
  @Prop({ default: () => [] })
  rules!: any[];
  @Prop()
  memberships!: Membership[];
  personsLoading: boolean = true;
  personQuery: string = "";
  persons: Person[] = [];
  searchTimer!: number;

  get selectedPerson(): Person {
    return this.value;
  }
  set selectedPerson(person: Person) {
    this.$emit("input", person);
  }

  @Watch("value")
  clearQuery() {
    this.personQuery = "";
  }

  @Watch("personQuery")
  onQueryUpdate() {
    window.clearTimeout(this.searchTimer);
    this.searchTimer = window.setTimeout(() => {
      this.getPersonsFromBackend();
    }, 300);
  }

  // Don't display persons which are already a member of this project,
  // but display selected person
  get filteredPersons() {
    return this.persons.filter(
      (person) =>
        (!this.value ? null : this.value.id) === person.id ||
        !this.memberships
          .map((membership: any) => membership.person.id)
          .includes(person.id)
    );
  }

  getPersonsFromBackend() {
    this.personsLoading = true;
    PersonService.search(this.personQuery ? this.personQuery : "").then(
      (persons) => {
        this.persons = persons;
        this.personsLoading = false;
      }
    );
  }
}
</script>

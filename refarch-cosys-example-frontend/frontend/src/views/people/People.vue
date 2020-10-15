<template>
  <v-container>
    <v-card flat>
      <v-card-title>Personen</v-card-title>
      <v-list
        two-line
        id="infinite-scroll"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
      >
        <template v-for="(person, index) in people">
          <person-list-element
            :key="person.id"
            :person="person"
          />
          <v-divider class="divider" :key="`divider-${index}`" />
        </template>
        <v-list-item v-if="allPagesLoaded">
          <v-list-item-content class="caption d-flex justify-center"
            >{{ totalElements }} Einträge insgesamt</v-list-item-content
          >
        </v-list-item>
        <template v-if="!busy && (people === undefined || people.length < 1)">
          <v-subheader>Es wurden noch keine Personen angelegt.</v-subheader>
        </template>
        <template v-if="busy">
          <v-progress-linear indeterminate color="accent"></v-progress-linear>
        </template>
      </v-list>
    </v-card>

    <!--Button: Hinzufügen-->
    <v-tooltip top>
      <template #activator="{ on }">
        <v-btn
          id="create-person"
          bottom
          right
          fixed
          fab
          dark
          color="accent"
          v-on="on"
          :to="{ path: '/people/create' }"
          style="z-index: 100;"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Hinzufügen</span>
    </v-tooltip>
  </v-container>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import { Person } from "@/types/Person";
import PersonListElement from "@/components/person/PersonListElement.vue";
import PersonService from "@/api/PersonService";

@Component({
  components: {
    PersonListElement,
  },
})
export default class PeopleIndex extends Vue {
  people: Person[] = [];

  private busy = false;

  private currentPage: number = 0;

  private totalPages: number = Number.MAX_VALUE;

  private totalElements: number | undefined;

  private allPagesLoaded: boolean = false;

  constructor() {
    super();
  }

  mounted() {
    this.loadMore();
  }

  private async loadMore() {
    if (this.currentPage >= this.totalPages) return;
    this.busy = true;
    try {
      let data = await PersonService.getAllPaged(this.currentPage++);
      this.totalPages = data.totalPages;
      this.totalElements = data.totalElements;
      this.people.push(...data.data);
      this.allPagesLoaded = this.currentPage >= this.totalPages;
    } catch (reason) {
      this.$store.dispatch("snackbar/showMessage", reason);
    }
    this.busy = false;
  }

}
</script>

<style scoped></style>

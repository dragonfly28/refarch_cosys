<template>
  <v-list-item>
    <v-list-item-avatar>
      <mucatar-avatar :person="person" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title
        >{{ person.firstname }}
        <span class="font-weight-medium">{{ person.name }}</span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <v-icon x-small color="grey">mdi-account-group</v-icon>
        {{ person.department }}
        <span class="ml-1 mr-2 font-weight-bold">&middot;</span>
        <v-icon x-small color="grey">mdi-email</v-icon>
        {{ person.email }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <list-actions :id="person.id" :entity="person" @edit="editPerson" />
  </v-list-item>
</template>

<script lang="ts">
import { Person } from "@/types/Person";
import { Component, Prop, Vue } from "vue-property-decorator";
import MucatarAvatar from "@/components/person/MucatarAvatar.vue";
import ListActions from "@/components/util/ListActions.vue";

@Component({
  components: {
    ListActions,
    MucatarAvatar,
  },
})
export default class PersonListElement extends Vue {
  @Prop()
  person!: Person;

  private editPerson() {
    this.$router.push({
      name: "person.edit",
      params: { id: this.person.id.toString() },
    });
  }
}
</script>

<style scoped></style>

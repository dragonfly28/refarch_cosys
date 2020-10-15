<template>
  <v-avatar>
    <v-img
      v-if="hasMucatar"
      :src="`https://mucatar.muenchen.de/avatar?uid=${ldap}`"
      :alt="fullname"
    />
    <v-icon v-else class="grey lighten-1 white--text">mdi-account</v-icon>
  </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Person } from "@/types/Person";

@Component({})
export default class MucatarAvatar extends Vue {
  private readonly REGEX = /^([A-Za-z0-9._%+-]+)@muenchen\.de$/;

  @Prop()
  person!: Person;

  private get hasMucatar(): boolean {
    return this.REGEX.test(this.person.email);
  }

  private get fullname(): string {
    return `${this.person.firstname} ${this.person.name}`;
  }

  private get ldap(): string {
    let match = this.person.email.match(this.REGEX);
    if (match) return match[1];
    return "";
  }
}
</script>

<style scoped></style>

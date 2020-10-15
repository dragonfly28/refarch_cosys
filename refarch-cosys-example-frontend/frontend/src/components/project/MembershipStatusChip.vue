<template>
  <v-chip small :color="color" :text-color="textColor">{{ status }} </v-chip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MembershipStatusChip extends Vue {
  @Prop()
  status!: string;

  get color() {
    if (this.status === "AKTIV") {
      return "success";
    }
    return "";
  }

  get textColor() {
    if (this.status === "AKTIV") {
      return "white";
    }
    return "";
  }
}
</script>

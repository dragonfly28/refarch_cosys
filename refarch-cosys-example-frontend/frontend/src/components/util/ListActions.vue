<template>
  <v-list-item-action :id="'aktion-' + entity.oid">
    <v-menu
      offset-y
      bottom
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="hasOpenListener" @click="openEntity()">
          <v-icon class="mr-2">mdi-folder-open</v-icon>
          <v-list-item-title>Öffnen</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="hasEditListener" @click="editEntity()">
          <v-list-item-title>
            <v-icon class="mr-2">mdi-pencil</v-icon>
            <span>Bearbeiten</span>
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="hasDeleteListener" @click="deleteEntity()">
          <v-list-item-title>
            <v-icon class="mr-2">mdi-delete</v-icon>
            <span>Löschen</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-list-item-action>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ListActions extends Vue {
  @Prop()
  entity: any;

  openEntity() {
    this.$emit("open", this.entity);
  }

  editEntity() {
    this.$emit("edit", this.entity);
  }

  deleteEntity() {
    this.$emit("delete", this.entity);
  }

  get hasOpenListener() {
    return this.$listeners && this.$listeners.open;
  }

  get hasEditListener() {
    return this.$listeners && this.$listeners.edit;
  }

  get hasDeleteListener() {
    return this.$listeners && this.$listeners.delete;
  }
}
</script>

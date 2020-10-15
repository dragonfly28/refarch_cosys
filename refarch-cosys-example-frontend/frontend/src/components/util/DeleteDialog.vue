<template>
  <v-dialog v-model="value" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Löschen?</v-card-title>
      <v-card-text v-if="descriptorString"
        >Soll <span class="font-weight-bold">{{ descriptorString }}</span>
        wirklich gelöscht werden?
      </v-card-text>
      <v-card-text v-else
        >Soll der Datensatz wirklich gelöscht werden?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">Abbrechen</v-btn>
        <v-btn
          color="error"
          text
          @click="deleteItem"
          :loading="isLoadingAnimation"
          >Löschen</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component({})
export default class DeleteDialog extends Vue {
  /**
   * Gibt an ob der Dialog gezeigt werden soll.
   */
  @Prop()
  value!: boolean;

  @Prop()
  isLoadingAnimation: boolean = false;

  @Prop()
  descriptorString: string | undefined;

  private cancel() {
    this.$emit("input", false);
  }

  private deleteItem() {
    this.$emit("delete");
  }
}
</script>

<style scoped></style>

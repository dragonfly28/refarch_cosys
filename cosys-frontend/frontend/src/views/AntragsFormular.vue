<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex
        xs12
        mb-4
      >
        <h1 class="display-2 font-weight-bold mb-10">
          Antrags-Formular
        </h1>

      </v-flex>
    </v-layout>
    <yes-no-dialog
      v-model="saveLeaveDialog"
      dialogtitle="Wirklich verlassen?"
      dialogtext="Wollen Sie das Antragsformular wirklich verlassen?"
      @no="cancel"
      @yes="leave"
    />
  </v-container>
</template>

<script lang="ts">
    import {Component, Mixins} from 'vue-property-decorator';
    import SaveLeaveMixin from "@/mixins/saveLeaveMixin";
    import YesNoDialog from "@/components/common/YesNoDialog.vue";
    import DatetimeInput from "@/components/common/DatetimeInput.vue";

    @Component({
        components: {DatetimeInput, YesNoDialog}
    })
    export default class GetStarted extends Mixins(SaveLeaveMixin) {

        dokumentationClicked = false;
        date: Date | null = null
        valid = true

        isDirty(): boolean {
            return !this.dokumentationClicked;
        }
    }
</script>

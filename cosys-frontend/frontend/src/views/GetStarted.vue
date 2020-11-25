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
          Dokumentation
        </h1>
        <h3>Weiterführende Links sind hier zu finden:</h3>
        <ul>
          <li>
            <a
              href="https://wiki.muenchen.de/anwendungsentwicklung/index.php/Barrakuda"
              target="_blank"
              rel="noopener noreferrer"
              @click="dokumentationClicked = true"
            >Barrakuda-Doku</a>
          </li>
          <li>
            <a
              href="https://wiki.muenchen.de/anwendungsentwicklung/index.php/Archetype_API-Gateway"
              target="_blank"
              rel="noopener noreferrer"
              @click="dokumentationClicked = true"
            >Doku Archetype
              API-Gateway</a>
          </li>
          <li>
            <a
              href="https://wiki.muenchen.de/anwendungsentwicklung/index.php/Archetype_Backend"
              target="_blank"
              rel="noopener noreferrer"
              @click="dokumentationClicked = true"
            >Doku Archetype
              Backend</a>
          </li>
          <li>
            <a
              href="https://git.muenchen.de/ccse/refarch-archetype"
              target="_blank"
              rel="noopener noreferrer"
              @click="dokumentationClicked = true"
            >Git-Repo Archetypes</a>
          </li>
          <li>
            <a
              href="https://wiki.muenchen.de/anwendungsentwicklung/index.php/JavaScript-Themen"
              target="_blank"
              rel="noopener noreferrer"
              @click="dokumentationClicked = true"
            >Javascript-Wiki</a>
          </li>
        </ul>
      </v-flex>
    </v-layout>
    <yes-no-dialog
      v-model="saveLeaveDialog"
      dialogtitle="Wirklich verlassen?"
      dialogtext="Wollen Sie wirklich nicht die Dokumentation anschauen?"
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

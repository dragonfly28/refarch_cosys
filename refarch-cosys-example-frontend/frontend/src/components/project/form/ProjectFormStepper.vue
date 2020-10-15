<template>
  <div>
    <v-stepper
      v-model="currentStep"
      :vertical="!horizontal"
      class="elevation-0"
    >
      <template v-if="!horizontal">
        <v-stepper-step
          :complete="currentStep > 1"
          :step="1"
          :editable="editable"
          :rules="[() => currentStep <= 1 || basicValid]"
        >
          Allgemein
          <small v-if="currentStep > 1 && !basicValid" style="margin-top: 4px;">
            Fehlerhafte Eingaben
          </small>
        </v-stepper-step>
        <v-stepper-content :step="1">
          <project-form-basic
            v-model="value"
            @valid="basicValid = $event"
          ></project-form-basic>

          <div class="d-flex justify-end">
            <v-btn text @click="cancel" class="ml-auto">
              Abbrechen
            </v-btn>
            <v-btn
              color="primary"
              @click="currentStep = 2"
              :disabled="!editable && !basicValid"
            >
              Weiter
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          :complete="currentStep > 2"
          :step="2"
          :editable="editable"
          :rules="[() => currentStep <= 2 || architectureValid]"
        >
          Architektur
          <small
            v-if="currentStep > 2 && !architectureValid"
            style="margin-top: 4px;"
          >
            Fehlerhafte Eingaben
          </small>
        </v-stepper-step>
        <v-stepper-content :step="2">
          <project-form-architecture
            v-model="value"
            @valid="architectureValid = $event"
            :docs="docs"
          />
          <div class="d-flex justify-end">
            <v-btn text @click="currentStep = 1" v-if="editable">
              Zurück
            </v-btn>
            <v-btn text @click="cancel" class="ml-auto">
              Abbrechen
            </v-btn>
            <v-btn
              color="primary"
              @click="currentStep = 3"
              :disabled="!editable && !architectureValid"
            >
              Weiter
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          :complete="currentStep > 3"
          :step="3"
          :editable="editable"
        >
          Besonderheiten
        </v-stepper-step>
        <v-stepper-content :step="3">
          <project-form-features
            v-model="value.features"
          ></project-form-features>
          <div class="d-flex justify-end">
            <v-btn text @click="currentStep = 2" v-if="editable">
              Zurück
            </v-btn>
            <v-btn text @click="cancel" class="ml-auto">
              Abbrechen
            </v-btn>
            <v-btn color="primary" @click="currentStep = 4">
              Weiter
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step
          :complete="currentStep > 4"
          :step="4"
          :editable="editable"
        >
          Mitglieder
        </v-stepper-step>
        <v-stepper-content :step="4">
          <project-form-members
            :memberships="memberships"
          ></project-form-members>
          <div class="d-flex justify-end">
            <v-btn text @click="currentStep = 3" v-if="editable">
              Zurück
            </v-btn>
            <v-btn text @click="cancel" class="ml-auto">
              Abbrechen
            </v-btn>
            <v-btn
              color="primary"
              @click="save()"
              :disabled="!allValid"
              :loading="saving"
            >
              Speichern
            </v-btn>
          </div>
        </v-stepper-content>
      </template>

      <template v-else>
        <v-stepper v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step
              :complete="currentStep > 1"
              :editable="editable"
              step="1"
              :rules="[() => currentStep <= 1 || basicValid]"
            >
              Allgemein
              <small
                v-if="currentStep > 1 && !basicValid"
                style="margin-top: 4px;"
              >
                Fehlerhafte Eingaben
              </small>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              :complete="currentStep > 2"
              :editable="editable"
              step="2"
              :rules="[() => currentStep <= 2 || architectureValid]"
            >
              Architektur
              <small
                v-if="currentStep > 2 && !architectureValid"
                style="margin-top: 4px;"
              >
                Fehlerhafte Eingaben
              </small>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              :complete="currentStep > 3"
              :editable="editable"
              step="3"
              >Besonderheiten</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step step="4" :editable="editable"
              >Mitglieder</v-stepper-step
            >
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <project-form-basic
                v-model="value"
                @valid="basicValid = $event"
              ></project-form-basic>
              <div class="d-flex justify-end">
                <v-btn text @click="cancel" class="ml-auto">
                  Abbrechen
                </v-btn>
                <v-btn
                  color="primary"
                  @click="currentStep = 2"
                  :disabled="!editable && !basicValid"
                >
                  Weiter
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <project-form-architecture
                v-model="value"
                @valid="architectureValid = $event"
                :docs="docs"
              ></project-form-architecture>
              <div class="d-flex justify-end">
                <v-btn text @click="currentStep = 1" v-if="editable">
                  Zurück
                </v-btn>
                <v-btn text @click="cancel" class="ml-auto">
                  Abbrechen
                </v-btn>
                <v-btn
                  color="primary"
                  @click="currentStep = 3"
                  :disabled="!editable && !architectureValid"
                >
                  Weiter
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <project-form-features
                v-model="value.features"
              ></project-form-features>
              <div class="d-flex justify-end">
                <v-btn text @click="currentStep = 2" v-if="editable">
                  Zurück
                </v-btn>
                <v-btn text @click="cancel" class="ml-auto">
                  Abbrechen
                </v-btn>
                <v-btn color="primary" @click="currentStep = 4">
                  Weiter
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="4">
              <project-form-members
                :memberships="memberships"
              ></project-form-members>
              <div class="d-flex justify-end">
                <v-btn text @click="currentStep = 3" v-if="editable">
                  Zurück
                </v-btn>
                <v-btn text @click="cancel()" class="ml-auto">
                  Abbrechen
                </v-btn>
                <v-btn
                  color="primary"
                  @click="save()"
                  :disabled="!allValid"
                  :loading="saving"
                >
                  Speichern
                </v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </template>
    </v-stepper>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ProjectFormBasic from "@/components/project/form/ProjectFormBasic.vue";
import ProjectFormArchitecture from "@/components/project/form/ProjectFormArchitecture.vue";
import ProjectFormFeatures from "@/components/project/form/ProjectFormFeatures.vue";
import ProjectFormMembers from "@/components/project/form/ProjectFormMembers.vue";
import { Project } from "@/types/Project";
import Membership from "@/types/Membership";
import DeltaList from "@/utils/DeltaList";

@Component({
  components: {
    ProjectFormBasic,
    ProjectFormArchitecture,
    ProjectFormFeatures,
    ProjectFormMembers,
  },
})
export default class ProjectFormStepper extends Vue {
  currentStep = 1;

  get horizontal() {
    return this.$store.getters.isHorizontalStepper;
  }

  get editable() {
    return this.$store.getters.isEditableStepper;
  }

  @Prop({ type: Boolean, default: false })
  saving!: boolean;
  @Prop({ required: true })
  value!: Project;
  @Prop({ required: true })
  docs!: DeltaList<Document>;
  @Prop({ required: true })
  memberships!: DeltaList<Membership>;
  basicValid: boolean = false;
  architectureValid: boolean = false;

  @Watch("horizontal")
  onHorizontalChange() {
    this.currentStep = 2;
    requestAnimationFrame(() => (this.currentStep = 1)); // Workarounds
  }

  save() {
    this.$emit("save");
  }

  cancel() {
    this.$emit("cancel");
  }

  get allValid() {
    return this.basicValid && this.architectureValid;
  }
}
</script>

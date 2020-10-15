<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title class="headline">
        Besonderheit bearbeiten
      </v-card-title>
      <v-card-text>
        <v-form v-model="formValid" ref="form" lazy-validation>
          <configurable-v-text-field
            maxlength="20"
            counter="20"
            label="Name"
            v-model="featureCopy.name"
            :rules="[RULE_REQUIRED]"
          />
          <configurable-v-textarea
            maxlength="500"
            counter="500"
            label="Beschreibung"
            v-model="featureCopy.description"
            :rules="[RULE_REQUIRED]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel" text>Abbrechen</v-btn>
        <v-btn @click="save" text :loading="loading" color="primary"
          >Speichern</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import Feature from "@/types/Feature";
import rulesMixin from "@/mixins/rulesMixin";
import ConfigurableVTextField from "@/components/inputs/ConfigurableVTextField.vue";
import ConfigurableVTextarea from "@/components/inputs/ConfigurableVTextarea.vue";

@Component({
  components: { ConfigurableVTextarea, ConfigurableVTextField },
})
export default class FeatureDialog extends Mixins(rulesMixin) {
  @Prop()
  show!: boolean;

  @Prop({ default: () => false })
  loading!: boolean;

  @Prop()
  feature?: Feature;

  @Ref("form")
  form!: any;

  private featureCopy?: Feature = { name: "", description: "" };

  private formValid: boolean = false;

  @Prop()
  index?: number;

  private save(): void {
    if (this.form) {
      if (!this.form.validate()) return;
      this.$emit("save", this.featureCopy, this.index);
    }
  }

  private cancel(): void {
    this.$emit("cancel");
  }

  @Watch("feature")
  private copyFeatureProp(): void {
    this.featureCopy = { ...this.feature };
  }

  @Watch("show")
  private resetDialog(): void {
    if (this.form) this.form.resetValidation();
  }
}
</script>

<style scoped></style>

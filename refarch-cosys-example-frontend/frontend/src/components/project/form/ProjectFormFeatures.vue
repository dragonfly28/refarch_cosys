<template>
  <div>
    <feature-list
      v-model="value"
      @createFeature="showFeatureDialog"
      @editFeature="showFeatureDialog"
      @removeFeature="removeFeature"
    />
    <feature-dialog
      :feature="featureToEdit"
      :show="dialogVisible"
      :index="indexToEdit"
      @cancel="dialogVisible = false"
      @save="saveFeature"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Feature from "@/types/Feature";
import FeatureDialog from "@/components/project/FeatureDialog.vue";
import FeatureList from "@/components/project/FeatureList.vue";

@Component({
  components: {
    FeatureList,
    FeatureDialog,
  },
})
export default class ProjectFormFeatures extends Vue {
  dialogVisible = false;
  featureToEdit: Feature = {};
  indexToEdit = -1;

  @Prop()
  value!: Feature[];

  removeFeature(_: undefined, index: number) {
    this.value.splice(index, 1);
  }

  showFeatureDialog(feature: Feature = {}, index = -1) {
    this.featureToEdit = feature;
    this.indexToEdit = index;
    this.dialogVisible = true;
  }

  saveFeature(feature: Feature, index: number) {
    if (index > -1) {
      this.value.splice(index, 1, feature);
    } else {
      this.value.push(feature);
    }
    this.dialogVisible = false;
  }
}
</script>

<template>
  <div>
    <!-- Feature-List -->
    <div v-if="!!value && value.length > 0">
      <div class="d-flex justify-end">
        <v-btn small color="primary" @click="$emit('createFeature')">
          <v-icon left small>mdi-plus</v-icon>
          Erfassen
        </v-btn>
      </div>
      <v-list two-line>
        <template v-for="(feature, index) in value">
          <v-list-item :key="`${feature.name}-${feature.description}`">
            <v-list-item-avatar>
              <v-avatar color="grey">
                <v-icon color="white">mdi-clipboard-text</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ feature.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ feature.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-row>
                <v-btn icon @click="$emit('editFeature', feature, index)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="$emit('removeFeature', feature, index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            inset
            v-if="index + 1 < value.length"
            :key="`${feature.name}-${feature.description}-divider`"
          ></v-divider>
        </template>
      </v-list>
    </div>
    <!-- Empty State -->
    <div class="d-flex align-center flex-column" v-else>
      <v-avatar color="#EEEEEE" size="128">
        <v-icon size="64" color="#00000099">
          mdi-text-box-multiple-outline
        </v-icon>
      </v-avatar>
      <div class="headline">
        Keine Besonderheiten erfasst
      </div>
      <div class="body-1">
        Erfasste Besonderheiten werden hier angezeigt.
      </div>
      <v-btn
        text
        link
        color="primary"
        class="mt-4"
        @click="$emit('createFeature')"
      >
        Besonderheit erfassen
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Feature from "@/types/Feature";

/**
 * Props:
 * - value: Feature[]
 * Events:
 * - createFeature()
 * - editFeature(feature: Feature, index: number)
 * - removeFeature(feature: Feature, index: number)
 */
@Component({})
export default class FeatureList extends Vue {
  @Prop({ default: () => [] })
  value!: Feature[];
}
</script>

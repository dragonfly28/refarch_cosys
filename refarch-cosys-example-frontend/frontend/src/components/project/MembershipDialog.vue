<template>
  <div>
    <v-dialog width="600px" v-model="membershipDialogVisible" persistent>
      <v-form lazy-validation ref="form">
        <v-card class="px-4">
          <v-card-title v-if="!editing">Projektmitglied</v-card-title>
          <v-card-title v-else>
            {{ name }}
          </v-card-title>
          <v-card-text>
            <person-auto-complete
              v-model="editedMembership.person"
              v-if="!editing"
              :rules="[RULE_REQUIRED]"
              :memberships="internalMemberships"
              :membershipDialogVisible="membershipDialogVisible"
            />
            <v-row>
              <v-col cols="4">
                <configurable-v-select
                  :items="membershipStateItems"
                  :rules="[RULE_REQUIRED]"
                  chips
                  label="Status*"
                  v-model="editedMembership.state"
                >
                  <template #selection="selectedData">
                    <membership-status-chip :status="selectedData.item" />
                  </template>
                </configurable-v-select>
              </v-col>
              <v-col cols="8">
                <configurable-v-select
                  :items="membershipRoleNamesItems"
                  multiple
                  chips
                  clearable
                  label="Rollen"
                  v-model="editedMembership.roles"
                >
                  <template #selection="selectedData">
                    <v-chip
                      :key="JSON.stringify(selectedData.item)"
                      v-bind="selectedData.attrs"
                      :input-value="selectedData.selected"
                      :disabled="selectedData.disabled"
                      close
                      @click:close="
                        selectedData.parent.selectItem(selectedData.item)
                      "
                      >{{ selectedData.item.text }}</v-chip
                    >
                  </template>
                </configurable-v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="$emit('cancel')">Abbrechen</v-btn>
            <v-btn text color="primary" @click="save" :loading="isLoading">
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import { Person } from "@/types/Person";
import Membership from "@/types/Membership";
import rulesMixin from "@/mixins/rulesMixin";
import PersonAutoComplete from "@/components/inputs/PersonAutoComplete.vue";
import {
  membershipStateTypes,
  membershipRolesNames,
} from "@/constants/constants";
import ConfigurableVSelect from "@/components/inputs/ConfigurableVSelect.vue";
import MembershipStatusChip from "@/components/project/MembershipStatusChip.vue";
import DeltaList from "@/utils/DeltaList";

@Component({
  components: {
    PersonAutoComplete,
    ConfigurableVSelect,
    MembershipStatusChip,
  },
})
export default class MembershipDialog extends Mixins(rulesMixin) {
  @Ref("form")
  form!: any;
  @Prop()
  membershipDialogVisible!: boolean;
  @Prop({ default: () => false })
  editing!: boolean;
  @Prop()
  isLoading!: boolean;
  @Prop()
  editedMembership!: Membership;
  @Prop()
  editedIndex!: number;
  @Prop()
  memberships!: Membership[] | DeltaList<Membership>;
  persons: Person[] = [];
  membershipStateItems = membershipStateTypes;
  membershipRoleNamesItems = membershipRolesNames;

  get firstname(): string {
    return this.editedMembership.person
      ? this.editedMembership.person.firstname
      : "";
  }

  get name(): string {
    return this.editedMembership.person
      ? this.editedMembership.person.firstname +
          " " +
          this.editedMembership.person.name
      : "";
  }

  save() {
    if (!this.form.validate()) return;
    this.$emit("save", this.editedMembership, this.editedIndex);
  }

  @Watch("membershipDialogVisible")
  onVisibilityChange() {
    // wird benötigt, da am anfang this.Form nicht definiert ist.
    if (this.form) {
      this.form.resetValidation();
    }
  }

  get internalMemberships() {
    if (this.memberships instanceof DeltaList) {
      return this.memberships.all
        .filter((element) => element.state !== "REMOVED")
        .map((element) => element.value);
    }
    return this.memberships;
  }
}
</script>

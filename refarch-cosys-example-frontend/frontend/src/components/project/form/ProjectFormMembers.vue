<template>
  <div>
    <member-list
      @showMembershipDialog="showMembershipDialog"
      @showDeleteMembershipDialog="removeMembership"
      :memberships="memberships"
      :showMembershipDialog="showMembershipDialog"
    />
    <membership-dialog
      @save="saveMembership"
      @cancel="membershipDialogVisible = false"
      :membershipDialogVisible="membershipDialogVisible"
      :editing="editing"
      :isLoading="isLoading"
      :editedMembership="editedMembership"
      :editedIndex="editedIndex"
      :memberships="memberships"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Membership from "@/types/Membership";
import { Person } from "@/types/Person";
import MembershipDialog from "@/components/project/MembershipDialog.vue";
import MemberList from "@/components/project/MemberList.vue";
import DeltaList from '@/utils/DeltaList';

@Component({
  components: {
    MembershipDialog,
    MemberList,
  },
})
export default class ProjectFormMembers extends Vue {
  headers = [
    "Vorname",
    "Nachname",
    "E-Mail-Adresse",
    "Rollen",
    "Status",
    "Aktionen",
  ];
  membershipDialogVisible = false;
  editedMembership: Membership = {};
  editedIndex = -1;
  isLoading = false;

  @Prop({ required: true })
  memberships!: DeltaList<Membership>;
  persons: Person[] = [];
  editing: boolean = false;

  showMembershipDialog(editedMembership: Membership = {}, editedIndex = -1) {
    this.editing = editedIndex >= 0;
    this.editedMembership = {
      id: editedMembership.id,
      personId: editedMembership.personId,
      roles: editedMembership.roles,
      state: editedMembership.state,
      person: editedMembership.person ? editedMembership.person : null,
    };
    this.editedIndex = editedIndex;
    this.membershipDialogVisible = true;
  }

  saveMembership(editedMembership: Membership, index: number) {
    this.editedMembership.person = editedMembership.person;
    this.editedMembership.personId = this.editedMembership.person!.id;
    if (this.editedIndex > -1) {
      this.memberships.replaceAtIndex(this.editedMembership, index);
    } else {
      this.memberships.push(this.editedMembership);
    }
    this.membershipDialogVisible = false;
  }

  removeMembership(deletedMembership: Membership, index: number) {
    this.memberships.removeAtIndex(index);
  }

}
</script>

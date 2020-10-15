<template>
  <div>
    <member-list
      @showMembershipDialog="showMembershipDialog"
      @showDeleteMembershipDialog="showDeleteMembershipDialog"
      :memberships="memberships"
      :membersLoading="membersLoading"
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
    ></membership-dialog>
    <delete-dialog
      v-model="deleteMembershipModel"
      @delete="removeMembership"
      :isLoadingAnimation="isLoading"
      :descriptorString="nameToString()"
    >
    </delete-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import MembershipService from "@/api/MembershipService";
import Membership from "@/types/Membership";
import { Person } from "@/types/Person";
import MembershipDialog from "@/components/project/MembershipDialog.vue";
import MemberList from "@/components/project/MemberList.vue";
import DeleteDialog from "@/components/util/DeleteDialog.vue";

@Component({
  components: {
    MembershipDialog,
    MemberList,
    DeleteDialog,
  },
})
export default class ProjectTabMembers extends Vue {
  @Prop()
  projectId!: string;

  deleteMembershipModel = false;
  membershipDialogVisible = false;
  editedMembership: Membership = {};
  editedIndex = -1;
  editing = false;
  memberships: Membership[] = [];
  membershipToDelete: Membership = {};
  indexToDelete: number = 0;
  persons: Person[] = [];
  membersLoading: boolean = false;
  isLoading = false;

  mounted() {
    this.getAllMemberships(this.projectId);
  }

  // sobald in der Wiedervorlage ein anderes Projekt ausgewählt wird
  @Watch("projectId")
  updateMemberships() {
    this.memberships = [];
    this.getAllMemberships(this.projectId);
  }

  nameToString() {
    if (this.membershipToDelete.person) {
      return (
        this.membershipToDelete.person.firstname +
        " " +
        this.membershipToDelete.person.name
      );
    } else {
      return "";
    }
  }

  getMember(id: string): Promise<Person> {
    return MembershipService.getMember(id)
      .catch((error: any) => {
        this.$store.dispatch("snackbar/showMessage", error);
      })
      .then((response: any) => {
        if (response) {
          return response;
        }
      });
  }

  async getAllMemberships(id: string) {
    this.membersLoading = true;
    try {
      const response = await MembershipService.getMemberships(id);
      for (let membership of response._embedded.memberships) {
        const member: Person = await this.getMember("" + membership.id);
        this.memberships.push({
          person: member,
          roles: membership.roles,
          state: membership.state,
          personId: membership.personId,
          projectId: membership.projctId,
          id: membership.id,
        });
      }
    } catch (error) {
      this.$store.dispatch("snackbar/showMessage", error);
    }
    this.membersLoading = false;
  }

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

  showDeleteMembershipDialog(membershipDel: Membership, index: number) {
    this.indexToDelete = index;
    this.membershipToDelete = {
      id: membershipDel.id,
      personId: membershipDel.personId,
      roles: membershipDel.roles,
      state: membershipDel.state,
      person: membershipDel.person,
    };
    this.deleteMembershipModel = true;
  }

  async saveMembership(editedMembership: Membership, index: number) {
    this.editedMembership = editedMembership;
    this.editedIndex = index;
    this.isLoading = true;
    this.editedMembership.personId = this.editedMembership.person!.id;
    if (!this.editing) {
      this.editedMembership.id = await MembershipService.postMembership({
        id: this.editedMembership.id,
        state: this.editedMembership.state,
        roles: this.editedMembership.roles,
        projectId: parseInt(this.projectId),
        personId: this.editedMembership.personId,
      });
    } else {
      await MembershipService.putMembership(this.editedMembership);
    }
    if (this.editedIndex > -1) {
      this.memberships.splice(this.editedIndex, 1, this.editedMembership);
    } else {
      this.memberships.push(this.editedMembership);
    }
    this.isLoading = false;
    this.membershipDialogVisible = false;
  }

  async removeMembership() {
    this.isLoading = true;
    this.memberships.splice(this.indexToDelete, 1);
    await MembershipService.deleteMembership(this.membershipToDelete.id + "");
    this.isLoading = false;
    this.deleteMembershipModel = false;
  }
}
</script>

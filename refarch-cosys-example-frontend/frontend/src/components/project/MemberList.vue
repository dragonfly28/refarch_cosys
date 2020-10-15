<template>
  <div>
    <div v-if="membersLoading">
      <v-skeleton-loader type="table"></v-skeleton-loader>
    </div>
    <div v-else>
      <div class="d-flex justify-end" v-if="memberships.length > 0">
        <v-btn class="mt-2" small color="primary" @click="showMembershipDialog">
          <v-icon left small>mdi-plus</v-icon>Erfassen
        </v-btn>
      </div>
      <v-simple-table v-if="memberships.length > 0" class="mb-4">
        <template #default>
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="membership in internalMemberships"
              :key="JSON.stringify(membership)"
            >
              <td>
                {{ membership.value.person.firstname }}
                {{ membership.value.person.name }}
              </td>
              <td>{{ membership.value.person.email }}</td>
              <td>
                <v-chip
                  v-for="role in membership.value.roles"
                  :key="JSON.stringify(membership) + role"
                  >{{ membershipRoleNamesItems[role] }}</v-chip
                >
              </td>
              <td>
                <membership-status-chip :status="membership.value.state" />
              </td>
              <td>
                <v-btn
                  icon
                  @click="
                    $emit(
                      'showMembershipDialog',
                      membership.value,
                      membership.index
                    )
                  "
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="
                    $emit(
                      'showDeleteMembershipDialog',
                      membership.value,
                      membership.index
                    )
                  "
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="d-flex align-center flex-column" v-else>
        <v-avatar color="#EEEEEE" size="128">
          <v-icon size="64" color="#00000099">mdi-account</v-icon>
        </v-avatar>
        <div class="headline">Keine Mitglieder erfasst</div>
        <div class="body-1">
          Erfasste Projektmitglieder werden hier angezeigt.
        </div>
        <v-btn
          text
          link
          color="primary"
          class="mt-4"
          @click="showMembershipDialog"
          >Mitglied erfassen</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Membership from "../../types/Membership";
import MembershipStatusChip from "@/components/project/MembershipStatusChip.vue";
import { membershipRolesNamesMap } from "@/constants/constants";
import DeltaList from "@/utils/DeltaList";

@Component({
  components: {
    MembershipStatusChip,
  },
})
export default class MemberList extends Vue {
  headers = ["Name", "E-Mail-Adresse", "Rollen", "Status", "Aktionen"];
  @Prop()
  memberships!: Membership[] | DeltaList<Membership>;
  @Prop()
  membersLoading!: boolean;
  @Prop()
  showMembershipDialog!: boolean;
  membershipRoleNamesItems = membershipRolesNamesMap;

  get internalMemberships() {
    if (this.memberships instanceof DeltaList) {
      return this.memberships.all
        .map((element, index) => ({
          element: element,
          index: index,
        }))
        .filter((elementHolder) => elementHolder.element.state !== "REMOVED")
        .map((elementHolder) => ({
          value: elementHolder.element.value,
          index: elementHolder.index,
        }));
    }
    return this.memberships.map((membership, index) => ({
      value: membership,
      index: index,
    }));
  }
}
</script>

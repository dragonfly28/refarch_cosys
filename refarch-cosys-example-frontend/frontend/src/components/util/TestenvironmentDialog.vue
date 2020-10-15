<template>
  <v-dialog v-model="value" max-width="600" @click:outside="cancel()">
    <v-card id="dialogCard">
      <v-card-title class="pl-2 headline">Testumgebung</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <p class="heading mt-0 mb-0">
                Adresse der Website
              </p>
            </v-row>
            <v-row class="d-flex flex-row align-center">
              <a :href="project.testEnvironmentLink">
                {{ project.testEnvironmentLink }}
              </a>
              <v-btn icon @click="openLink(project.testEnvironmentLink)">
                <v-icon medium>mdi-open-in-new </v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="project.testEnvironmentUser">
            <v-row>
              <p class="heading mt-0 mb-0">Benutzer</p>
            </v-row>
            <v-row class="d-flex flex-row align-center">
              <p class="font-weight-bold mt-0 mb-0">
                {{ project.testEnvironmentUser }}
              </p>
              <v-btn icon @click="copyToClipboard(project.testEnvironmentUser)"
                ><v-icon>mdi-content-copy </v-icon></v-btn
              >
            </v-row>
          </v-col>
          <v-col v-if="project.testEnvironmentPassword">
            <v-row>
              <p class="heading mt-0 mb-0">Passwort</p>
            </v-row>
            <v-row>
              <div class="d-flex flex-row align-center">
                <p class="font-weight-bold mt-0 mb-0" id="pw">
                  {{ project.testEnvironmentPassword ? password : "" }}
                </p>
                <v-btn class="ml-2" icon @click="showPassword = !showPassword"
                  ><v-icon>{{ showPassword ? on : off }}</v-icon></v-btn
                >
                <v-btn
                  icon
                  @click="copyToClipboard(project.testEnvironmentPassword)"
                  ><v-icon>mdi-content-copy </v-icon></v-btn
                >
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel()">Okay</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Project } from "@/types/Project";

@Component({})
export default class TestEnvironmentDialog extends Vue {
  /**
   * Gibt an ob der Dialog gezeigt werden soll.
   */
  @Prop()
  value!: boolean;

  @Prop()
  project!: Project;
  showPassword = false;
  on = "mdi-eye";
  off = "mdi-eye-off";

  private cancel() {
    this.$emit("input", false);
  }

  copyToClipboard(copyValue: any) {
    const input = document.createElement("input");
    input.setAttribute("value", copyValue);
    const dialogCard = document.getElementById("dialogCard")!;
    dialogCard.appendChild(input);
    input.focus();
    input.select();
    document.execCommand("copy");
    dialogCard.removeChild(input);
  }

  openLink(url: string) {
    window.open(url, "_blank");
  }

  get password(): string {
    return this.showPassword
      ? this.project.testEnvironmentPassword!
      : "•".repeat(this.project.testEnvironmentPassword!.length);
  }
}
</script>

<style scoped>
.heading {
  font-size: 12px;
}
</style>

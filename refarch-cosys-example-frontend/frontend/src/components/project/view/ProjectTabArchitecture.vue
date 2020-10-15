<template>
  <div>
    <v-subheader class="subtitle-1">Technologien</v-subheader>
    <span class="pl-4" v-for="tech in project.techs" :key="tech"
      ><v-chip>{{ tech }}</v-chip></span
    >
    <v-divider class="mt-4"></v-divider>
    <v-subheader class="subtitle-1">Aufbau</v-subheader>
    <p class="pl-4">{{ project.aufbau }}</p>
    <v-divider></v-divider>
    <v-subheader class="subtitle-1">Dokumente</v-subheader>
    <div v-if="documentLoading">
      <v-skeleton-loader type="card" width="150"></v-skeleton-loader>
    </div>
    <v-row short v-else>
      <v-col
        v-for="doc in documentsWithLink"
        :key="doc.filename"
        class="pa-3 d-flex flex-column"
        md="auto"
      >
        <v-card
          class="mx-auto d-flex flex flex-column mr-2"
          width="200"
          min-width="200"
        >
          <v-img class="white--text" max-height="150px" align="center">
            <v-icon size="150">mdi-file</v-icon></v-img
          >
          <div class="align-start">
            <v-card-subtitle>Dateiname: {{ doc.filename }}</v-card-subtitle>
          </div>
          <div class="mt-auto">
            <v-card-subtitle>Dateigröße: {{ doc.filesize }} </v-card-subtitle>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="openFile(doc.link)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn icon v-bind:href="doc.link"
              ><v-icon>mdi-download</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import DocumentService from "@/api/DocumentService";
import Document from "@/types/Document";
import { Project } from "@/types/Project";

@Component
export default class DetailviewArchitektur extends Vue {
  documentsWithLink: Object[] = [];
  @Prop()
  project!: Project;
  documentLoading: boolean = true;
  mounted() {
    this.getAllDocuments(this.project.id + "");
  }

  async getAllDocuments(id: string) {
    this.documentLoading = true;
    await DocumentService.getDocuments(id)
      .then((response: Array<Document>) => {
        if (response) {
          response.forEach((document: Document) => {
            this.documentsWithLink.push({
              link: DocumentService.createDocumentLink("" + document.id),
              filename: document.filename,
              filesize: this.getFilesize(document),
            });
          });
        }
      })
      .catch((error: any) => {
        this.$store.dispatch("snackbar/showMessage", error);
      });
    this.documentLoading = false;
  }

  getFilesize(document: Document) {
    if (document.filesize > 1024 * 1024) {
      return (
        Math.round((document.filesize / (1024 * 1024)) * 100) / 100 + " MB"
      );
    } else if (document.filesize > 1024) {
      return Math.round(document.filesize / 1024) + " KB";
    } else {
      return document.filesize + " Byte";
    }
  }

  openFile(docUrl: string) {
    window.open(docUrl, "_blank");
  }
}
</script>

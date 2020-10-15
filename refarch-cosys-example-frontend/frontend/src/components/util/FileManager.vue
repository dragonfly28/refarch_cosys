<template>
  <div>
    <v-subheader class="subtitle-1 px-0">Dateien</v-subheader>
    <v-list class="px-0">
      <template v-for="(docHolder, index) in docs.all">
        <v-list-item :key="`doc-${index}`">
          <v-list-item-avatar>
            <v-avatar :color="getColor(docHolder.state)">
              <v-icon
                v-text="getIcon(docHolder.state)"
                color="white"
                style="opacity: 87%;"
              />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              :class="{
                'green--text': docHolder.state === 'ADDED',
                'red--text': docHolder.state === 'REMOVED',
                'blue--text': docHolder.state === 'EDITED',
              }"
            >
              {{ docHolder.value.filename }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ docHolder.value.filesize }} Byte
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-row v-if="docHolder.state === 'UNCHANGED'">
              <v-btn icon @click="openFileDialog(index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="removeFile(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>
            <v-row v-else>
              <v-btn icon @click="revertFile(index)">
                <v-icon>mdi-undo</v-icon>
              </v-btn>
            </v-row>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          inset
          :key="`doc-divider-${index}`"
          v-if="index < docs.length - 1"
        />
      </template>
      <div
        class="d-flex align-center flex-column py-2 mx-4 drop-zone"
        :class="{
          'drag-over': isDragOver,
        }"
        @drag.prevent.stop
        @dragstart.prevent.stop
        @dragover.prevent.stop
        @dragend.prevent.stop
        @drop.prevent.stop="drop"
        @dragenter.prevent.stop="dragEnter"
        @dragleave.prevent.stop="dragLeave"
      >
        <v-file-input
          style="display: none;"
          ref="fileInput"
          v-model="fileInputFile"
        />
        <v-icon>mdi-tray-plus</v-icon>
        <div class="body-1">
          <a @click="openFileDialog">
            Datei auswählen
          </a>
          oder hierher ziehen
        </div>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import Document from "@/types/Document";
import DeltaList, { DeltaListElementState } from "@/utils/DeltaList";

@Component({})
export default class FileManager extends Vue {
  @Ref("fileInput")
  fileInput!: any;
  fileInputFile: File | null = null;

  @Prop({ required: true })
  docs!: DeltaList<Document>;
  editIndex: number = -1;

  isDragOver: boolean = false;

  getIcon(state: DeltaListElementState) {
    switch (state) {
      case DeltaListElementState.ADDED:
        return "mdi-file-plus";
      case DeltaListElementState.EDITED:
        return "mdi-file-edit";
      case DeltaListElementState.REMOVED:
        return "mdi-file-remove";
      default:
        return "mdi-file";
    }
  }

  getColor(state: DeltaListElementState) {
    switch (state) {
      case DeltaListElementState.ADDED:
        return "green";
      case DeltaListElementState.EDITED:
        return "blue";
      case DeltaListElementState.REMOVED:
        return "red";
      default:
        return "grey";
    }
  }

  removeFile(index: number) {
    this.docs.removeAtIndex(index);
  }

  revertFile(index: number) {
    this.docs.revertAtIndex(index);
  }

  openFileDialog(editIndex: number = -1) {
    this.editIndex = editIndex;
    if (this.fileInput) {
      this.fileInput.$refs.input.click();
    }
  }

  @Watch("fileInputFile")
  onFilesSelected() {
    if (this.fileInputFile) {
      const doc: Document = {
        file: this.fileInputFile,
        filename: this.fileInputFile.name,
        filesize: this.fileInputFile.size,
      };
      if (this.editIndex >= 0) {
        doc.id = this.docs.allValues[this.editIndex].id;
        this.docs.replaceAtIndex(doc, this.editIndex);
      } else {
        this.docs.push(doc);
      }
    }
  }

  drop(e: DragEvent) {
    if (e.dataTransfer && e.dataTransfer.files.length === 1) {
      const file = e.dataTransfer.files.item(0)!;
      const doc: Document = {
        file: file,
        filename: file.name,
        filesize: file.size,
      };
      this.docs.push(doc);
    }
    this.isDragOver = false;
  }

  dragEnter() {
    this.isDragOver = true;
  }

  dragLeave() {
    this.isDragOver = false;
  }
}
</script>

<style scoped>
.drop-zone {
  border: 2px dashed rgba(158, 158, 158, 0.87); /* Gray 500 mit 87% Opacity */
}
/* IntelliJ behauptet .drag-over wäre ungenutzt, allerdings wird es über ein class-binding gesetzt */
.drop-zone.drag-over {
  border: 2px dashed #ff9800; /* Orange 500 */
}
.drag-over * {
  pointer-events: none; /* https://stackoverflow.com/a/18582960 */
}
</style>

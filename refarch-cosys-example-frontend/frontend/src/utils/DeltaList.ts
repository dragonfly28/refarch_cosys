export default class DeltaList<T> {
  private readonly elements: DeltaListElement<T>[];

  constructor(values: T[] = []) {
    this.elements = values.map(
      (value) =>
        new DeltaListElement<T>(
          DeltaListElementState.UNCHANGED,
          DeltaListElementState.UNCHANGED,
          value
        )
    );
  }

  push(...values: T[]) {
    this.elements.push(
      ...values.map(
        (value) =>
          new DeltaListElement<T>(
            DeltaListElementState.NONE,
            DeltaListElementState.ADDED, // state
            null, // oldValue
            value //newValue
          )
      )
    );
  }

  /**
   * Entfernt das Element an der angegebenen Stelle.
   * Handelt es sich um ein ursprünglich UNCHANGED Element,
   * wird es als zum Entfernen markiert (newState wird REMOVED).
   * Handelt es sich um ein neues Element (oldState NONE),
   * wird es jetzt schon entfernt, da es ohnehin bisher noch
   * nicht persistiert wurde.
   * @param index Index des zu entfernenden Elements
   */
  removeAtIndex(index: number) {
    const element = this.elements[index];
    if (element.oldState === DeltaListElementState.UNCHANGED) {
      element.newState = DeltaListElementState.REMOVED;
    } else if (element.oldState === DeltaListElementState.NONE) {
      this.elements.splice(this.elements.indexOf(element), 1);
    }
  }

  replaceAtIndex(value: T, index: number) {
    const element = this.elements[index];
    if (element.state !== "ADDED") {
      element.newState = DeltaListElementState.EDITED;
    }
    element.newValue = value;
  }

  revertAtIndex(index: number) {
    const element = this.elements[index];
    if (element.oldState === DeltaListElementState.NONE) {
      this.removeAtIndex(index);
    } else if (element.oldState === DeltaListElementState.UNCHANGED) {
      element.newState = DeltaListElementState.UNCHANGED;
      element.newValue = element.oldValue;
    }
  }

  get all() {
    return this.elements;
  }
  get allValues() {
    return this.elements.map((element) => element.value);
  }

  get unchanged() {
    return this.elements.filter(
      (element) => element.state === DeltaListElementState.UNCHANGED
    );
  }
  get unchangedValues() {
    return this.unchanged.map((element) => element.value);
  }

  get removed() {
    return this.elements.filter(
      (element) => element.state === DeltaListElementState.REMOVED
    );
  }
  get removedValues() {
    return this.removed.map((element) => element.value);
  }

  get edited() {
    return this.elements.filter(
      (element) => element.state === DeltaListElementState.EDITED
    );
  }
  get editedValues() {
    return this.edited.map((element) => element.value);
  }

  get added() {
    return this.elements.filter(
      (element) => element.state === DeltaListElementState.ADDED
    );
  }
  get addedValues() {
    return this.added.map((element) => element.value);
  }

  get length() {
    return this.elements.length;
  }
}

export class DeltaListElement<T> {
  readonly oldState: DeltaListElementState;
  newState: DeltaListElementState;
  readonly oldValue: T | null;
  newValue: T | null;

  /**
   * Erstellt ein neues DeltaListElement.
   * Für UNCHANGED, REMOVED und EDITED darf oldValue nicht null sein.
   * Für ADDED und EDITED darf newValue nicht null sein.
   * @param oldState Ursprünglicher Zustand des Elements, entweder UNCHANGED oder NONE
   * @param newState Neuer Zustand des Elements
   * @param oldValue Ursprünglicher Wert, um im Fall von EDITED reverten zu können
   * @param newValue Neuer Wert, der beim Persistieren übernommen werden soll
   */
  constructor(
    oldState: DeltaListElementState,
    newState: DeltaListElementState,
    oldValue: T | null = null,
    newValue: T | null = null
  ) {
    this.oldValue = oldValue;
    this.newValue = newValue;
    this.oldState = oldState;
    this.newState = newState;
  }

  get value(): T {
    switch (this.state) {
      case DeltaListElementState.UNCHANGED:
      // Fall through
      case DeltaListElementState.REMOVED:
        return this.oldValue!;
      case DeltaListElementState.ADDED:
      // Fall through
      case DeltaListElementState.EDITED:
        return this.newValue!;
    }
    throw Error("Illegaler State");
  }

  get state() {
    return this.newState;
  }
}

export enum DeltaListElementState {
  NONE = "NONE",
  UNCHANGED = "UNCHANGED",
  ADDED = "ADDED",
  EDITED = "EDITED",
  REMOVED = "REMOVED",
}

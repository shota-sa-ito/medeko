import type { PreinitializedWritableAtom } from 'nanostores';
import { atom } from 'nanostores';

type Atom<Value> = PreinitializedWritableAtom<Value>;

export interface SelectedImageStore {
  cropper: Atom<Cropper | null>;
  previewUrl: Atom<string | null>;
  history: Atom<Cropper.Data[]>;
  historyIndex: Atom<number>;
  croppedBlob: Atom<Blob | null>;
}

export const selectedInnerImageStore: SelectedImageStore = {
  cropper: atom(null),
  previewUrl: atom(null),
  history: atom([]),
  historyIndex: atom(-1),
  croppedBlob: atom(null),
};

export const selectedOuterImageStore: SelectedImageStore = {
  cropper: atom(null),
  previewUrl: atom(null),
  history: atom([]),
  historyIndex: atom(-1),
  croppedBlob: atom(null),
};

import { createSignal, onMount } from 'solid-js';
import { useStore } from '@nanostores/solid';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import {
  selectedInnerImageStore,
  selectedOuterImageStore,
} from '@/pages/_states/selected-image';
import * as stylex from '@stylexjs/stylex';

export interface ImageSelectorProps {
  type: 'inner' | 'outer';
}

/**
 * 画像選択とトリミングを行うコンポーネント
 */
export default function ImageSelector(props: ImageSelectorProps) {
  const selectedImageStore =
    props.type === 'inner'
      ? selectedInnerImageStore // 内側画像
      : selectedOuterImageStore; // 外側画像

  const $cropper = useStore(selectedImageStore.cropper);
  const $previewUrl = useStore(selectedImageStore.previewUrl);
  const $history = useStore(selectedImageStore.history);
  const $historyIndex = useStore(selectedImageStore.historyIndex);

  const [getPreviewImgEl, setPreviewImgEl] = createSignal(
    null as HTMLImageElement | null,
  );

  /**
   * 現在の画像状態を保存する
   */
  const saveImage = (cropData: Cropper.Data) => {
    const newHistory = [...$history().slice(0, $historyIndex() + 1), cropData];
    selectedImageStore.history.set(newHistory);
    selectedImageStore.historyIndex.set(newHistory.length - 1);
  };

  /**
   * 指定されたインデックスの画像状態に更新する
   */
  const updateImageHistory = (index: number) => {
    selectedImageStore.historyIndex.set(index);
    const historyItem = $history()[index];
    if (historyItem) $cropper()?.setData(historyItem);
  };

  /**
   * Cropper インスタンスを初期化する
   */
  const initCropper = () => {
    const cropper = $cropper();
    cropper?.destroy();

    // 画像プレビュー要素が存在しない場合は処理を中断
    const previewImgEl = getPreviewImgEl();
    if (!previewImgEl) {
      return;
    }

    // プレビュー画像 URL が存在しない場合は処理を中断
    const previewUrl = $previewUrl();
    if (!previewUrl) {
      return;
    }

    const newCropper = new Cropper(previewImgEl, {
      aspectRatio: NaN,
      viewMode: 1,
      autoCrop: true,
      ready: () => {
        // 履歴が存在する場合は最新の履歴を適用する
        if ($historyIndex() !== -1) {
          updateImageHistory($historyIndex());
          return;
        }

        // 初期は全部分を選択状態にする
        const cropData = {
          ...newCropper!.getData(),
          width: previewImgEl.naturalWidth,
          height: previewImgEl.naturalHeight,
        };
        newCropper.setData(cropData);
        saveImage(cropData);
      },
      cropend: () => {
        const cropData = newCropper!.getData();
        if (cropData) saveImage(cropData);
      },
    });

    selectedImageStore.cropper.set(newCropper);
  };

  /**
   * コンポーネントがマウントされた時 Cropper インスタンスを初期化する
   */
  onMount(() => {
    initCropper();
  });

  /**
   * ファイル選択時の処理
   */
  const onFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = ({ target }) => {
      const url = target?.result as string;
      if (!url) {
        return;
      }

      onResetImage();
      selectedImageStore.previewUrl.set(url);

      initCropper();
    };
    reader.readAsDataURL(file);
  };

  /**
   * 画像を元の状態にリセットする
   */
  const onResetImage = () => {
    selectedImageStore.cropper.set(null);
    selectedImageStore.previewUrl.set(null);
    selectedImageStore.history.set([]);
    selectedImageStore.historyIndex.set(-1);
  };

  /**
   * 画像編集を一つ前の状態に戻す
   */
  const onUndo = () => {
    const index = selectedImageStore.historyIndex.get();
    if (index > 0) {
      updateImageHistory(index - 1);
    }
  };

  /**
   * 画像編集を一つ後の状態に進める
   */
  const onRedo = () => {
    const nextIndex = selectedImageStore.historyIndex.get() + 1;
    if (nextIndex < selectedImageStore.history.get().length) {
      updateImageHistory(nextIndex);
    }
  };
  return (
    <div {...stylex.props(styles.imageUploadContainer)}>
      <div {...stylex.props(styles.imageUpload)}>
        <input
          type="file"
          accept="image/*"
          name={`${props.type}-image`}
          onChange={onFileChange}
        />
        <div {...stylex.props(styles.previewContainer)}>
          <img
            ref={setPreviewImgEl}
            src={$previewUrl() || ''}
            alt="画像プレビュー"
            {...stylex.props(styles.previewImage)}
            style={{
              display: $previewUrl() ? 'block' : 'none',
            }}
          />
        </div>
      </div>

      <div {...stylex.props(styles.buttonContainer)}>
        <button
          {...stylex.props(styles.button)}
          onClick={onResetImage}
          disabled={!$cropper()}
        >
          元の写真に戻す
        </button>
        <button
          {...stylex.props(styles.button)}
          onClick={onUndo}
          disabled={$historyIndex() <= 0}
        >
          元に戻す
        </button>
        <button
          {...stylex.props(styles.button)}
          onClick={onRedo}
          disabled={$historyIndex() >= $history().length - 1}
        >
          やり直し
        </button>
      </div>
    </div>
  );
}

const styles = stylex.create({
  imageUploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
  imageUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  previewContainer: {
    maxWidth: '300px',
    maxHeight: '300px',
    marginTop: '10px',
  },
  previewImage: {
    maxWidth: '300px',
    maxHeight: '300px',
    marginTop: '10px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '5px 10px',
    color: 'white',
    cursor: 'pointer',
    backgroundColor: '#4caf50',
    border: 'none',
    borderRadius: '3px',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

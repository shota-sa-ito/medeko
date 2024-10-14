import { resultImageStore } from '@/pages/_states/result-image';
import {
  selectedInnerImageStore,
  selectedOuterImageStore,
} from '@/pages/_states/selected-image';
import { createCropperArrayBuffer } from '@/pages/_utils/cropper';
import { actions } from 'astro:actions';

export function PickOuterGenerateButton() {
  const generate = async () => {
    const innerArrayBuffer = selectedInnerImageStore.croppedArrayBuffer.get();

    if (!innerArrayBuffer) {
      alert('ベースの画像が未選択です');
      return;
    }

    const outerArrayBuffer = await createCropperArrayBuffer(
      selectedOuterImageStore.cropper.get()!,
    );

    if (!outerArrayBuffer) {
      alert('推しの画像が未選択です');
      return;
    }

    // 画像生成処理
    const decoImage = await actions.generateDecoImage({
      inner: innerArrayBuffer,
      outer: outerArrayBuffer,
    });

    const url = decoImage.data?.url;

    if (!url) {
      alert('画像の生成に失敗しました');
      return;
    }

    // 画像をメモリに保存し画面遷移
    resultImageStore.url.set(url);
    window.swup.navigate('/result');
  };

  return <button onClick={generate}>作成する</button>;
}

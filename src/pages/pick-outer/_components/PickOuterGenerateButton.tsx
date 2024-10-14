import {
  selectedInnerImageStore,
  selectedOuterImageStore,
} from '@/pages/_states/selected-image';
import { createCropperBlob } from '@/pages/_utils/cropper';
import { actions } from 'astro:actions';

export function PickOuterGenerateButton() {
  const generate = async () => {
    const innerBlob = selectedInnerImageStore.croppedBlob.get();

    if (!innerBlob) {
      alert('ベースの画像が未選択です');
      return;
    }

    const outerBlob = await createCropperBlob(
      selectedOuterImageStore.cropper.get()!,
    );

    if (!outerBlob) {
      alert('推しの画像が未選択です');
      return;
    }

    // DEBUG
    console.log('innerBlob', innerBlob);
    console.log('outerBlob', outerBlob);

    // 画像生成処理
    await actions.generateDecoImage({
      inner: innerBlob,
      outer: outerBlob,
    });
  };

  return <button onClick={generate}>作成する</button>;
}

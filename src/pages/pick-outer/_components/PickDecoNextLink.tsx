import {
  selectedInnerImageStore,
  selectedOuterImageStore,
} from '@/pages/_states/selected-image';
import { createCropperBlob } from '@/pages/_utils/cropper';
import { useStore } from '@nanostores/solid';
import * as stylex from '@stylexjs/stylex';

export default function PickDecoNextLink() {
  const $cropper = useStore(selectedInnerImageStore.cropper);
  const isNextLinkDisabled = () => !$cropper();

  const onNext = async (event: Event) => {
    if (isNextLinkDisabled()) {
      event.preventDefault();
      alert('画像を選択してください。');
      return;
    }

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
  };

  return (
    <a
      href="/deco"
      onClick={onNext}
      {...stylex.props(styles.link, isNextLinkDisabled() && styles.disabled)}
    >
      カスタマイズ
    </a>
  );
}

const styles = stylex.create({
  link: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#45a049',
    },
  },
  disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

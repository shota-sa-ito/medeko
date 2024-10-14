import { selectedInnerImageStore } from '@/pages/_states/selected-image';
import { createCropperBlob } from '@/pages/_utils/cropper';
import { useStore } from '@nanostores/solid';
import * as stylex from '@stylexjs/stylex';

export default function PickInnerNextLink() {
  const $cropper = useStore(selectedInnerImageStore.cropper);
  const isNextLinkDisabled = () => !$cropper();

  const onNext = async (event: Event) => {
    if (isNextLinkDisabled()) {
      event.preventDefault();
      alert('画像を選択してください。');
      return;
    }

    // Blob を生成して保存
    const innerBlob = await createCropperBlob($cropper()!);
    selectedInnerImageStore.croppedBlob.set(innerBlob);
  };

  return (
    <a
      href="/pick-outer"
      onClick={onNext}
      {...stylex.props(styles.link, isNextLinkDisabled() && styles.disabled)}
    >
      次へ
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

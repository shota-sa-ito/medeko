/**
 * Cropper から Blob を生成する
 */
export function createCropperBlob(cropper: Cropper) {
  return new Promise<Blob | null>((resolve) => {
    cropper.getCroppedCanvas().toBlob(resolve);
  });
}

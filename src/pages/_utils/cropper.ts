/**
 * Cropper から Blob を生成する
 */
export function createCropperArrayBuffer(cropper: Cropper) {
  return new Promise<ArrayBuffer | null>((resolve) => {
    cropper
      .getCroppedCanvas()
      .toBlob((blob) =>
        blob
          ? blob.arrayBuffer().then((buffer) => resolve(buffer))
          : resolve(null),
      );
  });
}

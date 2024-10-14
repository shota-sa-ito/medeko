// SVG要素を作成し、回転ハンドルを追加する関数
export function createSVGWithRotateHandle(svgContent: string): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'absolute';
  wrapper.style.left = '0';
  wrapper.style.top = '0';

  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  svgElement.innerHTML = svgContent;
  const path = svgElement.querySelector('path');

  if (path) {
    svgElement.style.width = '100';
    svgElement.style.height = '100';
    svgElement.style.cursor = 'move';
    svgElement.classList.add('draggable-svg');
    wrapper.appendChild(svgElement);

    // グループ要素を作成し、パスを包む
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.appendChild(path.cloneNode(true));
    svgElement.innerHTML = '';
    svgElement.appendChild(group);

    // グループの中心を回転の中心に設定
    // group.style.transformOrigin = 'center';

    // const rotateHandle = document.createElement('div');
    // rotateHandle.classList.add('rotate-handle');
    // rotateHandle.style.position = 'absolute';
    // rotateHandle.style.right = '-10px';
    // rotateHandle.style.top = '-10px';
    // rotateHandle.style.width = '20px';
    // rotateHandle.style.height = '20px';
    // rotateHandle.style.borderRadius = '50%';
    // rotateHandle.style.backgroundColor = 'blue';
    // rotateHandle.style.cursor = 'pointer';
    // wrapper.appendChild(rotateHandle);

    makeDraggable(wrapper);
    // makeRotatable(group, rotateHandle);
  } else {
    console.error('SVGにpath要素が見つかりません');
  }

  return wrapper;
}

// SVG要素をドラッグ可能にする関数
// SVG要素とimg要素をドラッグ可能にする関数
export function makeDraggable(element: HTMLElement) {
  let isDragging = false;
  let startX: number, startY: number;

  // マウスイベントリスナーを追加
  element.addEventListener('mousedown', startDragging);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);

  // ドラッグ開始時の処理
  function startDragging(e: MouseEvent) {
    isDragging = true;
    startX = e.clientX - parseFloat(element.style.left || '0');
    startY = e.clientY - parseFloat(element.style.top || '0');
    element.classList.add('dragging');
    e.stopPropagation(); // イベントの伝播を停止
  }

  // ドラッグ中の処理
  function drag(e: MouseEvent) {
    if (!isDragging) return;

    const target =
      element.querySelector('path') || element.querySelector('img');
    if (target) {
      if (target instanceof SVGElement) {
        target.setAttribute('transform', 'scale(1.3)');
      } else if (target instanceof HTMLImageElement) {
        target.style.transform = 'scale(1.3)';
      }
    }

    e.preventDefault();

    const newX = e.clientX - startX;
    const newY = e.clientY - startY;

    // 要素の位置を更新
    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;
  }

  // ドラッグ終了時の処理
  function stopDragging() {
    isDragging = false;

    const target =
      element.querySelector('path') || element.querySelector('img');
    if (target) {
      if (target instanceof SVGElement) {
        target.setAttribute('transform', 'scale(1.0)');
      } else if (target instanceof HTMLImageElement) {
        target.style.transform = 'scale(1.0)';
      }
    }

    element.classList.remove('dragging');
  }
}

// 回転可能にする関数
export function makeRotatable(
  svgElement: SVGElement,
  rotateHandle: HTMLElement,
) {
  let isRotating = false;
  let startAngle = 0;
  let currentRotation = 0;

  rotateHandle.addEventListener('mousedown', startRotating);
  document.addEventListener('mousemove', rotate);
  document.addEventListener('mouseup', stopRotating);

  function startRotating(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    isRotating = true;
    const rect = svgElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    startAngle =
      Math.atan2(e.clientY - centerY, e.clientX - centerX) - currentRotation;
  }

  function rotate(e: MouseEvent) {
    if (!isRotating) return;
    const rect = svgElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    currentRotation = angle - startAngle;
    svgElement.style.transform = `rotate(${currentRotation}rad)`;
  }

  function stopRotating() {
    isRotating = false;
  }
}

export function createImageWithRotateHandle(imageSrc: string): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'draggable-wrapper';
  wrapper.style.position = 'absolute';
  wrapper.style.left = '0';
  wrapper.style.top = '0';

  const img = document.createElement('img');
  img.src = imageSrc;
  img.className = 'draggable-image';
  img.style.width = '100px';
  img.style.height = '100px';
  img.style.objectFit = 'contain';
  img.style.cursor = 'move';

  wrapper.appendChild(img);

  makeDraggable(wrapper);

  return wrapper;
}

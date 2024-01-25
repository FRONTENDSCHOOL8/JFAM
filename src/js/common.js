// ::돔 요소 납치하기
export function getNode(node) {
  if (typeof node !== 'string') {
    throw new Error('문자열로만 기입해주세요.');
  }
  return document.querySelector(node);
}
export function getNodes(node) {
  if (typeof node !== 'string') {
    throw new Error('문자열로만 기입해주세요.');
  }
  return document.querySelectorAll(node);
}
// ::돔에 노드 추가
export function insertEnd(node, text) {
  getNode(node).insertAdjacentHTML('beforeend', text);
}
// ::포켓베이스 이미지 url 가져오기
export function getPbImageURL(item) {
  return `https://jfam.pockethost.io/api/files/${item.collectionName}/${item.id}/${item.image}`;
}

/**
 * ::노드에 클래스 추가
 * @param node{HTMLElement}
 * @param className{string}
 */
export function addClass(node, className) {
  node.classList.add(className);
}

/**
 * ::노드에 클래스 삭제
 * @param node{HTMLElement}
 * @param className{string}
 */
export function removeClass(node, className) {
  node.classList.add(className);
}

// ::노드의 텍스트 변경
export function changeTextContent(node, message) {
  const nodeElement = node;
  nodeElement.textContent = message;
}

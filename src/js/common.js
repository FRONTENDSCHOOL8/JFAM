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

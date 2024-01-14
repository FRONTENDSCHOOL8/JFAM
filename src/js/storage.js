const { localStorage: storage } = window;

export function setStorage(key, value) {
  // 확인하는 용도
  return new Promise((resolve, reject) => {
    if (typeof key === 'string') {
      storage.setItem(key, JSON.stringify(value));
      resolve();
    } else {
      reject(new Error('key는 문자 타입 이어야 합니다.'));
    }
  });
}

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    if (typeof key === 'string') {
      resolve(JSON.parse(storage.getItem(key)));
    } else {
      reject(new Error('key는 문자 타입 이어야 합니다.'));
    }
  });
}

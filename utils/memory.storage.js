const memoryStorage = {
  setItem: (key, value) => {
    memoryStorage.storage.set(key, value);
  },
  getItem: (key) => {
    const value = memoryStorage.storage.get(key);
    if (typeof value !== 'undefined') {
      return value;
    }
    return null;
  },
  removeItem: (key) => {
    memoryStorage.storage.delete(key);
  },
  storage: new Map(),
};

class ProxyStorage {
  proxyStorage;
  constructor() {
    if (!this.isStorageAvailable()) {
      this.proxyStorage = memoryStorage;
    } else {
      this.proxyStorage = window.localStorage;
    }
  }

  get(key) {
    return JSON.parse(this.proxyStorage.getItem(key));
  }
  set(key, val) {
    this.proxyStorage.setItem(key, JSON.stringify(val));
  }
  del(key) {
    this.proxyStorage.removeItem(key);
  }
  isStorageAvailable() {
    const mod = '__STORAGE__';
    try {
      window.localStorage.setItem(mod, mod);
      window.localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  }
}

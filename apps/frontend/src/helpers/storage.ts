export default {
  setItem: (name: string, data: any) => {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    return localStorage.setItem(name, data);
  },
  getItem: (name: string) => {
    let value = localStorage.getItem(name);
    return value;
  },
  removeItem: (name: string) => localStorage.removeItem(name),
  clear: () => localStorage.clear(),
};

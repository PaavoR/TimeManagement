export function setToStorage(item, value) {
    localStorage.setItem(item, value);
}

export function getFromStorage(item) {
    return localStorage.getItem(item)
}

export function removeFromStorage(item) {
    localStorage.removeItem(item);
}
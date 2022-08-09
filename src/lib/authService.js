export function getUserToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

export function saveToken(token) {
  return typeof window !== "undefined"
    ? localStorage.setItem("token", token)
    : null;
}

export function removeToken() {
  window.location.reload();
  return typeof window !== "undefined"
    ? localStorage.removeItem("token")
    : null;
}

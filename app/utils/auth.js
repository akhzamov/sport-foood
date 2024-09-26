export function setAuthToken(token) {
	if (token) {
		localStorage.setItem("authToken", token);
	}
}

export function getAuthToken() {
	return localStorage.getItem("authToken");
}

export function removeAuthToken() {
	localStorage.removeItem("authToken");
}

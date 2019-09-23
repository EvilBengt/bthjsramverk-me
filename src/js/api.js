const devBaseUrl = "http://localhost:1337";
const prodBaseUrl = "https://api.jsramverk.evilbengt.me";
let baseUrl;

if (window.location.origin.includes("localhost")) {
    baseUrl = devBaseUrl;
} else {
    baseUrl = prodBaseUrl;
}

const go = (method) => (endpoint, body, headers) => (success, fail) => {
    fetch(baseUrl + endpoint, {
        method: method,
        headers: headers,
        body: body ? asFormUrlEncoded(body) : undefined
    }).then(data => {
        if (success) {
            success(data);
        }
    }).catch(err => {
        if (fail) {
            fail(err);
        }
    })
};

const asFormUrlEncoded = obj => Object.keys(obj).map(k =>
    `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');

let token = undefined;
const tokenObservers = [];

const api = {
    get: go("GET"),
    post: go("POST"),
    put: go("PUT"),
    delete: go("DELETE"),

    setToken: newToken => {
        token = newToken;
        onTokenChanged();
    },
    getToken: () => token,
    subscribeToOnTokenChanged: callback => {
        tokenObservers.push(callback);
    }
};

function onTokenChanged() {
    tokenObservers.forEach(callback => callback());
}

export default api;

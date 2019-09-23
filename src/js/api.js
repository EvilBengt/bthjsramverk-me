const baseUrl = "http://localhost:1337";

const go = (method) => (endpoint, body, headers) => (success, fail) => {
    fetch(baseUrl + endpoint, {
        method: method,
        headers: headers,
        body: asFormUrlEncoded(body)
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

const api = {
    get: go("GET"),
    post: go("POST"),
    put: go("PUT"),
    delete: go("DELETE"),

    token: undefined
};

export default api;

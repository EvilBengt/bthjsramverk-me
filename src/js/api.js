const baseUrl = "localhost:1337";

const go = (method) => (endpoint, body, headers) => (success, fail) => {
    fetch({
        method: method,
        url: baseUrl + endpoint,
        headers: headers,
        body: body
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

const api = {
    get: go("GET"),
    post: go("POST"),
    put: go("PUT"),
    delete: go("DELETE")
};

export default api;

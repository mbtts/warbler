const API_BASE = '/api'

async function post(url, body) {
    const response = await fetch(`${API_BASE}${url}`, {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(body),
    });

    return await handleResponse(response);
}

async function handleResponse(response) {
    if (response.ok) {
        return response.json()
    } else if (response.status >= 400 && response.status < 500) {
        const error = await response.json()
        throw error;
    } else {
        throw Error(`An Error has ocurred (response ${response.status}`);
    }
}

async function login(email, password) {
    return await post('/auth/signin', { email, password });
}

async function register(email, username, password, profileImageUrl) {
    return await post('/auth/signup', { email, username, password, profileImageUrl });
}

export {
    login,
    register
}

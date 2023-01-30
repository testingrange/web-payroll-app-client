import { store } from './store.js'


// User actions
export const signUp = (data) => {
    console.log(data)
	return fetch(`http://localhost:8001/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
    console.log(data, "sign in")
	return fetch(`http://localhost:8001/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

// Employee actions
export const indexEmployee = () => {
    return fetch(`http://localhost:8001/employees`, {
        headers: {
			Authorization: `Bearer ${store.userToken}`,
		},
    })
}


export const createEmployee = (data) => {
    return fetch(`http://localhost:8001/employees`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             Authorization: `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}


export const showEmployee = (id) => {
    return fetch(`http://localhost:8001/employees/${id}`, {
        headers: {
			Authorization: `Bearer ${store.userToken}`,
		},
    })
}


export const updateEmployee = (data, id) => {
    return fetch(`http://localhost:8001/employees/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}


export const deleteEmployee = (id) => {
    return fetch(`http://localhost:8001/employees/${id}`, {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${store.userToken}`,
    },
    })
}

// Dependant actions

export const addDependant = (data) => {
    return fetch(`http://localhost:8001/dependants`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             Authorization: `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}


export const deleteDependant = (dependantId, employeeId) => {
    return fetch(`http://localhost:8001/dependants/${dependantId}/${employeeId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${store.userToken}`,
        },
        // body: JSON.stringify(data)

    })
}

export const updateDependant = (data, dependantId) => {
    return fetch(`http://localhost:8001/dependants/${dependantId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}
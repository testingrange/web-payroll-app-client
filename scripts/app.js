import {indexEmployee,
        createEmployee,
        showEmployee,
        updateEmployee,
        deleteEmployee,
        signUp,
        signIn
} from './api.js'

import {
    onIndexEmployeeSuccess,
    onFailure,
    onShowEmployeeSuccess,
    onUpdateEmployeeSuccess,
    onDeleteEmployeeSuccess,
    onSignUpSuccess,
    onSignInSuccess,
    // onAddEmployeeClick,
    onCreateEmployeeSuccess
} from './ui.js'


const indexEmployeesContainer = document.querySelector('#index-employee-container')
const showEmployeeContainer = document.querySelector('#show-employee-container')
const createEmployeeContainer = document.querySelector('#create-employee-container')
const signUpContainer = document.querySelector('#sign-up-form-container')
const signInContainer = document.querySelector('#sign-in-form-container')
const mainMenuButton = document.querySelector('#main-menu')
const indexContainer = document.querySelector('#index-container')
const addEmployeeBtn = document.querySelector('#add-employee-container')
const createEmployeeForm = document.querySelector('#create-employee-form')
const createEmployeeFormContainer = document.querySelector('#create-employee-form-container')

// Employee actions
indexEmployeesContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

	if (!id) return

	showEmployee(id)
		.then((res) => res.json())
		.then((res) => {
			onShowEmployeeSuccess(res.employee)
		})
        .catch(onFailure)
})

addEmployeeBtn.addEventListener('click', (event) => {
    event.preventDefault()
    // indexContainer.classList.add('hide')
    // createEmployeeContainer.classList.add('hide')
    indexContainer.classList.add('hide')
    createEmployeeContainer.classList.add('hide')
    showEmployeeContainer.classList.remove('hide')
    // createEmployeeContainer.classList.remove('hide')
    createEmployeeFormContainer.classList.remove('hide')
})

// ######### CREATE Employee ###########

createEmployeeForm.addEventListener('submit', (event) => {
    event.preventDefault()
	// const id = event.target.getAttribute('data-id')

	// if (!id) return
    const reloadMainContent = () => {
        createEmployeeFormContainer.classList.add('hide')
        indexContainer.classList.remove('hide')
        createEmployeeContainer.classList.remove('hide')
        let child = indexEmployeesContainer.lastElementChild
        while(child) {
            indexEmployeesContainer.removeChild(child)
            child = indexEmployeesContainer.lastElementChild
        }       
    }

    const employeeData = {
        employee: {
            id: event.target['id'].value,
            firstName: event.target['firstName'].value,
            middleName: event.target['middleName'].value,
            lastName: event.target['lastName'].value,
            dob: event.target['dob'].value,
            driverLicense: event.target['driverLicense'].value,
            ssn: event.target['ssn'].value,
            cell: event.target['cell'].value,
            home_phone: event.target['home_phone'].value,
            email: event.target['email'].value,
            type: event.target['type'].value,
            line1: event.target['line1'].value,
            line2: event.target['line2'].value,
            city: event.target['city'].value,
            state: event.target['state'].value,
            zip: event.target['zip'].value,
            status: event.target['status'].value,
            salary: event.target['salary'].value,
        },
    }
    createEmployee(employeeData)
        .then(onCreateEmployeeSuccess)
        .then(reloadMainContent)
        .then(indexEmployee)
		.then((res) => res.json())
		.then((res) => onIndexEmployeeSuccess(res.employee))
        .catch(onFailure)
})




// #####################################

showEmployeeContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const id = event.target.getAttribute('data-id')
    console.log(id, "id when clicking  on update Employee")
	const employeeData = {
		employee: {
            id: event.target['id'].value,
			firstName: event.target['firstName'].value,
            middleName: event.target['middleName'].value,
			lastName: event.target['lastName'].value,
            dob: event.target['dob'].value,
            driverLicense: event.target['driverLicense'].value,
            ssn: event.target['ssn'].value,
            contacts: {
                    cell: event.target['cell'].value,
                    home_phone: event.target['home_phone'].value,
                    email: event.target['email'].value
                    },
            address: {
                    type: event.target['type'].value,
                    line1: event.target['line1'].value,
                    line2: event.target['line2'].value,
                    city: event.target['city'].value,
                    state: event.target['state'].value,
                    zip: event.target['zip'].value,
                    status: event.target['status'].value,
                    salary: event.target['salary'].value
		            },
	    }
    }
    console.log(employeeData, "Data from showEmp;oyee container event listener")
	updateEmployee(employeeData, id)
		.then(onUpdateEmployeeSuccess)
		.catch(onFailure)
})

// Experimental Main-menue button to return to main screen
mainMenuButton.addEventListener('click', (event) => {
    event.preventDefault()
    indexContainer.classList.remove('hide')
    createEmployeeContainer.classList.remove('hide')
    createEmployeeFormContainer.classList.add('hide')
    for (const child of showEmployeeContainer.children){
        child.remove()
    }
    // showEmployeeContainer.classList.add('hide')

})


showEmployeeContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')

	if (!id) return

    const removeElementFromMainContent = (id) => {
        const elementToRemove = document.querySelector(`.content-card-${id}`)
        elementToRemove.remove()
        indexContainer.classList.remove('hide')
        createEmployeeContainer.classList.remove('hide')
        showEmployeeContainer.classList.add('hide')
        for (const child of showEmployeeContainer.children){
            child.remove()
        }
    }

    deleteEmployee(id)
		.then(onDeleteEmployeeSuccess)
        .then(removeElementFromMainContent(id))
		.catch(onFailure)
})

// User Actions
signUpContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const userData = {
		credentials: {
			email: event.target['email'].value,
			password: event.target['password'].value,
		},
	}
	signUp(userData).then(onSignUpSuccess).catch(onFailure)
})

signInContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const userData = {
		credentials: {
			email: event.target['email'].value,
			password: event.target['password'].value,
		},
	}
	signIn(userData)
		.then((res) => res.json())
		.then((res) => onSignInSuccess(res.token))
		.then(indexEmployee)
		.then((res) => res.json())
		.then((res) => onIndexEmployeeSuccess(res.employee))
		.catch(onFailure)
})

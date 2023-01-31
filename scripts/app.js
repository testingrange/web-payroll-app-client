import {indexEmployee,
        createEmployee,
        showEmployee,
        updateEmployee,
        deleteEmployee,
        signUp,
        signIn,
        addDependant,
        deleteDependant,
        updateDependant
} from './api.js'

import { store } from './store.js'

import {
    onIndexEmployeeSuccess,
    onFailure,
    onShowEmployeeSuccess,
    onUpdateEmployeeSuccess,
    onDeleteEmployeeSuccess,
    onSignUpSuccess,
    onSignInSuccess,
    // onAddEmployeeClick,
    onCreateEmployeeSuccess,
    onAddDependantSuccess,
    onDeleteDependantSuccess,
    onUpdateDependantSuccess
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
const showEmployeeForm = document.querySelector('#show-employee-form')
// const dependantForm = document.querySelector('#create-dependant-form')
const dependantFN = document.querySelector('#dependantFN')
const dependantMN = document.querySelector('#dependantMN')
const dependantLN = document.querySelector('#dependantLN')
const dependantDOB = document.querySelector('#dependantDOB')
const dependantRelationship = document.querySelector('#dependantRel')
const addDependantBtn = document.querySelector('#create-dependant-form-button')
// const deleteDependantBtn = document.querySelector('#delete-dependant-button')
// const deleteBtns = document.querySelectorAll(".delete-dependant-btn")
// const saveUpdateBtn = document.querySelector("#save-update-dependant-btn")
// const updateDependantForm = document.querySelector('#update-dependant-form')
const signupBtn = document.querySelector('#signupBtn')
const signinBtn = document.querySelector('#signinBtn')
const signupForm = document.querySelector('#signupForm')
const signinForm = document.querySelector('#signinForm')
const updateDependatEditContainer = document.querySelector('#show-update-dependant-container')





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
// Add Employee screen
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

// ######### Show Employee ###########
// ###################################
showEmployeeForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const id = event.target['employeeId'].value

    if (!id) return

    showEmployee(id)
        .then((res) => res.json())
        .then((res) => {
            onShowEmployeeSuccess(res.employee)
        })
        .catch(onFailure)
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
        const updDepForm = document.querySelector("#update-dependant-form")
        if (updDepForm) updDepForm.remove()
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




// ########## UPDATE Employee ##############

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
            },
            status: event.target['status'].value,
            salary: event.target['salary'].value
		    },
	    }
    console.log(employeeData, "Data from showEmp;oyee container event listener")
	updateEmployee(employeeData, id)
		.then(onUpdateEmployeeSuccess)
		.catch(onFailure)
})


// ########## Main-menu button to return to main screen ##########
mainMenuButton.addEventListener('click', (event) => {
    event.preventDefault()
    indexContainer.classList.remove('hide')
    createEmployeeContainer.classList.remove('hide')
    createEmployeeFormContainer.classList.add('hide')
    for (const child of showEmployeeContainer.children){
        child.remove()
    }
    const updDepForm = document.querySelector("#update-dependant-form")
    if (updDepForm) updDepForm.remove()
    // showEmployeeContainer.classList.add('hide')

})


// ##################### DELETE Employee #######################
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
signupBtn.addEventListener('click', () => {
    signinForm.classList.add('hide')
    signupForm.classList.remove('hide')
})

signinBtn.addEventListener('click', () => {
    signinForm.classList.remove('hide')
    signupForm.classList.add('hide')    
})


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


// ################# ADD Dependant #####################
if(addDependantBtn) {
    console.log(addDependantBtn, "addDependantButton")
    addDependantBtn.addEventListener('click', (event) => {
        event.preventDefault()
   
        const dependantData = {
            dependant: {
                firstName: dependantFN.value,
                middleName: dependantMN.value,
                lastName: dependantLN.value,
                dob: dependantDOB.value,
                relationship: dependantRelationship.value,                            
                employeeId: store.currentEmployeeId
            },
        }
    
        console.log(dependantData, "This is dependant data from addDependant")
    
    
        addDependant(dependantData)
            .then(onAddDependantSuccess)
            .catch(onFailure)
    
    })

}

// Update dependant
// const saveUpdateBtn = document.querySelector("#save-update-dependant-btn")
updateDependatEditContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    // if (event.target.id === "save-update-dependant-btn") {

    // }
    // saveUpdateBtn = event.target['id'].value

    // #############################################################
    // const updDepBtn = document.querySelector('#save-update-dependant-btn')
    const updDepForm = document.querySelector("#update-dependant-form")
    // const dependantId = updDepBtn.getAttribute('dependant-id')
    const dependantId = updDepForm.getAttribute("data-id")
    const employeeId = store.currentEmployeeId

    // console.log(dependantId, "DependantId from saveUpdatedDependant")
    console.log(employeeId, "EmployeeId from saveUpdateBtn")

    if(!dependantId) return



    const dependantData = {
        dependant: {
            firstName: event.target['upDependantFN'].value,
            middleName: event.target['upDependantMN'].value,
            lastName: event.target['upDependantLN'].value,
            dob: event.target['upDependantDOB'].value,
            relationship: event.target['upDependantRelationship'].value,                            
            employeeId: employeeId
        },
    }

    console.log(dependantData, "This is dependant data from addDependant")
    console.log(dependantData, "Data from showEmp;oyee container event listener")
    console.log(dependantId, "DependantId from saveUpdatedDependant")
    updateDependant(dependantData, dependantId)
        .then(onUpdateDependantSuccess)
        .catch(onFailure)

        
    })
 
import { store } from './store.js'

import {
        deleteDependant
} from './api.js'

const indexEmployeesContainer = document.querySelector('#index-employee-container')
const messageContainer = document.querySelector('#message-container')
const showEmployeeContainer = document.querySelector('#show-employee-container')
const createEmployeeContainer = document.querySelector('#create-employee-container')
const authContainer = document.querySelector('#auth-container')
const indexContainer = document.querySelector('#index-container')
const dependantFormContainer = document.querySelector('#add-dependant-form-container')
const signupBtn = document.querySelector('#signupBtn')
const signinBtn = document.querySelector('#signinBtn')
const mainMenuButton = document.querySelector('#main-menu')
const updateDependatEditContainer = document.querySelector('#show-update-dependant-container')

// Employee Actions
export const onIndexEmployeeSuccess = (employees) => {
    createEmployeeContainer.classList.remove('hide')
	employees.forEach((employee) => {
		const div = document.createElement('div')
        div.classList.add("employee-card")
        div.classList.add(`content-card-${employee._id}`)
		div.innerHTML = `
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <h3>Id - ${employee.id}</h3>
            <button type="button" class="btn btn-primary" data-id="${employee._id}">Show Employee</button>
        `
		indexEmployeesContainer.appendChild(div)
	})
}

export const onFailure = (error) => {
    messageContainer.innerHTML = `
        <h3>You've encountered an error. Try again later</h3>
        <p>${error}</p>
    `
}

export const onShowEmployeeSuccess = (employee) => {
    indexContainer.classList.add('hide')
    createEmployeeContainer.classList.add('hide')
    showEmployeeContainer.classList.remove('hide')
	const div = document.createElement('div')
    console.log(employee, "employee at onShowEmployeeSuccesscd")
    console.log(employee.salary, "this is salary from onSHowEmployeeSuccess")
    console.log(employee.dependants)
    store.currentEmployeeId = employee._id
    let dependantsData = ''
    if (employee.dependants.length){
        for (let i = 0; i<employee.dependants.length; i++){
            dependantsData += `
            <p>${employee.dependants[i].firstName} ${employee.dependants[i].middleName[0]? employee.dependants[i].middleName[0] : ''} ${employee.dependants[i].lastName}</p>
                <p>${employee.dependants[i].dob}</p>
                <p>${employee.dependants[i].relationship}</p>
                <button id="delete-dependant-button" type="button" class="btn btn-danger delete-dependant-btn" dependant-id="${employee.dependants[i]._id}">Remove</button>
                <button id="update-dependant-button" type="button" class="btn btn-warning update-dependant-btn" dependant-id="${employee.dependants[i]._id}">Update</button>
            ` 
        }
    }

	div.innerHTML = `
        <div class="row">
            <div class="col">
                <h2>Employee</h2>
                <h4>${employee.firstName} ${employee.lastName}</h4>
                <p>${employee.id}</p>
                <p>${employee.dob}</p>
                <h5>Dependants</h5>
                <h6>Number of dependants: ${employee.dependants.length}</h6>
                ${dependantsData}
                <button id="add-new-dependant" type="button" class="btn btn-primary">Add dependant</button>
                <div id="new-dependant-container"></div>           
                <div id="update-dependant-container"></div>
            </div>
            <div class="col">
                <form data-id="${employee._id}">
                    <h6>id</h6><input class="form-control" type="text" name="id" value="${employee.id}">    
                    <h6>First Name</h6><input class="form-control" type="text" name="firstName" value="${employee.firstName}">
                    <h6>Middle Name</h6><input class="form-control" type="text" name="middleName" value="${employee.middleName}">
                    <h6>Last Name</h6><input class="form-control" type="text" name="lastName" value="${employee.lastName}">
                    <h6>DOB</h6><input class="form-control" type="text" name="dob" value="${employee.dob}">    
                    <h6>Driver License</h6><input class="form-control" type="text" name="driverLicense" value="${employee.driverLicense}">
                    <h6>SSN</h6><input class="form-control" type="text" name="ssn" value="${employee.ssn}">
                    <h6>Cell</h6><input class="form-control" type="text" name="cell" value="${employee.contacts.cell}">
                    <h6>Home Phone</h6><input class="form-control" type="text" name="home_phone" value="${employee.contacts.home_phone}">
                    <h6>Email</h6><input class="form-control" type="text" name="email" value="${employee.contacts.email}">
                    <h6>Address Type</h6><input class="form-control" type="text" name="type" value="${employee.address.type}">
                    <h6>Address Line 1</h6><input class="form-control" type="text" name="line1" value="${employee.address.line1}">
                    <h6>Address Line 2</h6><input class="form-control" type="text" name="line2" value="${employee.address.line2}">
                    <h6>City</h6><input class="form-control" type="text" name="city" value="${employee.address.city}">
                    <h6>State</h6><input class="form-control" type="text" name="state"cd value="${employee.address.state}">
                    <h6>ZIP</h6><input class="form-control" type="text" name="zip" value="${employee.address.zip}">
                    <h6>Employment Status</h6><input class="form-control" type="text" name="status" value="${employee.status}">
                    <h6>Salary</h6><input class="form-control" type="text" name="salary" value="${employee.salary = employee.salary || 0}">
                    <button type="submit" class="btn btn-warning">Update Employee</button>
                </form>
                <button type="button" class="btn btn-danger" data-id="${employee._id}">Delete Employee</button>
            </div>
        </div>
    `
    showEmployeeContainer.appendChild(div)

    const dependantContainer = document.querySelector('#new-dependant-container')
    const addDependantBtn = document.querySelector('#add-new-dependant')
    addDependantBtn.addEventListener('click', (event) => {
        event.preventDefault()

        const createDepForm = document.querySelector("#create-dependant-form")
        if (createDepForm) createDepForm.classList.remove("hide")

        const updDepForm = document.querySelector("#update-dependant-form")
        // console.log(updDepForm, "THIS IS THE UPDDEPFORM from addDepButton")
        if (updDepForm) updDepForm.remove()

        dependantContainer.appendChild(dependantFormContainer)
        dependantFormContainer.classList.remove('hide')
    })

    // Adding event listeners to delete button
    const deleteBtns = document.querySelectorAll(".delete-dependant-btn")
    console.log(deleteBtns.length)
    for (let i=0; i<deleteBtns.length; i++) {
        console.log(deleteBtns[i])
        console.log(deleteBtns[i].getAttribute('dependant-id'), "THis is depId ")
        deleteBtns[i].addEventListener('click', (event) => {
            event.preventDefault()
            console.log(deleteBtns[i].getAttribute('dependant-id'))
            const dependantId = event.target.getAttribute('dependant-id')
            console.log(dependantId, "This is internal" )
            if (!dependantId) return

            const employeeId = store.currentEmployeeId
            console.log(employeeId, "Employee ID")

            const dependantData = {
                dependant: {
                    employeeId: employeeId
                }
            }
            console.log(store.currentEmployeeId)
            console.log(dependantData, "Internal dependantData")
            deleteDependant(employeeId, dependantId)
                .then(onDeleteDependantSuccess)
                .catch(onFailure)
        })
    }

    // Adding event listers to update buttons
    
    const updateBtns = document.querySelectorAll(".update-dependant-btn")
    // const updateDependantContainer = document.querySelector("#update-dependant-container")
    // console.log(updateBtns.length)
    console.log(updateBtns, "Update buttons on ui.js")
    for (let i=0; i<updateBtns.length; i++) {
        // console.log(updateBtns[i])
        // console.log(updateBtns[i].getAttribute('dependant-id'), "THis is depId ")
        updateBtns[i].addEventListener('click', (event) => {
            event.preventDefault()

            const updDepForm = document.querySelector("#update-dependant-form")
            if (updDepForm) updDepForm.remove()
            // // remove child if exist
            // const updateEditedDep.children.remove()
            const createDepForm = document.querySelector("#create-dependant-form")
            if (createDepForm) createDepForm.classList.add("hide")
            // remove child of container
            // dependantFormContainer.children){
            //     child.remove()
            // }

            // dependantFormContainer.classList.remove('hide')
            // const updDepForm = document.querySelector("#update-dependant-form")
            // if (updDepForm) updDepForm.remove()

            const div = document.createElement('div')
            // div.classList.add = ('update-edited-dependant')
            div.innerHTML = `
            <form id="update-dependant-form" data-id="${updateBtns[i].getAttribute('dependant-id')}">
                <h6>First Name</h6><input id="#upDepFN" class="form-control" type="text" name="upDependantFN" value="${employee.dependants[i].firstName}">    
                <h6>Middle Name</h6><input id="#upDepMN" class="form-control" type="text" name="upDependantMN" value="${employee.dependants[i].middleName}">
                <h6>Last Name</h6><input id="#upDepLN" class="form-control" type="text" name="upDependantLN" value="${employee.dependants[i].lastName}">
                <h6>DOB</h6><input id="#upDepDOB" class="form-control" type="text" name="upDependantDOB" value="${employee.dependants[i].dob}">
                <h6>Relationship</h6><input id="#upDepRel" class="form-control" type="text" name="upDependantRelationship" value="${employee.dependants[i].relationship}">
                <button id="save-update-dependant-btn" type="submit" class="btn btn-warning">Save</button>
            </form>
            `
            updateDependatEditContainer.appendChild(div)
            updateDependatEditContainer.classList.remove('hide')
        })
    }
}


export const onCreateEmployeeSuccess = () => {
	messageContainer.innerHTML = 'You have created an employee'
    }

export const onUpdateEmployeeSuccess = () => {
	messageContainer.innerHTML = 'You have updated an employee'
}

export const onDeleteEmployeeSuccess = () => {
	messageContainer.innerHTML = 'You have deleted an employee'
    }

// User Actions
export const onSignUpSuccess = () => {
    messageContainer.innerHTML = 'You\'ve created a new user! Now Sign In'
}

export const onSignInSuccess = (userToken) => {
    mainMenuButton.classList.remove('hide')
    messageContainer.innerHTML = ''
    store.userToken = userToken
    authContainer.classList.add('hide')
    indexContainer.classList.remove('hide')
    signinBtn.classList.add('hide')
    signupBtn.classList.add('hide')
}

// Dependant Actions


export const onAddDependantSuccess = () => {
    messageContainer.innerHTML= 'You\'ve successfully added a new dependant'
}


export const onDeleteDependantSuccess = () => {
    messageContainer.innerHTML= 'You\'ve successfully removed a dependant'
}

export const onUpdateDependantSuccess = () => {
    const updDepForm = document.querySelector("#update-dependant-form")
    if (updDepForm) updDepForm.remove()
    messageContainer.innerHTML= 'You\'ve successfully updated the dependant'
}
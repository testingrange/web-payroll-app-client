import { store } from './store.js'

const indexEmployeesContainer = document.querySelector('#index-employee-container')
const messageContainer = document.querySelector('#message-container')
const showEmployeeContainer = document.querySelector('#show-employee-container')
const createEmployeeContainer = document.querySelector('#create-employee-container')
const authContainer = document.querySelector('#auth-container')
const indexContainer = document.querySelector('#index-container')
const createEmployeeFormContainer = document.querySelector('#create-employee-form-container')


// Employee Actions
export const onIndexEmployeeSuccess = (employees) => {
    createEmployeeContainer.classList.remove('hide')
    // console.log(employees)
	employees.forEach((employee) => {
		const div = document.createElement('div')
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
	div.innerHTML = `
        <div class="row">
            <div class="col">
                <h2>Employee</h2>
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p>${employee.id}</p>
                <p>${employee.dob}</p>
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
}

// export const onAddEmployeeClick = () => {
//     indexContainer.classList.add('hide')
//     createEmployeeContainer.classList.add('hide')
//     showEmployeeContainer.classList.remove('hide')
//     // createEmployeeContainer.classList.remove('hide')
//     createEmployeeForm.classList.remove('hide')
	
// }

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
    messageContainer.innerHTML = ''
    store.userToken = userToken
    authContainer.classList.add('hide')
    indexContainer.classList.remove('hide')
}
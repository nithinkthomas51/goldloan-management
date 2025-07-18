const BASE_URL = 'https://fuzzy-space-adventure-7wvwjpwq554fwq4q-5000.app.github.dev/';

window.addEventListener('DOMContentLoaded', () => {
    fetchAllCustomers();
    fetchAllLoans();
});

document.getElementById('customer-registration').addEventListener('click', (e) => {
    e.preventDefault();

    const hiddenId = document.getElementById('customerIdInput').value;
    const isEdit = hiddenId !== "";
    const customerData = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        address: document.getElementById('customer-address').value,
        customerID: document.getElementById('customer-id').value
    };

    if (isEdit) {
        console.log(customerData);
        updateCustomer(hiddenId, customerData);
    } else {
        let url = BASE_URL + 'customers/register';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        };

        fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register customer : ' + response.statusText);
            }
            response.json()
            .then((result) =>{
                return result;
            })
            .then(data => {
                console.log(data.row_changed + " new customer added with Customer ID: " + data.customer_id);
                url = BASE_URL + `customers/${data.customer_id}`;
                fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Customer fetching failed')
                    }
                    response.json()
                    .then(result => updateCustomerTable(result))
                    .catch(err => console.log(err.message));
                })
                .catch(err => console.log('fetch API failure : ' + err.message));
            })
            .catch(err => console.log(err.message));
        })
        .catch(error => {
            console.log('Error: ' + error.message);
        });
    }
    document.getElementById('customer-name').value = "";
    document.getElementById('customer-phone').value = "";
    document.getElementById('customer-email').value = "";
    document.getElementById('customer-address').value = "";
    document.getElementById('customer-id').value = "";
    document.getElementById('customerFormTitle').textContent = 'Add Customer';
    document.getElementById('customerIdInput').value = "";
    closeAllPopups();
});

function updateCustomer(id, customerData) {
    const url = BASE_URL + `customers/${id}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
    };

    fetch(url, options)
    .then(response => {
        response.json()
        .then(result => {
            console.log("Successful updation: " + result.message)
            editCustomerTable(id, customerData);
        })
        .catch(err => console.log(err.message));
    })
    .catch(err => console.log(err.message));
}

function editCustomerTable(id, customer) {
    const row = document.querySelector(`#customerTableBody tr[data-id='${id}']`);
    if (!row) return;

    row.children[1].textContent = customer.name;
    row.children[2].textContent = customer.phone;
    row.children[3].textContent = customer.email;
    row.children[4].textContent = customer.address;
    row.children[5].textContent = customer.customerID;
}

function fetchAllCustomers() {
    const url = BASE_URL + 'customers/';

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Fetching customer details failed');
        }
        response.json()
        .then(result => {
            return result;
        })
        .then(({data}) => {
            console.log(data);
            data.customers.forEach(customer => updateCustomerTable(customer));
        })
        .catch(err => console.log(err.message));
    })
    .catch(err => {
        console.log('Error: ' + err);
    });
}

function fetchAllLoans() {

    const url = BASE_URL + 'loans/';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Fetching customer details failed');
        }
        response.json()
        .then(result => {
            return result;
        })
        .then(({data}) => {
            console.log(data);
            data.loans.forEach(customer => updateTable(customer));
        })
        .catch(err => console.log(err.message));
    })
    .catch(err => {
        console.log('Error: ' + err);
    });

}

document.getElementById('create-loan').addEventListener('click', (e) => {
    e.preventDefault();
    loanStartDate = new Date();
    loanDueDate = new Date( loanStartDate.getFullYear(), 
                            loanStartDate.getMonth() + parseInt(document.getElementById('tenure').value), 
                            loanStartDate.getDate());
    let url = BASE_URL + "loans/";
    const loanData = {
        customer_id: document.getElementById('customer_id').value,
        start_date: loanStartDate.toDateString(), // TODO change this logic to get today's date
        due_date: loanDueDate.toDateString(),
        total_weight: document.getElementById('total_weight').value,
        estimated_value: document.getElementById('estimated_value').value,
        loan_amount: document.getElementById('loan_amount').value,
        interest_rate: document.getElementById('interest_rate').value,
        emi: document.getElementById('emi').value,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loanData)
    }; 

    let loanID = -1;

    fetch(url, options)
    .then(response => {
        if(!response.ok) {
            throw new Error('Saving loan details failed');
        }
        response.json()
        .then(result => {
            return result;
        })
        .then(data => {
            if (data.row_changed === 1) {
                loanID = data.loan_id;
                url += `${loanID}`;
                fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failure in fetching loan with ID: ' + loanID);
                    }
                    response.json()
                    .then(result => updateTable(result))
                    .catch(err => console.log(err.message));
                })
                .catch(err => console.log('Error while retrieving latest pushed loan : ' + err.message));
            }
        })
        .catch(err => console.log(err.message))
    })
    .catch(err => console.log(err.message));

    document.getElementById('customer_id').value = "";
    document.getElementById('customer_name').value = "";
    document.getElementById('tenure').value = "";
    document.getElementById('total_weight').value = "";
    document.getElementById('estimated_value').value = "";
    document.getElementById('loan_amount').value = "";
    document.getElementById('interest_rate').value = "";
    document.getElementById('emi').value = "";

    document.querySelectorAll('.remove-btn').forEach(removeButton => removeGoldItem(removeButton));
    closeAllPopups();

});

function updateTable(loanDetails) {
    const tableBody = document.getElementById('loanTableBody');
    const newRow = `<tr>
                        <td>${loanDetails.loan_id}</td>
                        <td>${loanDetails.customer_id}</td>
                        <td>${loanDetails.loan_amount}</td>
                        <td>${loanDetails.interest_rate}</td>
                        <td>${loanDetails.emi}</td>
                        <td>${loanDetails.start_date}</td>
                        <td>${loanDetails.due_date}</td>
                        <td>${loanDetails.status}</td>
                    </tr>`;
    tableBody.innerHTML += newRow;
}

function updateCustomerTable(customerData) {
    const customerTableBody = document.getElementById('customerTableBody');
    const newRow = `<tr data-id="${customerData.id}">
                        <td>${customerData.id}</td>
                        <td>${customerData.name}</td>
                        <td>${customerData.phone}</td>
                        <td>${customerData.email}</td>
                        <td>${customerData.address}</td>
                        <td>${customerData.id_proof}</td>
                        <td>
                            <div style="display: flex; gap: 5px">
                                <button class="action-btn" onclick="editCustomer(${customerData.id})">Edit</button>
                                <button class="action-btn" onclick="deleteCustomer(${customerData.id})">Delete</button>
                            </div>
                        </td>
                    </tr>`;
    customerTableBody.innerHTML += newRow;
}

function deleteCustomer(id) {
    const url = BASE_URL + `customers/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url, options)
    .then(response => {
        if (response.ok)
            deleteCustomerFromTable(id);
    })
    .catch(err => console.log("Error while deleting the customer: " + err.message));
}

function deleteCustomerFromTable(id) {
    const row = document.querySelector(`#customerTableBody tr[data-id='${id}']`);
    if (row) row.remove();
}

function editCustomer(id) {
    const row = document.querySelector(`#customerTableBody tr[data-id='${id}']`);
    console.log('Editing customer with id : ' + id);
    if (!row) {
        console.log('Error fetching row');
        return;
    };

    document.getElementById('customerFormTitle').textContent = 'Edit Customer';
    document.getElementById('customerIdInput').value = id;
    document.getElementById('customer-name').value = row.children[1].textContent;
    document.getElementById('customer-phone').value = row.children[2].textContent;
    document.getElementById('customer-email').value = row.children[3].textContent;
    document.getElementById('customer-address').value = row.children[4].textContent;
    document.getElementById('customer-id').value = row.children[5].textContent;

    openPopup('customerPopup');
}

function openPopup(id) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById(id).style.display = 'block';
}

function closeAllPopups() {
    document.getElementById('overlay').style.display = 'none';
    document.querySelectorAll('.popup-form').forEach(p => p.style.display = 'none');
}

function addGoldItem() {
    const container = document.getElementById('goldDetails');
    const div = document.createElement("div");
    div.classList.add('gold-item');
    div.innerHTML = `
        <select>
            <option value="Ring">Ring</option>
            <option value="Chain">Chain</option>
            <option value="Bangle">Bangle</option>
            <option value="Necklace">Necklace</option>
        </select>
        <input type="number" class="gold-weight" placeholder="Weight (grams)" required>
        <input type="number" class="gold-purity" placeholder="Purity (karat)" required>
        <button type="button" class="remove-btn" onclick="removeGoldItem(this)">X</button>
    `;
    container.appendChild(div);

    // attaching an eventlistener to the gold weight and gold purity input fields
    const goldWeight = div.querySelector('.gold-weight');
    const goldPurity = div.querySelector('.gold-purity');
    goldWeight.addEventListener('input', updateTotalWeight);
    goldPurity.addEventListener('input', calculateEstimatedValue);
}

function updateTotalWeight() {
    let totalWeight = 0;
    document.querySelectorAll('.gold-weight').forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val)) {
            totalWeight += val;
        }
    });
    document.getElementById('total_weight').value = totalWeight.toFixed(2);
}

function calculateEstimatedValue() {
    const marketRatePerGram = 4700;
    let totalValue = 0;
    document.querySelectorAll('.gold-item').forEach(item => {
        const weight = (parseFloat(item.querySelector('.gold-weight')?.value) || 0);
        const purity = (parseFloat(item.querySelector('.gold-purity')?.value) || 0);

        if (weight && purity) {
            totalValue += weight * (purity / 24) * marketRatePerGram; 
        }
    });
    document.getElementById('estimated_value').value = totalValue.toFixed(2);
    calculateMaximumLoanAmount(totalValue);
}

function calculateMaximumLoanAmount(estimatedValue) {
    maxLoanAmount = (estimatedValue * 90)/100;
    document.getElementById('loan_amount').value = maxLoanAmount.toFixed(2);
}

document.getElementById('tenure').addEventListener('input', calculateEMI);

function calculateEMI() {
    principalAmount = parseFloat(document.getElementById('loan_amount').value);
    months = parseInt(document.getElementById('tenure').value);
    rateOfInterest = parseFloat(document.getElementById('interest_rate').value)/12/100;
    emi = (principalAmount * rateOfInterest * ((1 + rateOfInterest) ** months)) / (((1 + rateOfInterest) ** months) - 1);
    document.getElementById('emi').value = emi.toFixed(2);
}
 
function removeGoldItem(button) {
    button.parentElement.remove();
    updateTotalWeight();
    calculateEstimatedValue();
}
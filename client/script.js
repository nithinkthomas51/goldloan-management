
const BASE_URL = 'https://fuzzy-space-adventure-7wvwjpwq554fwq4q-5000.app.github.dev/';
document.getElementById('customer-registration').addEventListener('click', (e) => {
    e.preventDefault();

    const url = BASE_URL + 'customers/register';
    const customerData = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        address: document.getElementById('customer-address').value,
        customerID: document.getElementById('customer-id').value
    };
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
            })
            .catch(err => console.log(err.message));
        })
        .catch(error => {
            console.log('Error: ' + error.message);
        });
})

document.getElementById('get-customers').addEventListener('click', () => {
    const url = BASE_URL + 'customers/';
    console.log(url);

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
        .then(data => console.log(data))
        .catch(err => console.log(err.message));
    })
    .catch(err => {
        console.log('Error: ' + err);
    });
});
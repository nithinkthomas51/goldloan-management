document.getElementById('customer-registration').addEventListener('click', (e) => {
    e.preventDefault();

    const url = 'http://localhost:5000/customers/register';
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
            return response.json;
        })
        .then(data => {
            console.log('Success: ' + data);
        })
        .catch(error => {
            console.log('Error: ' + error);
        });
})
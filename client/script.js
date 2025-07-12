
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
        <input type="number" placeholder="Weight (grams)" required>
        <input type="number" placeholder="Purity (karat)" required>
        <button type="button" class="remove-btn" onclick="removeGoldItem(this)">X</button>
    `;
    container.appendChild(div);
}

function removeGoldItem(button) {
    button.parentElement.remove();
}
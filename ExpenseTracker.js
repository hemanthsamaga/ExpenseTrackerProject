// Load existing expenses from localStorage on page load

document.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
});

// JavaScript function to update the input field with the selected option
function selectOption(value) {
    document.getElementById('expenseDesc').value = value; // Update the input field with the selected value
}

function selectCategory(value) {
    document.getElementById('expenseCategory').value = value; // Update the input field with the selected value
}


// Add Expense Button click event
document.getElementById('addExpenseBtn').addEventListener('click', function() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const description = document.getElementById('expenseDesc').value.trim();
    const category = document.getElementById('expenseCategory').value;

    if (description === '' || isNaN(amount) || category === '') {
        alert('Please choose valid values for all fields.');
        return;
    }

    

    // Create an expense object
    const expense = {
        amount: amount,
        description: description,
        category: category
    };

    // Add the expense to localStorage
    addExpenseToLocalStorage(expense);

    // Add expense to the list on the screen
    addExpenseToList(expense);

    // Clear input fields
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDesc').value = '';
    document.getElementById('expenseCategory').value = '';
});

// Add expense to the list on the screen
function addExpenseToList(expense) {
    const expenseItem = document.createElement('li');
    expenseItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    expenseItem.innerHTML = `
        ${expense.amount} - ${expense.description} - ${expense.category}
        <div>
            <button class="btn btn-sm btn-outline-primary editBtn" data-bs-toggle="button">Edit</button>
            <button class="btn btn-sm btn-outline-primary deleteBtn" data-bs-toggle="button">Delete</button>
        </div>
    `;

    document.getElementById('expenseList').appendChild(expenseItem);

    // Edit Button functionality
    expenseItem.querySelector('.editBtn').addEventListener('click', function() {
        // Populate input fields with current values
        document.getElementById('expenseAmount').value = expense.amount;
        document.getElementById('expenseDesc').value = expense.description;
        document.getElementById('expenseCategory').value = expense.category;
        
        // Remove the expense item temporarily
        expenseItem.remove();

        // Remove the expense from localStorage before editing
        removeExpenseFromLocalStorage(expense);
    });

    // Delete Button functionality
    expenseItem.querySelector('.deleteBtn').addEventListener('click', function() {
        expenseItem.remove();
        removeExpenseFromLocalStorage(expense);
    });
}

// Add expense to localStorage
function addExpenseToLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Remove expense from localStorage
function removeExpenseFromLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(e => e.amount !== expense.amount || e.description !== expense.description ||  e.category !== expense.category);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Update the total amount displayed on the screen
function updateTotalAmount() {
    let total = 0;
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        total += expense.amount;
    });
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

// Load expenses from  the localStorage on page load
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        addExpenseToList(expense);
    });
}

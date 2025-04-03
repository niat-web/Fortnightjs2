// DOM Elements
const billAmountInput = document.getElementById('bill-amount');
const numPeopleInput = document.getElementById('num-people');
const tipButtons = document.querySelectorAll('.tip-btn');
const calculateBtn = document.getElementById('calculate-btn');
const tipAmountElement = document.getElementById('tip-amount');
const totalBillElement = document.getElementById('total-bill');
const perPersonElement = document.getElementById('per-person');

// Variables
let selectedTipPercentage = 0;

// Event Listeners
tipButtons.forEach(btn => {
    btn.addEventListener('click', handleTipButtonClick);
});

calculateBtn.addEventListener('click', calculateTip);

// Input validation
billAmountInput.addEventListener('input', validateInput);
numPeopleInput.addEventListener('input', validateInput);

// Functions
function validateInput(event) {
    const input = event.target;
    const value = input.value;

    // Check if value is a valid number
    if (value !== '' && isNaN(Number(value))) {
        input.style.borderColor = 'red';
        return false;
    }

    // Additional validation for number of people
    if (input === numPeopleInput && value < 1) {
        input.value = 1; // Minimum 1 person
    }

    input.style.borderColor = '#ddd';
    return true;
}

function handleTipButtonClick(event) {
    // Remove active class from all buttons
    tipButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    event.target.classList.add('active');

    // Get tip percentage from data attribute
    selectedTipPercentage = Number(event.target.dataset.tip);
}

function calculateTip() {
    // Get input values
    const billAmount = Number(billAmountInput.value);
    const numPeople = Number(numPeopleInput.value) || 1; // Default to 1 if empty

    // Validate inputs
    if (billAmount <= 0) {
        alert('Please enter a valid bill amount');
        billAmountInput.focus();
        return;
    }

    if (selectedTipPercentage <= 0) {
        alert('Please select a tip percentage');
        return;
    }

    // Calculate tip, total, and per person amounts
    const tipAmount = (billAmount * selectedTipPercentage) / 100;
    const totalBill = billAmount + tipAmount;
    const perPerson = totalBill / numPeople;

    // Display results with 2 decimal places
    tipAmountElement.textContent = `₹${tipAmount.toFixed(2)}`;
    totalBillElement.textContent = `₹${totalBill.toFixed(2)}`;
    perPersonElement.textContent = `₹${perPerson.toFixed(2)}`;
}

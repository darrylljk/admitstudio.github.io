(() => {
  'use strict';

  // Fetch all forms with the "needs-validation" class
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over each form to handle validation
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        let isValid = true;

        // Reset custom validation messages
        const radioError = document.getElementById('radioError');
        const numberError = document.getElementById('numberError');
        const genderError = document.querySelector('.gender-error'); // Gender error element
        radioError.style.display = 'none';
        numberError.style.display = 'none';
        genderError.style.display = 'none';

        // Check if a radio button is selected
        const selectedExamRadio = document.querySelector('input[name="exam-radios"]:checked');
        if (!selectedExamRadio) {
          isValid = false;
          radioError.style.display = 'block'; // Show error for exam radio buttons
        }

        // Check if a number is entered when A, B, or C is selected
        if (
          selectedExamRadio &&
          (selectedExamRadio.value === 'GMAT_focus' ||
            selectedExamRadio.value === 'GMAT_classic' ||
            selectedExamRadio.value === 'GRE')
        ) {
          const numberInput = document.getElementById('numberInput');
          if (!numberInput.value) {
            isValid = false;
            numberError.style.display = 'block'; // Show error for number input
          }
        }

        // Check if a gender is selected
        const selectedGenderRadio = document.querySelector('input[name="gender-radios"]:checked');
        if (!selectedGenderRadio) {
          isValid = false;
          genderError.style.display = 'block'; // Show error for gender radio buttons
        }

        // If the form is not valid, prevent submission
        if (!form.checkValidity() || !isValid) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated'); // Add Bootstrap validation class
      },
      false
    );
  });

  // Toggle number input visibility based on selected exam radio button
  window.toggleNumberInput = () => {
    const numberInputDiv = document.getElementById('numberInputDiv');
    const numberInput = document.getElementById('numberInput');
    const radioError = document.getElementById('radioError');
    const selectedExamRadio = document.querySelector('input[name="exam-radios"]:checked');

    // Clear "Please choose an option" error message if a radio button is selected
    if (selectedExamRadio) {
      radioError.style.display = 'none';
    }

    if (
      selectedExamRadio &&
      (selectedExamRadio.value === 'GMAT_focus' ||
        selectedExamRadio.value === 'GMAT_classic' ||
        selectedExamRadio.value === 'GRE')
    ) {
      numberInputDiv.style.display = 'block';
      numberInput.required = true; // Make number input required
    } else {
      numberInputDiv.style.display = 'none';
      numberInput.required = false; // Remove the required attribute
    }
  };

  // Event listener for number input to clear error message dynamically
  document.getElementById('numberInput').addEventListener('input', () => {
    const numberError = document.getElementById('numberError');
    const numberInput = document.getElementById('numberInput');

    // Clear "A number is required" error message if a number is entered
    if (numberInput.value) {
      numberError.style.display = 'none';
    }
  });

  // Event listener for gender radio buttons to clear error dynamically
  const genderRadios = document.querySelectorAll('input[name="gender-radios"]');
  genderRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      const genderError = document.querySelector('.gender-error');
      genderError.style.display = 'none'; // Hide gender error when any option is selected
    });
  });

  // Hide number input on page load
  document.addEventListener('DOMContentLoaded', () => {
    const numberInputDiv = document.getElementById('numberInputDiv');
    const numberInput = document.getElementById('numberInput');
    numberInputDiv.style.display = 'none';
    numberInput.required = false;
  });
})();

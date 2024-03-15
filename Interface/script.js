document.addEventListener('DOMContentLoaded', () => {
    const daySelect = document.getElementById('day');
    const submitButton = document.getElementById('submit');
    const resultDiv = document.getElementById('result');

    // Populate the dropdown list with days from 1 to 30
    for (let i = 1; i <= 30; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    submitButton.addEventListener('click', () => {
        const selectedDay = daySelect.value;
        // Fetch Nafilas information for the selected day
        fetch(`/nafilas/${selectedDay}`)
            .then(response => response.json())
            .then(data => {
                // Display the Nafilas information in the resultDiv
                resultDiv.innerHTML = `
                    <h2>Nafilas information for day ${selectedDay}</h2>
                    <p>Number of Rakkas: ${data.rakkas}</p>
                    <p>Number of Sallamas: ${data.sallama}</p>
                    <h3>Recitations:</h3>
                    <ul>
                        ${data.recite.map(recitation => `<li>${recitation.suraName}: ${recitation.times}</li>`).join('')}
                    </ul>
                    <p>Rewards: ${data.rewards}</p>
                `;
            })
            .catch(error => {
                // Handle errors
                resultDiv.textContent = `Error: ${error.message}`;
            });
    });
});

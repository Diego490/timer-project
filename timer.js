// Wait for the HTML document to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
	// Get references to HTML elements
	const countdownDisplay = document.getElementById('countdownDisplay');
	const alarmMessage = document.getElementById('alarmMessage');
	let countdownInterval;
	let countdownSeconds;

	// Get references to buttons
	const startCountdownBtn = document.getElementById('startCountdown');
	const stopCountdownBtn = document.getElementById('stopCountdown');
	const btn5Minutes = document.getElementById('btn5Minutes');
	const btn30Minutes = document.getElementById('btn30Minutes');
	const btn1Hour = document.getElementById('btn1Hour');

	// Add event listeners for the buttons
	startCountdownBtn.addEventListener('click', startCountdown);
	stopCountdownBtn.addEventListener('click', () => stopCountdown());

	// Add event listeners for the timer buttons
	btn5Minutes.addEventListener('click', () => startTimer(5 * 60)); // 5 minutes in seconds
	btn30Minutes.addEventListener('click', () => startTimer(30 * 60)); // 30 minutes in seconds
	btn1Hour.addEventListener('click', () => startTimer(60 * 60)); // 1 hour in seconds

	// Function to start the countdown
	function startCountdown(event) {
		event.preventDefault(); // Prevent form submission and page refresh

		// Clear the alarm message from the previous countdown
		alarmMessage.textContent = '';

		// Get the countdown time from the input field
		const inputText = document
			.getElementById('countdownInput')
			.value.trim()
			.toLowerCase();
		const timeValue = parseFloat(inputText);
		if (isNaN(timeValue)) {
			const errorMessage = document.getElementById('errorMessage');
			errorMessage.textContent =
				'Please enter a valid time format (e.g., 5s, 2m, 1h)';
			return;
		}

		let countdownDuration;
		if (inputText.endsWith('s')) {
			countdownDuration = timeValue * 1000; // seconds to milliseconds
		} else if (inputText.endsWith('m')) {
			countdownDuration = timeValue * 60 * 1000; // minutes to milliseconds
		} else if (inputText.endsWith('h')) {
			countdownDuration = timeValue * 60 * 60 * 1000; // hours to milliseconds
		} else {
			const errorMessage = document.getElementById('errorMessage');
			errorMessage.textContent =
				'Invalid time format. Please use "s" for seconds, "m" for minutes, or "h" for hours.';
			return;
		}

		// Start the countdown
		startTimer(countdownDuration / 1000); // Convert to seconds
	}

	function startTimer(durationInSeconds) {
		// Function to start the countdown timer
		countdownSeconds = Math.floor(durationInSeconds);
		clearInterval(countdownInterval);
		countdownInterval = setInterval(updateCountdown, 1000);
		updateCountdown();
	}

	// Function to stop the countdown
	function stopCountdown() {
		clearInterval(countdownInterval);
		countdownDisplay.textContent = 'Countdown Stopped';
	}

	// Function to update the countdown display
	function updateCountdown() {
		if (countdownSeconds <= 0) {
			clearInterval(countdownInterval);
			countdownDisplay.textContent = 'Countdown Complete!';
			alarmMessage.textContent = "Time's up! 🕒";
			return;
		}

		const hours = Math.floor(countdownSeconds / 3600);
		const minutes = Math.floor((countdownSeconds % 3600) / 60);
		const seconds = countdownSeconds % 60;

		countdownDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(
			minutes
		).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		countdownSeconds--;
	}
});

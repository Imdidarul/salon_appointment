// 1. Set the Service ID specifically for Hair Straightening
// Ensure this matches the ID in your 'services' table in the DB
const SERVICE_ID = 2; 
const BASE_URL = "http://localhost:3000";

/**
 * Fetch specialists and render them
 */
async function loadSpecialists() {
    try {
        const response = await axios.get(`${BASE_URL}/specialist/getAllSpecialists`);
        const specialists = response.data.specialists;
        const container = document.querySelector(".specialists");

        // Clear hardcoded static HTML
        container.innerHTML = "";

        specialists.forEach(sp => {
            const spDiv = document.createElement("div");
            spDiv.className = "specialist";
            spDiv.dataset.spid = sp.id;

            // Using unique IDs for date inputs to avoid DOM conflicts
            spDiv.innerHTML = `
                <p><strong>Name:</strong> ${sp.name}</p>
                <p><strong>Rating:</strong> ${sp.rating}/10</p>
                <label for="date-${sp.id}">Date:</label>
                <input id="date-${sp.id}" type="date" class="bookingDate" required>
                <div class="bookingSlots">
                    <button class="slot-btn">10:00 AM - 11:00 AM</button>
                    <button class="slot-btn">11:00 AM - 12:00 PM</button>
                    <button class="slot-btn">12:00 PM - 01:00 PM</button>
                    <button class="slot-btn">02:00 PM - 03:00 PM</button>
                    <button class="slot-btn">03:00 PM - 04:00 PM</button>
                </div>
            `;
            container.appendChild(spDiv);
        });

        setupBookingListeners();
    } catch (error) {
        console.error("Error loading specialists:", error);
        alert("Could not load specialists. Please try again later.");
    }
}

/**
 * Attach event listeners to the time slot buttons
 */
function setupBookingListeners() {
    const container = document.querySelector(".specialists");

    container.addEventListener("click", async (e) => {
        // Check if the clicked element is a slot button
        if (e.target.classList.contains("slot-btn")) {
            const button = e.target;
            const specialistDiv = button.closest(".specialist");
            const spId = specialistDiv.dataset.spid;
            const dateInput = specialistDiv.querySelector(".bookingDate");
            
            const selectedDate = dateInput.value;
            const selectedTime = button.innerText;

            // 1. Validation
            if (!selectedDate) {
                alert("Please select a date first!");
                return;
            }

            // 2. Auth Check
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            if (!token || !userId) {
                alert("You must be logged in to book.");
                window.location.href = "../login.html";
                return;
            }

            // 3. Prepare Data
            // Note: time is sent as a string that Sequelize can parse into a DATE/DATETIME
            const bookingData = {
                name: "Hair Straightening Appointment",
                userId: userId,
                spId: spId,
                serviceId: SERVICE_ID,
                time: `${selectedDate} ${selectedTime.split('-')[0].trim()}`
            };

            // 4. API Call
            try {
                button.disabled = true; // Prevent double-clicking
                button.innerText = "Booking...";

                const response = await axios.post(`${BASE_URL}/booking/addBooking`, bookingData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                alert("Success! Your hair straightening session is booked.");
                window.location.href = "index.html"; // Send them back to home
            } catch (error) {
                console.error("Booking Error:", error);
                alert(error.response?.data || "Something went wrong during booking.");
                button.disabled = false;
                button.innerText = selectedTime;
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", loadSpecialists);
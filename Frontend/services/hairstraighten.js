const SERVICE_ID = 2; 
const BASE_URL = "http://localhost:3000";

async function loadSpecialists() {
    try {
        const response = await axios.get(`${BASE_URL}/specialist/getAllSpecialists`);
        const specialists = response.data.specialists;
        const container = document.querySelector(".specialists");


        container.innerHTML = "";

        specialists.forEach(sp => {
            const spDiv = document.createElement("div");
            spDiv.className = "specialist";
            spDiv.dataset.spid = sp.id;

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

function setupBookingListeners() {
    const container = document.querySelector(".specialists");

    container.addEventListener("click", async (e) => {
        if (e.target.classList.contains("slot-btn")) {
            const button = e.target;
            const specialistDiv = button.closest(".specialist");
            const spId = specialistDiv.dataset.spid;
            const dateInput = specialistDiv.querySelector(".bookingDate");
            
            const selectedDate = dateInput.value;
            const selectedTime = button.innerText;

            if (!selectedDate) {
                alert("Please select a date first!");
                return;
            }

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            if (!token || !userId) {
                alert("You must be logged in to book.");
                window.location.href = "../login.html";
                return;
            }

            const bookingData = {
                name: "Hair Straightening Appointment",
                userId: userId,
                spId: spId,
                serviceId: SERVICE_ID,
                time: `${selectedDate} ${selectedTime.split('-')[0].trim()}`
            };

            try {
                button.disabled = true;
                button.innerText = "Booking...";

                const response = await axios.post(`${BASE_URL}/booking/addBooking`, bookingData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                alert("Success! Your hair straightening session is booked.");
                window.location.href = "index.html";
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
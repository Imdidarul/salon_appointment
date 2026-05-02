const SERVICE_ID = 3; 
const API_BASE_URL = "http://localhost:3000";

async function loadSpecialists() {
    try {
        const response = await axios.get(`${API_BASE_URL}/specialist/getAllSpecialists`);
        const specialists = response.data.specialists;
        const container = document.querySelector(".specialists");

        container.innerHTML = "";

        const today = new Date().toISOString().split('T')[0];

        specialists.forEach(sp => {
            const spDiv = document.createElement("div");
            spDiv.className = "specialist";
            spDiv.dataset.spid = sp.id;

            spDiv.innerHTML = `
                <p><strong>Name:</strong> ${sp.name}</p>
                <p><strong>Rating:</strong> ${sp.rating}/10</p>
                <label for="date-${sp.id}">Date:</label>
                <input id="date-${sp.id}" type="date" class="bookingDate" min="${today}" required>
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
        console.error("Failed to load specialists:", error);
        alert("Error loading specialist data.");
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
                alert("Please select a date for your treatment.");
                return;
            }

            
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            if (!token || !userId) {
                alert("Please log in to book an appointment.");
                window.location.href = "../login.html";
                return;
            }

            
            const bookingData = {
                name: "Hair Treatment Session",
                userId: userId,
                spId: spId,
                serviceId: SERVICE_ID,
                time: `${selectedDate} ${selectedTime.split('-')[0].trim()}`
            };

    
            try {

                button.disabled = true;
                const originalText = button.innerText;
                button.innerText = "Booking...";

                await axios.post(`${API_BASE_URL}/booking/addBooking`, bookingData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                alert("Hair treatment successfully booked!");
                window.location.href = "index.html"; 

            } catch (error) {
                console.error("Booking Error:", error);
                alert(error.response?.data || "Booking failed. The slot might be taken.");
                button.disabled = false;
                button.innerText = originalText;
            }
        }
    });
}


document.addEventListener("DOMContentLoaded", loadSpecialists);
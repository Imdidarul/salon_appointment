const SERVICE_ID = 1; 

async function loadSpecialists() {
    try {
        const response = await axios.get('http://localhost:3000/specialist/getAllSpecialists');
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
        console.error("Failed to load specialists", error);
    }
}

function setupBookingListeners() {
    const slotButtons = document.querySelectorAll(".slot-btn");

    slotButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            const specialistDiv = e.target.closest(".specialist");
            const spId = specialistDiv.dataset.spid;
            const dateInput = specialistDiv.querySelector(".bookingDate");
            const selectedDate = dateInput.value;
            const selectedTime = e.target.innerText;

            if (!selectedDate) {
                alert("Please select a date first!");
                return;
            }

            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            if (!token) {
                alert("Please login to book a service");
                window.location.href = "../login.html";
                return;
            }

            const bookingData = {
                name: "Haircut Appointment",
                userId: userId,
                spId: spId,
                serviceId: SERVICE_ID,
                time: `${selectedDate} ${selectedTime.split('-')[0].trim()}` 
            };

            try {
                const response = await axios.post('http://localhost:3000/booking/addBooking', bookingData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                alert("Booking Successful!");
                window.location.href = "../dashboard.html";
            } catch (error) {
                console.error(error);
                alert(error.response?.data || "Booking failed");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadSpecialists();
});
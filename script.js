document.getElementById("serviceForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let customerName = document.getElementById("customerName").value;
    let phone = document.getElementById("phone").value;
    let vehicleNumber = document.getElementById("vehicleNumber").value;
    let vehicleType = document.getElementById("vehicleType").value;
    let serviceType = document.getElementById("serviceType").value;
    let serviceDate = document.getElementById("serviceDate").value;

    let message = document.getElementById("message");

    if (customerName === "") {
        message.innerHTML = "Please enter customer name.";
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        message.innerHTML = "Please enter a valid 10 digit phone number.";
        return;
    }

    if (vehicleNumber === "") {
        message.innerHTML = "Please enter vehicle number.";
        return;
    }

    if (vehicleType === "") {
        message.innerHTML = "Please select vehicle type.";
        return;
    }

    if (serviceType === "") {
        message.innerHTML = "Please select service type.";
        return;
    }

    if (serviceDate === "") {
        message.innerHTML = "Please select preferred date.";
        return;
    }

    message.innerHTML =
        "Service booking successful!<br>" +
        "Customer Name: " + customerName + "<br>" +
        "Vehicle Number: " + vehicleNumber + "<br>" +
        "Service Type: " + serviceType + "<br>" +
        "Preferred Date: " + serviceDate;

});
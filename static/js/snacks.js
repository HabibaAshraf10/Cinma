 // Initialize variables to store data
 let totalPrice = 0; // To store total price
 let selectedItems = []; // To store names of selected items

 // Function to handle ordering items
 function order(item) {
     let price = item.includes("small") ? 20 : 40;

     // Update total price and add item to the selected items list
     totalPrice += price;
     selectedItems.push(`${item} - ${price}$`);
     alert(`Item added: ${item} (${price}$). \nTotal Price: ${totalPrice}$`);

     // Create a cookie that have the snacks total price value
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    document.cookie = `snack_total_price= ${totalPrice}; expires= ${expiryDate.toUTCString()}; path=/ `
 }

 // Function to handle payment button
 function goToPayment() {
     if (selectedItems.length === 0) {
         alert("No items selected. Please order something first.");
         return;
     }
     alert("Redirecting to payment page...");
     window.location.href = "/payment";
 }

 // Function to handle message button
 function showMessage() {
     if (selectedItems.length === 0) {
         alert("No items selected.");
         return;
     }
     let message = `Total Price: ${totalPrice}$\nSelected Items:\n`;
     message += selectedItems.map((item, index) => `${index + 1}. ${item}`).join("\n");
     alert(message);
 }


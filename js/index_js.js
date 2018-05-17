

$(document).ready(function() {
	// The modal begins with class .hidden to hide it. Remove and reassign that
	// class based on the button presses for order, close, and print.
	
	$("#ordernowbutton").click(function() {
		/* Act on the event */
		console.log("ordernowbutton clicked");
		getReceipt();
		$("#invoice").removeClass('hidden');
	});

	$("#closebutton").click(function() {
		/* Act on the event */
		console.log("closebutton clicked");
		$("#invoice").addClass('hidden');
	});

	$("#printbutton").click(function() {
		/* Act on the event */
		console.log("printbutton clicked");
		$("#invoice").addClass('hidden');
		alert("Thank you for your order! Your invoice is now printing");
	});
});

function getReceipt() {
	// Read data from the form and assign to variables
	var size = $('input[name=size]:checked', '#sizebox').val();
	var crust = $('input[name=crust]:checked', '#crustbox').val();
	var sauce = $('input[name=sauce]:checked', '#saucebox').val();
	var meats = []
	$('input[name=meats]:checked').each(function(){
		meats.push($(this).val());
	});
	var cheese = []
	$('input[name=cheese]:checked').each(function(){
		cheese.push($(this).val());
	});
	var veggies = []
	$('input[name=veggies]:checked').each(function(){
		veggies.push($(this).val());
	});
	runningTotal = 0;
	console.log(size);
	console.log(crust);
	console.log(sauce);
	console.log(meats);
	console.log(cheese);
	console.log(veggies);
	// First, check the pizza size
	switch(size) {
		case "Personal":
			runningTotal += 6;
			break;
		case "Medium":
			runningTotal += 10;
			break;
		case "Large":
			runningTotal += 14;
			break;
		case "Extra Large":
			runningTotal += 16;
			break;
		default:
			console.log("Invalid size selected");
	}
	console.log("base price is " + runningTotal + " based on crust " + crust)

	// Then, add $3 for Stuffed Cheese crust
	if (crust == "Cheese Stuffed") {
		runningTotal += 3;
		console.log("cheese-stuffed crust is tasty!")
	}

	// Then, add $1 for each meat item above 1
	if (meats.length > 1) {
		runningTotal += (meats.length - 1);
		console.log("so much meat");
	}

	// Then, add $3 for Extra Cheese
	if (cheese == "Extra") {
		runningTotal += 3;
		console.log("extra cheese");
	}

	// Then, add $1 for each veggie item above 1
	if (veggies.length > 1) {
		runningTotal += (veggies.length - 1);
		console.log("many veggies!");
	}

	// Return the total cost
	//return runningTotal;

	// Display the receipt
	displayReceipt(size, crust, sauce, meats, cheese, veggies, runningTotal);
}

function displayReceipt(size, crust, sauce, meats, cheese, veggies, runningTotal) {
	var size = size;
	var crust = crust;
	var sauce = sauce;
	var meats = meats;
	var cheese = cheese;
	var veggies = veggies;
	var runningTotal = runningTotal;
	var sizeCost = {	"Personal": 6,
						"Medium": 10,
						"Large": 14,
						"Extra Large": 16
					}

	// Give the value and cost of the pizza size to the invoice table
	$('#invoicesize').html(size);
	$('#invoicesizecost').html("$ " + sizeCost[size] + ".00");

	// Give the value and cost of the pizza crust to the invoice table
	// show included if it is no additional charge
	$('#invoicecrust').html(crust);
	if (crust == "Cheese Stuffed") {
		$('#invoicecrustcost').html("$ 3.00");
	} else {
		$('#invoicecrustcost').html("Included");
	}

	// Give value of sauce to invoice table, cost always included
	$('#invoicesauce').html(sauce);
	$('#invoicesaucecost').html("Included");

	// Give value of meat to invoice table, array separated to string, and
	// cost = (n-1) * $1
	var meatlist = meats.join(", ")
	$('#invoicemeats').html(meatlist);
	if (meats.length == 0) {
		meatscost = ""
	} else if (meats.length == 1) {
		$('#invoicemeatscost').html("Included");
	} else {
		$('#invoicemeatscost').html("$ " + ((meats.length - 1) * 1) + ".00");
	}

	// Give value of cheese to invoice table, and $3 cost for extra cheese
	$('#invoicecheese').html(cheese);
	if (cheese == "Extra") {
		$('#invoicecheesecost').html("$ 3.00");
	} else {
		$('#invoicecheesecost').html("Included");
	}

	// Like meat, breat array to a string and give to invoice table
	// cost of veggies is (n-1) * $1
	var veggielist = veggies.join(", ")
	$('#invoiceveggies').html(veggielist);
	if (veggies.length == 0) {
		veggiescost = ""
	} else if (veggies.length == 1) {
		$('#invoiceveggiescost').html("Included");
	} else {
		$('#invoiceveggiescost').html("$ " + ((veggies.length - 1) * 1) + ".00");
	}
	
	// Give total invoice to invoice table.
	$('#invoicetotalcost').html("$ " + runningTotal + ".00");
}






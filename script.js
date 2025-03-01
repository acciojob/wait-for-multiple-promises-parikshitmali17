// //your JS code here. If required.
// let tr =document.CreateElement("tr");
// let th= document.CreateElement("th");


// let id=document.getElementById("id");


// let promiseStart= false;
// if(promiseStart){
// 	document.id.append(tr);
// 	document.id.append(th)
// 	th.innerText="Loading..."
// }
// let promise1=new Pomise((resolve)=>{
// 	promiseStart=true;
// 	setTimeout(()=>{
// 		resolve(1)
// 	},1000)
// })
// promise1.then(()=>{
// 	th.innerText="Promise 1";
	
// })

// let promise2=new Pomise((resolve)=>{
	
// 	setTimeout(()=>{
// 		resolve(2)
// 	},2000)
// })

// promise2.then((2)=>{
// 	let tr2 =document.CreateElement("tr");
// let th2= document.CreateElement("th");
// 	document.tr.append(tr2)
// 	document.tr2.append(th2)
// 	th2.innerText="3"
	
// })
// let promise3=new Pomise((resolve)=>{
// 	setTimeout(()=>{
// 		resolve(3)
// 	},3000)
// })

// promise3.then((3)=>{
// 	let tr3 =document.CreateElement("tr");
// let th3= document.CreateElement("th");
// 	document.tr.append(tr2)
// 	document.tr2.append(th2)
// 	th2.innerText="2"
	
// })
// Promise.all([promise1,promise2,promise3])

let table = document.getElementById("output");

// Initially, add a "Loading..." row with an id
let loadingRow = document.createElement("tr");
loadingRow.id = "loading"; // Add ID for Cypress test compatibility
let loadingCell = document.createElement("td");
loadingCell.colSpan = 2;
loadingCell.innerText = "Loading...";
loadingRow.appendChild(loadingCell);
table.appendChild(loadingRow);

// Function to create promises that resolve after a random time (1-3 sec)
function createPromise(index) {
    return new Promise((resolve) => {
        let timeTaken = (Math.random() * 2 + 1).toFixed(3); // Random time between 1-3 sec
        setTimeout(() => resolve({ index, timeTaken }), timeTaken * 1000);
    });
}

// Create three promises
let promise1 = createPromise(1);
let promise2 = createPromise(2);
let promise3 = createPromise(3);

// Wait for all promises to resolve
Promise.all([promise1, promise2, promise3]).then((results) => {
    // Remove the "Loading..." row
    let loadingElement = document.getElementById("loading");
    if (loadingElement) {
        table.removeChild(loadingElement);
    }

    let totalTime = 0;

    // Populate the table with promise results
    results.forEach(({ index, timeTaken }) => {
        let row = document.createElement("tr");
        let col1 = document.createElement("td");
        let col2 = document.createElement("td");

        col1.innerText = `Promise ${index}`;
        col2.innerText = timeTaken;

        row.appendChild(col1);
        row.appendChild(col2);
        table.appendChild(row);

        totalTime = Math.max(totalTime, parseFloat(timeTaken)); // Total time is the max promise time
    });

    // Add the total time row
    let totalRow = document.createElement("tr");
    let totalCol1 = document.createElement("td");
    let totalCol2 = document.createElement("td");

    totalCol1.innerText = "Total";
    totalCol2.innerText = totalTime.toFixed(3);

    totalRow.appendChild(totalCol1);
    totalRow.appendChild(totalCol2);
    table.appendChild(totalRow);
}).catch((error) => console.error("Error:", error));

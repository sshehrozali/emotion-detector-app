const network = new brain.recurrent.LSTM();     // Create Neural Network



// When user clicks the button
document.getElementById("button-addon2").addEventListener("click", function () {

    // Add some styling + loading spinner
    document.getElementById("cardBox").classList.add("d-flex");
    document.getElementById("cardBox").classList.add("flex-column");
    document.getElementById("cardBox").classList.add("justify-content-center");
    document.getElementById("cardBox").classList.add("align-items-center");
    document.getElementById("cardBox").innerHTML = 
    `<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <p class="text-center card-text m-3">Guessing...</p>`;


    



    let InputString = document.getElementById("inputBox").value;
    console.log(InputString);

    // Loading JSON data
    fetch("./js/rawData/trainingDataSet.json")
        .then(response => response.json())
        .then(dataSet => {


            // Mapping values
            console.log("Mapping values...")
            const trainingData = dataSet.map(item => ({
                input: item.msg,
                output: item.feelings
            }));




            // Training Model
            console.log("Training data...")
            network.train(trainingData, { iterations: 500, log: true });
            const Output = network.run(InputString);  // Build model
            console.clear();




            // See results
            document.getElementById("cardBox").innerHTML = 
            `<p class="card-text fs-2">You are feeling <b>${Output}</b></p>`;
        });

});
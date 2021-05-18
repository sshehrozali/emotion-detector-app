const network = new brain.recurrent.LSTM();     // Create Neural Network



// When user clicks the button
document.getElementById("button-addon2").addEventListener("click", function () {

    document.getElementById("OutputBox").innerHTML = `
    <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
    



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
            network.train(trainingData, { iterations: 50, log: true });
            const Output = network.run(InputString);  // Build model
            console.clear();




            // See results
            document.getElementById("displayOutput").innerText = Output;
            console.log(`Msg: ${InputString}`);
            console.log(`Emotion: ${Output}`);
        });

});
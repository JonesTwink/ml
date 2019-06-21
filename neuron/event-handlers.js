document.getElementById('run-epoch').addEventListener('click', function () {
    let solidFill = document.getElementById('fill-type').checked;
    learningExample.runEpoch(neuron, amountOfLearningCycles, learningSpeed);
    learningExample.decorateMatrixByNeuron(neuron, solidFill);
});

document.getElementById('cycle-amount').addEventListener('input', function (e) {
    amountOfLearningCycles = e.target.value;
});

document.getElementById('learning-speed').addEventListener('input', function (e) {
    learningSpeed = e.target.value;
});
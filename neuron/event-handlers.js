document.getElementById('run-epoch').addEventListener('click', function () {
    let solidFill = document.getElementById('fill-type').checked;
    learningExample.runEpoch(neuron, 10000, 0.001);
    learningExample.decorateMatrixByNeuron(neuron, solidFill);
});
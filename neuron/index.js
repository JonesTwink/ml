const inputSignals = [
    [1, 3, 5],
    [3, 3, 3],
    [0, -1, 1],
];

const inputSignalWeights = [0.1, 0.2, 0.3];
const tilt = 0.03;

let neuron = new Neuron(tilt, inputSignalWeights);

for (let i = 0; i < inputSignals.length; i++){
    console.log(`Iteration #${i+1}`);
    console.log('Inputs:');
    console.log(inputSignals[i]);
    console.log('Result:');
    console.log(neuron.sendImpulse(inputSignals[i]))
}
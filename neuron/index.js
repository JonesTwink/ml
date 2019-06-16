let learningExample = new NeuronLearning(10, 10);
const amountOfInputs = learningExample.samples[0].inputValues.length;

let neuron = new Neuron(amountOfInputs);

learningExample.runEpoch(neuron, 10000, 0.001);
learningExample.testNeuronOnAllValues(neuron);


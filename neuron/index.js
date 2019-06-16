let learningExample = new NeuronLearning(10, 10);
const amountOfInputs = learningExample.samples[0].inputValues.length + 1;

let neuron = new Neuron(amountOfInputs, 0.06);

learningExample.runEpoch(neuron, 10000, 0.001);
learningExample.testNeuronOnAllValues(neuron);
learningExample.runVisualisedExample(neuron);
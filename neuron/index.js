let amountOfLearningCycles = 10000;
let learningSpeed = 0.001;
let learningExample = new NeuronLearning(10, 10);
const amountOfInputs = learningExample.samples[0].inputValues.length + 1;
let neuron = new Neuron(amountOfInputs, 0.3);
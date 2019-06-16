function NeuronLearning(xLength, yLength) {
    this.dimensions = {x: xLength, y: yLength};
    this.upWeight = 1;
    this.downWeight = 0.5;
    this.samples = this.generateSamples(this.dimensions.x, this.dimensions.y);
}

NeuronLearning.prototype.generateSamples = function(xLength, yLength) {
    let samples = [];
    for (let rowIndex = 0; rowIndex < yLength; rowIndex++){
        const coordinateWeight = rowIndex < yLength / 2 ? this.upWeight : this.downWeight;
        for (let colIndex = 0; colIndex < xLength; colIndex++){
            samples.push({inputValues: [colIndex, rowIndex], expectedOutput: coordinateWeight});
        }
    }
    this.shuffleSamples(samples);
    return samples;
};

NeuronLearning.prototype.shuffleSamples = function(samples){
    for (let i = samples.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [samples[i], samples[j]] = [samples[j], samples[i]];
    }
};

NeuronLearning.prototype.teachBySamples = function (neuron, learningSpeed) {
    this.samples.forEach(sample => {
        const neuronOutput = neuron.sendImpulse(sample.inputValues);
        const delta = sample.expectedOutput - neuronOutput;
        for (let i = 0; i < sample.inputValues.length; i++){
            neuron.inputWeights[i] += learningSpeed * delta * sample.inputValues[i];
        }
    });
};

NeuronLearning.prototype.runEpoch = function(neuron, cycleAmount, learningSpeed){
    let cycleIndex = 0;
    console.log(`Cycle index: ${cycleIndex}:`);
    console.log(neuron.inputWeights);
    while (cycleIndex < cycleAmount){
        this.teachBySamples(neuron, learningSpeed);
        cycleIndex++;
    }
    console.log(`Cycle index: ${cycleIndex}:`);
    console.log(neuron.inputWeights);
};

NeuronLearning.prototype.testNeuron = function (neuron, [x, y]){
    let neuronOutput = neuron.sendImpulse([x, y]);
    if (Math.abs(neuronOutput - this.upWeight) > Math.abs(neuronOutput - this.downWeight)){
        console.log('Down')
    }else{
        console.log('Up');
    }
    console.log(neuronOutput);
};

NeuronLearning.prototype.testNeuronOnAllValues = function (neuron){
    for (let rowIndex = 0; rowIndex < this.dimensions.y; rowIndex++){
        for (let colIndex = 0; colIndex < this.dimensions.x; colIndex++){
            console.log([rowIndex, colIndex]);
            this.testNeuron(neuron, [colIndex, rowIndex]);
        }

    }
};
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

NeuronLearning.prototype.pointIsInLowerSide = function (neuron, coords){
    let neuronOutput = neuron.sendImpulse(coords);
    return Math.abs(neuronOutput - this.upWeight) > Math.abs(neuronOutput - this.downWeight);
};

NeuronLearning.prototype.testNeuronOnAllValues = function (neuron){
    for (let rowIndex = 0; rowIndex < this.dimensions.y; rowIndex++){
        for (let colIndex = 0; colIndex < this.dimensions.x; colIndex++){
            console.log([colIndex, rowIndex]);
            const isLowerSide = this.pointIsInLowerSide(neuron, [colIndex, rowIndex]);
            const answer = isLowerSide ? 'Lower' : 'Upper';
            console.log(answer);
        }

    }
};

NeuronLearning.prototype.runVisualisedExample = function (neuron){
    let matrixWrapper = document.createElement('div');
    matrixWrapper.style.cssText = 'position: absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center;';
    let matrix = document.createElement('div');
    matrix.style.cssText = 'width: 600px; height: 600px; position: relative';
    for (let rowIndex = 0; rowIndex < this.dimensions.y; rowIndex++){
        for (let colIndex = 0; colIndex < this.dimensions.x; colIndex++){
            let matrixPoint = document.createElement('div');
            matrixPoint.style.cssText = `position: absolute; top: ${rowIndex * 60}px; left: ${colIndex * 60}px; width: 56px; height: 56px; border: 1px solid grey; display: inline-block; margin: 1px`;
            matrixPoint.innerText = `[${colIndex}, ${rowIndex}]`;
            const neuronResponse = this.pointIsInLowerSide(neuron, [colIndex, rowIndex]);
            matrixPoint.style.backgroundColor = neuronResponse ? 'green' : 'red';
            matrix.appendChild(matrixPoint);
        }

    }
    matrixWrapper.appendChild(matrix);
    document.body.appendChild(matrixWrapper);
};


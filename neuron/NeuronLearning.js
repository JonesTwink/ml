function NeuronLearning(xLength, yLength) {
    this.dimensions = {x: xLength, y: yLength};
    this.upWeight = 1;
    this.downWeight = 0.1;
    this.samples = this.generateSamples(this.dimensions.x, this.dimensions.y);
    this.drawEmptyExampleMatrix();
}

NeuronLearning.prototype.generateSamples = function(xLength, yLength) {
    let samples = [];
    for (let rowIndex = 0; rowIndex < yLength; rowIndex++){
        const coordinateWeight = rowIndex < yLength / 2 ? this.upWeight : this.downWeight;
        for (let colIndex = 0; colIndex < xLength; colIndex++){
            samples.push({inputValues: [colIndex, rowIndex], expectedOutput: coordinateWeight});
        }
    }
    return samples;
};

NeuronLearning.prototype.teachBySamples = function (neuron, learningSpeed) {
    this.samples.forEach(sample => {
        const neuronOutput = neuron.sendImpulse(sample.inputValues.concat([1]));
        const delta = sample.expectedOutput - neuronOutput;
        for (let i = 0; i < sample.inputValues.length; i++){
            neuron.inputWeights[i] += learningSpeed * delta * sample.inputValues[i];
        }
        neuron.inputWeights[sample.inputValues.length] += learningSpeed * delta;
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
    let neuronOutput = neuron.sendImpulse(coords.concat([1]));
    return Math.abs(neuronOutput - this.upWeight) > Math.abs(neuronOutput - this.downWeight);
};

NeuronLearning.prototype.decorateMatrixByNeuron = function (neuron, solidFill){
    let matrixPoints = document.body.getElementsByClassName('matrix-point');
    for (let i = 0; i <matrixPoints.length; i++){
        if (solidFill){
            const neuronResponse = this.pointIsInLowerSide(neuron, [matrixPoints[i].getAttribute('x'), matrixPoints[i].getAttribute('y')]);
            matrixPoints[i].style.backgroundColor = neuronResponse ? 'skyblue' : 'gold';
        }else{
            matrixPoints[i].style.backgroundColor = `rgba(0, 0, 0, ${neuron.sendImpulse([matrixPoints[i].getAttribute('x'), matrixPoints[i].getAttribute('y'), 1])})`;
        }
    }
};

NeuronLearning.prototype.drawEmptyExampleMatrix = function (){
    let matrixWrapper = document.createElement('div');
    matrixWrapper.id= 'matrix-wrapper';
    let matrix = document.createElement('div');
    matrix.id = 'matrix';
    for (let rowIndex = 0; rowIndex < this.dimensions.y; rowIndex++){
        for (let colIndex = 0; colIndex < this.dimensions.x; colIndex++){
            let matrixPoint = document.createElement('div');
            matrixPoint.className = 'matrix-point';
            matrixPoint.setAttribute('x', colIndex);
            matrixPoint.setAttribute('y', rowIndex);
            matrixPoint.style.cssText = `top: ${rowIndex * 60}px; left: ${colIndex * 60}px;`;
            const coordsText = document.createElement('div');
            coordsText.textContent = `[${colIndex}, ${rowIndex}]`;
            matrixPoint.appendChild(coordsText);
            matrix.appendChild(matrixPoint);
        }

    }
    matrixWrapper.appendChild(matrix);
    document.body.appendChild(matrixWrapper);
};


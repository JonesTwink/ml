function Neuron(tilt, inputWeights) {
    this.inputWeights = inputWeights;
    this.tilt = tilt;
}

Neuron.prototype.sendImpulse = function (inputSignals) {
    const inputSignalSum = this.calculateSignalStrength(inputSignals, this.inputWeights);
    return this.calculateOutputSignal(inputSignalSum);
};

Neuron.prototype.calculateSignalStrength = function (inputSignals, weights) {
    let sum = 0;
    const iterationAmount = Math.min(inputSignals.length, weights.length);
    for (let i = 0; i < iterationAmount; i++){
        sum += inputSignals[i] * weights[i];
    }
    return sum;
};

Neuron.prototype.calculateOutputSignal = function (inputSignalSumm) {
    return  1 / (1 + Math.pow(Math.E, -this.tilt * inputSignalSumm));
};
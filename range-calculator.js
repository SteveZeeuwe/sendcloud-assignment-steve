const inputs = {};

setup();

function setup() {
    inputs.speed = document.getElementById("speed");
    inputs.temperature = document.getElementById("temperature");
}

function numberInputStepUp(input) {
    if(inputs[input] && inputs[input].type === 'number') {
        inputs[input].stepUp(1);

        return;
    }

    console.warn(`${input} could not be found or is not a valid number input`);
}

function numberInputStepdown(input) {
    if(inputs[input] && inputs[input].type === 'number') {
        inputs[input].stepDown(1);

        return;
    }
    
    console.warn(`${input} could not be found or is not a valid number input`);
}


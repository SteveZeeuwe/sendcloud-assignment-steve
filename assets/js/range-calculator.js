export default class RangeCalculator {
	constructor(rangeCalculatorElSelector, inputs, types, dataSets) {
		this.rangeCalculatorEl = document.querySelector(
			rangeCalculatorElSelector
		);
		this.inputDomRefs = this.setInputRefs(inputs);
		this.inputValues = this.constructInputValueObject(inputs);
		this.carTypeRangeValueEls = this.setCarTypeRangeValueEls(types);
		this.dataSets = dataSets;
		this.setEventListeners(
			inputs,
			this.inputDomRefs,
			this.inputValues,
			this.carTypeRangeValueEls,
			this.dataSets
		);

		// Set initial values
		this.updateBatteryRanges(
			this.inputValues,
			this.carTypeRangeValueEls,
			this.dataSets
		);
	}

	setInputRefs(inputs) {
		return inputs.reduce((acc, input) => {
			const targetEl = document.getElementById(input.id);

			if (targetEl === null) {
				return acc;
			}

			switch (input.type) {
				case "number":
					if (
						targetEl.nodeName === "INPUT" &&
						targetEl.type === "number"
					) {
						acc[input.id] = targetEl;
					}
					break;
				case "checkbox":
					if (
						targetEl.nodeName === "INPUT" &&
						targetEl.type === "checkbox"
					) {
						acc[input.id] = targetEl;
					}
					break;
				case "radio":
					if (
						targetEl.dataset.jsRangeCalculatorInputType === "radio"
					) {
						acc[input.id] =
							targetEl.querySelectorAll("input[type=radio]");
					}
					break;
				default:
					console.warn(
						`Tried to handle input ${input.id} with type ${input.type} but was unable to`
					);
			}

			return acc;
		}, {});
	}

	setCarTypeRangeValueEls(carTypes) {
		return carTypes.reduce((acc, carType) => {
			acc[carType] = document.querySelector(
				`[data-js-range-calculator-car-type="${carType}"] .value`
			);

			return acc;
		}, {});
	}

	constructInputValueObject(inputs) {
		return inputs.reduce((acc, input) => {
			acc[input.id] = input.initialValue;

			return acc;
		}, {});
	}

	setEventListeners(
		inputs,
		inputDomRefs,
		inputValues,
		carTypeRangeValueEls,
		dataSets
	) {
		inputs.forEach((input) => {
			this.setMainInputEventListeners(
				input,
				inputDomRefs,
				inputValues,
				carTypeRangeValueEls,
				dataSets
			);

			if (input.sideEffectEvents) {
				this.setSideEffectEventListeners(input.sideEffectEvents);
			}
		});
	}

	setSideEffectEventListeners(sideEffectEvents) {
		sideEffectEvents.forEach((sideEffectEvent) => {
			this.rangeCalculatorEl.addEventListener(
				`${sideEffectEvent.listenFor}`,
				(event) => {
					sideEffectEvent.sideEffectHandler(this, event);
				}
			);
		});
	}

	setMainInputEventListeners(
		input,
		inputDomRefs,
		inputValues,
		carTypeRangeValueEls,
		dataSets
	) {
		switch (input.type) {
			case "number":
				inputDomRefs[input.id].addEventListener("change", (event) => {
					inputValues[input.id] = Number(event.target.value);
					this.updateBatteryRanges(
						inputValues,
						carTypeRangeValueEls,
						dataSets
					);
					this.dispatchChangeEvent(input, inputValues);
				});

				break;
			case "checkbox":
				inputDomRefs[input.id].addEventListener("change", (event) => {
					inputValues[input.id] = event.target.checked;
					this.updateBatteryRanges(
						inputValues,
						carTypeRangeValueEls,
						dataSets
					);
					this.dispatchChangeEvent(input, inputValues);
				});

				break;
			case "radio":
				inputDomRefs[input.id].forEach((domRef) => {
					domRef.addEventListener("change", (event) => {
						inputValues[input.id] = event.target.value;
						this.updateBatteryRanges(
							inputValues,
							carTypeRangeValueEls,
							dataSets
						);
						this.dispatchChangeEvent(input, inputValues);
					});
				});

				break;
			default:
				console.warn(
					`Tried to get value of input ${input.id} with type ${input.type}, but was unable to`
				);
				return;
		}
	}

	dispatchChangeEvent(input, inputValues) {
		this.rangeCalculatorEl.dispatchEvent(
			new CustomEvent(`${input.id}_changed`, {
				detail: {
					inputId: input.id,
					newValue: inputValues[input.id],
				},
			})
		);
	}

	updateBatteryRanges(inputValues, carTypeRangeValueEls, dataSets) {
		Object.keys(carTypeRangeValueEls).forEach((carTypeId) => {
			carTypeRangeValueEls[carTypeId].innerText =
				this.retrieveBatteryRange(inputValues, dataSets[carTypeId]);
		});
	}

	retrieveBatteryRange(inputValues, batteryRangeObjects) {
		//todo: figure out whether the == comparison can be more strict.
		const batteryRangeObject = batteryRangeObjects.find(
			(dataset) =>
				dataset.temp === inputValues.temperature &&
				dataset.wheelsize == inputValues.wheelsize &&
				((inputValues.ac && dataset.ac === "on") ||
					(!inputValues.ac && dataset.ac === "off"))
		);

		if (!batteryRangeObject || !batteryRangeObject.hwy) {
			console.error("No matching hwy found");
			return null;
		}

		const speedEntry = batteryRangeObject.hwy.find(
			(entry) => entry.kmh === inputValues.speed
		);
		if (!speedEntry) {
			console.error("No matching speed entry found");
			return null;
		}

		return speedEntry.kilometers;
	}

	numberInputStepUp(input) {
		if (this.inputDomRefs[input]) {
			this.inputDomRefs[input].stepUp(1);
			this.inputDomRefs[input].dispatchEvent(new Event("change"));

			return;
		}

		console.warn(`${input} could not be found`);
	}

	numberInputStepdown(input) {
		if (this.inputDomRefs[input]) {
			this.inputDomRefs[input].stepDown(1);
			this.inputDomRefs[input].dispatchEvent(new Event("change"));

			return;
		}

		console.warn(`${input} could not be found`);
	}
}

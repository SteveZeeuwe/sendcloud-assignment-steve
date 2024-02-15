class RangeCalculator {
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

const rangeCalculator = new RangeCalculator(
	"#range-calculator",
	[
		{
			id: "speed",
			type: "number",
			initialValue: 70,
		},
		{
			id: "temperature",
			type: "number",
			initialValue: 40,
		},
		{
			id: "ac",
			type: "checkbox",
			initialValue: false,
			sideEffectEvents: [
				{
					listenFor: "temperature_changed",
					sideEffectHandler: (rangeCalculator, event) => {
						const imgOn =
							rangeCalculator.rangeCalculatorEl.querySelector(
								".ac img.ac-on"
							);
						const imgOff =
							rangeCalculator.rangeCalculatorEl.querySelector(
								".ac img.ac-off"
							);
						const temperature = event.detail.newValue;

						if (temperature <= 10) {
							imgOff.src =
								"assets/img/range-calculator/icon-fan-gray.svg";
							imgOn.src =
								"assets/img/range-calculator/icon-fan-white.svg";

							return;
						}

						imgOff.src =
							"assets/img/range-calculator/icon-wave-gray.svg";
						imgOn.src =
							"assets/img/range-calculator/icon-wave-white.svg";
					},
				},
			],
		},
		{
			id: "wheelsize",
			type: "radio",
			initialValue: 19,
		},
	],
	["100D", "P100D"],
	{
		"100D": [
			{
				temp: -10,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 798 },
					{ kmh: 80, kilometers: 710 },
					{ kmh: 90, kilometers: 627 },
					{ kmh: 100, kilometers: 555 },
					{ kmh: 110, kilometers: 491 },
					{ kmh: 120, kilometers: 435 },
					{ kmh: 130, kilometers: 386 },
					{ kmh: 140, kilometers: 338 },
				],
			},
			{
				temp: -10,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 618 },
					{ kmh: 80, kilometers: 575 },
					{ kmh: 90, kilometers: 526 },
					{ kmh: 100, kilometers: 478 },
					{ kmh: 110, kilometers: 433 },
					{ kmh: 120, kilometers: 390 },
					{ kmh: 130, kilometers: 351 },
					{ kmh: 140, kilometers: 311 },
				],
			},
			{
				temp: -10,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 788 },
					{ kmh: 80, kilometers: 698 },
					{ kmh: 90, kilometers: 616 },
					{ kmh: 100, kilometers: 543 },
					{ kmh: 110, kilometers: 480 },
					{ kmh: 120, kilometers: 424 },
					{ kmh: 130, kilometers: 376 },
					{ kmh: 140, kilometers: 329 },
				],
			},
			{
				temp: -10,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 611 },
					{ kmh: 80, kilometers: 566 },
					{ kmh: 90, kilometers: 517 },
					{ kmh: 100, kilometers: 468 },
					{ kmh: 110, kilometers: 423 },
					{ kmh: 120, kilometers: 380 },
					{ kmh: 130, kilometers: 342 },
					{ kmh: 140, kilometers: 302 },
				],
			},
			{
				temp: 0,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 818 },
					{ kmh: 80, kilometers: 725 },
					{ kmh: 90, kilometers: 642 },
					{ kmh: 100, kilometers: 568 },
					{ kmh: 110, kilometers: 504 },
					{ kmh: 120, kilometers: 447 },
					{ kmh: 130, kilometers: 397 },
					{ kmh: 140, kilometers: 352 },
				],
			},
			{
				temp: 0,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 659 },
					{ kmh: 80, kilometers: 609 },
					{ kmh: 90, kilometers: 555 },
					{ kmh: 100, kilometers: 503 },
					{ kmh: 110, kilometers: 455 },
					{ kmh: 120, kilometers: 410 },
					{ kmh: 130, kilometers: 368 },
					{ kmh: 140, kilometers: 329 },
				],
			},
			{
				temp: 0,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 808 },
					{ kmh: 80, kilometers: 714 },
					{ kmh: 90, kilometers: 630 },
					{ kmh: 100, kilometers: 556 },
					{ kmh: 110, kilometers: 492 },
					{ kmh: 120, kilometers: 436 },
					{ kmh: 130, kilometers: 387 },
					{ kmh: 140, kilometers: 342 },
				],
			},
			{
				temp: 0,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 652 },
					{ kmh: 80, kilometers: 599 },
					{ kmh: 90, kilometers: 545 },
					{ kmh: 100, kilometers: 493 },
					{ kmh: 110, kilometers: 444 },
					{ kmh: 120, kilometers: 399 },
					{ kmh: 130, kilometers: 358 },
					{ kmh: 140, kilometers: 320 },
				],
			},
			{
				temp: 10,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 833 },
					{ kmh: 80, kilometers: 740 },
					{ kmh: 90, kilometers: 655 },
					{ kmh: 100, kilometers: 581 },
					{ kmh: 110, kilometers: 516 },
					{ kmh: 120, kilometers: 459 },
					{ kmh: 130, kilometers: 409 },
					{ kmh: 140, kilometers: 362 },
				],
			},
			{
				temp: 10,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 748 },
					{ kmh: 80, kilometers: 679 },
					{ kmh: 90, kilometers: 611 },
					{ kmh: 100, kilometers: 548 },
					{ kmh: 110, kilometers: 491 },
					{ kmh: 120, kilometers: 441 },
					{ kmh: 130, kilometers: 394 },
					{ kmh: 140, kilometers: 351 },
				],
			},
			{
				temp: 10,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 823 },
					{ kmh: 80, kilometers: 729 },
					{ kmh: 90, kilometers: 643 },
					{ kmh: 100, kilometers: 569 },
					{ kmh: 110, kilometers: 504 },
					{ kmh: 120, kilometers: 448 },
					{ kmh: 130, kilometers: 398 },
					{ kmh: 140, kilometers: 352 },
				],
			},
			{
				temp: 10,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 739 },
					{ kmh: 80, kilometers: 668 },
					{ kmh: 90, kilometers: 599 },
					{ kmh: 100, kilometers: 537 },
					{ kmh: 110, kilometers: 480 },
					{ kmh: 120, kilometers: 430 },
					{ kmh: 130, kilometers: 384 },
					{ kmh: 140, kilometers: 341 },
				],
			},
			{
				temp: 20,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 849 },
					{ kmh: 80, kilometers: 756 },
					{ kmh: 90, kilometers: 669 },
					{ kmh: 100, kilometers: 594 },
					{ kmh: 110, kilometers: 529 },
					{ kmh: 120, kilometers: 471 },
					{ kmh: 130, kilometers: 421 },
					{ kmh: 140, kilometers: 372 },
				],
			},
			{
				temp: 20,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 744 },
					{ kmh: 80, kilometers: 678 },
					{ kmh: 90, kilometers: 612 },
					{ kmh: 100, kilometers: 551 },
					{ kmh: 110, kilometers: 496 },
					{ kmh: 120, kilometers: 446 },
					{ kmh: 130, kilometers: 402 },
					{ kmh: 140, kilometers: 358 },
				],
			},
			{
				temp: 20,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 839 },
					{ kmh: 80, kilometers: 744 },
					{ kmh: 90, kilometers: 657 },
					{ kmh: 100, kilometers: 582 },
					{ kmh: 110, kilometers: 517 },
					{ kmh: 120, kilometers: 459 },
					{ kmh: 130, kilometers: 409 },
					{ kmh: 140, kilometers: 362 },
				],
			},
			{
				temp: 20,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 735 },
					{ kmh: 80, kilometers: 667 },
					{ kmh: 90, kilometers: 601 },
					{ kmh: 100, kilometers: 540 },
					{ kmh: 110, kilometers: 484 },
					{ kmh: 120, kilometers: 435 },
					{ kmh: 130, kilometers: 391 },
					{ kmh: 140, kilometers: 348 },
				],
			},
			{
				temp: 30,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 865 },
					{ kmh: 80, kilometers: 771 },
					{ kmh: 90, kilometers: 684 },
					{ kmh: 100, kilometers: 605 },
					{ kmh: 110, kilometers: 537 },
					{ kmh: 120, kilometers: 480 },
					{ kmh: 130, kilometers: 430 },
					{ kmh: 140, kilometers: 382 },
				],
			},
			{
				temp: 30,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 760 },
					{ kmh: 80, kilometers: 694 },
					{ kmh: 90, kilometers: 625 },
					{ kmh: 100, kilometers: 563 },
					{ kmh: 110, kilometers: 508 },
					{ kmh: 120, kilometers: 458 },
					{ kmh: 130, kilometers: 413 },
					{ kmh: 140, kilometers: 370 },
				],
			},
			{
				temp: 30,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 855 },
					{ kmh: 80, kilometers: 759 },
					{ kmh: 90, kilometers: 672 },
					{ kmh: 100, kilometers: 592 },
					{ kmh: 110, kilometers: 524 },
					{ kmh: 120, kilometers: 468 },
					{ kmh: 130, kilometers: 419 },
					{ kmh: 140, kilometers: 371 },
				],
			},
			{
				temp: 30,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 751 },
					{ kmh: 80, kilometers: 683 },
					{ kmh: 90, kilometers: 614 },
					{ kmh: 100, kilometers: 552 },
					{ kmh: 110, kilometers: 496 },
					{ kmh: 120, kilometers: 447 },
					{ kmh: 130, kilometers: 402 },
					{ kmh: 140, kilometers: 360 },
				],
			},
			{
				temp: 30,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 833 },
					{ kmh: 80, kilometers: 736 },
					{ kmh: 90, kilometers: 649 },
					{ kmh: 100, kilometers: 571 },
					{ kmh: 110, kilometers: 504 },
					{ kmh: 120, kilometers: 449 },
					{ kmh: 130, kilometers: 400 },
					{ kmh: 140, kilometers: 354 },
				],
			},
			{
				temp: 40,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 853 },
					{ kmh: 80, kilometers: 763 },
					{ kmh: 90, kilometers: 683 },
					{ kmh: 100, kilometers: 613 },
					{ kmh: 110, kilometers: 550 },
					{ kmh: 120, kilometers: 494 },
					{ kmh: 130, kilometers: 444 },
					{ kmh: 140, kilometers: 393 },
				],
			},
			{
				temp: 40,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 714 },
					{ kmh: 80, kilometers: 660 },
					{ kmh: 90, kilometers: 605 },
					{ kmh: 100, kilometers: 548 },
					{ kmh: 110, kilometers: 500 },
					{ kmh: 120, kilometers: 454 },
					{ kmh: 130, kilometers: 411 },
					{ kmh: 140, kilometers: 368 },
				],
			},
			{
				temp: 40,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 842 },
					{ kmh: 80, kilometers: 751 },
					{ kmh: 90, kilometers: 670 },
					{ kmh: 100, kilometers: 600 },
					{ kmh: 110, kilometers: 538 },
					{ kmh: 120, kilometers: 482 },
					{ kmh: 130, kilometers: 432 },
					{ kmh: 140, kilometers: 382 },
				],
			},
			{
				temp: 40,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 705 },
					{ kmh: 80, kilometers: 650 },
					{ kmh: 90, kilometers: 594 },
					{ kmh: 100, kilometers: 537 },
					{ kmh: 110, kilometers: 489 },
					{ kmh: 120, kilometers: 443 },
					{ kmh: 130, kilometers: 400 },
					{ kmh: 140, kilometers: 358 },
				],
			},
		],
		P100D: [
			{
				temp: -10,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 760 },
					{ kmh: 80, kilometers: 678 },
					{ kmh: 90, kilometers: 602 },
					{ kmh: 100, kilometers: 533 },
					{ kmh: 110, kilometers: 471 },
					{ kmh: 120, kilometers: 417 },
					{ kmh: 130, kilometers: 369 },
					{ kmh: 140, kilometers: 326 },
				],
			},
			{
				temp: -10,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 592 },
					{ kmh: 80, kilometers: 552 },
					{ kmh: 90, kilometers: 506 },
					{ kmh: 100, kilometers: 461 },
					{ kmh: 110, kilometers: 416 },
					{ kmh: 120, kilometers: 374 },
					{ kmh: 130, kilometers: 336 },
					{ kmh: 140, kilometers: 301 },
				],
			},
			{
				temp: -10,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 717 },
					{ kmh: 80, kilometers: 643 },
					{ kmh: 90, kilometers: 573 },
					{ kmh: 100, kilometers: 509 },
					{ kmh: 110, kilometers: 451 },
					{ kmh: 120, kilometers: 400 },
					{ kmh: 130, kilometers: 355 },
					{ kmh: 140, kilometers: 315 },
				],
			},
			{
				temp: -10,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 559 },
					{ kmh: 80, kilometers: 523 },
					{ kmh: 90, kilometers: 482 },
					{ kmh: 100, kilometers: 440 },
					{ kmh: 110, kilometers: 398 },
					{ kmh: 120, kilometers: 360 },
					{ kmh: 130, kilometers: 324 },
					{ kmh: 140, kilometers: 291 },
				],
			},

			{
				temp: 0,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 783 },
					{ kmh: 80, kilometers: 698 },
					{ kmh: 90, kilometers: 618 },
					{ kmh: 100, kilometers: 546 },
					{ kmh: 110, kilometers: 484 },
					{ kmh: 120, kilometers: 428 },
					{ kmh: 130, kilometers: 380 },
					{ kmh: 140, kilometers: 338 },
				],
			},
			{
				temp: 0,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 635 },
					{ kmh: 80, kilometers: 588 },
					{ kmh: 90, kilometers: 536 },
					{ kmh: 100, kilometers: 485 },
					{ kmh: 110, kilometers: 437 },
					{ kmh: 120, kilometers: 393 },
					{ kmh: 130, kilometers: 354 },
					{ kmh: 140, kilometers: 315 },
				],
			},

			{
				temp: 0,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 739 },
					{ kmh: 80, kilometers: 662 },
					{ kmh: 90, kilometers: 588 },
					{ kmh: 100, kilometers: 522 },
					{ kmh: 110, kilometers: 463 },
					{ kmh: 120, kilometers: 411 },
					{ kmh: 130, kilometers: 366 },
					{ kmh: 140, kilometers: 326 },
				],
			},
			{
				temp: 0,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 599 },
					{ kmh: 80, kilometers: 557 },
					{ kmh: 90, kilometers: 510 },
					{ kmh: 100, kilometers: 464 },
					{ kmh: 110, kilometers: 419 },
					{ kmh: 120, kilometers: 377 },
					{ kmh: 130, kilometers: 340 },
					{ kmh: 140, kilometers: 304 },
				],
			},

			{
				temp: 10,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 802 },
					{ kmh: 80, kilometers: 713 },
					{ kmh: 90, kilometers: 632 },
					{ kmh: 100, kilometers: 559 },
					{ kmh: 110, kilometers: 496 },
					{ kmh: 120, kilometers: 440 },
					{ kmh: 130, kilometers: 391 },
					{ kmh: 140, kilometers: 347 },
				],
			},
			{
				temp: 10,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 722 },
					{ kmh: 80, kilometers: 655 },
					{ kmh: 90, kilometers: 590 },
					{ kmh: 100, kilometers: 528 },
					{ kmh: 110, kilometers: 473 },
					{ kmh: 120, kilometers: 423 },
					{ kmh: 130, kilometers: 377 },
					{ kmh: 140, kilometers: 337 },
				],
			},

			{
				temp: 10,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 757 },
					{ kmh: 80, kilometers: 676 },
					{ kmh: 90, kilometers: 601 },
					{ kmh: 100, kilometers: 534 },
					{ kmh: 110, kilometers: 475 },
					{ kmh: 120, kilometers: 423 },
					{ kmh: 130, kilometers: 376 },
					{ kmh: 140, kilometers: 335 },
				],
			},
			{
				temp: 10,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 681 },
					{ kmh: 80, kilometers: 621 },
					{ kmh: 90, kilometers: 561 },
					{ kmh: 100, kilometers: 505 },
					{ kmh: 110, kilometers: 453 },
					{ kmh: 120, kilometers: 406 },
					{ kmh: 130, kilometers: 363 },
					{ kmh: 140, kilometers: 325 },
				],
			},

			{
				temp: 20,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 819 },
					{ kmh: 80, kilometers: 729 },
					{ kmh: 90, kilometers: 646 },
					{ kmh: 100, kilometers: 572 },
					{ kmh: 110, kilometers: 508 },
					{ kmh: 120, kilometers: 452 },
					{ kmh: 130, kilometers: 402 },
					{ kmh: 140, kilometers: 359 },
				],
			},
			{
				temp: 20,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 720 },
					{ kmh: 80, kilometers: 656 },
					{ kmh: 90, kilometers: 592 },
					{ kmh: 100, kilometers: 531 },
					{ kmh: 110, kilometers: 477 },
					{ kmh: 120, kilometers: 428 },
					{ kmh: 130, kilometers: 384 },
					{ kmh: 140, kilometers: 343 },
				],
			},

			{
				temp: 20,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 773 },
					{ kmh: 80, kilometers: 691 },
					{ kmh: 90, kilometers: 615 },
					{ kmh: 100, kilometers: 547 },
					{ kmh: 110, kilometers: 487 },
					{ kmh: 120, kilometers: 434 },
					{ kmh: 130, kilometers: 387 },
					{ kmh: 140, kilometers: 346 },
				],
			},
			{
				temp: 20,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 679 },
					{ kmh: 80, kilometers: 622 },
					{ kmh: 90, kilometers: 563 },
					{ kmh: 100, kilometers: 508 },
					{ kmh: 110, kilometers: 457 },
					{ kmh: 120, kilometers: 411 },
					{ kmh: 130, kilometers: 370 },
					{ kmh: 140, kilometers: 331 },
				],
			},

			{
				temp: 30,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 834 },
					{ kmh: 80, kilometers: 744 },
					{ kmh: 90, kilometers: 660 },
					{ kmh: 100, kilometers: 580 },
					{ kmh: 110, kilometers: 515 },
					{ kmh: 120, kilometers: 460 },
					{ kmh: 130, kilometers: 411 },
					{ kmh: 140, kilometers: 364 },
				],
			},
			{
				temp: 30,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 735 },
					{ kmh: 80, kilometers: 671 },
					{ kmh: 90, kilometers: 606 },
					{ kmh: 100, kilometers: 543 },
					{ kmh: 110, kilometers: 488 },
					{ kmh: 120, kilometers: 440 },
					{ kmh: 130, kilometers: 396 },
					{ kmh: 140, kilometers: 355 },
				],
			},
			{
				temp: 30,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 787 },
					{ kmh: 80, kilometers: 706 },
					{ kmh: 90, kilometers: 628 },
					{ kmh: 100, kilometers: 554 },
					{ kmh: 110, kilometers: 493 },
					{ kmh: 120, kilometers: 442 },
					{ kmh: 130, kilometers: 396 },
					{ kmh: 140, kilometers: 351 },
				],
			},
			{
				temp: 30,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 693 },
					{ kmh: 80, kilometers: 636 },
					{ kmh: 90, kilometers: 577 },
					{ kmh: 100, kilometers: 519 },
					{ kmh: 110, kilometers: 468 },
					{ kmh: 120, kilometers: 422 },
					{ kmh: 130, kilometers: 381 },
					{ kmh: 140, kilometers: 342 },
				],
			},
			{
				temp: 40,
				wheelsize: 19,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 822 },
					{ kmh: 80, kilometers: 736 },
					{ kmh: 90, kilometers: 659 },
					{ kmh: 100, kilometers: 592 },
					{ kmh: 110, kilometers: 529 },
					{ kmh: 120, kilometers: 474 },
					{ kmh: 130, kilometers: 424 },
					{ kmh: 140, kilometers: 377 },
				],
			},
			{
				temp: 40,
				wheelsize: 19,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 691 },
					{ kmh: 80, kilometers: 639 },
					{ kmh: 90, kilometers: 584 },
					{ kmh: 100, kilometers: 533 },
					{ kmh: 110, kilometers: 482 },
					{ kmh: 120, kilometers: 436 },
					{ kmh: 130, kilometers: 393 },
					{ kmh: 140, kilometers: 352 },
				],
			},
			{
				temp: 40,
				wheelsize: 21,
				ac: "off",
				hwy: [
					{ kmh: 70, kilometers: 776 },
					{ kmh: 80, kilometers: 698 },
					{ kmh: 90, kilometers: 627 },
					{ kmh: 100, kilometers: 565 },
					{ kmh: 110, kilometers: 507 },
					{ kmh: 120, kilometers: 455 },
					{ kmh: 130, kilometers: 408 },
					{ kmh: 140, kilometers: 363 },
				],
			},
			{
				temp: 40,
				wheelsize: 21,
				ac: "on",
				hwy: [
					{ kmh: 70, kilometers: 652 },
					{ kmh: 80, kilometers: 606 },
					{ kmh: 90, kilometers: 556 },
					{ kmh: 100, kilometers: 509 },
					{ kmh: 110, kilometers: 462 },
					{ kmh: 120, kilometers: 419 },
					{ kmh: 130, kilometers: 378 },
					{ kmh: 140, kilometers: 339 },
				],
			},
		],
	}
);

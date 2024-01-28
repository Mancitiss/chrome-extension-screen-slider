chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a content script: " + sender.tab.url :
			"from the extension");
		var resp = request.info;
		if (resp) {
			if (resp.type == "dimensions") {
				let width = resp.width
				let height = resp.height
				console.log("width: " + width + " height: " + height)

				// type = range
				document.getElementById("width-range").min = -width
				document.getElementById("width-range").max = width

				document.getElementById("height-range").min = -height
				document.getElementById("height-range").max = height

				document.getElementById("width-range").value = 0
				document.getElementById("height-range").value = 0

				document.getElementById("about").innerHTML = "Adjust the sliders to shift the website."
			}
			else if (resp.type == "loadingState") {
				if (resp.state == "complete") {
					// get dimensions
					chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
						const tab = tabs[0];
						chrome.scripting.executeScript({
							target: { tabId: tab.id },
							func: getDimensions,
						}).then(() => {
							console.log("dimensions requested")
						});
					});

					loadingComplete()
				}
			}
			sendResponse({ farewell: "goodbye" });
		}
	}
);

const getLoadingState = () => {
	const getLoadingStateBrowser = () => {
		console.log("loading state requested");
		let state = document.readyState
		if (state != "complete") {
			setTimeout(getLoadingStateBrowser, 1000)
		}
		else {
			chrome.runtime.sendMessage({ info: { type: "loadingState", state: state } });
		}
	}
	getLoadingStateBrowser()
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	const tab = tabs[0];
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: getLoadingState,
	}).then(() => {
		console.log("dimensions requested")
	});
});

const getDimensions = () => {
	// let html = document.getElementsByTagName("html")[0];
	// let width = html.offsetWidth
	// let height = html.offsetHeight
	var width = window.innerWidth
	|| document.documentElement.clientWidth
	|| document.body.clientWidth;

	var height = window.innerHeight
	|| document.documentElement.clientHeight
	|| document.body.clientHeight;
	let widthShift = 0
	let heightShift = 0
	console.log("width: " + width + " height: " + height + " widthShift: " + widthShift + " heightShift: " + heightShift)
	chrome.runtime.sendMessage({ info: { type: "dimensions", width: width, height: height } });
}

const setWidth = (width) => {
	let html = document.getElementsByTagName("html")[0];
	widthShift = width
	if (typeof(heightShift) == "undefined") {
		heightShift = 0
	}
	html.style.transform = "translate(" + widthShift + "px, " + heightShift + "px)";
}

const setHeight = (height) => {
	let html = document.getElementsByTagName("html")[0];
	heightShift = height
	if (typeof(widthShift) == "undefined") {
		widthShift = 0
	}
	html.style.transform = "translate(" + widthShift + "px, " + heightShift + "px)";
}

const loadingComplete = () => {
	document.getElementById("width-range").onchange = function () {
		let width = document.getElementById("width-range").value
		//document.getElementById("label-width").innerText = "Width shift: " + width
		document.getElementById("width-box").value = width
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tab = tabs[0];

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: setWidth,
				args: [width]
			}).then(() => {
				console.log("width set to " + width + "px")
			});
		});
	}

	document.getElementById("width-range").oninput = function () {
		let width = document.getElementById("width-range").value
		//document.getElementById("label-width").innerText = "Width shift: " + width
		document.getElementById("width-box").value = width
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tab = tabs[0];

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: setWidth,
				args: [width]
			}).then(() => {
				console.log("width set to " + width + "px")
			});
		});
	}

	document.getElementById("height-range").onchange = function () {
		let height = document.getElementById("height-range").value
		//document.getElementById("label-height").innerText = "Height shift: " + height
		document.getElementById("height-box").value = height
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tab = tabs[0];

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: setHeight,
				args: [height]
			}).then(() => {
				console.log("height set to " + height + "px")
			});
		});
	}

	document.getElementById("height-range").oninput = function () {
		let height = document.getElementById("height-range").value
		//document.getElementById("label-height").innerText = "Height shift: " + height
		document.getElementById("height-box").value = height
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tab = tabs[0];

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: setHeight,
				args: [height]
			}).then(() => {
				console.log("height set to " + height + "px")
			});
		});
	}

	document.getElementById("width-box").onchange = function () {
		let width = document.getElementById("width-box").value
		//document.getElementById("label-width").innerText = "Width shift: " + width
		document.getElementById("width-range").value = width
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tab = tabs[0];

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: setWidth,
				args: [width]
			}).then(() => {
				console.log("width set to " + width + "px")
			});
		});
	}

	document.getElementById("height-box").onchange = function () {
		let height = document.getElementById("height-box").value
		//document.getElementById("label-height").innerText = "Height shift: " + height
		document.getElementById("height-range").value = height
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tab = tabs[0];

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: setHeight,
				args: [height]
			}).then(() => {
				console.log("height set to " + height + "px")
			});
		});
	}

	document.getElementById("width-box").oninput = function () {
		let width = document.getElementById("width-box").value
		//document.getElementById("label-width").innerText = "Width shift: " + width
		document.getElementById("width-range").value = width
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tab = tabs[0];

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: setWidth,
				args: [width]
			}).then(() => {
				console.log("width set to " + width + "px")
			});
		});
	}

	document.getElementById("height-box").oninput = function () {
		let height = document.getElementById("height-box").value
		//document.getElementById("label-height").innerText = "Height shift: " + height
		document.getElementById("height-range").value = height
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tab = tabs[0];

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: setHeight,
				args: [height]
			}).then(() => {
				console.log("height set to " + height + "px")
			});
		});
	}
}
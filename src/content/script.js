chrome.runtime.onMessage.addListener(msg => {
    if (msg.action === "grayscale-toggle") {
        toggleFilter("grayscale");
    }
    if (msg.action === "invert-toggle") {
        toggleFilter("invert");
    }
    if (msg.action === "font-size-decrease") {
        changeFontSize(-1);
    }
    if (msg.action === "font-size-increase") {
        changeFontSize(1);
    }
});

function changeFontSize(change, element = document.body) {
    let currentSize = window.getComputedStyle(element).getPropertyValue('font-size');
    element.style.fontSize = (parseFloat(currentSize) + change) + 'px';
    for (let child of element.children) {
        changeFontSize(change, child);
    }
}

let styleFilters = {
    invert: {
        status: false,
        css: 'invert(100%)'
    },
    grayscale: {
        status: false,
        css: 'grayscale(100%)'
    }
};

function toggleFilter(filter) {
    if (styleFilters.hasOwnProperty(filter)) {
        styleFilters[filter].status = !styleFilters[filter].status;
    }

    let filters_css = "";
    for (let fl in styleFilters) {
        filters_css += styleFilters[fl].status ? " " + styleFilters[fl].css : "";
    }
    document.body.style.filter = filters_css;
}

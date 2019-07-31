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

function changeFontSize(change) {
    let elements = document.querySelectorAll("*");
    let newFontSizes = [];
    for (let x = 0; x < elements.length; x++) {
        newFontSizes.push((parseFloat(window.getComputedStyle(elements[x]).getPropertyValue('font-size')) + change) + 'px');
    }
    for (let x = 0; x < elements.length; x++) {
        elements[x].style.fontSize = newFontSizes[x];
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

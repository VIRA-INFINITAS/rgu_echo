document.addEventListener("DOMContentLoaded", function () {
    const domain = window.location.protocol + "//" + window.location.host;
    const fullUrl = domain + window.location.pathname;

    // Canonical
    const linkCanonical = document.createElement("link");
    linkCanonical.setAttribute("rel", "canonical");
    linkCanonical.setAttribute("href", fullUrl);
    document.head.appendChild(linkCanonical);

    // Robots tag
    const metaRobots = document.createElement("meta");
    metaRobots.setAttribute("name", "robots");
    metaRobots.setAttribute("content", "index, follow");
    document.head.appendChild(metaRobots);

    // Keywords
    const metaKeywords = document.createElement("meta");
    metaKeywords.setAttribute("name", "keywords");
    metaKeywords.setAttribute("content", "RGU mental health support, student wellbeing, RGU Echo, Robert Gordon University help");
    document.head.appendChild(metaKeywords);

    // Publisher
    const linkPublisher = document.createElement("link");
    linkPublisher.setAttribute("rel", "publisher");
    linkPublisher.setAttribute("href", domain + "/");
    document.head.appendChild(linkPublisher);
});

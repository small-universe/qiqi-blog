module.exports = {
    "/program/": [
        "",
        "backend/",
        "frontend/",
    ],
    "/software/": require("./software"),
    "/interview/": [""],
    "/guide/": require("./guide"),

    // fallback
    "/": ["guide/", "program/", "software/", "basic/", ],

}
export function language(req, res, next) {
    const header = req.headers["accept-language"] || "";
    req.language = header.toLowerCase().startsWith("en") ? "en" : "de";
    next();
}

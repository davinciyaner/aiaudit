const MESSAGES = {
    NAME_EMAIL_PASSWORD_REQUIRED: { de: "Name, Email und Passwort sind erforderlich", en: "Name, email, and password are required" },
    USER_EXISTS: { de: "User existiert bereits", en: "User already exists" },
    EMAIL_PASSWORD_REQUIRED: { de: "Email und Passwort sind erforderlich", en: "Email and password are required" },
    USER_NOT_FOUND: { de: "User nicht gefunden", en: "User not found" },
    WRONG_PASSWORD: { de: "Falsches Passwort", en: "Incorrect password" },
    EMAIL_REQUIRED: { de: "E-Mail ist erforderlich", en: "Email is required" },
    TOKEN_PASSWORD_REQUIRED: { de: "Token und Passwort sind erforderlich", en: "Token and password are required" },
    PASSWORD_TOO_SHORT: { de: "Passwort muss mindestens 6 Zeichen haben", en: "Password must be at least 6 characters" },
    LINK_INVALID_OR_EXPIRED: { de: "Link ungültig oder abgelaufen", en: "Link is invalid or expired" },
    NO_TOKEN: { de: "Kein Token", en: "No token" },
    INVALID_TOKEN: { de: "Ungültiger Token", en: "Invalid token" },

    // Rate limiting
    AUTH_TOO_MANY_ATTEMPTS: { de: "Zu viele Versuche. Bitte in 15 Minuten erneut versuchen.", en: "Too many attempts. Please try again in 15 minutes." },
    FREE_QUOTA_USED: { de: "Kostenloses Kontingent aufgebraucht. Bitte registrieren um mehr Audits zu erhalten.", en: "Free quota used up. Please register to get more audits." },
    CHECK_RATE_LIMIT: { de: "Bitte warte eine Minute zwischen manuellen Checks.", en: "Please wait a minute between manual checks." },
    API_RATE_LIMIT: { de: "Zu viele Anfragen. Bitte warte einen Moment.", en: "Too many requests. Please wait a moment." },
    TOO_MANY_REQUESTS_HOUR: { de: "Zu viele Anfragen. Bitte in einer Stunde erneut versuchen.", en: "Too many requests. Please try again in an hour." },
    TOO_MANY_REQUESTS: { de: "Zu viele Anfragen.", en: "Too many requests." },

    // Generic
    NOT_FOUND: { de: "Nicht gefunden", en: "Not found" },
    NOT_AUTHORIZED: { de: "Nicht autorisiert.", en: "Not authorized." },
    SITE_NOT_FOUND: { de: "Website nicht gefunden", en: "Website not found" },
    DOMAIN_REQUIRED: { de: "Domain erforderlich", en: "Domain is required" },
    INVALID_DOMAIN: { de: "Ungültige Domain", en: "Invalid domain" },
    DOMAIN_ONLY: { de: "Bitte nur die Domain eingeben (z.B. example.com) – keine Pfade, Parameter oder Tokens.", en: "Please enter only the domain (e.g. example.com) – no paths, parameters, or tokens." },
    INVALID_URL: { de: "Ungültige URL", en: "Invalid URL" },
    URL_REQUIRED: { de: "url erforderlich", en: "url is required" },
    KEYWORD_REQUIRED: { de: "keyword erforderlich", en: "keyword is required" },
    INVALID_PLATFORM: { de: "Ungültige Plattform", en: "Invalid platform" },
    ONEOFF_QUOTA_USED: { de: "Du hast deine kostenlose Prüfung bereits genutzt. Für weitere Plattformen oder alle 4 auf einmal wechsle auf GEO Automatisierung.", en: "You've already used your one free check. For more platforms or all 4 at once, upgrade to GEO Automation." },
    KEYWORDS_ARRAY_REQUIRED: { de: "keywords[] erforderlich", en: "keywords[] is required" },
    PLATFORMS_ARRAY_REQUIRED: { de: "platforms[] erforderlich", en: "platforms[] is required" },
    NO_KEYWORDS_STORED: { de: "Keine Keywords hinterlegt", en: "No keywords stored" },
    SUBSCRIPTION_ID_PLAN_REQUIRED: { de: "subscriptionId und plan erforderlich", en: "subscriptionId and plan are required" },
    INVALID_PLAN: { de: "Ungültiger Plan", en: "Invalid plan" },

    // Audit
    URL_MISSING: { de: "URL fehlt", en: "URL is missing" },
    DAILY_LIMIT_REACHED: { de: "Tageslimit erreicht. Bitte später erneut versuchen.", en: "Daily limit reached. Please try again later." },
    DOMAIN_ALREADY_AUDITED: { de: "Diese Domain wurde bereits kostenlos auditiert.", en: "This domain has already been audited for free." },
    ONLY_HTTP_HTTPS: { de: "Nur HTTP und HTTPS erlaubt", en: "Only HTTP and HTTPS allowed" },
    PRIVATE_URL_NOT_ALLOWED: { de: "Private oder lokale URLs sind nicht erlaubt", en: "Private or local URLs are not allowed" },
    PAYMENT_DOMAIN_NOT_AUDITABLE: { de: "Diese URL ist für einen SEO-Audit nicht geeignet (Zahlungsanbieter). Bitte eine reguläre Seite oder Startseite eingeben.", en: "This URL isn't suitable for an SEO audit (payment provider). Please enter a regular page or homepage." },
    LOGIN_CHECKOUT_NOT_AUDITABLE: { de: "Login-, Checkout- und Account-Seiten können nicht sinnvoll auditiert werden. Bitte die Startseite oder eine Produktseite eingeben.", en: "Login, checkout, and account pages can't be meaningfully audited. Please enter the homepage or a product page." },

    // SEO/GEO tracking
    NO_ACTIVE_SEO_SUB: { de: "Kein aktives SEO-Automatisierung Abo", en: "No active SEO automation subscription" },
    NO_ACTIVE_GEO_SUB: { de: "Kein aktives GEO-Automatisierung Abo", en: "No active GEO automation subscription" },
    SITE_ALREADY_TRACKED: { de: "Website wird bereits getrackt", en: "Website is already being tracked" },
    AT_LEAST_ONE_PLATFORM_REQUIRED: { de: "Mindestens eine Plattform erforderlich", en: "At least one platform is required" },
    NO_ALLOWED_PLATFORMS_FOR_PLAN: { de: "Keine erlaubten Plattformen für deinen Plan", en: "No allowed platforms for your plan" },
    DOMAIN_NOT_ALLOWED: { de: "Domain nicht erlaubt", en: "Domain not allowed" },
    TARGET_DOMAIN_NOT_ALLOWED: { de: "Ziel-Domain ist nicht erlaubt", en: "Target domain is not allowed" },
    PAGE_FETCH_FAILED: { de: "Seite konnte nicht abgerufen werden", en: "Page could not be fetched" },
    COMPETITOR_PARAM_REQUIRED: { de: "competitor-Parameter erforderlich", en: "competitor parameter is required" },
    INVALID_COMPETITOR_DOMAIN: { de: "Ungültige Konkurrenz-Domain", en: "Invalid competitor domain" },
    KEYWORD_NOT_IN_SITE: { de: "Keyword gehört nicht zu dieser Website", en: "Keyword does not belong to this website" },
    SEO_EMAIL_ALERTS_MUST_BE_BOOLEAN: { de: "seoEmailAlerts muss ein Boolean sein", en: "seoEmailAlerts must be a boolean" },

    // Support/feedback
    ALL_FIELDS_REQUIRED: { de: "Alle Felder sind erforderlich.", en: "All fields are required." },
    EMAIL_MISSING: { de: "E-Mail fehlt.", en: "Email is missing." },
    TICKET_NOT_FOUND: { de: "Ticket nicht gefunden.", en: "Ticket not found." },
    INVALID_STATUS: { de: "Ungültiger Status.", en: "Invalid status." },
    RATING_MUST_BE_1_TO_5: { de: "rating muss zwischen 1 und 5 liegen", en: "rating must be between 1 and 5" },
    VOTE_MUST_BE_YES_OR_NO: { de: 'vote muss "yes" oder "no" sein', en: 'vote must be "yes" or "no"' },

    // Reports
    ERROR_LOADING_REPORTS: { de: "Fehler beim Laden der Reports", en: "Error loading reports" },
    INVALID_REPORT_ID: { de: "Ungültige Report-ID", en: "Invalid report ID" },

    // Test runner (Chrome extension)
    CSV_MISSING: { de: "CSV fehlt", en: "CSV is missing" },
    CSV_NO_STEPS: { de: "CSV hat keine Schritte", en: "CSV has no steps" },
    NO_URL_FOR_NAVIGATE: { de: "Kein URL für navigate", en: "No URL for navigate" },
    NO_SELECTOR_FOR_CLICK: { de: "Kein Selektor für click", en: "No selector for click" },
    NO_SELECTOR_FOR_INPUT: { de: "Kein Selektor für input", en: "No selector for input" },
    NO_SELECTOR_FOR_SELECT: { de: "Kein Selektor für select", en: "No selector for select" },
    TEST_STARTED: { de: "Test gestartet", en: "Test started" },
    TEST_STILL_RUNNING: { de: "Test läuft noch", en: "Test is still running" },
};

export function t(key, lang = "de") {
    const entry = MESSAGES[key];
    if (!entry) return key;
    return entry[lang] ?? entry.de;
}

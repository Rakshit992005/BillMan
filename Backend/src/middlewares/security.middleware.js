const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

const securityHeaders = (req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("Cache-Control", "no-store");
    next();
};

const verifyRequestOrigin = (allowedOrigins) => (req, res, next) => {
    if (!unsafeMethods.has(req.method)) {
        return next();
    }

    const source = req.get("origin") || req.get("referer");

    // Non-browser API clients may omit both headers. Browsers include at least
    // one of them on cross-origin, cookie-authenticated state changes.
    if (!source) {
        return next();
    }

    try {
        const origin = new URL(source).origin;
        if (allowedOrigins.has(origin)) {
            return next();
        }
    } catch {
        // Invalid origins are rejected below.
    }

    return res.status(403).json({ message: "Request origin is not allowed" });
};

const createRateLimiter = ({ windowMs, max }) => {
    const clients = new Map();

    return (req, res, next) => {
        const now = Date.now();

        if (clients.size >= 10_000) {
            for (const [key, value] of clients) {
                if (value.resetAt <= now) clients.delete(key);
            }
        }

        const key = req.ip;
        const current = clients.get(key);

        if (!current || current.resetAt <= now) {
            if (!current && clients.size >= 10_000) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            }
            clients.set(key, { count: 1, resetAt: now + windowMs });
            return next();
        }

        current.count += 1;
        if (current.count > max) {
            res.setHeader("Retry-After", Math.ceil((current.resetAt - now) / 1000));
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }

        return next();
    };
};

export { createRateLimiter, securityHeaders, verifyRequestOrigin };

import jwt from "jsonwebtoken"; 

const Sec = "Aryan";

const auth = (req, res, next) => {
    const token = req.headers.authorization; // Get token from headers

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid or missing token" });
    }

    const t = token.split(" ")[1]; // Extract token part

    try {
        const decoded = jwt.verify(t, Sec); // Verify token

        if (decoded) {
            req.user = decoded.id; // Ensure the correct field is accessed
            next();
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export { auth, Sec };

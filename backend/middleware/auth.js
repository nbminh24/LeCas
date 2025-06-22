const jwt = require('jsonwebtoken');

/**
 * Authentication and authorization middleware
 * @param {Array} roles - Array of roles allowed to access the route
 * @returns {Function} Middleware function
 */
const auth = (roles = []) => {
    return (req, res, next) => {
        // Get token from header
        const token = req.header('x-auth-token');

        // Check if no token
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user from payload
            req.user = decoded;

            // Check role authorization if roles are specified
            if (roles.length > 0 && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    message: 'Access forbidden: You do not have the required permissions'
                });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    };
};

module.exports = auth;

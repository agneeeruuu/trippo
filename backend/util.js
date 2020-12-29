import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET || 'jiarongl',
        {
            expiresIn: '30d',
        }
    );
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'jiarongl', (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(401).send({ message: 'No Token' })
    }
}
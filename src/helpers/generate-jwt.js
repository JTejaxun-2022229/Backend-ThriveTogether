import jwt from 'jsonwebtoken';

export const generarJWT = (id = '', name = '', username = '', email = '', role = '') => {

    return new Promise((resolve, reject) => {

        const payload = { id, name, username, email, role };

        jwt.sign(

            payload,
            process.env.PRIVATE_SECRET_KEY,
            { expiresIn: '3h' },
            (err, token) => {

                if (err) {
                    console.log(err);
                    reject('Could not generate a token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};
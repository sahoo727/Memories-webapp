import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];          //in frontend authorization - A is capital but in backend whatever it is it recives in small letters
        const isCustomAuth = token.length < 500;

        let decodeData;

        if(token && isCustomAuth){
            decodeData = jwt.verify(token, 'test');
            req.userId = decodeData?.id;
        }else{
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub                                    //sub is google's name for spefic id that differentiates every single google user
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;
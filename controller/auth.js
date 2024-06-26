import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const secretKey = config.jwt.secretKey;
const jwtExpiresInDays = config.jwt.expiresInSec;
const bcryptSaltRounds = config.bcrypt.saltRounds;

function createJwtToken(id){
    return jwt.sign({id}, secretKey, {expiresIn: jwtExpiresInDays});
}

// /**
//     회원가입
//     @param {string} username
//     @param {string} password
//     @param {string} name
//     @param {string} email
// */
// export async function signup(req, res, next){
//     const {username, password, name, email, url} = req.body;
//     const dupCheck = await authRepository.findByUsername(username);
//     if(dupCheck){
//         return res.status(409).json('이미 사용중인 아이디입니다.');
//     }else if(!username || !password || !name || !email || !url){
//         return res.status(409).json('모든 항목을 입력해주세요.');
//     }
//     const hashed = await bcrypt.hash(password, bcryptSaltRounds);
//     const userid = await authRepository.createUser({username, hashed, name, email, url});
//     const token = createJwtToken(userid);
//     res.status(201).json({token, username});
// }



export async function signup(req, res, next){
    const {username, password, name, email, url} = req.body;
    const found = await authRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message:`${username}이 이미 있습니다`});
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await authRepository.createUser({username, hashed, name, email, url});
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}


export async function login(req, res, next){
    const {username, password} = req.body;
    // const user = await authRepository.login(username);
    const user = await authRepository.findByUsername(username);
    if(!user){
        return res.status(401).json({message: `아이디를 찾을 수 없음`});
    }
    const isValidpassword = bcrypt.compareSync(password, user.password);
    if(!isValidpassword){
        return res.status(401).json({message: `비밀번호가 틀렸음`});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}


// export async function verify(req, res, next){
//     const token = req.headers['Token'];
//     if(token){
//         res.status(200).json(token);
//     }
// }

export async function me(req, res, next){
    const user = await authRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({message: `일치하는 사용자가 없음`});
    }
    res.status(200).json({token: req.token, username: user.username});
}
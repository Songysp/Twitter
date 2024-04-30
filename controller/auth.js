import * as authRepository from '../data/auth.js';

export async function signup(req, res, next){
    const {username, password, name, email} = req.body;
    const users = await authRepository.createUser(username, password, name, email);
    if(users){
        res.staus(201).json(users);
    }
}

export async function login(req, res, next){
    const {username, password} = req.body;
    const users = await authRepository.login(username, password);
    if(user){
        res.status(201).json(`${username} 로그인 완료`);
    }else{
        res.status(404).json(`{massage: ${username}님 아이디 또는 비밀번호 확인하세요`)
    }
}
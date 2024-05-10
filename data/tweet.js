import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as authRepository from './auth.js';
import { Result } from 'express-validator';
import { text, urlencoded } from 'express';

const tweetSchema = new Mongoose.Schema({
    text: {type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    username: {type: String, required: true},
    url: String,
    createdAt: {type: Date, required: true, default: Date.now}
});

useVirtualId(tweetSchema);

const Tweet = Mongoose.model('Tweet', tweetSchema);


// 모든 트윗을 리턴
export async function getAll() {
    return Tweet.find().sort({createdAt: -1}).exec();
}


// 해당 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return authRepository.findByUsername(username)
    .then((user) => {
        console.log(user)
        return Tweet.find({userId: user.id}).sort({createdAt: -1}).exec()
    });

}


// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return Tweet.findById(id).exec();
}


// 트윗을 작성
export async function create(text, userId){
    return authRepository.findById(userId)
        .then((user) => new Tweet({text, userId: user.id}).save())
        .then(data => data.id);
}   


// 트윗을 변경
export async function update(id, text){
    return Tweet.findOneAndUpdate({_id: id}, {text}, {new: true}).exec();
}

// 트윗을 삭제
export async function remove(id){
    return Tweet.findOneAndDelete(id).exec();
}

function mapTweets(tweets){
    return tweets.map(mapOptionalTweet);
}

function mapOptionalTweet(tweet){
    return tweet ? { ...tweet, id: tweet.insertedId} : tweet;
}
let tweets = [
    {
        id:'1',
        text: '안녕하세요!',
        createdAT: Date.now().toString(),
        name: '김사과',
        username: 'apple',
        url: 'https://cdn-icons-png.flaticon.com/512/5875/5875390.png'
    },
    {
        id:'2',
        text: '반갑습니다!',
        createdAT: Date.now().toString(),
        name: '반하나',
        username: 'banana',
        url: 'https://qi-o.qoo10cdn.com/goods_image_big/3/0/6/9/12552483069_l.jpg'
    }
];

// 모든 트윗을 리턴
export async function getAll(){
    return tweets;
}

// id에 해당하는 트윗을 리턴
export async function getAllByUsername(id){
    return tweets.filter((tweet) => tweet.username === id);
}

// 글번호에 대한 트윗을 리턴
export async function getById(id){
    return tweets.find((tweet) => tweet.id === id);
}

// 트윗을 작성
export async function create(id,text,name,username,url){
    const tweet = {
        id: id.toString(),
        text,
        createdAT: Date.now().toString(),
        name,
        username,
        url
    };
    return tweets = [tweet, ...tweets];
}


// 트윗을 변경
export async function update(id, text){
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
    }
    return tweet;
}

// 트윗을 삭제
export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
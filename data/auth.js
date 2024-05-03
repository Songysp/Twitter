let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$kXLzwe/qmhv1MMkdQJ3uCOZDwHF/JvvYzwpvvFTzeBeOqbM9eF9im',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://img.hankyung.com/photo/202403/AA.36104679.1.jpg'
    },
    {
        id: "2",
        username: "banana",
        password: "$2b$10$IafHqINOQ.DguGpeVReKb.fwCPTGYLK8.NCtN5zdpt.UnTqYfKbYa",
        name: "반하나",
        email: "banana@banana.com",
        url: "https://www.sisajournal.com/news/photo/202105/216731_124666_4150.jpg"
    }
];


// 아이디(username) 중복검사
export async function findByUsername(username){
    return users.find((user) => user.username === username);
}


// id 중복검사
export async function findById(id){
    return users.find((user) => user.id === id);
}

/**
    로그인
    @param {string} username
*/
export async function login(username){
    const user = users.find((user) => user.username === username)
    return user;
}

/**
 * 회원가입
 * @param {Object} user 사용자 정보 객체
 * @param {string} user.username 사용자 아이디
 * @param {string} user.password 사용자 비밀번호
 * @param {string} user.name 사용자 이름
 * @param {string} user.email 사용자 이메일
 * @param {string} user.url 사용자 프로필 사진 URL
 * @returns {string} 생성된 사용자의 아이디
 */
export async function createUser(user){
    const created = {id:'10', ...user }
    users.push(created);
    return created.username;
}
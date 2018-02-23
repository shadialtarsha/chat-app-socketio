const expect = require('expect');

const Users = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Jan',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Julie',
                room: 'Node Course'
            }
        ];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Shadi',
            room: 'Js room'
        };
        const resUser = users.addUsers(user.id, user.name, user.room);
        expect(users.users.length).toBe(1);
    });

    it('should remove a user', () => {
        const user = users.removeUser('1');
        expect(user).toBeTruthy();
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        const user = users.removeUser('4');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        const user = users.getUser('1');
        expect(user).toEqual(users.users[0]);
    });

    it('should not find user', () => {
        const user = users.getUser('4');
        expect(user).toBeFalsy();
    });

    it('should return names for node course', () => {
        const userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        const userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jan']);
    });

});
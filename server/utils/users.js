class Users {
    constructor() {
        this.users = [];
    }

    addUsers(id, name, room) {
        return this.users.push({ id, name, room });
    }

    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUserList(room) {
        return this.users.filter(user => user.room === room).map(user => user.name);
    }
}

module.exports = Users;
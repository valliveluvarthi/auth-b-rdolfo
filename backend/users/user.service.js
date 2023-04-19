const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const auth0 = require('_helpers/auth0');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }
    try {
        const management = await auth0.getManagementClient();
        const auth0User = await management.createUser({
            email: params.email,
            username: params.username,
            password: params.password,
            verify_email: false,
            connection: "Username-Password-Authentication",
        });
        params['auth0Id'] = auth0User.user_id;
    } catch (err) {
        throw err.message;
    }
    const user = new db.User(params);
    // hash password
    user.passwordHash = await bcrypt.hash(params.password, 10);
    // save user
    await user.save();
}
async function update(id, params) {
    const user = await getUser(id);
    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }
    if (params.auth0Id) {
        try {
            const { username, password } = params;
            const newData = {};
            if (username) newData["username"] = username;
            if (password) newData["password"] = password;
            const management = await auth0.getManagementClient();
            await management.updateUser({ id: params.auth0Id }, newData);
        } catch (err) {
            throw err.message;
        }

    }
    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }
    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id, auth0Id) {
    if (auth0Id) {
        try {
            const management = await auth0.getManagementClient();
            await management.deleteUser({ id: auth0Id });
        } catch (err) {

            throw err.message;

        }
    }

    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

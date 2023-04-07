const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Article.findAll();
}

async function getById(id) {
    return await getArticle(id);
}

async function create(params) {
    // validate
    // if (await db.User.findOne({ where: { url: params.url } })) {
    //     throw 'URL "' + params.url + '" is already registered';
    // }

    const article = new db.Article(params);

    // save article
    await article.save();
}

async function update(id, params) {
    const article = await getArticle(id);

    // validate
    const urlChanged = params.url && article.url !== params.url;
    if (urlChanged && await db.Article.findOne({ where: { url: params.url } })) {
        throw 'URL "' + params.url + '" is already registered';
    }

    // copy params to user and save
    Object.assign(article, params);
    await article.save();
}

async function _delete(id) {
    const article = await getArticle(id);
    await article.destroy();
}

// helper functions

async function getArticle(id) {
    const article = await db.Article.findByPk(id);
    if (!article) throw 'Article not found';
    return article;
}

import Article from '../models/article.js';

export const createNewArticle = async (req, res) => {

    try {
        const { title, description, date, author } = req.body;

        const newArticle = new Article({
            title,
            description,
            date,
            author
        });

        await newArticle.save();

        res.json({ message: 'Article added successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();

        res.json(articles);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};

export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;

        const article = await Article.findById(id);

        res.json(article);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteArticle = await Article.findByIdAndDelete(id);

        if (!deleteArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, author } = req.body;

        const updatedArticle = {
            title,
            description,
            date,
            author
        };

        const updatedArticleDoc = await Article.findByIdAndUpdate(id, updatedArticle);

        if (!updatedArticleDoc) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json({ message: 'Article updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};


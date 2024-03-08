import Property from '../models/property.js';

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};
import Property from '../models/property.js';

export const getPropertyById = async (req,res) => {
    try {
        const { propertyId } = req.params;

        const property = await Property.findById( propertyId );

        res.json(property);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};
import Property from '../models/property.js';

export const addproperty = async (req,res) => {
    try {

        const { title, description, date, price, coordinates, distance, image, mobile, propertyOwnerDetails, isInMap, availableRooms } = req.body;


        const newProperty = new Property({
            title,
            description,
            date,
            price,
            coordinates,
            distance,
            image,
            mobile,
            propertyOwnerDetails,
            isInMap,
            availableRooms
        });


        await newProperty.save();


        res.json({ message: 'Property added successfully' });
    } catch (error) {

        console.error(error.message);
        res.status(500).json(error.message);
    }

}

export const getmyproperties = async (res,req) => {
    try {
        const { propertyOwnerDetails } = req.body;

        const properties = await Property.find({ "propertyOwnerDetails": propertyOwnerDetails });

        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
}

export const updateProperty = async (req,res) => {
    try {
        const { id } = req.params;
        const { title, description, date, price, coordinates, distance, image, mobile, propertyOwnerDetails, isInMap, availableRooms } = req.body;

        const updatedProperty = {
            title,
            description,
            date,
            price,
            coordinates,
            distance,
            image,
            mobile,
            propertyOwnerDetails,
            isInMap,
            availableRooms
        };


        const updatedPropertyDoc = await Property.findByIdAndUpdate(id, updatedProperty);

        if (!updatedPropertyDoc) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json({ message: 'Property updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const deletedProperty = async (req,res) => {
    try {
        const { id } = req.params;

        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const getPropertyOwnerDetails = async (req, res) => {
    try {
        const { propertyId } = req.body;

        const property = await Property.findById(propertyId).populate('propertyOwnerDetails');

        res.json(property.propertyOwnerDetails);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}
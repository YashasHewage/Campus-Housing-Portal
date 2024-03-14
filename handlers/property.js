import multer from "multer";
import Property from '../models/property.js';


export const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'SDT Project/../../testBackEnd/public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname );
    }
});






export const addproperty = async (req,res) => {
    try {

        const {  title, description, date, price, coordinates, distance, propertyOwnerDetails, isInMap, isRented, rentalRequests, availableRooms  } = req.body;
        const image1 = req.files[0].originalname;
        const image2 = req.files[1].originalname;
        const image3 = req.files[2].originalname;


        const newProperty = new Property({
            title,
            description,
            date,
            price,
            coordinates,
            distance,
            image1,
            image2,
            image3,
            propertyOwnerDetails,
            isInMap,
            isRented,
            rentalRequests,
            availableRooms
        });


        await newProperty.save();


        res.json({ message: 'Property added successfully' });
    } catch (error) {

        console.error(error.message);
        res.status(500).json(error.message);
    }

};






export const getmyproperties = async (res,req) => {
    try {
        const { email } = req.body;

        const properties = await Property.find({ "owner.email": email });

        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};









export const updateProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const { title, description, date, price, coordinates, distance, propertyOwnerDetails, isInMap, isRented , rentalRequests, availableRooms } = req.body;
        
        const existingImages = await Property.findById(propertyId);

            let image1, image2, image3;

        if (req.files) {

                image1 = req.files[0].originalname;
                image2 = req.files[1].originalname;
                image3 = req.files[2].originalname;
        }else {
                image1 = existingImages.image1;
                image2 = existingImages.image2;
                image3 = existingImages.image3;
        }


        
        
        const updatedProperty = {
            title,
            description,
            date,
            price,
            coordinates,
            distance,
            image1,
            image2,
            image3,
            propertyOwnerDetails,
            isInMap,
            isRented,
            rentalRequests,
            availableRooms
        };

        // Find the property by ID and update
        const updatedPropertyDoc = await Property.findByIdAndUpdate(propertyId, updatedProperty, { new: true });

        if (!updatedPropertyDoc) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Update availableRooms
        const acceptedRequestsCount = updatedPropertyDoc.rentalRequests.filter(request => request.status === 'accepted').length;
        updatedPropertyDoc.availableRooms = availableRooms - acceptedRequestsCount;
        await updatedPropertyDoc.save();

        res.json({ message: 'Property updated successfully', updatedPropertyDoc });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const deletedProperty = async (req,res) => {
    try {
        const { propertyId } = req.params;

        const deletedProperty = await Property.findByIdAndDelete( propertyId );

        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};



export const getAllApprovedProperties = async (req, res) => {
    try {
        const properties = await Property.find({ isInMap: true });
        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};



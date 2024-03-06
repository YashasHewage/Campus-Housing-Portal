import express from 'express';
import Landlord from '../models/landlord.js';
import Property from '../models/property.js';
const router = express.Router();



router.post('/register', async (req, res) => {
    try {

        const { email, password } = req.body;

        const newLandlord = new Landlord({ email, password });

        await newLandlord.save();
    
        
        res.json("Landlord registered successfully");
    } catch (error) {

        console.error(error);
        res.status(500).json(error.message);
    }
});


// property handler

router.post('/add-property', async (req, res) => {
    try {

        const { title, description, date, price, coordinates, distance, image, owner, isInMap, availableRooms } = req.body;


        const newProperty = new Property({
            title,
            description,
            date,
            price,
            coordinates,
            distance,
            image,
            owner,
            isInMap,
            availableRooms
        });


        await newProperty.save();


        res.json({ message: 'Property added successfully' });
    } catch (error) {

        console.error(error.message);
        res.status(500).json(error.message);
    }
});



router.get('/get-my-properties', async (req, res) => {
    try {
        const { email } = req.body;

        const properties = await Property.find({ "owner.email": email });

        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});


export default router;

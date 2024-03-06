import bcrypt from 'bcryptjs';
import express from 'express';
import Landlord from '../models/landlord.js';
import Property from '../models/property.js';
const router = express.Router();



router.post('/register', async (req, res) => {
    try {

        const { email, password } = req.body;
        const isAvailable = await Landlord.findOne({ email });

        if (isAvailable) {
            return res.status(400).json({ message: "Email already exists" });
        }else {

            const newLandlord = new Landlord({ email, password });
            await newLandlord.save();
            res.json("Landlord registered successfully");
        }


    } catch (error) {

        console.error(error);
        res.status(500).json(error.message);
    }
});

router.get('/login', async (req, res) => {
    try {
        const { email, password } = req.body;


        const landlord = await Landlord.findOne({ email });


        if (!landlord) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        
        const isPasswordMatch = await bcrypt.compare(password, landlord.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

    
        res.json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// add new property
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


// get user all properties
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



// update property
router.put('/update-property/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, price, coordinates, distance, image, owner, isInMap, availableRooms } = req.body;

        const updatedProperty = {
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
});

//delete property
router.delete('/delete-property/:id', async (req, res) => {
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
});

// get landlord details
router.get('/get-landlord-details', async (req, res) => {
    try {
        const { email } = req.body;

        const landlord = await Landlord.findOne({ email });
        res.json(landlord);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});



export default router;

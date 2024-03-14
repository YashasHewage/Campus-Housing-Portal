import Property from '../models/property.js';



export const makeRequest = async (req, res) => {
    try {
        const { propertyId, studentEmail } = req.body;
    
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }


        if (property.isRented === false) {
            return res.status(400).json({ message: 'Property is closed now' });
        }
    
    
        const rentalRequestData = {
            property: propertyId,
            student: studentEmail,
            status: 'pending',
            date: new Date()
        };

        property.rentalRequests.push(rentalRequestData);
        await property.save();


        res.status(201).json({ message: 'Rental request submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
    
};




export const getMyAllRequests = async (req, res) => {
    try {
        const { email } = req.body;

        const properties = await Property.find({ "rentalRequests.student": email });

        res.json(properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
};






export const deleteRequest = async (req, res) => {
    const { studentEmail, propertyId } = req.body;

    try {
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        const rentalRequestIndex = property.rentalRequests.findIndex(request =>
            request.student === studentEmail
        );

        if (rentalRequestIndex === -1) {
            return res.status(404).json({ error: 'Rental request not found for this student and property' });
        }

    
        const deletedRequest = property.rentalRequests[rentalRequestIndex];
        
        // Remove the rental request
        property.rentalRequests.splice(rentalRequestIndex, 1);
        await property.save();

        // Update available rooms only if the rental request status was "accepted"
        if (deletedRequest.status === 'accepted') {
            property.availableRooms += 1;
            await property.save();
        }

        res.json({ message: 'Rental request deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


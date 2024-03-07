import { Router } from "express";
import { createNewUser } from "./handlers/user.js";
import checkRole from "./middleware/roleMiddleware.js";
import { addproperty, deletedProperty, getPropertyOwnerDetails, getmyproperties, updateProperty } from "./handlers/property.js";


const router = Router();

//Admin Router
router.post('/studentRegisration',checkRole('admin'),createNewUser);
router.post('/wardenRegisration',checkRole('admin'),createNewUser);


//Property Router
router.post ('/add-property',checkRole('propertyOwner'),addproperty)
router.get('/get-my-properties',checkRole('propertyOwner'||'warden'),getmyproperties)
router.put('/update-property/:id',checkRole('propertyOwner'),updateProperty)
router.delete('/delete-property/:id',checkRole('propertyOwner'),deletedProperty)
router.get('/get-landlord-details',checkRole('warden'||'propertyOwner'),getPropertyOwnerDetails)


export default router;
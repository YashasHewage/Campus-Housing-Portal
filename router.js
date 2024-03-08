import { Router } from "express";
import { createNewUser } from "./handlers/user.js";
import checkRole from "./middleware/roleMiddleware.js";
import { addproperty, deletedProperty, getmyproperties, updateProperty } from "./handlers/property.js";
import { getAllProperties} from "./handlers/warden.js";
import { getAllApprovedProperties} from "./handlers/student.js";
import { getPropertyById} from "./handlers/common.js";


const router = Router();

//Admin Router
router.post('/studentRegisration',checkRole('admin'),createNewUser);
router.post('/wardenRegisration',checkRole('admin'),createNewUser);


//Property Router
router.post ('/add-property',checkRole('propertyOwner'),addproperty)
router.get('/get-my-properties',checkRole('propertyOwner'),getmyproperties)
router.put('/update-property/:id',checkRole('propertyOwner' || 'warden'),updateProperty)
router.delete('/delete-property/:id',checkRole('propertyOwner' || 'warden'),deletedProperty)
router.get('/get-all-properties',checkRole('warden'),getAllProperties)
router.get('/get-all-approved-properties',checkRole('student'),getAllApprovedProperties)
router.get('/get-property/:id',getPropertyById)
// router.get('/get-landlord-details',checkRole('propertyOwner'),getPropertyOwnerDetails)


export default router;
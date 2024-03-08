import { Router } from "express";
import { createNewArticle, getAllArticles, getArticleById, deleteArticle, updateArticle } from "./handlers/article.js";
import { getPropertyById } from "./handlers/common.js";
import { addproperty, deletedProperty, getAllApprovedProperties, getAllProperties, getmyproperties, updateProperty } from "./handlers/property.js";
import { createNewUser } from "./handlers/user.js";
import checkRole from "./middleware/roleMiddleware.js";



const router = Router();

//user Router
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


//Article Router
router.post('/create-article',checkRole('admin'),createNewArticle)
router.get('/get-all-articles',checkRole('admin' || 'student'),getAllArticles)
router.get('/get-article/:id',checkRole('admin' || 'student'),getArticleById)
router.delete('/delete-article/:id', checkRole('admin'),deleteArticle)
router.put('/update-article/:id', checkRole('admin'),updateArticle)




export default router;
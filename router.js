import { Router } from "express";
import { createNewArticle, getAllArticles, getArticleById, deleteArticle, updateArticle } from "./handlers/article.js";
import { getPropertyById } from "./handlers/common.js";
import { addproperty, deletedProperty, getAllApprovedProperties, getAllProperties, getmyproperties, updateProperty } from "./handlers/property.js";
import { createNewUser } from "./handlers/user.js";
import checkRole from "./middleware/roleMiddleware.js";
import { makeRequest, getMyAllRequests , deleteRequest} from "./handlers/rentalRequest.js";


const router = Router();

//user Router
router.post('/studentRegisration',checkRole('admin'),createNewUser);
router.post('/wardenRegisration',checkRole('admin'),createNewUser);


//Property Router
router.post ('/add-property',checkRole('propertyOwner'),addproperty)
router.get('/get-my-properties',checkRole('propertyOwner'),getmyproperties)
router.put('/update-property/:propertyId',checkRole('propertyOwner' || 'warden'),updateProperty)
router.delete('/delete-property/:propertyId',checkRole('propertyOwner' || 'warden'),deletedProperty)
router.get('/get-all-properties',checkRole('warden'),getAllProperties)
router.get('/get-all-approved-properties',checkRole('student'),getAllApprovedProperties)
router.get('/get-property/:propertyId',getPropertyById)


//Article Router
router.post('/create-article',checkRole('admin'),createNewArticle)
router.get('/get-all-articles',checkRole('admin' || 'student'),getAllArticles)
router.get('/get-article/:articleId',checkRole('admin' || 'student'),getArticleById)
router.delete('/delete-article/:articleId', checkRole('admin'),deleteArticle)
router.put('/update-article/:articleId', checkRole('admin'),updateArticle)



//Rental Request Router
router.put('/make-request',checkRole('student'),makeRequest)
router.get('/get-my-requests',checkRole('student'),getMyAllRequests)
router.delete('/delete-request',checkRole('propertyOwner'),deleteRequest)





export default router;
import { Router } from "express";
import multer from "multer";
import { createNewArticle, deleteArticle, getAllArticles, getArticleById, updateArticle } from "./handlers/article.js";
import { getPropertyById } from "./handlers/common.js";
import { addproperty, deletedProperty, getAllApprovedProperties, getAllProperties, getmyproperties, storage, updateProperty } from "./handlers/property.js";
import { deleteRequest, getMyAllRequests, makeRequest } from "./handlers/rentalRequest.js";
import { createNewUser } from "./handlers/user.js";
import checkRole from "./middleware/roleMiddleware.js";



const router = Router();


// image upload code
const upload = multer({storage: storage});






//user Router
router.post('/studentRegisration',checkRole('admin'),createNewUser);
router.post('/wardenRegisration',checkRole('admin'),createNewUser);


//Property Router
router.post ('/add-property',checkRole('propertyOwner'),upload.array("files",3),addproperty)
router.get('/get-my-properties',checkRole('propertyOwner'),getmyproperties)
router.put('/update-property/:propertyId',checkRole('propertyOwner' || 'warden'),upload.array("files",3),updateProperty)
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
const app =require('express');
const router =app.Router();
const {
    category,
    updateCategory,
    fetchCategory
} =require('../controllers/categoryController')


router.post('/category',category);
router.post('/updateCategory',updateCategory);
router.get('/getcategory',fetchCategory);


module.exports = router;
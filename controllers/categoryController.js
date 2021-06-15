

const Category =require('../models/Category');

module.exports.category = async (req,res)=>{
    const {name}=req.body
    console.log(req.body);

    try{
        const checkCategory = await Category.findOne({name})
        if (checkCategory) {
            return res.status(400).json({errors: [{msg: 'category is already taken'}]});
        }

        try{
            const category = await Category.create({
                name,
            });
            return res.status(200).json({msg: "your category has been created", category});

        }catch (error){
            return res.status(500).json({errors: error});

        }

    }catch (error){
        return res.status(500).json({errors: error});

    }

};


module.exports.updateCategory = async (req,res)=>{
    const {name,_id} =req.body;
    // console.log(req.body);
    try{
        const response = await  Category.findByIdAndUpdate(_id,{
            name

        });
        return res.status(200).json({msg:"your category updated"})

    }catch (error){
        return  res.status(500).json({errors:error,msg:error.message});

    }

};

module.exports.fetchCategory=async (req,res)=>{

    try{
        const category = await Category.find({});
        return res.status(200).json({ category });
    }catch (error){
        return res.status(500).json({ errors: error, msg: error.message });
    }

}

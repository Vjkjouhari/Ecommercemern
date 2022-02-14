class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    // http://localhost:5000/api/v1/products?price[gte]=499&price[lt]=600
    // queryStr = price[gte]=499&price[lt]=600 or whatever parameter mention in route
    search(){
        const keyword = this.queryStr.keyword ? {  // this constant is used as ternary operator
            name:{
                $regex:this.queryStr.keyword,
                $options:"i", // i means case insensitive
            },
        } : {};
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        //this is case insensitive
        // we use spread operator so that used queryStr doesnot match above value
        const queryCopy = { ...this.queryStr }
        console.log(queryCopy);
        //removing some field for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);
        console.log(queryCopy);

        // filter for price
        // console.log(queryCopy);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        // gt- greater than
        // gte- greater than or equals to
        // lt- less than
        // lte- less than or equals to
        // console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1; // 

        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }



}

module.exports = ApiFeatures;
export default (posts=[],action) =>{
    console.log("5");
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;

        case 'CREATE' :
            return [...posts,action.payload];

        case 'UPDATE' :
        case 'LIKE' :
             return posts.map((post)=> (post._id ===action.payload._id ? action.payload : post));

        case 'DELETE' :
            return posts.map((post)=> post._id !== action.payload);  
                         
        
        default:
            return posts;
    }

}
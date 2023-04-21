exports.getDate =  function () {
    const today = new Date();
    
    const option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    
    /*  let day = today.toLocaleDateString("en-US", option) 
        return day  OR */
        return today.toLocaleDateString("en-US", option);
    };

// functin expression


exports.getDay = function () {
    const today = new Date();
    const option = {
        weekday: "long"
    }

   /*  let day = today.toLocaleDateString("en-US", option) 
    return day  OR */
    return today.toLocaleDateString("en-US", option);
    
    
};


console.log(module.exports);
class ApiResponse{      //node js may response ka koie like - extends Error type class nahi hai.
    constructor(
        statusCode,
        data,
        message = "Success"
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = true;   // Or insted of true you can write --> statusCode < 400 ;
    }
}

export { ApiResponse };

// ========================================================
// Payload and schema
// ========================================================

// Define request payloads

//get login payload
function getLoginPayload(email, password = 'Test@2025') {
    return {
        email,
        password,
    };
};

//add product to basket payload
function getBasketAddPayload(basketId) {
    return {
        ProductId: 5,
        BasketId: String(basketId),
        quantity: 1
    };
}

//placeorder schema
const placeOrderPayload = {
    "cid": "JS0815DE",
    "orderLines": [
        {
            "productId": 8,
            "quantity": 500,
            "customerReference": "PO0000001"
        }
    ],
    "orderLinesData": "[{\"productId\": 12,\"quantity\": 10000,\"customerReference\": [\"PO0000001.2\", \"SM20180105|042\"],\"couponCode\": \"pes[Bh.u*t\"},{\"productId\": 13,\"quantity\": 2000,\"customerReference\": \"PO0000003.4\"}]"
};





// Export the payloads
module.exports = {

    getLoginPayload,
    getBasketAddPayload,
    placeOrderPayload


};
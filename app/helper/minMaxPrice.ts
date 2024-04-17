/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const findHighestAndLowestPrices = (products:any) =>{
    // Check if products array is empty
    if (!products || products.length === 0) {
      return { maxPrice: 0, minPrice: 0 };
    }
    // Initialize max and min prices with the first product's price
    let maxPrice = parseFloat(products[0].price);
    let minPrice = parseFloat(products[0].price);
  
    // Iterate through the array starting from the second element
    for (let i = 1; i < products.length; i++) {
      const price = parseFloat(products[i].price);
   
      // Update max price if current price is greater
      if (price > maxPrice) {
        maxPrice = price;
      }
      
      // Update min price if current price is smaller
      if (price < minPrice) {
        minPrice = price;
      }
    }
    return { maxPrice, minPrice };
  }
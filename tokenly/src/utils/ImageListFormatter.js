// Converts the data from the database into a format that can be used by the image gallery
export default function imageListFormat(imageList) {
    if(!imageList.length === 0) return []

    let imageArray = []
    for (let i = 0; i < imageList.length; i++) {
      
        if(imageList[i].minPrice === undefined || imageList[i].maxPrice === undefined || imageList[i].listingId === undefined || imageList[i].publicationTime === null) { 
            let img = {
            filename: `http://localhost:8080/api/source/${imageList[i].itemId}`,
            alt: imageList[i].itemName,
            title: imageList[i].itemName,
            price: 'Not listed',
            link: 'nft?id=' + imageList[i].itemId 
            }
            imageArray.push(img)
        } else {
            let img = {
            filename: `http://localhost:8080/api/source/${imageList[i].itemId}`,
            alt: imageList[i].itemName,
            title: imageList[i].itemName,
            price: imageList[i].maxPrice,
            link: 'nft?id=' + imageList[i].itemId
            }
            imageArray.push(img)
        }
    }
    return imageArray
}
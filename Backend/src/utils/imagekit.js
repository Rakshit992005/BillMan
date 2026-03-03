import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
})

const uploadFile = async (file) =>{
    const result = await imageKit.files.upload({
        file,
        fileName : "billman_" + Date.now() + ".jpg",
        folder : "/billman"
    })
    return result.url;
}


export default uploadFile;
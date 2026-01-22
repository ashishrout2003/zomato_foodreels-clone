const ImageKit = require('imagekit');

function createImageKit(){
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

    if(!publicKey || !privateKey || !urlEndpoint){
        console.warn('ImageKit env vars missing:', {
            publicKey: !!publicKey,
            privateKey: !!privateKey,
            urlEndpoint: !!urlEndpoint
        })
        return null
    }

    return new ImageKit({ publicKey, privateKey, urlEndpoint })
}

const imagekit = createImageKit();

async function uploadFile(file, fileName){
    if(!imagekit){
        throw new Error('ImageKit not configured. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT')
    }

    // If `file` is a Buffer, convert to base64 string for ImageKit
    let payload = file
    if(Buffer.isBuffer(file)){
        payload = file.toString('base64')
    }

    try{
        const result = await imagekit.upload({
            file: payload,
            fileName: fileName
        })
        return result;
    }catch(err){
        console.error('ImageKit upload failed:', err && err.message ? err.message : err)
        throw err
    }
}

module.exports = {
    uploadFile
}
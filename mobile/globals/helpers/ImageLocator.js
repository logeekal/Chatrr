    //Generating  image path statically
    export const getImage = (image) => {
        let imageName = image.split('.')[0].toLowerCase();
        console.log(`Fetching image : ${imageName}`);
        switch(imageName){
            case 'delhi':
                return require('../../assets/images/delhi.jpg');
            case 'mumbai':
                return require('../../assets/images/mumbai.jpg');
            case 'couple' : 
                return require('../../assets/images/couple.jpg');
            case 'male':
                return require('../../assets/images/male.png');
            case 'female':
                return require('../../assets/images/female.png');
            default:
                return require('../../assets/images/couple.jpg');
        }
    }

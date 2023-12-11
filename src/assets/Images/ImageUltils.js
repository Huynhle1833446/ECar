module.exports = {
    getImageSource(imageName) {
        switch (imageName) {
            case 'map' :
                return require('./map.jpg')
            case 'logo':
                return require('./logo.png');
            case 'elecCar':
                return require('./elecCar.jpg');
            case 'logoDb':
                return require('./logoDb.png');
            case 'otpClear':
                return require('./otpClear.jpg')
            case 'timeOut':
                return require('./timeOut.jpg');
            case 'fullOtp':
                return require('./fullOtp.jpg')
            case 'headerBg':
                return require('./bgHeader.jpeg')
            case 'elecIcon':
                return require('./homeIcon.png')
            case 'slide1':
                return require('./slide1.jpg')
            case 'slide2':
                return require('./slide2.jpg')
            case 'slide3':
                return require('./slide3.jpg')
            case 'slide4':
                return require('./slide4.jpg')
            case 'slide5':
                return require('./slide5.jpg')
            case 'new1':
                return require('./new1.jpeg')
            case 'new2':
                return require('./new2.jpg')
            case 'new3':
                return require('./new3.jpg')
            case 'new4':
                return require('./new4.jpg')
            case 'new5':
                return require('./new5.jpg')
            case 'new6':
                return require('./new6.jpg')
            case 'dainam':
                return require('./dainam.jpeg')
            case 'damsen':
                return require('./damsen.jpg')
            case 'suoitien':
                return require('./suoitien.jpg')
            case 'bocap':
                return require('./bocapvang.jpg')
            case 'avt1':
                return require('./onggia.jpg')
            case 'avt2':
                return require('./sanggia.jpg')
            case 'avt3':
                return require('./duongmap.jpg')
            case 'avt4':
                return require('./rosy.jpg')
            case 'buyTicket':
                return require('./buyTicket.png')
            case 'buildRoute':
                return require('./buildRoute.png')
            case 'avtDriver':
                return require('./driver.png')
            case 'runningCar' : 
                return require('./runningCar.gif')
        }
    }
}
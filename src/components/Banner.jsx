import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function Banner() {
        const bannerImages = [
                'https://images-na.ssl-images-amazon.com/images/G/15/CA-hq/2021/img/Books/XCM_Manual_1308401_1574788_CA_ca_pc_contentgrid1c_hero_ca_en_3676078_1500x375_en_CA.jpg',
                'https://images-na.ssl-images-amazon.com/images/G/15/CA-hq/2022/img/DVD/XCM_Manual_1447968_2449591_4831203_1500x375_en_CA.jpg',
                'https://images-na.ssl-images-amazon.com/images/G/15/CA-hq/2020/img/Books/XCM_Manual_1231932_1224561_CA_ca_books_bargains_assets_3168534_1500x375_en_CA.jpg',
        ];

        const  bannerImage = bannerImages.map((image, i) => (
                <div className="" key={i} >
                        <img src={image} alt="" />
                </div>
        ));

        return (
                <div className="object-contain mx-auto">
                        <Carousel
                                        autoPlay
                                        infiniteLoop
                                        showIndicators={true}
                                        showStatus={false}
                                        showThumbs={false}
                                        showArrows={true}
                                        interval={5000}>
                                        {bannerImage}
                        </Carousel>                        
                </div>

        )
}

export default Banner;

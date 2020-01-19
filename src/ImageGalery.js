import React from 'react';
import BackgroundSlideshow from 'react-background-slideshow'
import {Typography} from "@material-ui/core";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
const images = [
    {
        original: 'https://s3-media0.fl.yelpcdn.com/bphoto/9OOBQgSAz-IsV0We_faXmQ/o.jpg',
        // originalTitle: "test",
        description: "THIS IS AN AWESOME REVIEW THAT YOU CAN'T HANDle ",
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        // originalTitle: "test1",
        // description: "test",

        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        // originalTitle: "test2",
        // description: "test",

        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const MyGallery = () => {
    var image1 = "https://s3-media0.fl.yelpcdn.com/bphoto/9OOBQgSAz-IsV0We_faXmQ/o.jpg"
    var image2 = "https://s3-media0.fl.yelpcdn.com/bphoto/9OOBQgSAz-IsV0We_faXmQ/o.jpg"
    var image3 = "https://s3-media0.fl.yelpcdn.com/bphoto/9OOBQgSAz-IsV0We_faXmQ/o.jpg"

    var comments = ["this was so awesome", "this was fucking great", "wtf dude have you tried this"]
    const [comment, setComment] = React.useState("uros");

    var displayText = () => {
        console.log("comment")
        setComment(comments[getRandomInteger(0, 3)]);
        console.log(comment)
   };

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    return (
        <div>
        {comment}
        <Typography
            color={'white'} display={'block'} variant={'h1'} >
            {setTimeout(displayText, 5000)}
            {comment}
        </Typography>
        <BackgroundSlideshow images={[image1, image3, image2]}/>
    </div>


)
};

export default MyGallery
import React  from 'react';

const ImageHelper = ({product}) => {
	const imageurl = product ? product.image 
	:  `https://images.pexels.com/photos/6662855/pexelss-photo-6662855.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return (
    	<div className="">
    	<img src={imageurl} alt="" 
    	style={{ maxHeight:"200px", maxWidth: "100%"}}
    	className="card-img-top"
    	/>
    	</div>    
    );
};


export default ImageHelper;

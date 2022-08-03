//함수형

import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const Postcode = () => {

    const onCompletePost =(data)=>{
        console.log(data);

    }

    const postStyle = {
        position:'fiexed',
        top:'50%',
        left:'50%',
        width:'400px',
        height:'500px',
        background: '#fff',
        zIndex: '2',
        border: '1px solid #ccc',
        marginTop: '-250px',
        marginLeft: '-50px'
    }

        return (
            <div>
                <DaumPostcode style={postStyle} onComplete={onCompletePost}/>
            </div>
        );
};

export default Postcode;



// 클래스 형

// import React, { Component } from 'react';
// import DaumPostcode from 'react-daum-postcode';

// class Postcode extends Component {

//     onCompletePost =(data)=>{
//         console.log(data);
//     }

//     render() {

//         const postStyle = {
//             position:'fiexed',
//             top:'50%',
//             left:'50%',
//             width:'400px',
//             height:'500px',
//             background: '#fff',
//             zIndex: '2',
//             border: '1px solid #ccc',
//             marginTop: '-250px',
//             marginLeft: '-50px'
//         }

//         return (
//             <div>
//                 <DaumPostcode style={postStyle} onComplete={this.onCompletePost}/>
//             </div>
//         );
//     }
// }

// export default Postcode;
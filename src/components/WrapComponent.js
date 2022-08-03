import React, { useState } from 'react';
import HeaderComponent from './HeaderComponent.js'
import MainComponent from './MainComponent.js'
import FooterComponent from './FooterComponent.js'
import ModalComponent from './ModalComponent.js'

const WrapComponent = () => {


    // 모달 상태관리
    const [modal, setModal] = useState({title:'', isShow: false});

    // 모달 보이기 함수
    const modalShowFn =(tit)=>{
        setModal({...modal, title: tit,  isShow: true});
    }


    // 모달 숨기기(닫기) 함수
    const modalCloseFn =()=>{
        setModal({...modal, isShow: false});
    }


    return (
        <div id='wrap'>
            <HeaderComponent/>
            <MainComponent modalShowFn={modalShowFn}/>
            <FooterComponent/>
            <ModalComponent modal={modal} modalCloseFn={modalCloseFn}/>
        </div>
    );
};

export default WrapComponent;
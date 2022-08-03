import React from 'react';
import MemberComponent from './MemberComponent.js'

const MainComponent = ({modalShowFn}) => {
    return (
      <main id="main">
        <MemberComponent modalShowFn={modalShowFn}/>
      </main>
    );
};

export default MainComponent;
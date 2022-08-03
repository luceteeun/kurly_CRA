import React from 'react';

const HeaderComponent = () => {
    return (
    <header id="header">
        <div className="container">
          <div className="wrap">
            <div className="popup">
                <div className="popup-container">
                  {/* <!-- 팝업전체링크 --> */}
                  <a href="#!">
                    <span>
                      지금 가입하고 인기상품 100원 에 받아가세요!
                      <i>
                        <img src="./images/ico_arrow_fff_84x84.webp" alt="" />
                      </i>
                    </span>
                  </a>
                  {/* <!-- 닫기버튼 --> */}
                  <span>
                    <button className="popup-close-btn" title="닫기">
                      <img src="./images/ico_close_fff_42x42.webp" alt="" />
                    </button>
                  </span>
                </div>
            </div>
            <div className="user-menu">
              <ul>
                <li><a href="#!" title="회원가입">회원가입</a></li>
                <li><a href="#!" title="로그인">로그인</a></li>
                <li><a href="#!" title="고객센터">고객센터</a></li>
              </ul>
            </div>
            <h1><a href="#!" className="logo" title="logo"><img src="./images/logo_x2.png" alt="logo" /></a></h1>
            <div className="main-menu">
              <div className="menu-wrap">
                <ul>
                  <li><a href="#!" title="전체 카테고리">전체 카테고리</a></li>
                  <li><a href="#!" title="신상품">신상품</a></li>
                  <li><a href="#!" title="베스트">베스트</a></li>
                  <li><a href="#!" title="알뜰쇼핑">알뜰쇼핑</a></li>
                  <li><a href="#!" title="특가/혜택">특가/혜택</a></li>
                  <div className="search">
                    <form action="">
                      <input type="text" name="search-box" placeholder="검색어를 입력해주세요." />
                      <input type="image" src="./images/ico_search_x2.png" alt='' />
                    </form>
                  </div>
                  <ul className="icon">
                    <li><a href="#!"> </a></li>
                    <li><a href="#!"> </a></li>
                    <li><a href="#!"> </a></li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </header>
    );
};

export default HeaderComponent;
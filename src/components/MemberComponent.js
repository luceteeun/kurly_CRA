import React, { useState, useEffect } from 'react';
// import Postcode from './Postcode.js'; // 외부 제이쿼리 만들어서 사용할 경우
import DaumPostcode from 'react-daum-postcode';
import '../postcode.scss';


const MemberComponent = ({modal, modalShowFn, 이용약관 }) => {


  // 주소 팝업 창
  const stylePost = {
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


  const onCompletePost =(data)=>{
    console.log( data );
    console.log( data.address );
    console.log( data.jibunAddress );
    console.log( data.zonecode );

    setField({...field, 주소1: data.roadAddress});   // 검색주소 입력
  }


  //상태관리 State
  const [field, setField] = useState({

      아이디:'',
      isShowId:false,
      isClassId:'',
      아이디중복확인:'',

      비밀번호:'',
      isShowPw:false,
      isClassPw1:'',
      isClassPw2:'',
      isClassPw3:'',

      비밀번호확인:'',
      isShowPwRe:false,
      isClassPwRe:'',

      
      이름:'',

      이메일:'',
      이메일중복확인:'',

      휴대폰:'',
      휴대폰인증:'',
      isShowHp:false,
      isDisabledHp:true,  // 휴대폰 인증버튼 활성화 변수
      minutes:2,
      seconds:59,
      인증번호: '',   // 자동 랜덤 생성 번호
      인증번호확인:'',
      인증번호확인Ok: false, 
      setId: 0,
      isDisabledHpInput:false,
      isDisabledHpBtn:false,
      isClassHp1:false,
      isClassHp2:false,
      isCountShow:true,
      
      주소1:'',
      주소2:'',
      isShowAddress: false,

      성별:'선택안함',
      생년:'',
      생월:'',
      생일:'',

      isShowBirthText:'',     //오류난 항목 내용이 입력되어 표시
      isShowBirthError: false, //오류가 발생시 true 변경되어 표시


      추가입력사항선택:'',     // 추가입력사항 선택: 라디오 버튼 선택
      isShowAddInput:false,   // 추가입력사항 박스 : show,hide 역할
      추가입력사항:'',         // 추가입력사항: 추천인 또는 이벤트명 저장하는 역할

      이용약관동의: [],        // 이용약관 체크박스 선택시 누적보관 배열
      이용약관필수선택: 3      //필수 동의는 체크 3개 선택
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //1. 아이디입력
    const onChangeId =(e)=>{

      // 영문 필수 숫자 선택 공백 안됨 / 영숫자만 입력 6자 이상 = 조건
      const regExp = /^(?=.*[A-Za-z])+(?=.*[0-9])*[^\s][A-Za-z0-9]{6,}$/g;
      let temp = '';  // 클래스 error / success 판단하는 임시 변수

      if(regExp.test(e.target.value)===false){
        temp = false;   // error 클래스 추가
      }
      else{
        temp = true;    // success 클래스 추가
      }

      //공백이 아닌 경우 : 한번에 저장!!!!!
      setField({ ...field, 아이디:e.target.value, isClassId: temp });

    }

    //1-2. 아이디에 포커스: 커서가 위치하면
    const onFocusId =()=>{
      setField({ ...field, isShowId:true});
    }

    //1-3. 아이디 중복확인 버튼 클릭 이벤트
    const onClickIdOk =(e)=>{
      e.preventDefault();
      if(field.아이디===''){
        modalShowFn('아이디를 입력해주세요!');
      }
      else{
        if(field.isClassId===false){ //정규표현식 오류가 있다면
          modalShowFn('아이디는 6자 이상의 영문 혹은 영문과 숫자를 조합하여 입력하세요!');
        }
        else{   //저장된 상태관리 멤버변수와 로컬스토레이지(데이터베이스) 아이디를 비교 중복검색 한다.

          //1. 로컬스토리지 데이터 가져오기
          let temp = [];
          for(let i=0; i<localStorage.length; i++){
            temp.push( JSON.parse(localStorage.getItem(localStorage.key(i))));
          }

          // 전송 버튼(submit) 섭밋 수행 후 중복검색한다. 
          //  result = [false,false,false,true,false,.......]
          let result = temp.map((item)=>item.아이디===field.아이디);
          if( result.includes(true) ) { //중복된 아디디
            modalShowFn('중복된 아이디 입니다.');
          }
          else{
            modalShowFn('사용가능한 아이디 입니다.');
          }

        }
      }
    }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //2. 비밀번호 입력
    const onChangePw =(e)=>{

      const regExp1 = /.{10,}/; 
      const regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
      const regExp3 = /(.)\1\1/; //긍정문:  숫자 연속사용 3개이상 \1\1

      let temp1 = '';  //클래스 error / success 판단하는 임시 변수
      let temp2 = '';
      let temp3 = '';


        // 10자 이상 조건
        if(regExp1.test(e.target.value)===false){
          temp1 = false;
        }
        else {
          temp1 = true;
        }

        // //2번째 조건
        if(regExp2.test(e.target.value)===false){
          temp2 = false;
        }
        else {
          temp2 = true;
        }

        // //3번째 조건
        if(regExp3.test(e.target.value)===true){
          temp3 = false;
        }
        else {
          temp3 = true;
        }

        setField({ ...field, 비밀번호:e.target.value, isClassPw1: temp1, isClassPw2: temp2, isClassPw3: temp3 });

    }

    //2-2.비밀번호에 포커스
    const onFocusPw =()=>{
      setField({ ...field, isShowPw:true});
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //2-3. 비밀번호 확인
    // onChangePwRe
    const onChangePwRe =(e)=>{

      let temp = '';

      if(field.비밀번호 === e.target.value){
        temp = true;
      }
      else{
        temp = false;
      }

      setField({...field, 비밀번호확인: e.target.value, isClassPwRe : temp });

    }


    // onFocusPwRe
    const onFocusPwRe =()=>{
      setField({ ...field, isShowPwRe: true });
    }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //3. 이름확인
  //onChangeName
    const onChangeName =(e)=>{

      const regExp = /[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;

      setField({...field, 이름: e.target.value.replace(regExp, '')});

  }


 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //4. 이메일 확인
    const onChangeEmail =(e)=>{

      const regExp = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

      let temp = '';

        if(regExp.test(e.target.value)){
          temp = true;
        }
        else{
          temp = false;
        }

      setField({...field, 이메일: e.target.value, 이메일중복확인: temp });
    } 

    //4-2. 이메일 확인 버튼 클릭 이벤트 : 모달창 띄우기
    const onClickEmailOk=(e)=>{
      e.preventDefault();
      //모달창 띄우기 함수 호출 실행
      if(field.이메일===''){
        modalShowFn('이메일을 입력하세요!');
      }
      else{

        if(field.이메일중복확인===false){
          modalShowFn('잘못된 이메일 형식입니다.');
        }
        else{
          //1. 로컬스토리지 데이터 가져오기 
          let temp = [];
          for(let i=0; i<localStorage.length; i++){
            temp.push( JSON.parse(localStorage.getItem(localStorage.key(i))) );
          }
          //2. 전송버튼 수행 후 중복검사 진행
          let result = temp.map((item)=>item.이메일===field.이메일);

          if(result.includes(true)){
            modalShowFn('중복된 이메일 입니다.');
          }
          else{
            modalShowFn('사용가능한 이메일 입니다.');
          }
        }
      }   
    }

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // 5-1. 휴대폰
    const onChangeHp =(e)=>{

      const regExp = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/;
      const regExp2 = /[^0-9]/g;

      let temp = '';

      if(regExp.test(e.target.value)){
        temp = true;
      }
      else{
        temp = false;
      }

      setField(
        {
          ...field, 
          휴대폰: e.target.value.replace(regExp2, ''), 
          휴대폰인증: temp , 
          isDisabledHp: !temp 
        }
      );
    }

    // 휴대폰 인증 버튼 클릭 이벤트
    // 마우스 다운 이벤트
    const onMouseDownHp =()=>{
      clearInterval(field.setId);
      setField({ ...field, isShowHp:false });
    }
    //마우스 클릭 이벤트
    const onClickHp =(e)=>{    
      e.preventDefault();
      let num = Math.floor(Math.random()*900000+100000);
      setField({ ...field, isShowHp:true, 인증번호: num.toString() });

      // alert('인증번호가 발송되었습니다.' + num);
      modalShowFn('인증번호가 전송되었습니다.' + num);
    }

    // 카운트함수
    const countTimer=()=>{
      //분,초
      let minutes = 2;
      let seconds = 59;
      let setId = 0;

      // 타이머 설정 setInterval();
      const setTimer=()=>{
        seconds--;
        if(seconds<=0){
          minutes--;
          seconds = 59;
          if(minutes<=0){
            clearInterval(setId);
            seconds=0;
            minutes=0;
          }
        }
        
        setField({ ...field, seconds: seconds, minutes: minutes, setId: setId, });
      }
      setId = setInterval(setTimer, 1000);
    }

      // 훅 = useEffect() 사용해서 
      useEffect(()=>{
        if(field.isShowHp){
          countTimer();

        }
      },[field.isShowHp]);


      // 휴대폰 인증번호 확인 입력상자 
      const onChangeHpNum =(e)=>{
        clearInterval(field.setId);
        setField({ ...field, 인증번호확인: e.target.value });
      }

      // 인증번호 확인 버튼 클릭 이벤트
      const onClickHpConfirm =(e)=>{
        e.preventDefault();
        //비교 인증번호 === 실제 입력한 인증번호
        if(field.인증번호===field.인증번호확인){
          modalShowFn('인증이 확인되었습니다.');

          setField(
            {
              ...field, 
              isDisabledHpInput:true, 
              isDisabledHpBtn:true, 
              isClassHp1:true, 
              isClassHp2:true, 
              인증번호확인:'', 
              isCountShow:false,
              인증번호확인Ok: true
            }
          );
        }
        else{
          modalShowFn('잘못된 인증번호 입니다.');
        }

        
      }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // 주소 버튼 클릭 이벤트
      const onClickAddress=(e)=>{
        e.preventDefault();
        //주소 입력 상자 보이게 isShowAddress = true 변경
        setField({...field, isShowAddress: true });
      }

      // 주소 입력상자 1
      const onChangeAddress1 =(e)=>{
        
        setField({...field, 주소1: e.target.value });
      }

      // 주소 입력상자 2
      const onChangeAddress2 =(e)=>{

        setField({...field, 주소2: e.target.value });
      }

  ///////////////////////////////////////////////////////////////////////////////////////////
  
       // 성별 라디오버튼
      const onChangeGender=(e)=>{
      setField({...field, 성별: e.target.value }); 
      }

  /////////////////////////////////////////////////////////////////////////////////////
      // 생년월일: 입력시 숫자만 입력 패턴
      const onChangeYear=(e)=>{
        const regExp = /[^0-9]/g;
        let temp = e.target.value.trim().replace(regExp,'');
        setField({...field, 생년: temp }); 
      }
      const onChangeMonth=(e)=>{
        const regExp = /[^0-9]/g;
        let temp = e.target.value.trim().replace(regExp,'');
        setField({...field, 생월: temp }); 
      }
      const onChangeDate=(e)=>{
        const regExp = /[^0-9]/g;
        let temp = e.target.value.trim().replace(regExp,'');
        setField({...field, 생일: temp  }); 
      }
    
      // 생년월일 공통 사용하는 함수
      // 년도, 월, 일 규칙 패턴
      // 키보드 포커스 인, 포커스 아웃 이벤트 발생시 호출하는 함수
      const birthDayCheck=()=>{
        //비구조화
        const {생년, 생월, 생일} = field;
        const regExpYear  = /^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/;  //년도 1900~2999
        const regExpMonth = /^(?:0?[1-9]|1[0-2])$/g; //월 1~12
        const regExpDate  = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g; //일 1~31(1-9 | 20~29 | 30~31 )
        //현재 년월일 날짜 데이터
        const nowYear = new Date().getFullYear(); //년 4자리
        const nowMonth = new Date().getMonth()+1; //월 0~11
        const nowDate = new Date().getDate(); //일
        const today = new Date( nowYear, nowMonth, nowDate ); //오늘 년월일
    
    
        if(생년==='' && 생월==='' && 생일==='' ){ //세칸 모두 비어 있으면 리턴
          return;
        }
        else{
          //생년이 정상이면
          if( regExpYear.test(생년)===false ){ //가이드텍스트 보이기(show())
            setField({
                ...field, 
                isShowBirthError: true, 
                isShowBirthText:'태어난 년도 4자리를 정확하게 입력해주세요.'
            });
            return;
          }
          else{ // 생년이 정상이면 멤버변수 초기화 & 생월 체크
              setField({
                  ...field, 
                  isShowBirthError: false, 
                  isShowBirthText:''
              });
    
              //생월 체크 
              if( regExpMonth.test(생월)===false ){ //생월 오류
                setField({
                    ...field, 
                    isShowBirthError: true, 
                    isShowBirthText:'태어난 월을 정확하게 입력해주세요.'
                });
                return;
              }
              else{ //생월 정상
                setField({
                    ...field, 
                    isShowBirthError: false, 
                    isShowBirthText:''
                });
    
                //생일 체크
                if(regExpDate.test(생일)===false){ //생일 오류
                  setField({
                      ...field, 
                      isShowBirthError: true, 
                      isShowBirthText:'태어난 일을 정확하게 입력해주세요.'
                  });
                  return;
                }
                else{ //생일 정상
                  setField({
                      ...field, 
                      isShowBirthError: false, 
                      isShowBirthText:''
                  });
                }
                //생년, 생월, 생일 모두 완료
                // 입력 불가 조건 (안되는 조건)
                // 추가 조건:  14이상, 120세초과, 미래
    
                const birthDay  = new Date(생년, 생월, 생일);  // 태어난 년월일
                const nowYear120 = new Date(nowYear-120, nowMonth, nowDate);  //120세 초과 변수
                const nowYear14 = new Date(nowYear-14, nowMonth, nowDate);  //14세 미만 변수
    
                //1.   미래
                //미래: 오늘 보다 더큰 날짜 는  미래
                if( birthDay > today ){
                  setField({
                      ...field, 
                      isShowBirthError: true, 
                      isShowBirthText:'미래를 입력했어오! 생년월일을 정확하게 입력해주세요.'
                  });
                  return;
                }
                else{
                  setField({
                      ...field, 
                      isShowBirthError: false, 
                      isShowBirthText:''
                  });
                }
    
                //2. 14미만
                if( birthDay > nowYear14 ){
                    setField({
                        ...field, 
                        isShowBirthError: true, 
                        isShowBirthText:'만 14세 미만은 가입이 불가 합니다.'
                    });
                    return;
                }
                else{
                  setField({
                      ...field, 
                      isShowBirthError: false, 
                      isShowBirthText:''
                  });
                }    
    
                //3. 120초과
                if( birthDay < nowYear120 ){  //120세 초과 나이 120살 넘는 분들
                  setField({
                      ...field, 
                      isShowBirthError: true, 
                      isShowBirthText:' 120세 초과된 생년월일 입니다. 생년월일을 다시한번 확인해주세요.'
                  });
                  return;
                }
                else{
                  setField({
                      ...field, 
                      isShowBirthError: false, 
                      isShowBirthText:''
                  });
                }
    
              }
    
          }
    
        }
    
      }
    
      // 생년월일  포커스 아웃시 생년월일 체크함수 호출 실행
      const onBlurBirth=()=>{
        birthDayCheck();  //생년월일 체크함수
      }

  ////////////////////////////////////////////////////////////////////////////////////////
      // 추가입력사항
      // 추천인 / 이벤트
      const onChangeRadio =(e)=>{
        setField({...field, isShowAddInput:true, 추가입력사항선택:e.target.value }); // 버튼 누르면 아래 입력상자 show
      }

      // 추가입력상자
      const onChangeInput =(e)=>{
        setField({...field, 추가입력사항: e.target.value});
      }


  /////////////////////////////////////////////////////////////////////////////////////////////////
    // 약관동의
    //1. 전체동의합니다.
    const onChangeServiceAll =(e)=>{
      //체크되면
      if(e.target.checked===true){
        setField({...field, 이용약관동의: 이용약관});  // 프롭스 이용약관 전체 저장
      }
      else{ 
        setField({...field, 이용약관동의: [] });  // 배열초기화 삭제
      }
    }    

    //2. 체크박스 각 항목 체크시 멤버 변수 이용약관동의:[] 배열에 저장하기
    const onChangeService =(e)=>{
      let temp = [];

      if(e.target.checked){    //체크되면 누적 저장

        if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
          setField({ ...field, 이용약관동의: [...field.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)','SMS','이메일'] });
        }
        else if(field.이용약관동의.includes('SMS') && e.target.value==='이메일'){
          setField({ ...field, 이용약관동의: [...field.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)','이메일'] });
        }
        else if(field.이용약관동의.includes('이메일') && e.target.value==='SMS'){
          setField({ ...field, 이용약관동의: [...field.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)','SMS'] });
        }
        else{
          setField({...field, 이용약관동의: [...field.이용약관동의, e.target.value] });
        }
      }
      else{  // 체크해제시는 배열에 저장된 데이터를 삭제: 체크해제된 데이터만 filter()
        if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
          temp = field.이용약관동의.filter((item)=> item !== e.target.value );
          temp = temp.filter((item)=> item !== 'SMS');
          temp = temp.filter((item)=> item !== '이메일');
          setField({...field, 이용약관동의: temp });
        }
        else if( field.이용약관동의.includes('SMS') && e.target.value==='이메일' ){
          temp = field.이용약관동의.filter((item)=> item !== '이메일'); 
          temp = temp.filter((item)=> item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'); 
          setField({...field, 이용약관동의: temp });
        } 
        else if( field.이용약관동의.includes('이메일') && e.target.value==='SMS' ){
          temp = field.이용약관동의.filter((item)=> item !== 'SMS'); 
          temp = temp.filter((item)=> item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'); 
          setField({...field, 이용약관동의: temp });
        } 
        else{      
          temp = field.이용약관동의.filter((item)=>item !== e.target.value ); 
          setField({...field, 이용약관동의: temp });
        }
      }
    }


      // 썹밋(onSubmit={}) 전송 : 전송버튼 클릭 시 동작
      // 0. 유효성 검증
      // 1. 로컬스토레이지에 저장(전송)
      // 2. 닷홈 비동기 전송방식 : AXIOS 전송 => 서버(PHP, MYSQL)와 정보 송수신(CRUD)하기 위해 사용 

    const onSubmitMember=(e)=>{
       e.preventDefault();

      // 빈칸은 안된다.(필수입력사항) -> 훅 (스테이트 멤버변수)     
      const {아이디,비밀번호,비밀번호확인,이름,이메일,휴대폰,주소1,주소2,성별,생년,생월,생일,추가입력사항선택,추가입력사항,이용약관동의,아이디중복확인,이메일중복확인,인증번호확인Ok} = field;

      if(아이디==='' || 비밀번호==='' || 비밀번호확인==='' || 이름==='' ||  이메일==='' ||  휴대폰==='' ||  주소1==='' ||  주소2==='' || 이용약관동의.length < 3 ||  아이디중복확인===false ||  이메일중복확인===false ||  인증번호확인Ok===false ){
        if(아이디===''){
          modalShowFn('아이디를 입력해주세요.');
        }
        else if(비밀번호===''){
          modalShowFn('비밀번호를 입력해주세요.');
        }
        else if(비밀번호확인===''){
          modalShowFn('비밀번호확인을 입력해주세요.');
        }
        else if(이름===''){
          modalShowFn('이름을 입력해주세요.');
        }
        else if(이메일===''){
          modalShowFn('이메일을 입력해주세요.');
        }
        else if(휴대폰===''){
          modalShowFn('휴대폰을 입력해주세요.');
        }
        else if(주소1===''){
          modalShowFn('주소를 검색해주세요.');
        }
        else if(주소2===''){
          modalShowFn('상세주소를 입력해주세요.');
        }
        else if(이용약관동의.length < 3){
          modalShowFn('이용약관동의 필수 선택을 체크해주세요.');
        }
        else if(아이디중복확인===false){
          modalShowFn('아이디 중복확인해주세요.');
        }
        else if(이메일중복확인===false){
          modalShowFn('이메일 중복확인해주세요.');
        }
        else if(인증번호확인Ok===false){
          modalShowFn('휴대폰 인증번호 다시 확인해주세요.');
        }
        return;
      }
      else {

        let cnt = 0;
        이용약관동의.map((item)=>{
          if(item.includes('필수')){
            cnt++;
          }
        });

        if(cnt<3){
          modalShowFn('이용약관동의 필수 선택을 체크 ( ${cnt} ) 해주세요.');
          return;
        }
        else{
            // 전송할 데이터를 임시 배열에 저장하고, 
            // 그리고 로컬스토레이지에 임시 배열을 한꺼번에 저장한다.
            let temp = {
              아이디: 아이디,
              비밀번호: 비밀번호,
              이름: 이름,
              이메일: 이메일,
              휴대폰: 휴대폰,
              주소: `${주소1} ${주소2}`,
              성별: 성별,
              생년월일: `${생년}-${생월}-${생일}`,
              추가입력사항: `${추가입력사항선택}: ${추가입력사항}`,
              이용약관동의: 이용약관동의
            };

            //로컬스토레이지는 데이터저장시 객체 저장할 수 없다. 그래서 문자열로 변환(JSON.stringify()) 저장한다.
            localStorage.setItem(temp.아이디,  JSON.stringify(temp) ); 

            //저장완료
            modalShowFn('마켓컬리 회원가입을 진심으로 감사드립니다.');

            //저장완료후 내용 초기화
            setField({
              ...field,
              아이디:'',
              isShowId:false,
              isClassId:'',
              아이디중복확인:'',
        
              비밀번호:'',
              isShowPw:false,
              isClassPw1:'',
              isClassPw2:'',
              isClassPw3:'',
        
              비밀번호확인:'',
              isShowPwRe:false,
              isClassPwRe:'',
        
              
              이름:'',
        
              이메일:'',
              이메일중복확인:'',
        
              휴대폰:'',
              휴대폰인증:'',
              isShowHp:false,
              isDisabledHp:true,  // 휴대폰 인증버튼 활성화 변수
              minutes:2,
              seconds:59,
              인증번호: '',   // 자동 랜덤 생성 번호
              인증번호확인:'',
              인증번호확인Ok: false, 
              setId: 0,
              isDisabledHpInput:false,
              isDisabledHpBtn:false,
              isClassHp1:false,
              isClassHp2:false,
              isCountShow:true,
              
              주소1:'',
              주소2:'',
              isShowAddress: false,
        
              성별:'선택안함',
              생년:'',
              생월:'',
              생일:'',
        
              isShowBirthText:'',     //오류난 항목 내용이 입력되어 표시
              isShowBirthError: false, //오류가 발생시 true 변경되어 표시
        
        
              추가입력사항선택:'',     // 추가입력사항 선택: 라디오 버튼 선택
              isShowAddInput:false,   // 추가입력사항 박스 : show,hide 역할
              추가입력사항:'',         // 추가입력사항: 추천인 또는 이벤트명 저장하는 역할
        
              이용약관동의: [], 
            });

          }
      }

    }

    
    return (
    <section id="member">
        <div className="quick-menu">
          <div className="top">
            <a href="#!"><img src="./images/bnr_quick_20190403.png" alt=""/></a>
          </div>
          <div className="bottom">
            <a href="#!" title="등급별 혜택">등급별 혜택</a>
            <a href="#!" title="레시피">레시피</a>
            <a href="#!" title="베스트 후기">베스트 후기</a>
          </div>
        </div>
        <div className="container">
          <div className="wrap">
              {/* <!-- 타이틀 --> */}
              <div className="title">
                  <h2>회원가입</h2>
              </div>

              {/* <!-- 전송할 회원가입폼 --> */}
              <div className="content">
                <form onSubmit={onSubmitMember} id="member" name="member" method="post" action="response.php">
                  <ul id="memberForm">
                    <li>
                      <h3><i>*</i><span>필수입력사항</span></h3>
                    </li>
                    <li>
                      <div className="left">
                        <label><span>아이디</span><i>*</i></label>
                      </div>
                      <div className="right">
                        <input
                         type="text" 
                         id="inputId"
                          name="inputId" 
                          placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합" 
                          maxLength="20"
                          onChange={onChangeId}
                          onFocus={onFocusId}
                          value={field.아이디}
                          />
                        <button onClick={onClickIdOk} className="id-double-btn">중복확인</button>
                        {
                          field.isShowId && (
                            <div className="guide-text guide-id">
                              <p className={field.isClassId ==='' ? '' : ( field.isClassId ===false ? 'error':'success')}>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                              <p>아이디 중복확인</p>
                            </div>
                          )
                        }
                      </div>
                    </li>
                    <li>
                      <div className="left">
                        <label><span>비밀번호</span><i>*</i></label>
                      </div>
                      <div className="right">
                        <input
                         type="password"
                         id="inputPw"
                         name="inputPw" 
                         placeholder="비밀번호를 입력해주세요" 
                         maxLength="20"
                         onChange={onChangePw}
                         onFocus={onFocusPw}
                         value={field.비밀번호}
                          />
                        {
                          field.isShowPw && (
                            <div className="guide-text guide-pw">
                              <p className={field.isClassPw1 === '' ? '' :(field.isClassPw1=== false ? 'error':'success')}>10자 이상 입력</p>
                              <p className={field.isClassPw2 === '' ? '' :(field.isClassPw2=== false ? 'error':'success')}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                              <p className={field.isClassPw3 === '' ? '' :(field.isClassPw3=== false ? 'error':'success')}>동일한 숫자 3개 이상 연속 사용 불가</p>
                            </div>
                          )
                        }
                      </div>
                    </li>
                    <li>
                      <div className="left">
                        <label><span>비밀번호확인</span><i>*</i></label>
                      </div>
                      <div className="right">
                        <input 
                        type="password" 
                        id="inputPwConfirm" 
                        name="inputPwConfirm" 
                        placeholder="비밀번호를 한번 더 입력해주세요" 
                        maxLength="20" 
                        onChange={onChangePwRe}
                        onFocus={onFocusPwRe}
                        value={field.비밀번호확인}
                        />
                        {
                          field.isShowPwRe && (
                            <div className="guide-text guide-password-confirm">
                              <p className={field.isClassPwRe === '' ? '' :(field.isClassPwRe=== false ? 'error':'success')}>동일한 비밀번호를 입력해주세요.</p>
                            </div> 
                          )
                        }                   
                      </div>
                    </li>
                    <li>
                      <div className="left">
                        <label><span>이름</span><i>*</i></label>
                      </div>
                      <div className="right">
                        <input 
                        type="text" 
                        id="inputName" 
                        name="inputName" 
                        placeholder="이름을 입력해주세요"
                        maxLength="30" 
                        onChange={onChangeName}
                        value={field.이름}
                        />
                      </div>
                    </li>
                    <li>
                      <div className="left">
                        <label><span>이메일</span><i>*</i></label>
                      </div>
                      <div className="right">
                        <input 
                        type="email" 
                        id="inputEmail" 
                        className="" 
                        name="inputEmail" 
                        placeholder="예: marketkurly@kurly.com" 
                        maxLength="50" 
                        onChange={onChangeEmail}
                        value={field.이메일}
                        />
                        <button onClick={onClickEmailOk} className="email-double-btn">중복확인</button>
                      </div>
                    </li>
                    <li>
                      <div className="left">
                        <label><span>휴대폰</span><i>*</i></label>
                      </div>
                      <div className="right">
                        <input 
                        type="text" 
                        id="inputPhone" 
                        name="inputPhone" 
                        placeholder="숫자만 입력해주세요" 
                        maxLength="11" 
                        onChange={onChangeHp}
                        value={field.휴대폰}
                        />
                        {/* 기본값은 버튼 사용 못하게 함 */}
                        <button onMouseDown={onMouseDownHp} onClick={onClickHp} disabled={field.isDisabledHp} className={field.isDisabledHp?"phone-btn":"phone-btn on"}>인증번호 받기</button>

                        {
                          field.isShowHp && (
                          <>
                            <input 
                            type="text" 
                            id="inputPhoneok" 
                            className={field.isClassHp1?'ok':''}
                            name="inputPhoneok" 
                            placeholder="인증번호를 입력해주세요" 
                            maxLength="6" 
                            onChange={onChangeHpNum}
                            value={field.인증번호확인}
                            disabled={field.isDisabledHpInput}
                            />
                            <button onClick={onClickHpConfirm} disabled={field.isDisabledHpBtn} className={field.isClassHp2?"phone-btn phone-ok-btn ok":"phone-btn phone-ok-btn"}>인증번호 확인</button>
                            {
                              field.isCountShow && (
                                <span className="count-timer">{field.minutes}:{field.seconds<10?`0${field.seconds}`:field.seconds}</span>     
                              )
                            }                          
                            <div className="guide-text guide-phone-confirm">
                              <p>인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (마켓컬리 1644-1107)</p>
                            </div> 
                          </>
                          )                        
                        }
                      </div>
                    </li>
                    <li className="address">
                      <div className="left">
                        <label><span>주소</span><i>*</i></label>
                      </div>
                      <div className="right">
                        {
                          field.isShowAddress && (
                            <>
                              <input onChange={onChangeAddress1} value={field.주소1} type="text" id="inputAddress1" name="inputAddress1" placeholder="검색주소" />
                              <input onChange={onChangeAddress2} value={field.주소2} type="text" id="inputAddress2" name="inputAddress2" placeholder="나머지 주소를 입력해주세요" />
                            </>
                           )
                        }      
                        <button onClick={onClickAddress} id="addressBtn" className="address-btn" title="주소검색"><span><img src="./images/ico_search.svg" alt="" /><i className="address-text">주소검색</i></span></button>
                        <div className="guide-text guide-transfer on">
                          {/* <h4 className="on"></h4> */}
                        </div>
                        <p className="address-guidetext">배송지에 따라 상품 정보가 달라질 수 있습니다.</p>

                        {/* 주소검색 카카오 패키지 컴포넌트 API */}
                        <div id= 'postcode' >
                          {
                            field.isShowAddress && (
                              <div>
                                <DaumPostcode
                                 style={stylePost} 
                                 onComplete={onCompletePost}
                                autoClose/>
                                </div>
                            )
                          }
                        </div>

                      </div>
                    </li>

                    <li>
                      <div className="left">
                        <label><span>성별</span></label>
                      </div>
                      <div className="right gender">
                        <label htmlFor="male">
                          <input onChange={onChangeGender} checked={field.성별.includes('남자')} type="radio" id="male" name="gendeer" value="남자" />
                          <span>남자</span>
                        </label>                    
                        <label htmlFor="female">
                          <input onChange={onChangeGender} checked={field.성별.includes('여자')} type="radio" id="female" name="gendeer" value="여자" />
                          <span>여자</span>
                        </label>                    
                        <label htmlFor="none">
                          <input onChange={onChangeGender} checked={field.성별.includes('선택안함')} type="radio" id="none" name="gendeer" value="선택안함" />
                          <span>선택안함</span>
                        </label>                    
                      </div>
                    </li>

                    <li>
                      <div className="left">
                        <label><span>생년월일</span></label>
                      </div>
                      <div className="right">
                        <div className="date-box">
                          <ul>
                            <li>
                              <input 
                              type="text" 
                              onChange={onChangeYear} 
                              onBlur={onBlurBirth} 
                              value={field.생년} 
                              id="year" 
                              name="year" 
                              placeholder="YYYY" 
                              maxLength="4" 
                              />
                            </li>
                            <li><span>/</span></li>
                            <li>
                              <input 
                              type="text" 
                              onChange={onChangeMonth} 
                              onBlur={onBlurBirth} 
                              onFocus={onBlurBirth} 
                              value={field.생월} 
                              id="month" 
                              name="month"  
                              placeholder="MM"
                              maxLength='2' 
                              />
                            </li>
                            <li><span>/</span></li>
                            <li>
                              <input 
                              type="text" 
                              onChange={onChangeDate} 
                              onBlur={onBlurBirth}
                              onFocus={onBlurBirth} 
                              value={field.생일} 
                              id="date" 
                              name="date"  
                              placeholder="DD" 
                              maxLength='2' 
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="guide-text guide-birthday-confirm">
                          {/* <!-- 3가지 가이드 내용을 매개변수로 하여 p태그 하나만 사용 --> */}
                          {
                          field.isShowBirthError && (
                            <p className="error">{field.isShowBirthText}</p>
                          )
                        }
                        </div>  
                      </div>
                    </li>

                    <li className="add-item">
                      <div className="left">
                        <label><span>추가입력 사항</span></label>
                      </div>
                      <div className="right gender add">
                        <label htmlFor="add1">
                          <input onChange={onChangeRadio} checked={field.추가입력사항선택.includes('추천인 아이디')} type="radio" id="add1" className="add-radio" name="add" value="추천인 아이디" />
                          <span>추천인 아이디</span>

                        </label>                    
                        <label htmlFor="add2">
                          <input onChange={onChangeRadio} checked={field.추가입력사항선택.includes('참여 이벤트')} type="radio" id="add2" className="add-radio" name="add" value="참여 이벤트" />
                          <span>참여 이벤트</span>
                        </label> 
                        {
                          field.isShowAddInput && (
                            <div className="add-input-box">
                              <input onChange={onChangeInput} type="text" id="inputAdd" name="inputAdd" placeholder="추천인 아이디를 입력해주세요." value={field.추가입력사항} />
                                <p>추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br />
                                  가입 이후, 수정이 불가합니다.<br />
                                  대소문자 및 띄어쓰기에 유의해주세요.
                                </p>
                            </div>
                          )
                        } 
                      </div>
                    </li>

                    <li>
                      <hr />
                    </li>

                        {/* <!-- 약관동의 : 체크박스 --> */}
                    <li className="check-box">
                      <div className="left">
                        <label><span>이용약관동의<i>*</i></span></label>
                      </div>
                      <div className="right service">

                        <ol>
                          <li>
                            <label htmlFor="chkAll">
                              <input onChange={onChangeServiceAll} checked={field.이용약관동의.length>=7?true:false} type="checkbox" id="chkAll" name="chkAll"  value="전체동의합니다." />
                              <span>전체동의합니다.</span>
                            </label>
                            <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                          </li>
                          <li className="view-box">
                            <label htmlFor="chk1">
                              <input onChange={onChangeService} checked={field.이용약관동의.includes('이용약관동의(필수)')} type="checkbox" id="chk1" name="chk1" className="chkbox-btn" value="이용약관동의(필수)" />
                              <span>이용약관동의<i>(필수)</i></span>
                            </label>
                            <span  className="view-btn-box">
                              <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                            </span>
                          </li>
                          <li className="view-box">
                            <label htmlFor="chk2">
                              <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보 수집·이용(필수)')} type="checkbox" id="chk2" name="chk2" className="chkbox-btn" value="개인정보 수집·이용(필수)" />
                              <span>개인정보 수집·이용<i>(필수)</i></span>
                            </label>
                            <span  className="view-btn-box">
                              <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                            </span>
                          </li>
                          <li className="view-box">
                            <label htmlFor="chk3">
                              <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보 수집·이용(선택)')} type="checkbox" id="chk3" name="chk3" className="chkbox-btn" value="개인정보 수집·이용(선택)" />
                              <span>개인정보 수집·이용<i>(선택)</i></span>
                            </label>
                            <span  className="view-btn-box">
                              <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                            </span>
                          </li>
                          <li>
                            <label htmlFor="chk4">
                              <input onChange={onChangeService} checked={field.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')} type="checkbox" id="chk4" name="chk4" className="chkbox-btn" value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)" />
                              <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의<i>(선택)</i></span>
                            </label>
                            <dl>
                                <dd>
                                  <label htmlFor="chk5">
                                    <input type="checkbox" onChange={onChangeService} checked={field.이용약관동의.includes('SMS')} id="chk5" name="chk5" className="chkbox-btn" value="SMS" />
                                    <span>SMS</span>
                                  </label>
                                  <label htmlFor="chk6">
                                    <input type="checkbox" onChange={onChangeService} checked={field.이용약관동의.includes('이메일')} id="chk6" name="chk6" className="chkbox-btn" value="이메일" />
                                    <span>이메일</span>
                                  </label>
                                </dd>
                                <dt>
                                    <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                </dt>
                            </dl>
                          </li>
                          <li>
                            <label htmlFor="chk7">
                              <input onChange={onChangeService} checked={field.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')} type="checkbox" id="chk7" name="chk7" className="chkbox-btn" value="본인은 만 14세 이상입니다.(필수)" />
                              <span>본인은 만 14세 이상입니다.<i>(필수)</i></span>
                            </label>
                          </li>
                        </ol>                  
                      </div>              
                    </li>
                    <li className="bottom-line">
                      <hr />
                    </li>                
                    <li className="button-box">
                      {/* <!-- submit 섭밋(서브밋) : 폼전송을 해주는 기능 엔터치면 --> */}
                      {/* <!-- <button type="submit" className="submit-btn">가입하기</button> --> */}
                      <button type="submit" className="submit-btn">가입하기</button>
                    </li>
                  </ul>
                </form>
              </div>
          </div>
        </div>
    </section>
    );
};

MemberComponent.defaultProps = {
  성별: ['남자','여자','선택안함'],
  추가입력사항: ['추천인아이디','참여이벤트'],
  이용약관: [
    '이용약관동의(필수)',
    '개인정보 수집·이용(필수)',
    '개인정보 수집·이용(선택)',
    '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
    'SMS',
    '이메일',
    '본인은 만 14세 이상입니다.(필수)'
  ]
}

export default MemberComponent;
(function($){

  var chkboxBtn = $('.chkbox-btn');
  // 아래 전송 버튼 누를 때 오류난 정보 true false 로 판별하기 위한 변수 설정
  var idOk = false;
  var pw1Ok = false;
  var pw2Ok = false;
  var pw3Ok = false;
  var pwConfirm = false;
  var emailOk = false;

  var ok = false;  // 인증 확인되면 true로 (휴대폰인증)



 // 스크롤시 메인메뉴바 상단고정
  var menuOffset = $('.main-menu').offset();


  $(window).scroll(function(){
    if($(document).scrollTop() > menuOffset.top ){
      $('.main-menu').addClass('on');
    }
    else {
      $('.main-menu').removeClass('on');
    }
  });

  // 퀵메뉴 스크롤
  $(window).scroll(function(){
    var scrollTop = $(document).scrollTop();
    if (scrollTop < 200) {
     scrollTop = 200;
    }
    else{
      $(".quick-menu").stop();
      $(".quick-menu").animate( { "top" : scrollTop });
    }

   });





//==============================================================================================================================
    // 1. 아이디 입력상자
    // 마우스가 입력상자에 클릭 다운되면 
    // 가이드 텍스 보이기(show())
    $('#inputId').on({
      mousedown: function(){
        $('.guide-id').show();
      }
    });

    //키보드가 내려가서 올라올때(keyup) 점검
    $('#inputId').on({
        keyup: function(event){
            event.preventDefault();
            var regExp = /^(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]{6,}$/g;
            var idValue = $(this).val().toString();

            $('#inputId').val( idValue.replace(/[^A-Za-z0-9\s]/g, '') ); //숫자 아닌것 삭제

                if(idValue===''){ //입력값이 없으면 : 글자가 검정 기본값으로 설정
                  $('.guide-id p').removeClass('error');
                  $('.guide-id p').removeClass('success');
                  idOk=false;
                }
                else{ //입력값이 있으면 정규 표현식 비교 진위여부
                  if( regExp.test(idValue)===true ) {
                    $('.guide-id p').eq(0).removeClass('error');
                    $('.guide-id p').eq(0).addClass('success');
                    idOk=true;
                  }
                  else if( regExp.test(idValue)===false ) {
                    $('.guide-id p').eq(0).removeClass('success'); //클래스가 삭제되어야 에러가 표시
                    $('.guide-id p').eq(0).addClass('error')
                    idOk=false;
                  }
                }

        }
    });

    // 아이디 중복 체크 함수 
    function idDoubleCheck(){

      //아이디 중복 체크한다.

      // 1. 아이디 입력값
      // 2. 로컬스토리지에 저장된 데이터 (데이터베이스)가져오기
      // 3. 가져온 데이터를 아이디만 추출하기
      // 4. 반복 비교하기 
      // $('#inputId').val() === 로컬스토리지.아이디  
      //  만약 같다면 '이미 등록된 아이디 입니다' 라고 창 뜨기  빨간색 error 
      //  만약 다르다면 '사용 가능한 아이디 입니다' 이후 초록색 success

      // 1. 
       var inputId = $('#inputId').val();
       console.log('입력된 아이디', inputId);
       var ok = false; // 중복확인 번수(초기값이 false)
    //  2.
       for(i=0; i<localStorage.length; i++){
      // console.log(localStorage.key(i));
      // console.log(localStorage.getItem(localStorage.key(i)));
      // console.log( JSON.parse(localStorage.getItem(localStorage.key(i))).아이디 );  // 가져온 데이터를 객체로 변환
        if(JSON.parse(localStorage.getItem(localStorage.key(i))).아이디===inputId){
          ok = true;  //중복이다
        } 
      }
      //반복비교를 가지고 결과를 가지고 비교한다.
      if(ok===true){
        idOk=false;
        modal('이미 등록된 아이디 입니다.');
        $('.guide-id p').eq(1).removeClass('success');
        $('.guide-id p').eq(1).addClass('error');
      }
      else{
        idOk=true;
        modal('사용 가능한 아이디 입니다.');
        $('.guide-id p').eq(1).removeClass('error');
        $('.guide-id p').eq(1).addClass('success');
      }

    }



    //아이디 버튼 클릭 이벤트
    $('.id-double-btn').on({
      click: function(e){
        e.preventDefault();

        var regExp = /^(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]{6,}$/g;
        var idValue = $('#inputId').val().toString();

            if(idValue===''){ //입력값이 없으면 : 글자가 검정 기본값으로 설정
                $('.guide-id p').eq(0).removeClass('error');
                $('.guide-id p').eq(0).removeClass('success');
                modal('아이디를 입력해주세요.'); //모달창 띄우기
                idOk=false;
                return;
            }
            else{ //입력값이 있으면 정규 표현식 비교 진위여부
                if( regExp.test(idValue)===true ) {
                  $('.guide-id p').eq(0).addClass('success');
                  $('.guide-id p').eq(0).removeClass('error');
                  modal('사용 가능한 아이디 입니다.');
                  

                  // 중복체크 (위에 변수 있음: 너무 쓸게 많으니까 함수 호출만)
                  idDoubleCheck();

                }
                else if( regExp.test(idValue)===false ) {
                  $('.guide-id p').eq(0).removeClass('success');
                  $('.guide-id p').eq(0).addClass('error');
                  modal('6자 이상의 영문 혹은 영문과 숫자를 조합만 가능합니다.'); //모달창 띄우기
                  return;
                }
            }

      }
    });

// 비밀번호 ================================================================================================================================
    //가이드 텍스트 보이기: 마우스 다운하면
    $('#inputPw').on({
        mousedown: function(){
          $('.guide-pw').show();
        }
    });

    // 3. 동일한 숫자 3개이상 연속 사용 불가
    $('#inputPw').on({
        keyup: function(e){
          e.preventDefault();
          var regExp1 = /.{10,}/; 
          var regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
          var regExp3 = /(.)\1\1/; //긍정문:  숫자 연속사용 3개이상 \1\1
          var pwValue = $(this).val().toString();


              //1. 10자이상 
              if(pwValue===''){
                $('.guide-pw p').eq(0).removeClass('error');
                $('.guide-pw p').eq(0).removeClass('success');
                pw1Ok = false; 
              }
              else{
                if(regExp1.test(pwValue)){
                  $('.guide-pw p').eq(0).removeClass('error');
                  $('.guide-pw p').eq(0).addClass('success');
                  pw1Ok = true;                  
                }
                else{
                  $('.guide-pw p').eq(0).addClass('error');
                  $('.guide-pw p').eq(0).removeClass('success');
                  pw1Ok = false; 
                }
              }

              //2. 영문필수+(숫자또는특수문자)+ => 2가지 이상 조함
              if(pwValue===''){
                $('.guide-pw p').eq(1).removeClass('error');
                $('.guide-pw p').eq(1).removeClass('success');
                pw2Ok = false;
              }
              else{
                if(regExp2.test(pwValue)){
                  $('.guide-pw p').eq(1).removeClass('error');
                  $('.guide-pw p').eq(1).addClass('success');
                  pw2Ok = true;
                }
                else{
                  $('.guide-pw p').eq(1).addClass('error');
                  $('.guide-pw p').eq(1).removeClass('success');
                  pw2Ok = false;
                }
              }
              

              //3. 숫자 3개이상 연속 사용 금지(동일한 숫자 3개 연소 사용 불가)
              if(pwValue===''){
                $('.guide-pw p').eq(2).removeClass('error');
                $('.guide-pw p').eq(2).removeClass('success');
                pw3Ok = false;
              }
              else{
                if(regExp3.test(pwValue)){ // 숫자가 연속 3개이상 사용했다면
                  $('.guide-pw p').eq(2).addClass('error');
                  $('.guide-pw p').eq(2).removeClass('success');
                  pw3Ok = false;
                }
                else{
                  $('.guide-pw p').eq(2).removeClass('error');
                  $('.guide-pw p').eq(2).addClass('success');
                  pw3Ok = true;
                }
              }

        }
    });
//==================================================================================================================
// 비밀번호 확인 
$('#inputPwConfirm').on({
  mousedown: function(){
    $('.guide-password-confirm').show();
  }
});


$('#inputPwConfirm').on({
  keyup: function(e){
    e.preventDefault();


    //변수로 설정한 경우
    var pwConfirmValue = $(this).val();


    if(pwConfirmValue===''){
      $('.guide-password-confirm p').removeClass('error');
      $('.guide-password-confirm p').removeClass('success');
      pwConfirm=false;
    }
    else{
      if(pwConfirmValue===$('#inputPw').val()){
        $('.guide-password-confirm p').removeClass('error');
        $('.guide-password-confirm p').addClass('success');
        pwConfirm=true;
      }
      else{
        $('.guide-password-confirm p').addClass('error');
        $('.guide-password-confirm p').removeClass('success');
        pwConfirm=false;
      }
    }
  }
});


//====================================================================================================================
//이름 입력값 제한
$('#inputName').on({
  keyup: function(){

    //영문,한글,공백만 허용하고 나머지는 모두 삭제
    $(this).val( $(this).val().toString().replace(/[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '') );
  }
});
//=====================================================================================================================
    //이메일
    //입력이 완료되면
    //우측 중복확인 버튼을 클릭하여 
    //입력정보데이터를 정규표현식으로 진위여부를 판단하고
    //입력 데이터 오류가 있으면 알림창을 모달창으로 띄운다.

    //그리고 오류가 없으면(로컬스토레이지에 저장데이터 구현한 후 작업)
    //저장된 데이터 전체와 입력데이터를 비교하여 중복확인한다.   


    //이메일 중복 체크 함수
    function emailDoubleCheck(){
      var inputEmail = $('#inputEmail').val();
      var ok = false;
      console.log('입력된 이메일', inputEmail );

      for(i=0; i<localStorage.length; i++){
        if( JSON.parse(localStorage.getItem(localStorage.key(i))).이메일 === inputEmail ){
          ok = true;
        }
      }
      if(ok===true){
        modal('중복된 이메일 입니다.');
        emailOk = false; 
      }
      else{
        modal('사용 가능한 이메일 입니다.');
        emailOk = true; 
      }

    }


    $('.email-double-btn').on({ //중복확인버튼
      click: function(e){
        e.preventDefault();
        
        var inputEmailValue = $('#inputEmail').val(); //이메일 입력상자
        var inputEmail = $('#inputEmail'); //이메일 입력상자
        var regExpEmail = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        var message = '';    

            //버튼 클릭시 초기화
            inputEmail.removeClass('error');

            if( inputEmailValue ==='' ){ //입력값이 없으면 알림창 띄우기
              message='이메일 주소를 입력해주세요.'; //알림창 만들기   
              modal(message);  //모달함수 전달인자(아규먼트)     
              emailOk = false;     
            }
            else{ //아니면  정규표현식 검증
              if( regExpEmail.test( inputEmailValue ) === false ){
                  inputEmail.addClass('error');
                  inputEmail.focus();
                  message='잘못된 이메일 형식입니다.'; //알림창 만들기
                  modal(message); //모달함수 전달인자(아규먼트) 
                   
              }
              else{
                modal('사용 가능한 이메일 입니다.');
                  inputEmail.removeClass('error');                           
                  
                  // 이메일 중복 체크 함수 호출 실행
                    emailDoubleCheck();
              }
            }
      }
    });
    
   
    //======================================================================================================================

    //휴대폰 번호
    $('#inputPhone').on({
        keyup: function(e){
          var PhoneValue = $(this).val();
          var regExp1 = /[^0-9]/g;

              //숫자가 아니면 모두 자동 삭체
              $('#inputPhone').val( PhoneValue.replace(regExp1, '') ); //숫자 아닌것 삭제

              if(PhoneValue===''){
                $(this).removeClass('error');
                $('.phone-btn').removeClass('on');
              }
              else{
                
                  if(PhoneValue.length>=10){
                    $('.phone-btn').addClass('on');                    
                  }
                  else{
                    $('.phone-btn').removeClass('on');
                  }
              }
        }
    });


    //휴대폰 인증번호 받기 클릭이벤트
    $('.phone-btn').eq(0).on({        // 인증번호 받기 버튼
        click: function(e){
            e.preventDefault();

            var PhoneValue = $('#inputPhone').val();
            var regExp2 = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/;  //10~11 휴대폰
  

                //휴대폰번호에 입력값이 없으면 
                //클릭은 무시한다.
                if( $('#inputPhone').val() < 10 ){
                  return;  //리턴값 없다.
                }

                if(regExp2.test(PhoneValue)===false){                    
                  $('#inputPhone').addClass('error');
                  //알리창 띄우기
                  modal('잘못된 휴대폰 번호 입니다. 확인후 다시 시도해 주세요');
                }
                else{
                  $('#inputPhone').removeClass('error');
                  modal('인증 번호가 발송되었습니다.');

                  //인증번호 확인 박스 및 버튼 보이기
                  $('#inputPhoneok').show();
                  $('.phone-ok-btn').show();
                  $('.count-timer').show();
                  $('.guide-phone-confirm').show();

                  //카운트타이머 함수 호출 실행 
                  countTimer();

                }  
        }
    });

    var setId = 0;



   //인증번호 확인 버튼 이벤트
   $('.phone-btn').eq(1).on({                 // 인증번호 확인 버튼
    click: function(e){
      e.preventDefault();
      var okkey = '123456'; 

     
      if($('#inputPhoneok').val()===okkey){
        clearInterval(setId);   // 타이머 종료 ====반드시 해줘야함!!!
        $('#inputPhoneok, .phone-ok-btn').prop('disabled', true);   // 입력상자와 버튼 비활성화!!
        $('#inputPhoneok, .phone-ok-btn').addClass('ok');
        $('.count-timer').html('');
        $('#inputPhoneok').val('');
        modal('인증 되었습니다.');
        ok = true;
        return;
      }
      else{
        modal('잘못된 인증 번호 입니다. 다시 확인해 주세요.');
        return;
      }

    }
  });

   //카운트타이머 함수

   function countTimer(){
      // 타이머 3분 구현 ====setInterval 로 구현
      var seconds = 59;
      var minutes = 2;
      

        setId = setInterval(function(){
          seconds--;   //초 감소하는거 계산
          if(seconds<0){    //초가 0보다 작으면 
            minutes--;      // 분이 하나씩 빠짐
            seconds=59;     // 초 초기화 (59~00)
            if(minutes<0){
              clearInterval(setId);   // 타이머 종료 ====반드시 해줘야함!!!
              $('#inputPhoneok, .phone-ok-btn').prop('disabled', true);   // 입력상자와 버튼 비활성화!!
              $('#inputPhoneok, .phone-ok-btn').addClass('ok');
              modal('인증 제한시간이 지났습니다.');
              $('.count-timer').html('');
              $('#inputPhoneok').html('');
              return;
            }
          }

          $('.count-timer').html(minutes + ':' + (seconds < 10 ? '0'+seconds : seconds) );  


        }, 1000);
   }


//============================================================================================================================

  //주소검색 버튼 클릭 이벤트

  $('#addressBtn').on({
    click:  function(e){
      e.preventDefault();
      $('.address input').show();

      var txt = '';
      var str = '';            // 아래 주소 재검색의 변수 설정

      //주소검색 카카오(다움) 구현
      new daum.Postcode({
        oncomplete: function(data) {


          // console.log( data );
          // console.log( data.zonecode ); //우편번호
          // console.log( data.address ); //도로명주소
          // console.log( data.roadAddress ); //도로명주소 국문
          // console.log( data.roadAddressEnglish ); //도로명주소 영문
          // console.log( data.jibunAddress );//지번주

          $('#inputAddress1').val(`${data.zonecode} ${data.address}`);
          $('#inputAddress2').focus(); //커서 깜박감박 거린다. 입력대기

          $('.guide-transfer').addClass('on');
          
      
      //  /주소 입력하면 재검색으로 바뀌게========================================
    
          //샛별배송|택배배송|배송불가
          str = $('#inputAddress1').val();
          //검색정보 값이 없으면 -1
          // 있으면 글자 시작 위치의 인덱스 번호

          if( str.indexOf('서울') > 0 ){
            console.log(str.indexOf('서울'));
            txt ='샛별배송';
            $('.guide-transfer h4').removeClass('on');
            
          }
          else if( str.indexOf('경기') >=0  ){
            console.log(str.indexOf('경기'));
            txt ='샛별배송';
            $('.guide-transfer h4').removeClass('on');
          }
          else if( str.indexOf('제주') >=0  ){
            console.log(str.indexOf('제주'));
            txt ='배송불가';
            $('.guide-transfer h4').addClass('on');
          }
          else if( str.indexOf('울릉') >=0  ){
            console.log(str.indexOf('울릉'));
            txt ='배송불가';
            $('.guide-transfer h4').addClass('on');
          }
          else if( str.indexOf('독도') >=0  ){
            console.log(str.indexOf('독도'));
            txt ='배송불가';
            $('.guide-transfer h4').addClass('on');
          }
          else{
            txt = '택배배송';
            $('.guide-transfer h4').addClass('on');
          }

          $('.guide-transfer h4').text(txt);
          $('#addressBtn').removeClass('address-btn');
          $('.address-text').text('재검색');
          
//=================================================================================

        }
      }).open();

    }
  });
//=======================================================================
  // 성별



//=======================================================================
  // 생년월일 가이드 텍스트
  

  // 나이계산 : 14세 미만
  // 날짜 (일) : 월별 마지막날 체크

  // console.log( new Date() );
  // console.log( new Date().getFullYear() );  //1900~
  // console.log( new Date().getMonth()+1 );   //0~11
  // console.log( new Date().getDate() );      //1~31
  // console.log( new Date().getDay() );       //0~6


  // //월 체크
  // var y = new Date().getFullYear();
  // var m = new Date().getMonth()+1;
  // var d = new Date().getDate();


  // console.log( new Date(y, m, 0).getDate() );  //월 시작 마지막날



  //생년월일의 입력상자의 값이 숫자가 아니면 모두 제거하는 함수 
  function inputBoxRegExpCheck(value){ 
    // var regExp = /[^\d]/g;  정규표현식을 바로 변수로 넣었음
    return value.trim().replace(/[^\d]/g,'');

  }


    //생년월일 입력상자 체크함수
  function birthdayCheck(){
    //현재 년월일 데이터
    var nowYear = new Date().getFullYear();  // 년 4자리
    var nowMonth = new Date().getMonth()+1;   // 월 (0~11)
    var nowDate = new Date().getDate();      // 일
    var nowDay = new Date().getDay();       // 요알(0~6)
    var nowHours = new Date().getHours();     // 시
    var nowMinutes = new Date().getMinutes();   // 분
    var nowSeconds = new Date().getSeconds();   // 초

    //생년월일 데이터
    var year  = $('#year').val().trim().toString();
    var month = $('#month').val().trim().toString();
    var date  = $('#date').val().trim().toString();
    var birthLastDate = new Date(year, month, 0);   // 마지막에 0을 쓰면 해당 생년월일의 말일 값이 나온다.

    // 현재 년월일
    var today = new Date( nowYear, nowMonth, nowDate );

      //14세 미만 
     // 현재 년도의 년, 월, 일 
     const nowYear100 = new Date(nowYear-120, nowMonth, nowDate);    //>>>> 14세 미만 변수 
     const nowYear14 = new Date(nowYear-14, nowMonth, nowDate);    //>>>> 14세 미만 변수 
     const birthDay = new Date(year, month, date);    //>>>> 생년월일


    //2022년 달력에 말일 모두 표시
    // console.log('1월', new Date(2022, 1, 0) );
    // console.log('2월', new Date(2022, 2, 0) );
    // console.log('3월', new Date(2022, 3, 0) );
    // console.log('4월', new Date(2022, 4, 0) );
    // console.log('5월', new Date(2022, 5, 0) );
    // console.log('6월', new Date(2022, 6, 0) );
    // console.log('7월', new Date(2022, 7, 0) );
    // console.log('8월', new Date(2022, 8, 0) );
    // console.log('9월', new Date(2022, 9, 0) );
    // console.log('10월', new Date(2022, 10, 0) );
    // console.log('11월', new Date(2022, 11, 0) );
    // console.log('12월', new Date(2022, 12, 0) );

    // //2021년 달력에 말일 모두 표시
    // console.log('1월', new Date(2021, 1, 0) );
    // console.log('2월', new Date(2021, 2, 0) );
    // console.log('3월', new Date(2021, 3, 0) );
    // console.log('4월', new Date(2021, 4, 0) );
    // console.log('5월', new Date(2021, 5, 0) );
    // console.log('6월', new Date(2021, 6, 0) );
    // console.log('7월', new Date(2021, 7, 0) );
    // console.log('8월', new Date(2021, 8, 0) );
    // console.log('9월', new Date(2021, 9, 0) );
    // console.log('10월', new Date(2021, 10, 0) );
    // console.log('11월', new Date(2021, 11, 0) );
    // console.log('12월', new Date(2021, 12, 0) );


    // //2020년 달력에 말일 모두 표시
    // console.log('1월', new Date(2020, 1, 0) );
    // console.log('2월', new Date(2020, 2, 0) );
    // console.log('3월', new Date(2020, 3, 0) );
    // console.log('4월', new Date(2020, 4, 0) );
    // console.log('5월', new Date(2020, 5, 0) );
    // console.log('6월', new Date(2020, 6, 0) );
    // console.log('7월', new Date(2020, 7, 0) );
    // console.log('8월', new Date(2020, 8, 0) );
    // console.log('9월', new Date(2020, 9, 0) );
    // console.log('10월', new Date(2020, 10, 0) );
    // console.log('11월', new Date(2020, 11, 0) );
    // console.log('12월', new Date(2020, 12, 0) );



    // 모두 빈값이면 아무 반응을 안한다.
    if($('#year').val()==='' && $('#month').val()==='' && $('#date').val()===''){
      return;
    }
    else { // 숫자가 채워질 때
     

      //연도
        if(!/^(?:19\d\d|2\d\d\d)$/g.test(year)){
          $('.guide-birthday-confirm p').show().text('태어난 년도 4자리를 정확하게 입력하세요.');
          return;
        }
        else{
          $('.guide-birthday-confirm p').hide();

          //월 정상일때 조건문
          if(!/^(?:0?[1-9]|1[0-2])$/g.test(month)){
            $('.guide-birthday-confirm p').show().text('태어난 월을 입력하세요.');
            return;
          }
          else{
            $('.guide-birthday-confirm p').hide();

            //일 정상일 때 조건문
            // 추가항목: 태어난 월의 말일을 찾아서 본인 생일의 날짜와 비교
            // console.log(date);
            // console.log(birthLastDate);
            // console.log(birthLastDate.getFullYear());
            // console.log(birthLastDate.getMonth()+1);
            // console.log(birthLastDate.getDate());  // 마지막 날(일)

            if(!/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(date)  ||  date > birthLastDate.getDate() ){
              $('.guide-birthday-confirm p').show().text('태어난 일을 입력하세요.');
              return;
            }
            else{
              $('.guide-birthday-confirm p').hide();

              //일까지 모두 정상이면 
              //14세 미만,
              // 100세 초과   >>>> 생년월일이 다 채워져야 나이를 측정할 수 있으니까

              // /==미래/
                if( birthDay > today ){
                  $('.guide-birthday-confirm p').show().text('생년월일이 미래로 입력되었어요.');
                  return;
                }
                else{
                  $('.guide-birthday-confirm p').hide();
                }
                  //14세 미만 체크 확인
                  // console.log(nowYear14);
                  // console.log(birthDay);

                  if( birthDay > nowYear14 ){
                    $('.guide-birthday-confirm p').show().text('만 14세 미만은 가입이 불가합니다.');
                    return;
                  }
                  else{
                    $('.guide-birthday-confirm p').hide();
                  }

                  // 120세 이상 체크
                  if( birthDay < nowYear100 ){
                    $('.guide-birthday-confirm p').show().text('생년월일을 다시 확인해주세요.');
                    return;
                  }
                  else{
                    $('.guide-birthday-confirm p').hide();
                  }

            }
          }
        }
     }
  }



  //년도 입력상자 이벤트 : keyup/fousein.out
  $('#year').on({
    keyup: function(){
      $(this).val(inputBoxRegExpCheck( $(this).val() ));
    },
    focusout: function(){
      birthdayCheck();
    }
  });
  //월 입력상자 이벤트
  $('#month').on({
    keyup: function(){
      $(this).val(inputBoxRegExpCheck( $(this).val() ));
    },
    focusout: function(){
      birthdayCheck();
    },
    focusin: function(){
      birthdayCheck();
    }
  });
  //일 입력상자 이벤트
  $('#date').on({
    keyup: function(){
      $(this).val(inputBoxRegExpCheck( $(this).val() ));
    },
    focusout: function(){
      birthdayCheck();
    },
    focusin: function(){
      birthdayCheck();
    }
  });


//===================================================================
// 추천인 아이디 

    $('.add-radio').on({
      change: function(){
        console.log( $(this).val() );
        $('.add-input-box').show();
        if($(this).val()==='추천인 아이디'){
          $('#inputAdd').attr('placeholder', '추천인 아이디를 입력해주세요.');
        }
        else{
          $('#inputAdd').attr('placeholder', '참여 이벤트명을 입력해주세요.');
        }
      }
    });





    $('.add-input-box').on({

    });


  //================================================================
   
  //추가 입력 사항

  //약관등록
  //체크4 누르면 체크5, 체크6 체크상태 변경
  $('#chk4').on({
    change: function(){
        
        if( $(this).is(':checked') ){  //true
          $('#chk5').prop('checked', true);
          $('#chk6').prop('checked', true);
        }
        else{ //false
          $('#chk5').prop('checked', false);
          $('#chk6').prop('checked', false);
        }
    }
  });



  // 체크5와 체크6 변화따라 체크4의 체크상태 변경
  $('#chk5').on({
    change: function(){
      if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
        $('#chk4').prop('checked', false);
      }
      else{  //모두 true
        $('#chk4').prop('checked', true);
      }
    }
  });

  $('#chk6').on({
    change: function(){
      if($('#chk5').is(':checked')===false || $('#chk6').is(':checked')===false){
        $('#chk4').prop('checked', false);
      }
      else{  //모두 true
        $('#chk4').prop('checked', true);
      }
    }
  });



  // 부분체크한 모든 내용은 위에 코딩하고
  // 여기에서는 전체 체크상태를 확인 그리고 카운트 체크하여
  // 변경사항을 반영한다.

  // 체크박스 이벤트
  // .chkbox-btn 7개 반복처리 - each() 메서드 사용
  chkboxBtn.each(function(idx){
      // console.log( idx );
      $(this).on({
        change: function(){
        // click: function(){
          //console.log( idx );  //선택한 체크박스 인덱스 번호
          //console.log( $(this).is(':checked') ); //체크 상태 확인
          //console.log( $(this).val() );  //선택 항목의 값

          var cnt=0;  //카운트 체크박스 체크된것만 전체갯수 증가하는 변수
          for(var i=0; i<chkboxBtn.length; i++){
            if(chkboxBtn.eq(i).is(':checked')===true){ //7개를 반복 확인
              cnt++;
            }
          }
          //선택된 체크박스 갯수 확인
          // console.log( cnt );
          if(cnt===7){
            $('#chkAll').prop('checked', true);  //전체선택(chkAll)을 선택 체크  true 한다.
          }
          else{
            $('#chkAll').prop('checked', false);  //전체선택(chkAll)을 선택 체크 해제 false 한다.
          }
        }
      });
  });


  //모두 체크하는 chkAll 버튼 이벤트
  $('#chkAll').on({
    change: function(){
      
      if( $(this).is(':checked') ){ //chkAll 체크가 true 이면        
        $('.chkbox-btn').prop('checked', true); //7개 모두를 체크 하세요
      }
      else{   //chkAll 체크가 false 이면  
        $('.chkbox-btn').prop('checked', false);//7개 모두를 체크 해제 하세요
      }
    }
  })



  //모달창 이벤트 함수
  function modal(m){
    $('.modal-message').text( m );
    $('#modal').addClass('show');       
  }

  $('.modal-close').on({
    click: function(){
      $('#modal').removeClass('show'); 
    }
  });


//=========================================================================================================================================================
// 전송 버튼 클릭 이벤트

$('.submit-btn').on({
    click: function(e){
        e.preventDefault();   //submit 기능을 막아줌.

      var idVal = $('#inputId').val();                 // 1. 아이디 (필수)                                                
      var pwVal = $('#inputPw').val();                 // 2. 비밀번호 (필수)
      var pwConfirmVal = $('#inputPwConfirm').val();                 // 2. 비밀번호 (필수)
      var nameVal = $('#inputName').val();             // 3. 이름 (필수)
      var emailVal = $('#inputEmail').val();           // 4. 이메일 (필수)
      var phoneVal = $('#inputPhone').val();           // 5. 휴대폰 (필수)
      var addressVal = $('#inputAddress1').val() + '' + $('#inputAddress2').val();      // 6. 주소입력(필수)
      var genderVal = '';
      var birthDayVal = $('#year').val() + '-' + $('#month').val() + '-' + $('#date').val();
      var addInputVal = '';
      var serviceVal = [];   //누적보관 곽괄호 사용
      


      //성별==============================================
      if($('#male').is(':checked')===true){
        genderVal = $('#male').val();
      }
      else if($('#female').is(':checked')){
        genderVal = $('#female').val();
      }
      else{
        genderVal = $('#none').val();
      }

      //추가입력사항 ======================================
      if($('#add1').is(':checked')){
        addInputVal = $('#add1').val();
      }
      else{
        addInputVal = $('#add2').val();
      }


      //약관동의 ㅡ> 누적정보===============================
      // serviceVal.push('누적할 체크박스값'); 

      // 반복문 사용하여 체크상자가 선택된 값을 배열에 저장한다.

      $('.chkbox-btn').each(function(idx){
        if($(this).is(':checked')===true){
          serviceVal.push( $(this).val() );      // 체크된 것만 밀어넣는다 (push)
        }
      });


      // 필수 입력사항 ==========================================================================================================================
      // 반드시 입력 되어야하는 사항
      // 만약 하나라도 필수 입력사항이 빠지면
      // 전송 취소 그리고 입력대기
      // 약관동의는 필수 선택사항 


      //체크박스 필수 항목 체크 카운트 3개 필수 
      var cnt = 0;

      for(var i=0; i<serviceVal.length; i++){
        if( serviceVal[i].indexOf('필수') !== -1 ){     //-1은 검색이 안됐다는 의미 = 못 찾았다.
          cnt++;
        }
      }


      //공백이 한개라도 있거나
      //false가 한개라도 있다면 전송 취소
      console.log('idOk : '+ idOk, 'pw1Ok: '+ pw1Ok, 'pw2Ok : '+pw2Ok, 'pw3Ok: '+pw3Ok, 'pwConfirm: '+pwConfirm, 'emailOk : '+emailOk);
      
      if( 
          idVal ==='' || 
          pwVal ==='' || 
          nameVal ==='' || 
          emailVal ==='' || 
          phoneVal ==='' || 
          addressVal ==='' || 
          cnt < 3 || 
          ok===false || 
          $('#inputAddress2').val()==='' ||
          idOk===false || 
          pw1Ok===false || 
          pw2Ok===false || 
          pw3Ok===false || 
          pwConfirm===false ||
          emailOk === false 
      ){
        if(idVal ===''){
          alert('아이디를 확인해 주세요.');
        }
        else if(pwVal ===''){
          alert('비밀번호를 확인해 주세요.');
        }
        else if(nameVal ===''){
          alert('이름을 확인해 주세요.');
        }
        else if(phoneVal ===''){
          alert('휴대폰을 확인해 주세요.');
        }
        else if(addressVal ===''){
          alert('주소를 확인해 주세요.');
        }
        else if($('#inputAddress2').val() ===''){
          alert('나머지 주소를 입력해 주세요.');
        }
        else if(cnt<3){
          alert('필수 약관 동의를 체크해 주세요.');
        }
        else if(ok===false){
          alert('휴대폰 인증을 확인해 주세요.');
        }
        return;   // 전송취소
      }
      else if(idOk===false || pw1Ok===false || pw2Ok===false || pw3Ok===false || pwConfirm===false || emailOk === false ){
        if(idOk===false){
          alert('아이디를 확인해 주세요.');
        }
        else if(pw1Ok===false){
          alert('비밀번호를 10자 이상 입력해주세요.');
        }
        else if(pw2Ok===false){
          alert('비밀번호는 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합 하세요.');
        }
        else if(pw3Ok===false){
          alert('비밀번호는 동일한 숫자 3개 이상 연속 사용이 불가합니다.');
        }
        else if(pwConfirm===false){
          alert('동일한 비밀번호를 입력해주세요.');
        }
        else if(emailOk === false){
          alert('이메일 중복 확인을 해주세요.');
        }
      }
      else{
         //저장할 데이터

          var 회원가입 = {
            아이디:idVal, 
            비밀번호:pwVal, 
            아름:nameVal, 
            이메일:emailVal, 
            휴대폰:phoneVal, 
            주소:addressVal, 
            생년월일:birthDayVal, 
            추가입력사항:addInputVal, 
            이용약관:serviceVal
          }

          //로컬스토리지 저장
          localStorage.setItem(회원가입.아이디, JSON.stringify(회원가입) );

          format();  // 내용이 채워져 있으면 전송하고 포맷한다.

      }



//===========================================================================================================================
      //데이터 저장 콘솔로 확인
      // console.log( idVal, pwVal, nameVal, emailVal, phoneVal, addressVal, genderVal, birthDayVal, addInputVal, serviceVal);


    //=========================================================================================================================================
      //  초기화 (val값에 공백을 넣어서 전송 버튼 눌렀을 때 내용 초기화 하기)

      function format(){

          
          $('#inputId').val('');           
          $('#inputPw').val('');           
          $('#inputPwConfirm').val('');    
          $('#inputName').val('');         
          $('#inputEmail').val('');        
          $('#inputPhone').val('');        
          $('#inputAddress1').val('');   
          $('#inputAddress2').val('');
          $('#year').val('');
          $('#month').val('');
          $('#date').val('');
          serviceVal = [];   //누적보관 곽괄호 사용
          

          // radio 버튼 초기화

          //성별==============================================
          $('#male').prop('checked', false);
          $('#female').prop('checked', false);
          $('#none').prop('checked', false);

          //추가입력 초기화
          $('#add1').prop('checked', false);
          $('#add2').prop('checked', false);


          // 체크박스 초기화
          $('#chkAll').prop('checked', false);

          $('.chkbox-btn').each(function(){
            $(this).prop('checked', false);
          });


          // 모든 가이드 입력제한 p 내용들 초기화 시키기ㅡㅡㅡㅡ>
          $('.guide-text').hide();

          $('#inputEmail').removeClass('error');    

          $('#inputPhone').removeClass('error');
          $('.phone-btn').removeClass('on');

          $('.address input').hide();
          $('.address-text').text('주소검색');
          $('#addressBtn').addClass('address-btn');


          $('#inputPhoneok').hide();
          $('.phone-ok-btn').hide();
          $('.count-timer').hide();
          $('#inputPhoneok, .phone-ok-btn').prop('disabled', false);   
          $('#inputPhoneok, .phone-ok-btn').removeClass('ok');

       }
  }
});




})(jQuery);
let isComputer = true;
// true, false로 턴을 준다. 컴퓨터 턴부터 시작
let strike_score = 0;
// 스트라이트 점수
let ball_score = 0;
// 볼 카운트(스트라이크)
let out_score = 0;
// 아웃 카운트
let computer_score = 0;
// 컴퓨터 득점
let user_score = 0;
// 사용자 득점
let computer_at = 0;
// 1루
let computer_at2 = 0;
// 2루
let computer_at3 = 0;
// 3루
let game_inning = 1;
// 게임 회차(이닝)
let game_round = 0;
let temp = 0;
// 반복 초기값 설정(라운드초기설정)
let txt = document.querySelector('#text');
// 초기값 : 자, 경기 시작합니다. - 경기 해설
let base_ru = document.querySelector('#base');
let base_ru_homerun = document.querySelector('#homerun');
let base_ru_homerun1 = document.querySelector('#homerun1');
// 홈런 (이미지 x)
let first = document.querySelector('#one');
// 1루에 등장
let sec = document.querySelector('#two');
// 2루에 등장
let third = document.querySelector('#three');
// 3루에 등장
let strike = document.querySelector('#text_strike');
// s옆에 텍스트 (스트라이크 시 올라감)
let game_switch = 0;
// 기본값은 0 , 컴퓨터차례 : true, 컴퓨터부터 실행. 
let chchch = document.querySelector('#chchch');
// 이펙트


document.querySelector('#inning_num').innerHTML = game_inning;
// 게임회차 (이닝) 표시
document.querySelector('#text_strike').innerHTML = strike_score;
// 스트라이크 점수 표시
document.querySelector('#text_ball').innerHTML = ball_score;
// 볼 카운트 표시
document.querySelector('#text_out').innerHTML = out_score;
// 아웃 표시 
document.querySelector('#inning_chomal').innerHTML = '초';
// "초" 표시
document.querySelector('#btn1').addEventListener('click', computerhit);
// 버튼 
document.querySelector('#btn2').addEventListener('click', computerball);
// 버튼 

function maintext(msg){
    txt.innerHTML = msg;
} //main_text
function ch_round() {
    if (temp === 0) {
        // temp가 0일때 말, 1일때 초
        // temp가 
        // 라운드 초기 설정이 0 : 라운드가 끝났다는 의미. 
        document.querySelector('#inning_chomal').innerHTML = '말';
        // 라운드가 0이 되면 "말"이 되었다는 뜻임. 
        maintext('이닝종료, 공수 교대합니다.');
        // 또한, 이닝이 종료되어서 공수가 교대된다. 
        chchch.style.display = 'block';
        // 공수교대라는 텍스트가 보인다.
        game_switch ++;
        // +가 되면서 컴퓨터차례 -> 사용자 차례로 바뀜
        userhit();
        temp = 1;
    } else if(temp === 1) {
        // 초로 다시 설정
        document.querySelector('#inning_chomal').innerHTML = '초';
        maintext('이닝종료, 공수 교대합니다.');
        chchch.style.display = 'block';
        game_switch ++;
         // 처음 컴퓨터 차례로 시작하기위해 0. 이후 +가 되면 1이된다. (원래는 0,1이 돌아가는 구조)
        game_inning ++;
        // 회차 추가
        document.querySelector('#inning_num').innerHTML = game_inning;
        // game_inning에 반영된 카운트를 inning_num위에 출력 
        temp = 0;
        // 라운드 설정 - 0으로 바꿈
        ch_hit();
        // 스트라이크인지. 볼인지. 게임종료하면서 띄움
        game_end();
        // 끝났으니까 game end 실행

    }

} //게임 진행
function game_end(){
    if(game_inning == 10){
        // 9까지만 있고, 10이 되면 종료되니까 끝. 
        document.querySelector('#inning_num').innerHTML = '끝!';
        // 회차에 대한 정보가 "끝"으로 바뀐다. 
        if(computer_score > user_score){
            maintext('경기 종료입니다!    컴퓨터의 승리입니다!');
            // 컴퓨터 점수가 더 높으면 컴퓨터 승리
        }else if(computer_score < user_score){
            maintext('경기 종료입니다!    사용자의 승리입니다!');
            // 유저 점수가 더 높으면 유저 승리 
        }else {
            maintext('경기 종료입니다!    무승부입니다!');
            // 같으면 무승부
        }
        document.querySelector('#btn1').disabled = true;
        document.querySelector('#btn2').disabled = true;
        // 끝나면서 버튼 2개 비활성화
        document.querySelector('#inning').style.display = 'none';
        // 회차 비활성화 
        document.querySelector('#inning_chomal').style.display = 'none';
        // 회차정보 비활성화
        document.querySelector('#text_strike').innerHTML = 0;
        // 스트라이크 정보 0 , - 게임 종료 
        document.querySelector('#text_ball').innerHTML = 0;
        // 안타 정보 0 - 게임 종료 
        document.querySelector('#text_out').innerHTML = 0;
        // 아웃 정보 0 - 게임 종료
        document.querySelector('#btn1').style.background = '#fff';
        // 색 효과
        document.querySelector('#btn1').style.color = '#000';
        // 색 효과
        document.querySelector('#btn1').style.opacity = 0.3;
        // 비활성화된 버튼을 표시해둠
        document.querySelector('#btn2').style.background = '#fff';
        // 비활성화된 버튼을 표시해둠
        document.querySelector('#btn2').style.color = '#000';
        // 비활성화된 버튼을 표시해둠
        document.querySelector('#btn2').style.opacity = 0.3;
        // 비활성화된 버튼을 표시해둠
        document.querySelector('#endend').style.display = 'block';
        chchch.style.display = 'none';
    }
} //게임종료
function ch_hit() {
    document.querySelector('#btn1').innerHTML = '스트라이크';
    document.querySelector('#btn2').innerHTML = '볼';
    // 공격 때 표시할 버튼 내용
} //수비시 버튼
function userhit() {
    document.querySelector('#btn1').innerHTML = '강한 스윙';
    document.querySelector('#btn2').innerHTML = '약한 스윙';
    // 수비때 표시할 버튼 내용
} //공격시 버튼

function colorsp(){
    // 게임 진행상황에 맞춰서 주자 이미지가 중복되지 않게. 
    if(computer_at === 1 || computer_at2 === 1 || computer_at3 === 1){
        first.style.display = 'block';
    } else {
        first.style.display = 'none';
        // 
    }
    if(computer_at === 2 || computer_at2 === 2 || computer_at3 === 2){
        sec.style.display = 'block';
    } else {
        sec.style.display = 'none';
    }
    if(computer_at === 3 || computer_at2 === 3 || computer_at3 === 3){
        third.style.display = 'block';
    } else {
        third.style.display = 'none';
    }
} //주자 이미지 지정

function score_ch(){
    if (computer_at === 4){
        if(game_switch % 2 == 0) {
            // 2로 나눠떨어지면 컴퓨터 차례
            computer_score += 1;
            computer_at = 1;
            document.querySelector('#c_score').innerHTML = computer_score;
        }
        else {
            // 아니면 사용자 차례
            user_score += 1;
            computer_at = 1;
            document.querySelector('#u_score').innerHTML = user_score;
        }
    }
} //1번째 주자
function score_ch2(){
    if (computer_at2 === 4){
        if(game_switch % 2 == 0) {
            // 2로 나눠떨어지면 컴퓨터 차례
            computer_score += 1;
            computer_at2 = 1;
            document.querySelector('#c_score').innerHTML = computer_score;
        }
        else {
           // 아니면 사용자 차례
            user_score += 1;
            computer_at2 = 1;
            document.querySelector('#u_score').innerHTML = user_score;
        }
    }
} //2번째 주자
function score_ch3(){
    if (computer_at3 === 4){
        if (game_switch % 2 == 0) {
            computer_score += 1;
            computer_at3 = 1;
            document.querySelector('#c_score').innerHTML = computer_score;
        } else {
            user_score += 1;
            computer_at3 = 1;
            document.querySelector('#u_score').innerHTML = user_score;
        }
    }
} //마지막 주자 
function reset(){
    // 3번째 주자 끝나고 나서 처음으로 돌리기, 루에 진출한 사람이 없을떄. 
    computer_at = 0;
    computer_at2 = 0;
    computer_at3 = 0;
    first.style.display = 'none'; 
    sec.style.display = 'none';  
    third.style.display = 'none';
} //reset

function computerhit(){
    // perhit에 경우의 수 넣기 (10가지의 확률)
    let perhit = Math.floor(Math.random()*10)+1;
    let c_score = document.querySelector('#c_score');
    let u_score =  document.querySelector('#u_score');
    base_ru_homerun.style.display = 'none';
    base_ru_homerun1.style.display = 'none';
    chchch.style.display = 'none'
    if(perhit >= 9){
        // 홈런 , 루 위에 1명, 2명 , 3명(만루) 
        // 이후, 밑에 아래와 같은 텍스트 출력
        let homerun = Math.floor(Math.random()*10)+1;
        if(homerun <= 2){
            if(computer_at >=1 && computer_at2 >=1 && computer_at3 >=1){
                if(game_switch % 2 == 0) {
                    computer_score += 4;
                } else {
                    user_score +=4;
                }
                reset()
            } else if((computer_at>=1 && computer_at2 >=1 && computer_at3 === 0) || (computer_at >=1 && computer_at3 >=1 && computer_at2 === 0) || (computer_at2 >=1 && computer_at3 >=1 && computer_at === 0)){
                if(game_switch % 2 == 0) {
                    computer_score += 3;
                } else {
                    user_score +=  3;
                }
                reset()
            } else if((computer_at >=1 && computer_at2 === 0 && computer_at3 === 0) || (computer_at2 >=1 && computer_at1 === 0 && computer_at3 === 0) || (computer_at3 >=1 && computer_at1 === 0 && computer_at2 === 0)){
                if (game_switch % 2 == 0) {
                    computer_score += 2;
                } else {
                    user_score += 2;
                    
                }
                reset()
            } else {
                if (game_switch % 2 == 0) {
                    computer_score ++;
                } else {
                    user_score ++;
                }
                reset() 
            }
            if (game_switch % 2== 0) {
                c_score.innerHTML = computer_score;
            } else {
             u_score.innerHTML = user_score;
            }
            strike_score = 0;
            document.querySelector('#text_strike').innerHTML = strike_score;
            ball_score = 0;
            document.querySelector('#text_ball').innerHTML = ball_score;
            maintext('넘어갑니다!  홈런!!!');
            base_ru_homerun.style.display = 'block';
            base_ru_homerun1.style.display = 'block';
        }else{
            // 홈런이 아니면 안타. 
            strike_score = 0;
            document.querySelector('#text_strike').innerHTML = strike_score;
            ball_score = 0;
            document.querySelector('#text_ball').innerHTML = ball_score;
            maintext('바깥쪽 높은 볼!! 안타입니다!!');
            // 각 선수들에게 점수를 증가시켜서 밀어낸다
            // 홈으로 들어와야지만 1점 추가.
            if(computer_at === 0){
                computer_at ++ ;
                score_ch();
                score_ch2();
                score_ch3();
                
            } else if(computer_at >=1 && computer_at2 === 0){
                computer_at ++ ;
                computer_at2 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            } else if(computer_at2 >= 1 || computer_at3 === 0){
                computer_at ++ ;
                computer_at2 ++ ;
                computer_at3 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            } else{
                computer_at ++ ;
                computer_at2 ++ ;
                computer_at3 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            }
            colorsp();
        }
    }else{
        maintext('스윙! 스트라이크!');
        // 스트라이크일때 화면 표시 
        // 점수들이 0으로 돌아간다.
            strike_score ++;
            document.querySelector('#text_strike').innerHTML = strike_score;
            if(strike_score == 3) {
                document.querySelector('#text_strike').innerHTML = 0;
                out_score ++;
                maintext('3스트라이크, 아웃!');
                strike_score = 0;
                document.querySelector('#text_out').innerHTML = out_score;
                ball_score = 0;
                strike_score = 0;
                document.querySelector('#text_ball').innerHTML = ball_score;
                document.querySelector('#text_strike').innerHTML = strike_score;
                if(out_score == 3) {
                    document.querySelector('#text_out').innerHTML = 0;
                    out_score = 0;
                    ball_score = 0;
                    strike_score = 0;
                    document.querySelector('#text_ball').innerHTML = ball_score;
                    document.querySelector('#text_strike').innerHTML = strike_score;
                    isComputer = false
                    ch_round();
                    reset()
                } 
            } else {
                out_score == 0;
                strike_score == 0;
            }
        }
} //스트라이크 버튼
function computerball(){
    let perhit = Math.floor(Math.random()*10)+1;
    let ballnohit = Math.floor(Math.random()*10)+1;
    // 10가지의 랜덤 수를 담음
    let c_score = document.querySelector('#c_score');
    // 컴퓨터 점수를 넣은 변수
    let u_score =  document.querySelector('#u_score');
    // 유저 점수를 넣은 변수
    base_ru_homerun.style.display = 'none';
    base_ru_homerun1.style.display = 'none';
    // 홈런일떄, 보이지 않게 처리 
    chchch.style.display = 'none'
    if(perhit >= 9){
        // 9회차 까지 플레이 진행, 
        let homerun = Math.floor(Math.random()*10)+1;
        if(homerun <= 2){
            if(computer_at >=1 && computer_at2 >=1 && computer_at3 >=1){
                if(game_switch % 2 == 0) {
                    computer_score += 4;
                } else {
                    user_score +=4;
                }
                reset()
            } else if((computer_at>=1 && computer_at2 >=1 && computer_at3 === 0) || (computer_at >=1 && computer_at3 >=1 && computer_at2 === 0) || (computer_at2 >=1 && computer_at3 >=1 && computer_at === 0)){
                if(game_switch % 2 == 0) {
                    computer_score += 3;
                } else {
                    user_score +=  3;
                }
                reset()
            } else if((computer_at >=1 && computer_at2 === 0 && computer_at3 === 0) || (computer_at2 >=1 && computer_at1 === 0 && computer_at3 === 0) || (computer_at3 >=1 && computer_at1 === 0 && computer_at2 === 0)){
                if (game_switch % 2 == 0) {
                    computer_score += 2;
                } else {
                    user_score += 2;
                }
                reset()
            } else {
                if (game_switch % 2 == 0) {
                    computer_score ++;
                } else {
                    user_score ++;
                }
                reset() 
            }
            if (game_switch % 2== 0) {
                // c score위에 컴퓨터 스코어 작성
                c_score.innerHTML = computer_score;
            } else {
                u_score.innerHTML = user_score;
            }
            // 출루했을때 텍스트를 바꿔준다.    
            strike_score = 0;
            document.querySelector('#text_strike').innerHTML = strike_score;
            ball_score = 0;
            document.querySelector('#text_ball').innerHTML = ball_score;
            maintext('넘어갑니다!  홈런!!!');
            base_ru_homerun.style.display = 'block';
            base_ru_homerun1.style.display = 'block';
        }else{
            // 홈런이 아님, 안타 
            strike_score = 0;
            document.querySelector('#text_strike').innerHTML = strike_score;
            ball_score = 0;
            document.querySelector('#text_ball').innerHTML = ball_score;
            maintext('바깥쪽 높은 볼!! 안타입니다!!');
            // 1루,2루 3루로 미뤄주는거.
            if(computer_at === 0){
                computer_at ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            } else if(computer_at >=1 && computer_at2 === 0){
                computer_at ++ ;
                computer_at2 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            } else if(computer_at2 >= 1 || computer_at3 ===0){
                computer_at ++ ;
                computer_at2 ++ ;
                computer_at3 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            }else{
                computer_at ++ ;
                computer_at2 ++ ;
                computer_at3 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            }
            colorsp();
        }
    }else{
        if(ballnohit > 6){
            // 6은 의미가 없음. 임의로 준 숫자. 
            maintext('스윙! 스트라이크!');
            strike_score ++;
            document.querySelector('#text_strike').innerHTML = strike_score;
            if(strike_score == 3) {
                document.querySelector('#text_strike').innerHTML = 0;
                out_score ++;
                maintext('3스트라이크, 아웃!');
                strike_score = 0;
                document.querySelector('#text_out').innerHTML = out_score;
                ball_score = 0;
                document.querySelector('#text_ball').innerHTML = ball_score;
                document.querySelector('#text_strike').innerHTML = strike_score;
                if(out_score == 3) {
                    // 3진 아웃 후 공수교대
                    document.querySelector('#text_out').innerHTML = 0;
                    out_score = 0;
                    ball_score = 0;
                    strike_score = 0;
                    document.querySelector('#text_ball').innerHTML = ball_score;
                    document.querySelector('#text_strike').innerHTML = strike_score;
                    isComputer = false
                    ch_round();
                    reset()
                } 
            } else {
                out_score == 0;
                strike_score == 0;
            }
        } else {
            // 아웃이 아니면 볼. 
            maintext('볼!!');
            ball_score ++;
            document.querySelector('#text_ball').innerHTML = ball_score;
            ballrun();
        }
        }
    } //볼 버튼
function ballrun(){
    // 진출할때 함수. 
    // 4볼이면 1명이 나가니까.
        if(ball_score == 4){
            maintext('4볼')
            ball_score = 0;
            strike_score = 0;
            document.querySelector('#text_ball').innerHTML = ball_score;
            document.querySelector('#text_strike').innerHTML = strike_score;
            // 사람 미뤄내는 함수,
            if(computer_at === 0){
                computer_at ++ ;
                score_ch();
                score_ch2();
                score_ch3();
                
            } else if(computer_at >=1 && computer_at2 === 0){
                computer_at ++ ;
                computer_at2 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            } else if(computer_at2 >= 1 || computer_at3 ===0){
                computer_at ++ ;
                computer_at2 ++ ;
                computer_at3 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            }else{
                // 다 나가고나서 따는거. 
                computer_at ++ ;
                computer_at2 ++ ;
                computer_at3 ++ ;
                score_ch();
                score_ch2();
                score_ch3();
            }
            colorsp();
        }
    } //4볼
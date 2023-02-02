
let booking = []
let adultno = 0;
let childno = 0;

let first_year = new Date().getFullYear();
let first_month = Number(new Date().getMonth()<10? '0'+(new Date().getMonth()+1) : (new Date().getMonth()+1));
let first_date = Number(new Date().getDate()<10? '0'+new Date().getDate() : new Date().getDate());

let last_year = new Date().getFullYear();
let last_month = Number(new Date().getMonth()<10? '0'+(new Date().getMonth()+1) : (new Date().getMonth()+1));
let last_date = first_date+1


first_print()
last_print()
bookingdate()

function option_select(){
	document.querySelector('.c_roomoption').style.display = 'block'
}

function prevbtn(i){
	if(i==1){
		adultno--;
		adultno = adultno<0? 0 : adultno
		document.querySelector('.c_adultno').innerHTML = adultno
	}else{
		childno--;
		childno = childno<0? 0 : childno
		document.querySelector('.c_childno').innerHTML = childno
	}
}

function plusbtn(i){
	if(i==1){
		adultno++;
		document.querySelector('.c_adultno').innerHTML = adultno
	}else{
		childno++;
		document.querySelector('.c_childno').innerHTML = childno
	}
}

//입실날짜를 선택할 달력 출력 함수
function first_print(){
	// 2. 현재 설정된 날짜 객체
	let year = first_year
	let month = first_month
	let selectday = first_date
	
	// 3. html '요일' 구성
	let html = `<div class="day weekday sunday">일</div>
				<div class="day weekday">월</div>
				<div class="day weekday">화</div>
				<div class="day weekday">수</div>
				<div class="day weekday">목</div>
				<div class="day weekday">금</div>
				<div class="day weekday">토</div>`
				
		// * 1.현재 설정된 월의 마지막 일 구하는 방법
	let lastday = new Date(year, month, 0).getDate();
		// * 2. 현재 캘린더 설정된 날짜의 1일 시작요일 구하기
	let weekday = new Date(year, month-1, 1).getDay();
		//현재 날짜의 요일
	
	//console.log(weekday);
	
	// 1일 시작 전 공백 만들기
	for(let b=0; b<weekday;b++){
		html += `<div class="day"></div>`
	}
	// 일 만들기 [1일부터 ~ 마지막 일(월마다 다름)까지]
	for(let day=1;day<=lastday;day++){
		if(day==selectday){html += `<div class="day selectday" onclick="firstselcet(${year},${month},${day})">${day}</div>`
		}else{html += `<div class="day" onclick="firstselcet(${year},${month},${day})">${day}</div>`}
	} //for e
	// 4. 마크업 출력
	document.querySelector('.c_startmonth').innerHTML = `${year}년${month}월`;
	document.querySelector('.c_startdayBot').innerHTML = html;
	document.querySelector('.c_firstday').innerHTML = `${year}-${month}-${selectday}`
	document.querySelector('.c_boxFirst').innerHTML = `${year}-${month}-${selectday}`
}

//퇴실날짜를 선택할 달력 출력 함수
function last_print(){
	let year = last_year
	let month = last_month
	let selectday = last_date
	let html = `<div class="day weekday sunday">일</div>
				<div class="day weekday">월</div>
				<div class="day weekday">화</div>
				<div class="day weekday">수</div>
				<div class="day weekday">목</div>
				<div class="day weekday">금</div>
				<div class="day weekday">토</div>`
	let lastday = new Date(year, month, 0).getDate();
		// * 2. 현재 캘린더 설정된 날짜의 1일 시작요일 구하기
	let weekday = new Date(year, month-1, 1).getDay();
	for(let b=0; b<weekday;b++){
		html += `<div class="day"></div>`
	}
	for(let day=1;day<=lastday;day++){
		if(day==selectday){html += `<div class="day selectday" onclick="lastselcet(${year},${month},${day})">${day}</div>`
		}else{html += `<div class="day" onclick="lastselcet(${year},${month},${day})">${day}</div>`}
	} //for e
	document.querySelector('.c_lastmonth').innerHTML = `${year}년${month}월`;
	document.querySelector('.c_lastdayBot').innerHTML = html;
	document.querySelector('.c_lastday').innerHTML = `${year}-${month}-${selectday}`
	document.querySelector('.c_boxLast').innerHTML = `${year}-${month}-${selectday}`
	
}

//입실날짜를 선택했을때 함수
function firstselcet(x,y,z){
	first_year = x;
	first_month = y;
	first_date = z;
	first_print()
	bookingdate()
}

//퇴실날짜를 선택했을때 함수
function lastselcet(x,y,z){
	last_year = x;
	last_month = y;
	last_date = z;
	last_print()
	bookingdate()
}
//모달에서 전달 버튼 함수
function prevMonth(i){
	if(i==1){
		first_month--;
		if(first_month<=0){
			first_year--;
			first_month = 12;
		}
		first_print();
	}else{
		last_month--;
		if(last_month<=0){
			last_year--;
			last_month = 12;
		}
		last_print();
	}
}
//모달에서 다음달 버튼 함수
function nextMonth(i){
	if(i==1){
		first_month++;
		if(first_month>=13){
			first_year++;
			first_month = 1;
		}
		first_print();
	}else{
		last_month++;
		if(last_month>=13){
			last_year++;
			last_month = 1;
		}
		last_print();
	}
}

//숙박일수 함수
function bookingdate(){
	let fisttime = new Date(`${first_year}/${first_month}/${first_date}`);
	let lasttime = new Date(`${last_year}/${last_month}/${last_date}`);
	let diftime = lasttime.getTime() - fisttime.getTime();
	let diffDate = diftime / (24 * 60 * 60 * 1000);
	if(diffDate<=0){
		bookingPrint(0);
	}else{bookingPrint(diffDate);}
}
function bookingPrint(i){
	if(i<=0){
		document.querySelector('.c_bookingdate').innerHTML = `이전 날짜는 선택불가합니다.`
		document.querySelector('.c_boxdate').innerHTML = ``
	}else{
		document.querySelector('.c_bookingdate').innerHTML = `총 숙박기간 : ${i}일`
		document.querySelector('.c_boxdate').innerHTML = `${i}일간 금액 : `
	}
}
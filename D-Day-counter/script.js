const getmessage = document.querySelector('#d-day-message')
const containger = document.querySelector('#d-day-contaier')
const savedDate = localStorage.getItem('saved-date')
console.log(savedDate)
const intervalArr = []

containger.style.display = 'none';
getmessage.style.color ='red';
getmessage.innerHTML = ' <h3>D-Day를 입력해주세요</h3>'

  
   
    const dateFormMaker = function() {
      
      const inputYear =document.querySelector('#target-year-input').value
      const inputMonth =document.querySelector('#target-month-input').value
      const inputdate =document.querySelector('#target-date-input').value
      
     // const dateFormet = inputYear + '-' +inputMonth + '-' + inputdate
    const dateFormet = `${inputYear}-${inputMonth}-${inputdate}`
      return dateFormet
    }




    const countMaker = function( date ){
      console.log(date)
      // 날짜의 값을 리턴한 변수를 가져옴
     
      // 현재시간 날짜
      const nowDate = new Date()
        // 내가 지정한 디데이 날짜= 내가 입력한 리턴값을 가져옴 , setHours는 자정을 기준으로 날짜를 가져오게 해준다.
      const targetDate = new Date(date).setHours(0,0,0,0)
   
    //  현재날짜- 디데이날짜 
      const remaining =(targetDate - nowDate) / 1000


      if(remaining <= 0 ){
        console.log("타이머가 종료되었습니다.")
        getmessage.innerHTML='<h3> 타이머가 종료 되었습니다. </h3>'
        getmessage.style.display='flex'
        containger.style.display='none'
        setClearInterval()
      }else if(isNaN(remaining)){
        // 만약 잘못된 날짜가 들어 왔다면 유효한 시간대가 아닙니다 출력
        console.log("유효한 시간대가 아닙니다.")
        containger.style.display='none'
        getmessage.innerHTML='<h3> 유효한 시간대가 아닙니다 </h3>'
        getmessage.style.display='flex'
        setClearInterval()
      }


      const remainingObj = {
        remainingDate : Math.floor(remaining / 3600  /24),
        remainingHoure : Math.floor(remaining/3600)%24 ,
        remainingMin : Math.floor(remaining / 60 ) % 60 ,
        remainingsec : Math.floor(remaining)%60 

      }
     

      
     

      const timeKeys = Object.keys(remainingObj)
      // timekeys 에는  [  remainingDate ,remainingHoure ,remainingMin, remainingsec 키값이 담겨있다.]
      const documentArr = ['days','hours','min','sec']


      const format = function (time) {
        if(time < 10 ){
          return'0'+time
        }else {
          return time;
        }
      }
    

      let i = 0;
      for (let tag of documentArr) {
        const remainingTime = format(remainingObj[timeKeys[i]])
       
       document.getElementById(tag).textContent = remainingTime;
        i ++
      }

      const documentObj = {
        days : document.getElementById('days'),
        hours : document.getElementById('hours'),
        min : document.getElementById('min') ,
        sec : document.getElementById('sec')
      }


    
      
      
  //  documentObj.days.textContent = remainingObj.remainingDate
  //  documentObj.hours.textContent =remainingObj.remainingHoure
  //  documentObj.min.textContent = remainingObj.remainingMin
  //  documentObj.sec.textContent = remainingObj.remainingsec


    }

const starter= function (targetDateInput) {
  console.log(targetDateInput)
  if(!targetDateInput){
    targetDateInput = dateFormMaker()
  }
 
  localStorage.setItem('saved-date',targetDateInput)
 
  
  containger.style.display = 'flex'
  getmessage.style.display = 'none'
  setClearInterval();
  // 클릭하자마자 ccounmaker이 실행되면 0시 0분 0 .. 이 나오지 않음
  countMaker(targetDateInput )
  // 1초마다 카운트 되는걸 반복시켜준다.
 const interverID = setInterval( () =>{countMaker(targetDateInput)},1000)
  intervalArr.push(interverID)
  }

  const setClearInterval = function ( ){
  
      for(let i = 0; i <  intervalArr.length ; i++){
        clearInterval(intervalArr[i])
      }
  }
  
  const resetTimer = function (){
    containger.style.display='none';
    getmessage.innerHTML = ' <h3>D-Day를 입력해주세요</h3>'
    getmessage.style.display = 'flex'
    setClearInterval()
  }
  if(savedDate){
    starter();

  }else{
    containger.style.display = 'none';
    getmessage.style.color ='red';
    getmessage.innerHTML = ' <h3>D-Day를 입력해주세요</h3>'
  }
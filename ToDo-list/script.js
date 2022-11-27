
    const todoinput = document.querySelector('#todo-input')
    const todoList = document.querySelector('#todo-list')

    const saveTodoList = JSON.parse(localStorage.getItem('save-items'))
    
 

      // 내가 입력한 할일데이터들이 나옴
    const createTodo  =function (storageDate){
     
      let todoContents = todoinput.value;
      if(storageDate){
        todoContents = storageDate.contents
      }


      const newLi = document.createElement('li')
      // span안에 inputvalue 값  즉 내가입력하는 값을 span에 넣어준다.
      const newspan = document.createElement('span')
      const newButton = document.createElement('button')


      newButton.addEventListener('click',()=>{
        newLi.classList.toggle('complete')
        saveItemsFn()
      })

      newLi.addEventListener('dblclick',()=>{
        newLi.remove()
        
      })
      
     if(storageDate?.complete === true){
      newLi.classList.add('complete')
     }

      // 내가 인풋에 작성한 값(value)가 newspan에 뜬다.******
      newspan.textContent= todoContents

        // appendClid는 Li안에 하위클레스를 만들어주는데 span을 넣어줄거다.
      newLi.appendChild(newButton)
    
       // 그럼 new Li는 어떻게 나올까? <li> <span> </span> </li>이렇게 나오겠지
      newLi.appendChild(newspan)
     
      // li를 ul태그 안으로 넣고싶어..! todoList는 ul의 id야
      todoList.appendChild(newLi)


      // 인풋창에 있느 값은 공백으로 해줘!
      todoinput.value='';
      saveItemsFn ()
      
    }
  
    // 인풋의 값들을 가져오는 함수
  const KeyCodeCheck = function () {
  if(window.event.keyCode === 13 && todoinput.value ){
    createTodo()
  }
 
  
}

// 전체 삭제하는 부분
const deleteAll = function (){
  const liList = document.querySelectorAll('li')
  for(let i = 0; i < liList.length ; i ++){
    liList[i].remove()
    saveItemsFn ()
  }}

const saveItemsFn = function (){
  const saveItems = [];

  for(let i = 0; i <todoList.children.length; i ++){
    const todoObj = {
      contents : todoList.children[i].querySelector('span').textContent,
      complete :  todoList.children[i].classList.contains('complete')
    }
    saveItems.push(todoObj)
  }

  saveItems.length === 0 ? localStorage.removeItem('save-items') :localStorage.setItem('save-items',JSON.stringify(saveItems))




 
}

if(saveTodoList){
  for(let i = 0; i < saveTodoList.length ; i ++){
    
  createTodo(saveTodoList[i])
  }
}

const weatherSearch = function(position){
  console.log(position)
fetch=(
  `https://api.openweathermap.org/data/2.5/onecall?lat=${position.latitude
}&lon=${position.longitude}&appid=a096297cfdb54636dbac32dc1212cd51`
).then((res)=>{
  console.log(res)
})
 
}


const accessToGeo = function (position){
 console.log(position)
 console.log(position.coords.longitude)

 const positionObj = {
  latitude : position.coords.latitude,
  longitude : position.coords.longitude,
 }
 weatherSearch(positionObj)
}


// 현재 위치 가져오기 api = 
const askForLocation = function (){
  navigator.geolocation.getCurrentPosition(accessToGeo, (err)=>{
    console.log(err)
  })
}
askForLocation()




var api = "http://localhost:3000/Users";
var user = document.getElementById("inputUser");
var fname = document.getElementById("inputName");
var email = document.getElementById("inputEmail");
var date = document.getElementById("inputDate");
var button = document.getElementById("push");

const start = () => {
	getUser()
  pushUser()
}


const getUser = async () => {
  var show = document.querySelector('#show_data');
  var db = await axios.get(api);
   var htmls =
      db.data.map(register => {  return    `
      <tr>
	     <th scope="row" class="text-light">${register.id}</th>
	     <td class="text-light">${register.user}</td>
	     <td class="text-light">${register.name}</td>
	     <td class="text-light">${register.email}</td>
	     <td class="text-light">${register.date}</td> 
       <td> <button type="button" class="btn btn-primary bg-danger text-light" onclick="deleteUser(${register.id})"  > Delete  </button>
       <button type="button" class="btn btn-primary bg-warning text-light" > Change  </button></td>
	    </tr>
       `;
  });
  show.innerHTML = htmls.join(" ")
  console.log(db.data)
  
};

const postUser = async (form) => {
   try {
        const response = await axios.post(api, form);
   } catch(err){
      console.log(err)
   }
}

const pushUser = async () =>{
     button.addEventListener("click",function () {
         var form = {
              user:user.value,
              name:fname.value,
              email:email.value,
              date:date.value
         }
         postUser(form);
     })  
}

const deleteUser = async (id) => {
  try {
     const reomve = await axios.delete(api + "/" + id)
  } catch(err){
     console.log(err)
  }
}

start()


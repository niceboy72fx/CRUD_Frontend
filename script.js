
var api = "http://localhost:3000/Users";
var user = document.getElementById("inputUser");
var fname = document.getElementById("inputName");
var email = document.getElementById("inputEmail");
var date = document.getElementById("inputDate");
var button = document.getElementById("push");
var show = document.querySelector("#show_data");

const start = () => {
  getUser();
  pushUser();
};

const getUser = async () => {
  var db = await axios.get(api);
  var htmls = db.data.map((register) => {
    return `
      <tr>
	     <th scope="row" class="text-light">${register.id}</th>
	     <td class="text-light">${register.user}djdjdj</td>
	     <td class="text-light">${register.name}</td>
	     <td class="text-light">${register.email}</td>
	     <td class="text-light">${register.date}</td> 
       <td> <button type="button" class="btn btn-primary bg-danger text-light" onclick="deleteUser(${register.id})"  > Delete  </button>
       <button type="button" class="btn btn-primary bg-warning text-light" onclick="updateUser(${register.id})" > Change  </button></td>
	    </tr>
       `;
  });
  show.innerHTML = htmls.join(" ");
};

const postUser = async (form) => {
  try {
    const response = await axios.post(api, form);
  } catch (err) {
    console.log(err);
  }
};

const putUser = async (id,form) => {
   try {
     const response = await axios.put(api+ "/" + id, form)
   } catch (err){
     console.log(err);
   }
}

const deleteUser = async (id) => {
  try {
    const reomve = await axios.delete(api + "/" + id);
  } catch (err) {
    console.log(err);
  }
};


/************************************************************************************************ */

const pushUser = async () => {
  button.addEventListener("click", function () {
    var form = {
      user: user.value,
      name: fname.value,
      email: email.value,
      date: date.value,
    };
    postUser(form);
  });
};

const updateUser =  (id) => {
  const form = `
      <tr>
	     <th scope="row" class="text-light"> <input required type="Id" class="form-control" id="changeId" /> </th>
	     <td class="text-light"> <input required type="user" class="form-control" id="changeUser" /> </td>
	     <td class="text-light"> <input required type="fullname" class="form-control" id="changeName" />  </td>
	     <td class="text-light"> <input required type="email" class="form-control" id="changeEmail" />  </td>
	     <td class="text-light"> <input required type="date" class="form-control" id="changeDate" />  </td> 
       <td> 
       <button type="button" class="btn btn-primary bg-warning text-light" id="update" > Update  
       </td>
	    </tr>
       `;
  show.innerHTML = form;
  const btnUpdate = document.getElementById("update");
  console.log(btnUpdate);
  btnUpdate.addEventListener("click", function (e) {
    e.preventDefault();
    const Id = document.querySelector("#changeId").value;
    const User = document.querySelector("#changeUser").value;
    const Name = document.querySelector("#changeName").value;
    const Email = document.querySelector("#changeEmail").value;
    const Date = document.querySelector("#changeDate").value;

    const formData = {
      id : Id,
      user: User,
      name: Name,
      email: Email,
      date: Date,
    };

    console.log(formData)
 
    putUser(id,formData)

  });
};


start();

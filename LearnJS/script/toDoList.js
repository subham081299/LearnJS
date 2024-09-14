const list = [];
        

        function renderToDoList() {
            let toDoListHTML ='';
            for (let index = 0; index < list.length; index++) {
            const elementObject = list[index];
            const name = elementObject.name;
            const date = elementObject.Duedate;
            // const {name,date}=elementObject;
            const html = `
          
                <div>${name}</div>  
                <div>${date}</div>  
                
                <button  onclick="
                  list.splice(${index},1);
                  renderToDoList();
                " class = "deleteButton"
                >Delete</button>
            `;
            toDoListHTML+=html;
            
        }
             document.querySelector('.to_do_list').innerHTML = toDoListHTML;
        }
       
function addTodo() {
    const item = document.querySelector('.js_name_input');
    const inp_date = document.querySelector('.js_date_input');
    const name = item.value;
    const Duedate = inp_date.value;
    list.push({name,Duedate});
   
    console.log(list);
    document.querySelector('.js_name_input').value = '';
    renderToDoList();
    

}
        
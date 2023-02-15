import checkNumInputs from "./checkNumInputs";

const forms=(state)=>{
    const form=document.querySelectorAll('form'),
            input=document.querySelector('input');

    checkNumInputs('input[name="user_phone"]')
   

    const message={
        loading: 'Loading..',
        success: 'Great!',
        failure: 'Smth is wrong'
    };

// async-> says that it will be  f with async operations
const postData= async (url, data)=> {
    document.querySelector('.status').textContent= message.loading;
    // await-> will wait till result will wait the end of request
    let result= await fetch(url, {
        method: 'POST',
        body: data
    });
    // await => will wait till text() is done
    return await result.text();

};

const clearInputs=()=>{
    input.forEach(item=> {
        item.value= '';
    })
}

    form.forEach(item=>{
        item.addEventListener('submit', (e)=>{
            e.preventDefault();

            let statusMessage=document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData= new FormData(item); //collect data
            if (item.getAttribute('data-calc')==="end"){
                for(let key in state){
                    formData.append(key, state[key]);
                }
            }
            

            postData('assets/server.php', formData) // send request with collected data
                .then(result=> {
                    console.log(result);
                    statusMessage.textContent=message.success;
                })
                .catch(()=> statusMessage.textContent=message.failure)
                .finally(()=> {
                    clearInputs();
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 5000);
                })
        });
    });
}

export default forms;
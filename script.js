let validator = {
    handleSubmit: (e) => {
        e.preventDefault()
        let send = true
        
        let inputs = form.querySelectorAll('input')

        validator.clearErrors()

        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i]
            let check = validator.checkInput(input)
            if(check !== true){
                send = false
                validator.showError(input, check)
            }
        }
        
        if(send) {
            form.submit()
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules')
        if(rules !== null){
            rules = rules.split('|')
            for(let k in rules){
                let rDetails = rules[k].split('=')
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Este campo é obrigatório'
                        }
                    break
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return `Campo tem que ter pelo menos ${rDetails[1]} caracteres`
                        }
                    break
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido'
                            }
                        }
                    break
                }
            }
        }
        return true
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000'

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input')
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style = ''
        }

        let errorElements = document.querySelectorAll('.error')
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove()
        }
    }
}

let form = document.querySelector('.validator')
form.addEventListener('submit', validator.handleSubmit)



/*Hide Login Área*/
const hide_login = document.querySelector('.login')
const login_area = document.querySelector('.login-area')
hide_login.addEventListener('click', () => {
    login_area.classList.toggle('login-area-show')
    if(login_area.classList.contains('login-area-show')) {
       hide_login.style.display = 'none'
       hide_attention_login.style.display = 'none'
    } else {
        hide_login.textContent = 'Fazer Login'
    }
    
})

const hide_attention_login = document.querySelector('.attention-loguin')
const hide_login_right = document.querySelector('.attention-loguin a')
hide_login_right.addEventListener('click', (e) => {
    login_area.classList.toggle('login-area-show')
    e.preventDefault()
    if(login_area.classList.contains('login-area-show')) {
        hide_attention_login.style.display = 'none'
        hide_login.style.display = 'none'
    } else {
        hide_login.textContent = 'Fazer Login'
    }
    
})
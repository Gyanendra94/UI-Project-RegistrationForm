const form = document.getElementById("form")

//show input error message
function showError(input, message) {
  const formControl = input.parentElement //refer to the parent element which is div
  formControl.className = "form-control error"
  const small = formControl.querySelector("small") //queryselector can take ids, class, element
  small.innerText = message
}

//show success
function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = "form-control success"
}

//check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(input.value)) {
    showSuccess(input)
  } else {
    showError(input, "Email is not valid")
  }
}

//check Password
function checkPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match")
  }
}

//check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is Required`)
    } else {
      showSuccess(input)
    }
  })
}
//getFieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//CheckLength
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    )
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must not exceed ${max} characters`)
  } else {
    showSuccess(input)
  }
}

//add event listener
form.addEventListener("submit", function (e) {
  e.preventDefault()

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 25)
  checkEmail(email)
  checkPassword(password, password2)
})

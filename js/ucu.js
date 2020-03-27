// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct

//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars

//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion

//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant

// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,  

function validateMe(event) {
  event.preventDefault();

  //email
  const emailNode = event.target.elements['email'];
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block')
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");

  let EmailLengthMessege = 'Email length is incorrect.';
  let minLenE = 5;
  let maxLenE = 50;

  lengthValidator(emailNode, minLenE, maxLenE, emailErrors, EmailLengthMessege);

  let EmailMessage = 'Email format is incorrect. Try: name@gmail.com';
  var EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  formatValidator(emailNode, EmailReg, emailErrors, EmailMessage)

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }

  //name
  const nameNode = event.target.elements['name'];
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block')
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");;

  let NameMessage = 'Name format and length are incorrect. Try: Jack Sparrow or Amy Lin Brooks';
  var NameReg = /^([A-Z]{1}[a-z']{0,10}\s{0,1}[A-Z]{0,1}[a-z']{0,10}\s{0,1}[A-Z]{0,1}[a-z']{0,10})$/;

  formatValidator(nameNode, NameReg, nameErrors, NameMessage)

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors)
  }

  //phone
  const phoneNode = event.target.elements['phone'];
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block')
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  let PhoneLengthMessege = 'Phone length is incorrect.';
  let minLen = 12;
  let maxLen = 200;

  lengthValidator(phoneNode, minLen, maxLen, phoneErrors, PhoneLengthMessege);

  let PhoneMessage = 'Phone format is incorrect. You can try sth like this : +38032 000 000 00, +380(32) 000 000 00, +380(32)-000-000-00...';
  var PhoneReg =  /^([+,0]{1}[0-9]{3}[(]{0,1}[0-9]{2}[)]{0,1}[-\s]{1}[0-9]{3}[-\s]{1}[0-9]{3}[-\s]{1}[0-9]{2})$/;

  formatValidator(phoneNode, PhoneReg, phoneErrors, PhoneMessage)
  
  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors);
  }

  //messege
  const messegeNode = event.target.elements['message'];
  const messegeErrorNode = messegeNode.parentNode.querySelector('p.help-block')
  messegeErrorNode.innerHTML = '';

  let messegeErrors = document.createElement('ul');
  messegeErrors.setAttribute("role", "alert");

  let MessegeLengthMessege = 'Messege length is too short.';
  let minLenM = 10;
  let maxLenM = 2000;

  lengthValidator(messegeNode, minLenM, maxLenM, messegeErrors, MessegeLengthMessege);

  badWordsValidator(messegeNode, messegeErrors);
  
  
  if (messegeErrors.childElementCount > 0) {
    messegeErrorNode.appendChild(messegeErrors);
  }

  return false;
}

function formatValidator(node, reg, errors, message) {
  if (!node.value.match(reg) ) {
    let li = document.createElement('li');
    li.innerText = message;
    errors.appendChild(li);
  }
}

function lengthValidator(node, allowedLenMin, allowedLenMax, errors, message) {
  if (node.value.length < allowedLenMin || node.value.length > allowedLenMax) {
    let li = document.createElement('li');
    li.innerText = message;
    errors.appendChild(li);
  }
}

function badWordsValidator(node, errors) {
  let blacklist = ['ugly', 'dumm', 'stupid', 'pig', 'ignorant', 'fuck'];
  for (let i = 0; i < blacklist.length; ++i) {
    if (node.value.includes(blacklist[i])) {
      let li = document.createElement('li');
      li.innerText = 'Remove bad words from your messege! :c';
      errors.appendChild(li);
    }
  }
}
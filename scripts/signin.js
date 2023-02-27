const iptEmail = document.getElementById('signin-ipt-email');
const iptPass = document.getElementById('signin-ipt-pass');
const errEmail = document.getElementById('si-err-msg-email');
const errPass = document.getElementById('si-err-msg-pass');
const errInfo = document.getElementById('err-wrong-info');
const btnSignIn = document.getElementById('signin-btn');
const btnGoogle = document.getElementById('signin-google');

iptEmail.oninput = (e) => {
  let valid = validateEmail(e.target.value);
  if(valid){
    errEmail.classList.remove('show');
  }else{
    errEmail.classList.add('show');
  }
}

iptPass.oninput = (e) => {
  let valid = validatePassword(e.target.value);
  
  valid?errPass.classList.remove('show')
       :errPass.classList.add('show');
}

btnSignIn.onclick = () => {
  if (!validateEmail(iptEmail.value) && (iptEmail.value === "" || null || undefined)) {
    errEmail.classList.add('show');
    iptEmail.focus();
    return;
  } 
  if (!validateEmail(iptPass.value) && (iptPass.value === "" || null || undefined)) {
    errPass.classList.add('show');
    iptPass.focus();
    return;
  }
}
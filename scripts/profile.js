//Prevent in input from default size
const ipt = document.getElementById('prof-user-name');

let editable = ipt.contentEditable;
console.log(editable);

const nameEdt = document.getElementById('name-edit');
const editName = () => {
  console.log(editable + ipt.contentEditable);
  ipt.classList.toggle('editable');
  if (editable) {
    ipt.contentEditable = false;
    editable = false;
    nameEdt.src = "../icons/ic_edit.png";
  }else{
    ipt.contentEditable = true;
    editable = true;
    ipt.focus();
    nameEdt.src = "../icons/ic_save.png";
    
  }
}
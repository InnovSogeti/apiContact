function showRadio() {
  var n = document.form.btnr.length;
  for(i=1;i<=n;i++) {
      if(document.getElementById('choix'+i).checked == true) {
          document.getElementById('D'+i).style.display = "block";
      } else {
          document.getElementById('D'+i).style.display = "none";
      }
  }
}
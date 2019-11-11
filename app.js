window.addEventListener('load', getCompanies);

//expand = document.querySelector('.expand').addEventListener('click', exp);

let output = document.getElementById('output');

function getCompanies() {
  fetch('db.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      function getUsers(e) {
        etc = e.target.previousSibling;

        //if ((e.target.innerHTML = '')) {

        //console.log('dupa');
        //}

        if (e.target.innerText === '+') {
          for (let j = 0; j < 1; j++) {
            data.users.filter(function(ur) {
              if (ur.uris.company === data.companies[etc.id].uri) {
                //console.log(ur.name);
                etc.innerHTML += `<div class="users">Name: ${ur.name} : </br>Email: ${ur.email}</br></div>`;
                document.querySelectorAll('.users').forEach(function(el) {
                  el.addEventListener('click', function(e) {
                    //console.log(ur);
                  });
                });
              }
            });
          }
        }

        if (e.target.innerHTML === '+') {
          console.log(e.target);
          e.target.innerHTML = '-';
          e.target.className = 'clicked';

          document.querySelectorAll('.clicked').forEach(function(el) {
            el.addEventListener('click', function(e) {
              e.target.className = 'expand';
              e.target.innerText = '+';

              //e.target.parentElement.children[0].children[0].innerText
              e.target.parentElement.children[0].innerText =
                e.target.parentElement.children[0].children[0].innerText;
              console.log(e.target);
            });
          });
        }
      }

      for (let i = 0; i < 1000; i++) {
        output.innerHTML += `<div class="center"><div class="companies" id=${i}><div class="companyName">${data.companies[i].name}</div></div><div class = "expand">+</div></div></br>`;
      }
      expand = document.querySelectorAll('.expand');
      expand.forEach(function(el) {
        el.addEventListener('click', getUsers);
      });
    });

  /* 
  .forEach(function(el) {
    el.addEventListener('click', function(e) {
      console.log(dupa);
      console.log('dupa');
    });
    
  });
  */
}

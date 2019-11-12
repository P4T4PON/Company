window.addEventListener("load", getCompanies);

let output = document.getElementById("output");

function getCompanies() {
  fetch("db.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let companies = data.companies.sort((x, y) =>
        data.users.filter(obj => {
          return obj.uris.company == x.uri;
        }).length >
        data.users.filter(obj => {
          return obj.uris.company == y.uri;
        }).length
          ? 1
          : data.users.filter(obj => {
              return obj.uris.company == x.uri;
            }).length <
            data.users.filter(obj => {
              return obj.uris.company == y.uri;
            }).length
          ? -1
          : 0
      );
      data.companies = companies;
      for (let i = 0; i < data.companies.length; i++) {
        output.innerHTML += `<div class="center"><div class="companies" id=${i}><div class="companyName">${data.companies[i].name}</div></div><div class = "expand btn">+</div></div></br>`;
      }
      document.querySelectorAll(".btn").forEach(function(e) {
        etc = e.previousSibling;

        data.users.filter(function(ur) {
          if (ur.uris.company === data.companies[etc.id].uri) {
            etc.innerHTML += `<div class="display-none">Name: ${ur.name} : </br>Email: ${ur.email}</br></div>`;
          }
        });

        e.addEventListener("click", function(el) {
          for (
            let i = 1;
            i < el.target.parentElement.children[0].children.length;
            i++
          ) {
            if (el.target.innerHTML === "+") {
              el.target.parentElement.children[0].children[i].className =
                "users";
            } else if (el.target.innerHTML === "-") {
              el.target.parentElement.children[0].children[i].className =
                "display-none";
            }
          }
          if (el.target.innerHTML === "-") {
            el.target.innerHTML = "+";
          } else {
            el.target.innerHTML = "-";
          }
        });
      });
    });
}

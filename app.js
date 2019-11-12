window.addEventListener("load", getCompanies);

//catch div to display things
let output = document.getElementById("output");

//fetch json file
function getCompanies() {
  fetch("db.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      // sort companies ascending depends on number of users
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
      // for number of companies create div companies with id and company name
      for (let i = 0; i < data.companies.length; i++) {
        output.innerHTML += `<div class="center"><div class="companies" id=${i}><div class="companyName">${data.companies[i].name}</div></div><div class = "expand btn">+</div></div></br>`;
      }
      // catch every button
      document.querySelectorAll(".btn").forEach(e => {
        pervious = e.previousSibling;

        //filter through users and give them class display-none by default
        data.users.filter(element => {
          if (element.uris.company === data.companies[pervious.id].uri) {
            pervious.innerHTML += `<div class="display-none">Name: ${element.name} : </br>Email: ${element.email}</br></div>`;
          }
        });

        //if u click '+' show users if '-' hide them
        e.addEventListener("click", el => {
          for (
            // start from 1 becouse 0 element is company Name
            let i = 1;
            i < el.target.parentElement.children[0].children.length;
            i++
          ) {
            // if u click '+' show users
            if (el.target.innerHTML === "+") {
              el.target.parentElement.children[0].children[i].className =
                "users";
            }
            // if u click '-' hide users
            else if (el.target.innerHTML === "-") {
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

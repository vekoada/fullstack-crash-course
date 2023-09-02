//Adding category colors from data.js
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

//Select DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".fact-list");

factsList.innerHTML = ""; //Remove all facts from list - this is to allow dynamic fact creation - we could just delete the html...

//loading data from supabase
async function loadFacts() {
  const res = await fetch(
    "https://myhmwofhbdrsyvcildjz.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15aG13b2ZoYmRyc3l2Y2lsZGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2MjUzMTEsImV4cCI6MjAwNzIwMTMxMX0.lLUQEN5jWk387LB5RLVfYGrFXtFoPZBAkrZYn6O4wEw",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15aG13b2ZoYmRyc3l2Y2lsZGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2MjUzMTEsImV4cCI6MjAwNzIwMTMxMX0.lLUQEN5jWk387LB5RLVfYGrFXtFoPZBAkrZYn6O4wEw",
      },
    }
  );
  const data = await res.json(); //Obtaining json data
  //const filteredData = data.filter((fact) => fact.category === "society"); Demonstration of filter function
  createFactsList(data);
}

loadFacts(); //call our data loading function

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
      <p>  
    ${fact.text}
      <a
      class="source"
      href="${fact.source}"
      target="_blank"
      >(Source)</a>
      </p>
      <span class="tag" style="background-color: ${
        CATEGORIES.find((cat) => cat.name === fact.category).color
      }">
        ${fact.category}
      </span>
    </li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

//Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share A Fact";
  }
});

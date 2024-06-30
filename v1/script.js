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

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase
loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://ykefwoojdrxmcduwqnhw.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZWZ3b29qZHJ4bWNkdXdxbmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyNDg1MjEsImV4cCI6MjAzNDgyNDUyMX0.iRp40uMmzv56nVPslcrC6viZnLgO-qqBn6E8x8s4tDE",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZWZ3b29qZHJ4bWNkdXdxbmh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyNDg1MjEsImV4cCI6MjAzNDgyNDUyMX0.iRp40uMmzv56nVPslcrC6viZnLgO-qqBn6E8x8s4tDE",
      },
    }
  );
  const data = await res.json();
  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) =>
      `<li class="fact">
  		<p>
			${fact.text}
        	<a class="source"
                  href="${fact.source}"
                  target="_blank"
            >(Source)
			</a>
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

//Toggle DOM visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

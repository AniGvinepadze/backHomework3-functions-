// 1) დაწერეთ ფუნცქია რომელიც დაგვილოგავს მაუსის კორდინატებს მას შემდეგ რაც გავაჩერებთ მაუსს, გამოიყენეთ დიბაუნს ტექნიკა

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function mousePosition(event) {
  console.log(`X:${event.clientX},Y:${event.clientY} mouse position`);
}

const debMousePosition = debounce(mousePosition, 300);

window.addEventListener("mousemove", debMousePosition);

// 2) წამოიღეთ ინფორმაცია შემდეგი ეიპიაიდან: https://jsonplaceholder.typicode.com/users , მოსული დატა გაპარსეთ შემდეგნაირად, თითოეულ ობიექტს უნდა ჰქონდეს მხოლოდ 4 ფროფერთი აიდი, სახელი, იუზერნეიმი და იმეილი

async function fetchData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    console.log(data);

    const parsedData = data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
    console.log(parsedData);

    return parsedData;
  } catch (error) {
    console.error("theres error with fetching data", error);
  }
}
fetchData();

// 3) შექმენით ინფუთი რომლის სერჩის დროს რექუესთს გააგზავნით შემდეგ აიპიაიზე: 'https://dummyjson.com/products/search?q=phone' როგორც ხედავთ q არის ქუერი პარამეტრი, დებაუნს ტექნიკით გააკეთეთ ინფუთი რომლის ჩაწერაზეც, დარექუსთდება სწორედ q პარამეტრით. ანუ phone ის ნაცვლად გაატანეთ ის რასაც ჩაწერთ ინფუთში.

function debounceFunction(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

async function search(query) {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    if (!res.ok) {
      throw new Error("Network respomnse wasnt ok");
    }
    const data = await res.json();
    console.log(data);
    const results = data.products;
    updatedResults(results);
  } catch (error) {
    console.error("theres error with fetching data", error);
  }
}

search();

function updatedResults(products) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.textContent = product.name;
    resultsContainer.appendChild(productDiv);
  });
}

const searchinput = document.getElementById("searchInput");

const debouncedSearch = debounce((e) => {
  const query = e.target.value;
  if (query) {
    search(query);
  }
}, 300);

searchinput.addEventListener("input", debouncedSearch);

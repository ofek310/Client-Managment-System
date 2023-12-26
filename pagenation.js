var array_length,
  start_index_row,
  end_index_row,
  current_page,
  row_in_page,
  max_page,
  property_keys,
  title;
var array_data = [];
let example = 6;
//Reset variables
function reset(array_result) {
  array_data = array_result;
  array_length = array_result.length;
  row_in_page = 15;
  start_index_row = 1;
  end_index_row = row_in_page;
  current_page = 1;
  //round up
  max_page = Math.ceil(array_length / row_in_page);
  /*Maintains the property of the table variables, 
  so that we enter the information into the table we will not have to do it again and again*/
  if (array_length != 0) {
    property_keys = Object.keys(array_data[0]);
    title = "<tr>";
    for (pro_key of property_keys) {
      title += `<th>${pro_key}</th>`;
    }
    title += "</tr>";
    //if the array is empty its mean that no result return so we dont need to continue
    dispayPageButton();
  }
}

//Creation of page control buttons
function dispayPageButton() {
  var page_control = document.getElementById("pagination_control_buttons");
  page_control.innerHTML = ""; // Clear existing content (if needed)
  page_control.innerHTML +=
    "<button id=prev_button onclick=prevButtonClicked(this)>Prev</button>";
  //Depending on the number of pages, the page buttons are created
  for (var i = 1; i <= max_page; i++) {
    page_control.innerHTML += `<button id="button_page_${i}" class="button_page_${i}" onclick="pageButtonClicked(this)">${i}</button>`;
  }
  page_control.innerHTML +=
    "<button id=next_button onclick=nextButtonClicked(this)>Next</button>";
  calculations();
}
//A function that takes care of all the page index calculations display the buttons are appropriate.
function calculations() {
  start_index_row = (current_page - 1) * row_in_page;
  end_index_row = row_in_page * current_page - 1;
  if (end_index_row > array_length - 1) {
    end_index_row = array_length - 1;
  }
  document.getElementById("pagination_text").textContent =
    start_index_row + 1 + " - " + (end_index_row + 1) + " from " + array_length;
  document
    .getElementById("button_page_" + current_page)
    .classList.add("no-hover");

  displayNextAndPrev();
  dispalyDataRowInformation();
}

/*A function that inserts the information of the required page into the table 
according to the propety of the records in the table*/
function dispalyDataRowInformation() {
  //tbody is important because otherwise the css doesn't work
  var table = document.querySelector(".table tbody");
  table.innerHTML = "";
  document.querySelector(".table thead").innerHTML = "";
  document.querySelector(".table thead").innerHTML += title;
  for (let i = start_index_row; i <= end_index_row; i++) {
    text = "<tr>";
    let client = array_data[i];
    for (const pro_key of property_keys) {
      text += `<td>${client[pro_key]}</td>`;
    }
    text += "</tr>";
    table.innerHTML += text;
  }
  additionalImplementation();
}
function additionalImplementation() {}
function displayNextAndPrev() {
  //in the middle of the pages
  if (current_page < max_page && current_page > 1) {
    document.getElementById("prev_button").classList.remove("no-hover");
    document.getElementById("next_button").classList.remove("no-hover");
  } else if (current_page == max_page && current_page == 1) {
    //there is just one page
    document.getElementById("next_button").classList.add("no-hover");
    document.getElementById("prev_button").classList.add("no-hover");
  } else if (current_page === max_page) {
    //in the last page
    document.getElementById("next_button").classList.add("no-hover");
    document.getElementById("prev_button").classList.remove("no-hover");
  } else {
    //if the first page
    document.getElementById("next_button").classList.remove("no-hover");
    document.getElementById("prev_button").classList.add("no-hover");
  }
}
function nextButtonClicked(button) {
  document
    .getElementById("button_page_" + current_page)
    .classList.remove("no-hover");
  /*don't have to do the above IF because if this is the last page, 
  make sure not to enable the NEXT button*/
  if (current_page < max_page) {
    current_page++;
    calculations();
  }
}

function prevButtonClicked(button) {
  document
    .getElementById("button_page_" + current_page)
    .classList.remove("no-hover");
  /*don't have to do the above IF because if it's the first page, 
  make sure not to enable the PREV button*/
  if (current_page > 1) {
    current_page--;
    calculations();
  }
}

function pageButtonClicked(button) {
  document
    .getElementById("button_page_" + current_page)
    .classList.remove("no-hover");
  /*each of the page buttons has a unique class name page_butto_i where the i stands for the page. 
    So that we would like to know which button we pressed, 
    we will take the name from a class*/
  button_class = button.getAttribute("class");
  /*With the help of match, we will check if the name matches the above pattern, and if so, 
  an array will be inserted so that the expression 
  we asked for in brackets () will appear in the first place*/
  match = button_class.match(/button_page_(\d+)/);
  //No need to check if it is compatible because we take care of it
  current_page = parseInt(match[1], 10);
  calculations();
}

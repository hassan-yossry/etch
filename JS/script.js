const container = document.querySelector(".container");
const width = 400;
const height = 400;
const numCells = 100;
const resetColors = "red";

const buildCellNumbers = (width, height, numCells) => {
  let mousin = false;
  let mousedown = false;
  const cellWidth = Math.floor(width / numCells);
  const cellHegiht = Math.floor(height / numCells);

  const setMousein = (val) => (mousin = val);
  const setMousedown = (val) => (mousedown = val);
  const getMousein = () => mousin;
  const getMousedown = () => mousedown;
  const getCellDim = () => ({ width: cellHegiht, height: cellWidth });
  return {
    setMousedown,
    setMousein,
    getMousedown,
    getMousein,
    getCellDim,
  };
};
/*
 *@descrption: build the grid
 *@params numCells{Number}: number of cellls per dimension
 *@return {String}: HTML txt
 */
const buildGridHTML = (numCells, cellHegiht, cellWidth) => {
  let htmlTXT = "";
  for (let j = 0; j < numCells; j++) {
    htmlTXT += `<div id='row${j}' class='row'>`;
    for (let i = 0; i < numCells; i++) {
      htmlTXT += `<div id='$cell${j}${i}' class="cell" style= "width:${cellWidth}px; height:${cellHegiht}"></div>
        `;
    }
    htmlTXT += `</div>`;
  }
  return htmlTXT;
};

/*
 *@descrption: establish reset btn
 *@params but{String}: button id
 *@return {None}: undefined
 */
const resetCells = (but) => {
  document.getElementById(but).onclick = (e) => {
    //e.preventDefault();
    document.querySelectorAll(".row .cell").forEach((itm) => {
      itm.style.backgroundColor = "";
    });
  };
};

/*
 *@descrption: register listeners
 *@params container{HTMLElement}:the etch container
 *@return: undefiend
 */
const registerListeners = (container, mousedown, mousedownset) => {
  container.addEventListener("mouseover", (evt) => {
    if (mousedown()) {
      evt.target.style.backgroundColor = "black";
    }
  });

  document.addEventListener("mousedown", (e) => e.preventDefault());

  container.addEventListener("mousedown", () => mousedownset(true));

  document.addEventListener("mouseup", () => mousedownset(false));
};

const { setMousedown, setMousein, getMousedown, getMousein, getCellDim } =
  buildCellNumbers(width, height, numCells);

//build the grid HTML
const htmlTXT = buildGridHTML(
  numCells,
  getCellDim().width,
  getCellDim().height
);

//insert the HTML in the container
container.insertAdjacentHTML("beforeend", htmlTXT);

// insert the rest button
resetCells("rstBut");

//register listeners
registerListeners(container, getMousedown, setMousedown);

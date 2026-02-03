const main = document.getElementById("main")
const inventory = document.getElementById("inventory")

function createTree(treeRow, treeColumn, treeHeight, i, j, cell) {
    if (i >= (treeRow - treeHeight + 1) && i <= treeRow) {
        if (j == treeColumn) {
            cell.classList.add("tree")
        }
    }
    if (i >= (treeRow - treeHeight) && i <= (treeRow - treeHeight + 1)) {
        if (j > (treeColumn - 4) && j < (treeColumn + 4)) {
            cell.classList.add("leaf")
        }
    }

    if (i >= (treeRow - treeHeight - 2) && i <= (treeRow - treeHeight - 1)) {
        if (j > (treeColumn - 3) && j < (treeColumn + 3)) {
            cell.classList.add("leaf")
        }
    }

    if (i >= (treeRow - treeHeight - 4) && i <= (treeRow - treeHeight - 3)) {
        if (j > (treeColumn - 2) && j < (treeColumn + 2)) {
            cell.classList.add("leaf")
        }
    }
}

function createMap() {
    const columns = []
    const treeHeights = []
    const maxTree = Math.floor((Math.random() * 12) + 2)
    for (let i = 0; i < maxTree; i++) {
        let rnd = Math.floor(Math.random() * 100)
        while (columns.includes(rnd) || columns.includes(rnd + 1) || columns.includes(rnd + 2) || columns.includes(rnd + 3) || columns.includes(rnd - 1) || columns.includes(rnd - 2) || columns.includes(rnd - 3)) {
            rnd = Math.floor(Math.random() * 100);
        }
        columns.push(rnd)
        treeHeights.push(Math.floor(Math.random() * 3) + 3);
    }

    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 100; j++) {
            const cell = document.createElement("div")
            cell.classList.add("cell")
            if (i < 10) {
                columns.forEach((treeColumn, index) => {
                    createTree(9, treeColumn, treeHeights[index], i, j, cell)
                })
            }
            else if (i === 10) {
                cell.classList.add("grass")
            }
            else if (i < 15) {
                cell.classList.add("dirt")
            }
            else if (i < 28) {
                cell.classList.add("stone")
            }
            else {
                cell.classList.add("bedrock")
            }
            main.append(cell);
        }
    }
}

function removeCell(type) {
    document.body.addEventListener("click", (event) => {
        const target = event.target.classList
        console.log("t",target);
        if (target.contains(type)) {
            target.remove(type)
        }
    })
}
function changeCoursor() {
    const inventory = document.getElementById("inventory")
    inventory.addEventListener("click", (event) => {
        const target = event.target.classList
        if (target.contains(target[1])) {
            document.body.style.cursor = `url(https://guileless-pegasus-d698c6.netlify.app/cursor/${target[1]}.png), auto`
        }
    })
}
createMap()
removeCell("tree")
removeCell("grass")
removeCell("dirt")
removeCell("stone")
removeCell("leaf")

changeCoursor()
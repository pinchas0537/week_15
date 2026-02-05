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

let cursor;

function changeCoursor(target) {
    document.body.style.cursor = `url(https://guileless-pegasus-d698c6.netlify.app/cursor/${target}.png), auto`;
    cursor = target
}

function removeCell(target) {
    if (
        (cursor === "diamond-pickaxe" && target[1] === "stone") ||
        (cursor === "shears" && target[1] === "leaf") ||
        (cursor === "diamond-axe" && target[1] === "tree") ||
        (cursor === "diamond-shovel" && (target[1] === "dirt" || target[1] === "grass"))
    ) {
        addInventory(target[1])
        target.remove(target[1])
        target.remove("leaf")
    }
}

const countObj = {
    leaf: 0,
    tree: 0,
    grass: 0,
    dirt: 0,
    stone: 0
}

const typeCursor = {
    leafB: "oak-leaves",
    treeB: "oak-log",
    grassB: "grass",
    dirtB: "dirt",
    stoneB: "stone"
}

function addInventory(type) {
    const tile = document.querySelector(`.${type}B`)
    tile.classList.add('inventory')
    countObj[type]++;
    tile.innerText = countObj[type];
}

function subInventory(target) {
    let type;
    if (cursor === "oak-leaves" && countObj.leaf > 0) {
        target.add("leaf")
        countObj.leaf--;
        type = "leaf"
    }
    if (cursor === "oak-log" && countObj.tree > 0) {
        target.add("tree")
        countObj.tree--;
        type = "tree"
    }
    if ((cursor === "grass" || cursor === "dirt" || cursor === "stone") && countObj[cursor] > 0) {
        target.add(cursor)
        countObj[cursor]--;
        type = cursor
    }
    document.querySelector(`.${type}B`).innerText = countObj[type]
    if (countObj[type] === 0) {
        const tile = document.querySelector(`.${type}B`)
        tile.classList.remove("inventory")
        tile.textContent = ""
        document.body.style.cursor = "auto"
    }
}

function startGame() {
    createMap()
    document.body.addEventListener("click", (event) => {
        const target = event.target.classList
        if (target.value === "cell") {
            subInventory(target)
        }
        if (target[1] === "diamond-pickaxe" || target[1] === "shears" || target[1] === "diamond-axe" || target[1] === "diamond-shovel") {
            changeCoursor(target[1])
        }
        else if (target[1] === "inventory") {
            changeCoursor(typeCursor[target[0]])
        }
        else if (target.contains("cell")) {
            removeCell(target)
        }
    })
}

startGame()
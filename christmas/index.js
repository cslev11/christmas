var data = [
    {
        what: "Logisztika",
        who1: "Kovács Máté",
        shift1: "Délelöttös",
        who2: "Kovács József",
        shift2: "Délutános"
    },
    {
        what: "Könyvelés",
        who1: "Szabó Anna",
        shift1: "Éjszakai"
    },
    {
        what: "Játékfejlesztés",
        who1: "Varga Péter",
        shift1: "Délutános",
        who2: "Nagy Eszter",
        shift2: "Éjszakai"
    }
];

function createCell(type, text, parent) {
    var td = document.createElement(type);
    td.innerText = text;
    parent.appendChild(td);
}

function generateHeader(table, headerlist) {
    var thead = document.createElement("thead");
    table.appendChild(thead);
    var tr = document.createElement("tr");
    thead.appendChild(tr);
    for (var i = 0; i < headerlist.length; i++) {
        createCell("th", headerlist[i], tr);
    }
}

function renderRow(tbody, elem) {
    var tr = document.createElement("tr");
    tbody.appendChild(tr);

    var tdWhat = document.createElement("td");
    tdWhat.innerText = elem.what;
    tr.appendChild(tdWhat);

    createCell("td", elem.who1, tr);
    createCell("td", elem.shift1, tr);

    if (elem.who2 && elem.shift2) {
        tdWhat.rowSpan = 2;
        var tr2 = document.createElement("tr");
        tbody.appendChild(tr2);
        createCell("td", elem.who2, tr2);
        createCell("td", elem.shift2, tr2);
    }
}

function renderTbody(array) {
    var tbody = document.getElementById("jstbody");
    tbody.innerHTML = "";
    for (var i = 0; i < array.length; i++) {
        renderRow(tbody, array[i]);
    }
}

var jsSection = document.createElement("div");
jsSection.id = "jssection";
jsSection.classList.add("hide");
document.body.appendChild(jsSection);

var table = document.createElement("table");
jsSection.appendChild(table);

generateHeader(table, ["Osztály", "Manó", "Műszak"]);

var tbody = document.createElement("tbody");
tbody.id = "jstbody";
table.appendChild(tbody);

renderTbody(data);

initSelect(data);

var jsForm = document.createElement("form");
jsForm.id = "jsform";
jsSection.appendChild(jsForm);

function addInput(id, label, type) {
    var div = document.createElement("div");

    var lab = document.createElement("label");
    lab.innerText = label;
    lab.htmlFor = id;
    div.appendChild(lab);

    var input = document.createElement("input");
    input.type = type || "text";
    input.id = id;
    div.appendChild(input);

    var err = document.createElement("span");
    err.classList.add("error");
    div.appendChild(err);

    jsForm.appendChild(div);
}

function addMuszakSelect(id, label) {
    var div = document.createElement("div");

    var lab = document.createElement("label");
    lab.innerText = label;
    lab.htmlFor = id;
    div.appendChild(lab);

    var select = document.createElement("select");
    select.id = id;

    var o0 = document.createElement("option");
    o0.value = "";
    o0.innerText = "Válassz műszakot!";
    select.appendChild(o0);

    var o1 = document.createElement("option");
    o1.value = "1";
    o1.innerText = "Délelöttös";
    select.appendChild(o1);

    var o2 = document.createElement("option");
    o2.value = "2";
    o2.innerText = "Délutános";
    select.appendChild(o2);

    var o3 = document.createElement("option");
    o3.value = "3";
    o3.innerText = "Éjszakai";
    select.appendChild(o3);

    div.appendChild(select);

    var err = document.createElement("span");
    err.classList.add("error");
    div.appendChild(err);

    jsForm.appendChild(div);
}

function addCheckbox(id, label) {
    var div = document.createElement("div");

    var input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    div.appendChild(input);

    var lab = document.createElement("label");
    lab.innerText = label;
    lab.htmlFor = id;
    div.appendChild(lab);

    jsForm.appendChild(div);
}

addInput("osztaly", "Osztály");
addInput("mano1", "Manó 1");
addMuszakSelect("muszak1", "Manó 1 műszak");
addCheckbox("masodikmano", "Két manót veszek fel");
addInput("mano2", "Manó 2");
addMuszakSelect("muszak2", "Manó 2 műszak");

var btn = document.createElement("button");
btn.innerText = "Hozzáadás";
jsForm.appendChild(btn);

initCheckbox(document.getElementById("masodikmano"));

function clearErrors(form) {
    var errs = form.querySelectorAll(".error");
    for (var i = 0; i < errs.length; i++) {
        errs[i].innerText = "";
    }
}

function validate(input) {
    if (!input.value) {
        input.parentElement.querySelector(".error").innerText = "Kötelező mező!";
        return false;
    }
    return true;
}

jsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var osztaly = jsForm.querySelector("#osztaly");
    var mano1 = jsForm.querySelector("#mano1");
    var muszak1 = jsForm.querySelector("#muszak1");
    var mano2 = jsForm.querySelector("#mano2");
    var muszak2 = jsForm.querySelector("#muszak2");
    var checkbox = jsForm.querySelector("#masodikmano");

    clearErrors(jsForm);

    if (validate(osztaly) & validate(mano1) & validate(muszak1)) {
        var obj = {
            what: osztaly.value,
            who1: mano1.value,
            shift1: mapMuszak(muszak1.value)
        };

        if (checkbox.checked) {
            obj.who2 = mano2.value;
            obj.shift2 = mapMuszak(muszak2.value);
        }

        createNewElement(obj, jsForm, data);
    }
});

function HTMLFormEventLister(e) {
    e.preventDefault();

    var form = e.target;
    var mano = form.querySelector("#manochooser");
    var tev1 = form.querySelector("#manotev1");
    var tev2 = form.querySelector("#manotev2");

    if (!mano.value || !tev1.value) {
        return;
    }

    var tr = document.createElement("tr");
    document.getElementById("htmltbody").appendChild(tr);

    createCell("td", mano.value, tr);
    createCell("td", tev1.value, tr);

    if (tev2.value) {
        createCell("td", tev2.value, tr);
    } else {
        tr.lastChild.colSpan = 2;
    }

    form.reset();
}

document.getElementById("htmlform")
    .addEventListener("submit", HTMLFormEventLister);

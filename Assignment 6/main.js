var close = document.getElementsByClassName("close");
var edit = document.getElementsByClassName("btn");

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var txt = document.createTextNode(inputValue);
    li.appendChild(txt);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span1 = document.createElement("span");
    var txt1 = document.createTextNode("\u00D7");
    var btn = document.createElement("button")
    btn.innerText = "edit"
    btn.className = "btn"
    span1.className = "close";
    span1.appendChild(txt1);
    li.appendChild(btn)
    li.appendChild(span1);
    for (i = 0; i < edit.length; i++) {
        edit[i].onclick = function () {
            var value = prompt("enter new value");
            if (value === '') {
                alert("No value changed");
            } else {
                var div = this.parentElement;
                div.childNodes[0].nodeValue = value
            }
        }
    }
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

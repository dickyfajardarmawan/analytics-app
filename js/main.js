document.getElementById('name').innerHTML = localStorage.getItem('dataLogin')

var totalFound = document.getElementById('totalFound')
var species = document.getElementById('species')
var diveSite = document.getElementById('diveSite')
var startDate = document.getElementById('startDate')
var endDate = document.getElementById('endDate')
var totalSite = document.getElementById('totalSite')
var visibility = document.getElementById('visibility')
var dataDiveSite = document.getElementById('dataDiveSite')
var dataDiveSite2 = document.getElementById('dataDiveSite2')
var dataDiveSite3 = document.getElementById('dataDiveSite3')
var dataDiveSite4 = document.getElementById('dataDiveSite4')

if (localStorage.getItem('dataLogin') == null) {
    window.location.href = '/login'
}

function onLogout() {
    localStorage.removeItem('dataLogin')
    window.location.href = '/login'
}

function search() {
    if (startDate.value == "") {
        startDate.value = dataList[0].date
    }
    if (endDate.value == "") {
        var totalData = dataList.length
        console.log(totalData)
        endDate.value = dataList[totalData - 1].date
    }

    console.log(startDate.value)
    console.log(endDate.value)
    console.log(species.value)
    console.log(diveSite.value)
    console.log(dataList)

    var dataSearchList = dataList.slice();

    var date = dataList.map(function (e) {
        return e.date;
    });
    // console.log(date[0])
    let indexStart = date.indexOf(startDate.value);
    let indexEnd = date.indexOf(endDate.value);
    console.log(indexStart)
    console.log(indexEnd)
    let dataJadiSearch = dataSearchList.splice(indexStart, indexEnd + 1)
    getTotalSpecies(dataJadiSearch, species.value)
    arrTotal = []
    arrDive = []
    dataDiveSite.innerHTML = ""
    dataDiveSite2.innerHTML = ""
    dataDiveSite3.innerHTML = ""
    dataDiveSite4.innerHTML = ""
    calcTotalDive(dataJadiSearch)
    // setTimeout(() => {
    // }, 2000);
}

function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}

function getTotalSpecies(db, species) {
    var total = 0
    for (let i = 0; i < db.length; i++) {
        if (db[i][species] !== "") {
            total += parseInt(db[i][species])
        }
    }
    totalFound.innerHTML = total
}

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

var arrTotal = []
var arrDive = []

function showTotalDive() {
    setTimeout(() => {
        console.log(arrTotal)
        var totalMax = arrTotal.max()
        console.log(totalMax)

        arrPercent = [...arrTotal]
        var arrColorPercent = [...arrTotal]

        arrPercent.forEach((element, index) => {
            arrPercent[index] = (element / totalMax) * 100;
        });
        arrColorPercent.forEach((element, index) => {
            if (arrPercent[index] < 21) {
                arrColorPercent[index] = "bg-danger"
            } else if (arrPercent[index] > 20 && arrPercent[index] < 41) {
                arrColorPercent[index] = "bg-warning"
            } else if (arrPercent[index] > 40 && arrPercent[index] < 61) {
                arrColorPercent[index] = ""
            } else if (arrPercent[index] > 60 && arrPercent[index] < 81) {
                arrColorPercent[index] = "bg-info"
            } else if (arrPercent[index] > 80 && arrPercent[index] < 101) {
                arrColorPercent[index] = "bg-success"
            }
        });
        console.log(arrPercent)

        for (let i = 0; i < arrDive.length; i++) {
            if (i < arrDive.length / 4) {
                dataDiveSite.innerHTML += `
                <h4 class="small font-weight-bold">`+ arrDive[i] + `<span
                    class="float-right">`+ arrTotal[i] + `</span></h4>
                <div class="progress mb-4">
                <div class="progress-bar `+ arrColorPercent[i] + `" role="progressbar" style="width: ` + arrPercent[i] + `%"
                    aria-valuenow="`+ arrPercent[i] + `" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `
            } else if (i > arrDive.length / 4 && i < arrDive.length / 2) {
                dataDiveSite2.innerHTML += `
                <h4 class="small font-weight-bold">`+ arrDive[i] + `<span
                    class="float-right">`+ arrTotal[i] + `</span></h4>
                <div class="progress mb-4">
                <div class="progress-bar `+ arrColorPercent[i] + `" role="progressbar" style="width: ` + arrPercent[i] + `%"
                    aria-valuenow="`+ arrPercent[i] + `" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `
            } else if (i > arrDive.length / 2 && i < (arrDive.length / 2 + arrDive.length / 4)) {
                dataDiveSite3.innerHTML += `
                <h4 class="small font-weight-bold">`+ arrDive[i] + `<span
                    class="float-right">`+ arrTotal[i] + `</span></h4>
                <div class="progress mb-4">
                <div class="progress-bar `+ arrColorPercent[i] + `" role="progressbar" style="width: ` + arrPercent[i] + `%"
                    aria-valuenow="`+ arrPercent[i] + `" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `
            } else if (i > (arrDive.length / 2 + arrDive.length / 4) && i < arrDive.length) {
                dataDiveSite4.innerHTML += `
                <h4 class="small font-weight-bold">`+ arrDive[i] + `<span
                    class="float-right">`+ arrTotal[i] + `</span></h4>
                <div class="progress mb-4">
                <div class="progress-bar `+ arrColorPercent[i] + `" role="progressbar" style="width: ` + arrPercent[i] + `%"
                    aria-valuenow="`+ arrPercent[i] + `" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `
            }

        }
    }, 2000);
}

function calcTotalDive(dataMaster) {
    console.log(dataMaster)
    var diveSite = dataMaster.map(function (e) {
        return e["dive site"];
    });

    var indices = [];

    diveSite.filter(function (yourArr, index) {
        if (yourArr == "Five Rocks") {
            indices.push(index)
        }
    });

    let uniqueDiveSite = [...new Set(diveSite)];

    for (let i = 0; i < uniqueDiveSite.length; i++) {
        var indices = [];

        diveSite.filter(function (yourArr, index) {
            if (yourArr == uniqueDiveSite[i]) {
                indices.push(index)
            }
        });
        console.log(indices)
        getTotalSpeciesByDiveSite(dataMaster, indices, species.value, uniqueDiveSite[i])
    }
    showTotalDive()
}

function getTotalSpeciesByDiveSite(db, dbDiveSite, species, diveSite) {
    var total = 0
    for (let i = 0; i < db.length; i++) {
        for (let j = 0; j < dbDiveSite.length; j++) {
            if (i == dbDiveSite[j]) {
                if (db[i][species] !== "") {
                    total += parseInt(db[i][species])
                }
            }
        }
    }
    console.log(total, diveSite)
    arrTotal.push(total)
    arrDive.push(diveSite)
    // totalFound.innerHTML = total
}

var dataList = []

fetch('js/data.json')
    .then((response) => response.json())
    .then((json) => {
        dataList = json
        // var labels = json.map(function (e) {
        //   return e.date;
        // });
        // var data = json.map(function (e) {
        //     if (e["Reef Black Tip "] == "") {
        //         json.set('Reef Black Tip ', 0)
        //     }
        //     console.log(e["Reef Black Tip "])
        //     return e["Reef Black Tip "];
        // });
        var visibilityAvg = json.map(function (e) {
            return e.visibility;
        });
        // console.log(mode(visibilityAvg))
        visibility.innerHTML = mode(visibilityAvg)

        var diveSite = json.map(function (e) {
            return e["dive site"];
        });

        // var indices = [];

        // diveSite.filter(function (yourArr, index) {
        //     if (yourArr == "Five Rocks") {
        //         indices.push(index)
        //     }
        // });
        // console.log(indices)


        let uniqueDiveSite = [...new Set(diveSite)];
        totalSite.innerHTML = uniqueDiveSite.length

        // console.log(diveSite)
        // console.log(uniqueDiveSite);

        species.innerHTML = ""
        var keys = Object.keys(json[0])
        var keySpecies = keys.splice(6, keys.length)
        for (let i = 0; i < keySpecies.length; i++) {
            species.innerHTML += `<option value="` + keySpecies[i] + `">` + keySpecies[i] + `</option>`
        }
        // console.log(keys.splice(6, keys.length))

        getTotalSpecies(json, species.value)

        // for (let i = 0; i < uniqueDiveSite.length; i++) {
        //     var indices = [];

        //     diveSite.filter(function (yourArr, index) {
        //         if (yourArr == uniqueDiveSite[i]) {
        //             indices.push(index)
        //         }
        //     });
        //     getTotalSpeciesByDiveSite(json, indices, species.value, uniqueDiveSite[i])
        // }
        // loadArea(json, species.value)
        calcTotalDive(json)
    });
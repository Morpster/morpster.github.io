var initImage = document.getElementById("F1");
var parentIDs = ["U1", "F1", "F2", "F3", "F4", "F5"];

function changeFloor(image, floor) {
    for (i in parentIDs) {
        document.getElementById(parentIDs[i]).style.display = 'none';
    }
    document.getElementById(floor).style.display = 'block';
    document.getElementById("initImage").src = image;
}
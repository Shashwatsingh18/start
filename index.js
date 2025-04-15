// //assign terms
// const length = document.querySelector("#beamlength");
// const width = document.querySelector("#width");
// const depth = document.querySelector("#depth");
// const load = document.querySelector("#load");
// const y = document.querySelector("#y");
// let length_v, width_v, depth_v, load_v, y_v;

// document.querySelector("#calculate").addEventListener("click", ()=>{
//     const optionValue = document.querySelector("#options").value;
//     //store the values
//     length_v= parseFloat(length.value);
//     width_v= parseFloat(width.value);
//     depth_v= parseFloat(depth.value);
//     load_v= parseFloat(load.value);
//     y_v = parseFloat(y.value);
//     console.log(optionValue);

//     // Initialise different values of M in different situations
//     if(length_v > 0 && depth_v>0 && load_v>=0 && width_v>0 && y_v>0){
//         let I = width_v*depth_v*depth_v*depth_v/12;
//         if(optionValue === "PointLoad"){
//             M = load_v * length_v / 4;
//         }else if(optionValue === "UDL"){
//             M = load_v * length_v * length_v / 8;
//         }
//         if(y_v <= depth_v/2){
//             let bendingstress = M*y_v/I;
//             console.log(M);
//             document.querySelector("#M").innerHTML= M;
//             document.querySelector("#I").innerHTML= I;
//             document.querySelector("#result").innerHTML= bendingstress;

//         }else{
//             document.getElementById("#error_msg").style.visibility = "visible";
//             document.querySelector("#error").innerHTML = "y should be less than half of depth";
//         }
//     }else if(length_v<0 || depth_v<0 || load_v<0 || width_v<0 || y_v<0){
//         I=0;
//         M=0;
//         bendingstess=0;
//         console.log("enter a valid value");
//         document.getElementById("#error_msg").style.visibility = "visible";
//         document.querySelector("#error").innerHTML = "enter a valid value";
//     }
    
// })

// Assign terms
const length = document.querySelector("#beamlength");
const width = document.querySelector("#width");
const depth = document.querySelector("#depth");
const load = document.querySelector("#load");
const y = document.querySelector("#y");
const material = document.querySelector("#material");
const position = document.querySelector("#position");
const pointLoadPosInput = document.querySelector("#pointLoadPosInput");

let length_v, width_v, depth_v, load_v, y_v, pos_v;

document.querySelector("#options").addEventListener("change", () => {
    const optionValue = document.querySelector("#options").value;
    pointLoadPosInput.style.display = optionValue === "PointLoad" ? "block" : "none";
});

document.querySelector("#calculate").addEventListener("click", () => {
    const optionValue = document.querySelector("#options").value;

    // Store values
    length_v = parseFloat(length.value);
    width_v = parseFloat(width.value);
    depth_v = parseFloat(depth.value);
    load_v = parseFloat(load.value);
    y_v = parseFloat(y.value);
    pos_v = parseFloat(position.value);

    let E;
    switch (material.value) {
        case "Steel":
            E = 200 * Math.pow(10, 9); // in Pascals
            break;
        case "Aluminum":
            E = 70 * Math.pow(10, 9);
            break;
        case "Wood":
            E = 10 * Math.pow(10, 9);
            break;
    }

    if (length_v > 0 && depth_v > 0 && load_v >= 0 && width_v > 0 && y_v > 0) {
        let I = (width_v * Math.pow(depth_v, 3)) / 12;
        let M;

        if (optionValue === "PointLoad") {
            if (pos_v > 0 && pos_v < length_v) {
                const a = pos_v;
                const b = length_v - a;
                M = (load_v * 9.81 * a * b) / length_v; // converted kg to N
            } else {
                document.querySelector("#error_msg").style.visibility = "visible";
                document.querySelector("#error").innerHTML = "Position must be within beam length";
                return;
            }
        } else if (optionValue === "UDL") {
            M = (load_v * 9.81 * length_v * length_v) / 8;
        }

        if (y_v <= depth_v / 2) {
            let bendingstress = (M * y_v) / I;
            document.querySelector("#M").innerHTML = M.toFixed(2) + " Nm";
            document.querySelector("#I").innerHTML = I.toExponential(2) + " m⁴";
            document.querySelector("#result").innerHTML = bendingstress.toFixed(2) + " Pa";
            document.querySelector("#error_msg").style.visibility = "hidden";
        } else {
            document.querySelector("#error_msg").style.visibility = "visible";
            document.querySelector("#error").innerHTML = "y should be less than half of depth";
        }
    } else {
        document.querySelector("#error_msg").style.visibility = "visible";
        document.querySelector("#error").innerHTML = "Enter all values correctly";
    }
});
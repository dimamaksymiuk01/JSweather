// export function loading (state) {
//     const load = document.querySelector ('.load') 
   
//     if (state) {
//         load.innerHTML = `
//             <div class="loadingio-spinner-bean-eater-qctdxfxbhxa"><div class="ldio-asmd46sztfh">
//             <div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
//             </div></div>
//         `
//     }
//     else {
//         load.style.display = "none";
//     }

// }


window.onload = function () {
    let preloader = document.getElementById('preloader');
    setTimeout(()=> {
        preloader.style.display = 'none';
    }, 1500)
}
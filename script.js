const form = document.querySelector('form');
const inputButton = form.querySelector('button');
const inputText = form.querySelector('input[name="namePerson"]');
const areaList = document.querySelector('.widget:last-child .content-widget');

inputButton.addEventListener('click', addList);

localStorage.listIndex = localStorage.listIndex;

if(localStorage.listIndex == 'undefined'){
    localStorage.listIndex = ''
} else{
    localStorage.listIndex = localStorage.listIndex;
}


let circleColor = [
    '175, 29, 29',  // Carnelian
    '214, 113, 46', // Ochre
    '214, 175, 46', // Gold (Metallic)
    '192, 202, 46', // Acid Green
    '129, 202, 46', // Dark Lemon Lime
    '34, 172, 69',  // American Green
    '50, 192, 15',  // Yellow-Green
    '50, 140, 19',  // Slimy Green
    '50, 52, 192',  // Persian Blue
    '64, 67, 233',  // Palatinate Blue
    '21, 166, 233', // Button Blue
    '191, 21, 233', // Vivid Mulberry
    '233, 21, 205', // Hot Magenta
    '153, 50, 139', // Violet (Crayola)
    '144, 50, 153', // Cadmium Violet
    '153, 50, 98',  // Amaranth Deep Purple
    '153, 50, 55'   // Japanese Carmine
];

let index_circleColor = 0;

function updateList(){

    list = localStorage.listIndex.split(',')

    for(let index = 0; index < list.length; index++){
        if(list[index] === ''){
            list.splice(index, 1)
        }
    };

    index_circleColor = 0;
    
    list.map((item)=>{

        if(areaList.querySelector('ul') === null){
            areaList.innerHTML = '<ul></ul>';
        }

        areaList.querySelector('ul').innerHTML += `<li>${item}</li>`;
    });

    random_Color_Circle_List()
}

updateList();




function random_Color_Circle_List(){

    if(areaList.querySelectorAll('ul li').length !== 0){

        areaList.querySelectorAll('ul li').forEach((el, i)=>{
            index_circleColor++;
    
            if(circleColor[index_circleColor] === undefined) {
                circleColor.splice(index_circleColor, 1)

                index_circleColor = 0;
            };
    
            el.setAttribute('style', `order: -${i}; --border-color:${circleColor[index_circleColor]};`)
        });
    }
}

function addList(e){
    e.preventDefault();

    if(inputText.value.length !== 0){

        localStorage.listIndex += `${inputText.value},`;

        inputText.value = '';
        areaList.innerHTML = '';

        updateList()
    }   
}
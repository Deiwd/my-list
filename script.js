const form = document.querySelector('form');
const inputButton = form.querySelector('button');
const inputText = form.querySelector('input[name="namePerson"]');
const areaList = document.querySelector('.widget:last-child .content-widget');
const models = document.querySelector('.models');

inputButton.addEventListener('click', addList);

localStorage.listIndex = localStorage.listIndex;

if(localStorage.listIndex == 'undefined'){
    localStorage.listIndex = ''
} else{
    localStorage.listIndex = localStorage.listIndex;
}

let list;

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

let index_circleColor;


let updateList = () => {

    list = localStorage.listIndex.split('[separator]')
    

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

        //areaList.querySelector('ul').innerHTML += `<li><p contenteditable="false">${item}</p></li>`;
        areaList.querySelector('ul').innerHTML += `<li><textarea disabled>${item}</textarea></li>`;
    });

    random_Color_Circle_List()
}

updateList();


function random_Color_Circle_List(){

    if(areaList.querySelectorAll('ul > li').length !== 0){

        areaList.querySelectorAll('ul > li').forEach((el, i)=>{
            index_circleColor++;

            let more = models.querySelector('.more').cloneNode(true);
    
            if(circleColor[index_circleColor] === undefined) {
                circleColor.splice(index_circleColor, 1)

                index_circleColor = 0;
            };
    
            el.setAttribute('style', `order: -${i}; --border-color:${circleColor[index_circleColor]};`)

            el.appendChild(more);

            more_Options(el, i);
        });

    }
}

function addList(e){
    e.preventDefault();

    if(inputText.value.length !== 0){

        localStorage.listIndex += `[separator]${inputText.value}[separator]`;

        inputText.value = '';
        areaList.innerHTML = '';

        updateList()
    }   
}

function more_Options(el, index){   

    const textArea = el.querySelector('textarea');

    el.querySelector('.more > button').onclick = show_moreOptions;
    el.querySelector('.editItem').onclick = editItem_moreOptions;
    el.querySelector('.deletItem').onclick = deleteItem_moreOptions;

    function heightAuto_textArea(){
        textArea.style.height = "1.91em";

        if(textArea.scrollHeight > textArea.clientHeight){
            textArea.style.height = `${textArea.scrollHeight}px`;
        }
    }

    heightAuto_textArea();

    function show_moreOptions(item){
        if(item.currentTarget.closest('.more').classList.contains('actived')){

            areaList.querySelector('ul > li .more-options.show').classList.remove('show');

            item.currentTarget.closest('.more').classList.remove('actived');
            el.querySelector('.more-options').classList.remove('show');
        } else{

            if(areaList.querySelector('ul > li .more-options.show') !== null){

                areaList.querySelector('ul > li .more.actived').classList.remove('actived');
                areaList.querySelector('ul > li .more-options.show').classList.remove('show');
            }
            item.currentTarget.closest('.more').classList.add('actived');
            el.querySelector('.more-options').classList.add('show');
        }
    }

    function deleteItem_moreOptions(){

        list.splice(index, 1);

        editList();
    }

    function editItem_moreOptions(e){
        textArea.removeAttribute('disabled');
        textArea.select();

        textArea.addEventListener('keyup', editItem_value);
        
        this.closest('.more').classList.remove('actived');
        this.closest('.more-options').classList.remove('show');
    }

    function editItem_value(e){

        if(e.currentTarget.value.length > 0 && e.keyCode !== 13){

            if(e.keyCode == 13){
                areaList.innerHTML = '';
                updateList()
            }

            list[index] = this.value;

            localStorage.listIndex = list.join('[separator]');
            localStorage.listIndex = localStorage.listIndex;

        } else{
            areaList.innerHTML = '';
            updateList();
        }
        
        heightAuto_textArea();

        setTimeout(()=>{
            if(el.querySelector('textarea:focus')){}
            else 
            {
                areaList.innerHTML = '';
                updateList();  
            }
        },100);
    }

    
}

function editList(){

    localStorage.listIndex = list.join('[separator]');

    localStorage.listIndex = localStorage.listIndex;

    areaList.innerHTML = '';

    updateList();
}
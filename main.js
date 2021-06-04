function createDomElement(eleName,className=" ",idName=" "){
const ele = document.createElement(eleName);
 className!=" "?ele.setAttribute("class",className):className=" ";
  idName!=" "?ele.setAttribute("id",idName):idName=" ";
  return ele
}



const container = createDomElement('div','container');
document.body.appendChild(container);
const page = createDomElement('div','page');
container.appendChild(page);
const prev = createDomElement('div','prev')
prev.innerHTML="Previous";
page.appendChild(prev);
const unOrder = createDomElement('ul','unOrder');
page.appendChild(unOrder);
const next = createDomElement('div','next');
page.appendChild(next);
next.innerHTML="Next";
//for spinner loading animation
const spinner = createDomElement('img','spinner');
spinner.setAttribute('src','./make-animated-logo-loader-for-your-website.gif');
spinner.setAttribute('alt','loading...');
container.appendChild(spinner);
const url ='https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';

spinner.style.display="grid";
page.style.display="none";
// container.style.display="none";
const data = async ()=>{
  try{
    
    const result = await fetch(url);
    const finalResult =await result.json();
    

    function chunkArray(myArray, chunk_size){
      var results = [];
      
      while (myArray.length) {
          results.push(myArray.splice(0, chunk_size));
      }
      
      return results;
    }
    
    // Split in group of 3 items
    var chunckedData = chunkArray(finalResult, 10);
    
    // mainFunction(chunckedData,0)
    const keyData = Object.keys(chunckedData[0][0]);
    mainFunction(chunckedData[0],0,keyData);

    spinner.style.display="none";
    page.style.display="grid";
    // container.style.display="auto";

    chunckedData.forEach((item,i)=>{
       let list = createDomElement('li',`li${i+1} list`);
       list.innerHTML = i+1;
       unOrder.appendChild(list);

     unOrder.firstChild.classList.add('liStyle')
      // da.style.backgroundColor="red";
       
       //call by numbers
       movement(chunckedData,0,keyData);

       list.addEventListener('click',function(){
         //for current color of page
       

        colorChange(i)

        let index =  this.innerHTML;
         mainFunction(item,index,keyData);
         this.style.backgroundColor="none";
         let toParse=parseInt(index);
         newFunc(chunckedData,toParse,keyData);
        
       })
      
       
    })
   
    
  }
  catch(error){
    console.log("data getting error");
  }

  //for button to next, previous button
 
  function newFunc(item,index,keyData){
    console.log(index-1);
    movement(item,index-1,keyData);
  }



//for previous and next button

  function movement(item,n,keyData){
    
    
    prev.addEventListener('click',function(){
      if(n>0){
        n=n-1;
        
        mainFunction(item[n],parseInt(n),keyData);
        colorChange(n);
        
      }
      if(n==0){
        return mainFunction(item[n],parseInt(n),keyData);
      }
      // console.log(item,n,keyData);
    
    })
   
    next.addEventListener('click',function(){
    
      
      // 
      if(n>=0 &&n<chunckedData.length-1){
        n=n+1;
       
        mainFunction(item[n],parseInt(n),keyData);
        colorChange(n);
         }
        //  console.log(item,n,keyData);
       
        if(n==chunckedData.length-1){
          return mainFunction(item[n],parseInt(n),keyData);
        }
        
      })
   }
  
  
}



function colorChange(i){
  let getListData = document.getElementsByClassName(`li${i+1}`);
  let bbb= Array.from(getListData);
  let getNewListData = document.getElementsByClassName('list')
 let ccc = Array.from(getNewListData);
 ccc.forEach((item)=>{
   item.classList.remove('liStyle');
 })
  bbb[0].classList.add('liStyle');
  // bbb[0].style.transform="scale(1.2)"
}



const table = createDomElement('table','table');
container.appendChild(table);


function mainFunction(item,i,keyData){
 
  // console.log(item,i.toString(),keyData);
  table.innerHTML =" ";
  let thead = createDomElement('thead','thead');
  table.appendChild(thead);
  let th1 = createDomElement('th','th1');
 th1.innerHTML = keyData[0].toLocaleUpperCase();
 thead.appendChild(th1);
 let th2 = createDomElement('th','th2');
 th2.innerHTML = keyData[1].toLocaleUpperCase();
 thead.appendChild(th2);
 let th3 = createDomElement('th','th3');
 th3.innerHTML = keyData[2].toLocaleUpperCase();
 thead.appendChild(th3);
let tbody = createDomElement('tbody','tbody');
table.appendChild(tbody);


 item.forEach(item=>{
   let tr = createDomElement('tr',"tr");
   tbody.appendChild(tr);
   let td1 = createDomElement('td','td1')
   td1.innerHTML=item.id;
   tr.appendChild(td1);
   let td2 = createDomElement('td','td2')
   td2.innerHTML=item.name;
   tr.appendChild(td2);
   let td3 = createDomElement('td','td3')
   td3.innerHTML=item.email;
   tr.appendChild(td3);
 })
}
  

 
 
//  function mainFunction(item,i){
//   const table = createDomElement('table','table');
//   function mainFunction(i){
//       const thead = createDomElement('thead','thead');
//       const th1= createDomElement('th1','th1');
      
//   }

//  }


 

data();

import data from './data.json' assert { type: 'json' };
"use strict"
//console.log(data);
var totaldata_size=data.length; //Total data size 
function gridstructure(data)
{
let real_data = ""; // card_list_html
let count = 0;

// loop for render the all objects from json dataset
    for(let i = 0; i < data.length; i++)
    {
        count+=1;
        // console.log(localStorage.getItem(data[i].id))
        real_data+=`<div class="mobile-wrapper">
            <div class="mobile-section">
                <div class="card-symbols">
                    <div class="status-symbols">
                        <div class="status-new status">
                            ${newfunction(data[i]['new-status'])}
                        </div>
                        <div class="status-sale status">
                            ${salefunction(data[i].sale)}
                            
                        </div>
                    </div>
                    
                </div>

                <div class="favourite-symbol ">
                        <div >${favouritefunction(data[i].id)}</div>
                    </div>
                <div class="mobile-image">
                        <div class="hover-window">
                        <div class="cart-add-button"><p class="hovered-window hovered-cart-button added-cart" ><a href="#" id="cart-add">ADD TO CART</a></p></div>
                        <p class="hovered-window hovered-view-button">VIEW GALLERY</p>
                    </div>
                    <img src=${data[i].image} alt="image" class="image-cls">
                </div>
                <div class="addcart-button ">
                    <div class="cart-button">
                        <button class="cart-main-button cart-gallary-button cart-add added-cart ${data[i].id}" >ADD TO CART</button>
                    </div>
                    <div class="gallary-button ">
                        <button class="gallary-main-button cart-gallary-button">VIEW GALLARY</button>
                    </div>
                </div>
                <div class="mobile-body-data">
                    <div class="mobile-name"><span>${data[i].name}</span>
                    <span>${data[i].specification}</span></div>
                    <div class="stars">
                    ${starupdation(data[i].star)}
                        <span class="total-reviews">(${data[i]['review-count']})</span>
                    </div> 
                    <div class="mobile-data-footer">
                    <span>$${data[i].price}</span>
                    <span class="original-price"><del>${data[i]['orginal-price']}</del></span>
                    <span>${data[i].offer}</span>
                    </div>
                    <div class="color-section">
                        <span class="yellow-circle color-circle"></span>
                        <span class="black-circle color-circle"></span>
                        <span class="grey-circle color-circle"></span>
                    </div>
                </div>
            </div>
        
        </div>
                `
    }


    document.getElementById("mobile-items").innerHTML=real_data;
    //condition for displaying the resulted count of fetched data
    if(data.length==0)
    {
        document.getElementById("sort-results").innerHTML="No mobiles are found"
    }
    else{
    document.getElementById("sort-results").innerHTML="Showing " + data.length + " of "+ totaldata_size + " results for \"phones\"";
    }
    document.getElementById("mobile-filter-result").innerHTML="Total "+count+" mobiles are found.";
   

    //calling function to add event listners every time new data is added as well as functionality to increment or decrement of favourites item 
    //count and modification of colors of symbol
    addinglikes(data);
    
   
    //calling function for increment or decrement the count of cart-list
    addingcart(data);
    console.log(localStorage.getItem("selected_heart"));

}
gridstructure(data);
    function favouritefunction(id)
    {
        if(localStorage.getItem(id)=='true')
        {
            return  `<i class="fa-sharp fa-lg fa-regular fa-heart favourite-icon red" id="${id}" ></i>`
        }
        else{
            return `<i class="fa-sharp fa-lg fa-regular fa-heart favourite-icon" id=${id}></i>`
        }
    }
    //  called function for increment or decrement the count of favourite -items/wishlist
    var counter=localStorage.getItem("counter");
    function addinglikes(data){
    var likes=document.getElementsByClassName("favourite-icon");
    
    
    for( var iterator=0 ;iterator<data.length ;iterator++ )
    {   
        document.getElementById("wishcount").innerHTML=counter;
        var temp=likes[iterator]
        
        temp.addEventListener("click",function()
        {
            console.log(console.log(localStorage.getItem(this.id)=='true'));
            document.getElementById("wishcount").innerHTML=counter;
            if(localStorage.getItem(this.id)=='true')
            {
                localStorage.setItem(this.id,false);
                counter--;
                
                localStorage.setItem("counter",counter);

                document.getElementById("wishcount").innerHTML=counter;
                favouritefunction(this.id);
                gridstructure(data);
            }
            else{
                localStorage.setItem(this.id,true)
                counter++;
                localStorage.setItem("counter",counter);
                document.getElementById("wishcount").innerHTML=localStorage.getItem("counter");
                favouritefunction(this.id);
                gridstructure(data);
            }
        })
    }
    }
    

  
     //called function for increment or decrement the count of cart-list
     var cart_counter=0;
    function addingcart(data)
    {
        var cart=document.getElementsByClassName("added-cart");
        

        for(var iterator=0;iterator<(data.length)*2;iterator++)
        {
        
            document.getElementById("cart-count").innerHTML=cart_counter;
            var temp=cart[iterator];
            
            temp.style.color="white";
        
            temp.addEventListener("click",function()
            {
                if(this.style.color=="white")
            {
                cart_counter++;
                document.getElementById("cart-count").innerText=cart_counter;
                this.innerHTML="ADDED TO CART";
                this.style.color="#FFFAFA";
            }
            else 
            {
                cart_counter--;
                document.getElementById("cart-count").innerText=cart_counter;
                this.innerHTML="ADD TO CART";
                this.style.color="white";
            }
            })
        }
    }
    
    //passing the orginal json data to card template 
    var phones=document.getElementById("phones");
    phones.addEventListener("click",gridstructure(data));
    //pricing side bar toggling
    var price=document.getElementById("price-collapse");
    price.addEventListener("click",pricecollapsefunction);
    function pricecollapsefunction()
    {
        let x=document.getElementById("range-slider");
        if(x.style.display=="none")
        {
            x.style.display="flex";
        }
        else{
            x.style.display="none";
        }
    }

    //brand side bar toggling
    var brand=document.getElementById("brand-collapse");
    brand.addEventListener("click",brandcollapsefunction);
    function brandcollapsefunction()
    {
        var x=document.getElementById("brand");
        if(x.style.display=="none")
        {
            x.style.display="flex";
        
        }
        else{
            x.style.display="none";
        }
    }
    //mobile sort by option toggling
    var sortby=document.getElementById("sortby");
    sortby.addEventListener("click",sortbycollapse);
    function sortbycollapse()
    {
        var x=document.getElementById("sortby-menu");
        if(x.style.display=="none")
        {
            x.style.display="flex";
        }
        else{
            x.style.display="none";
        }
    }
    //functionality to display checked brand mobile cards
    var brandsort=document.getElementById("present-phone-brands");
    brandsort.addEventListener("change",gatherclickeditems);
    function gatherclickeditems()
    {
        var checkeddata=document.querySelectorAll("input[type=checkbox]")
        var mainstc=[]
        var stack=[]
        var temp=data
        for(var i=0;i<checkeddata.length;i++)
        {
            if(checkeddata[i].checked)
            {   
                for(var j=0;j<temp.length;j++)
                {
                    if(temp[j].brand==checkeddata[i].value)
                    {
                        stack.push(temp[j]);
                    }
                }
                document.getElementById("mobile-items").innerHTML="";
                // //console.log(stac)
            }
            if(!stack.length==0)
                {   
                    
                    gridstructure(stack)
                }
                else{
                    //console.log(data);
                    gridstructure(data);
                }
        }
  
}

//creating event listners and their respection trigger functions for rating-sort , pricing-sort and sorting based on new tags
var mobileratingsort=document.getElementById("sortby-ratings");
mobileratingsort.addEventListener("click",ratingsort);
var mobilepricesort=document.getElementById("sortby-price");
mobilepricesort.addEventListener("click",lowhighsort);
var mobilenewsort=document.getElementById("sortby-new");
mobilenewsort.addEventListener("click",newestfunction);

//function will create styles for individual card based on mobile card rating property
function starupdation(star)
{
    var starline="";
    for(var i=0;i<5;i++)
    {   if(i<star){
        starline+=`<span class="rated-star">&starf;</span>`
        }
        else{
            starline+=`<span class="unrated-star">&starf;</span>`  
            
        }
    }
    return starline;
}
 //function will create the "new" tags on card based on individual objects
function newfunction(newstat)
{
    if(newstat=="NEW")
    return `<p>NEW</p>`;
    else
    return "";

}
 //function will create the "sale" tags on card based on individual objects
function salefunction(newsale)
{
    if(newsale=="SALE")
    return `<p>SALE</p>`
    else
    return "";
}
//jquery code for slider display
var slidemin=0
var slidemax=0
$( "#slider-range" ).slider({
    range: true,
    min: 100,
    max: 200,
    values: [ 100,200 ],
    slide: function( event, ui ) {
        $( "#amount" ).val( ui.values[ 0 ] );
        $( "#amount2" ).val( ui.values[ 1 ] );
        var minval=ui.values[0];
        var maxval=ui.values[1];
        cardsofrange(minval,maxval);
    }
});

   $("#amount").change(function() {
        $("#slider-range").slider('values',0,$(this).val());
    });
    $("#amount2").change(function() {
      console.log($("#slider-range").slider('values',1,$(this).val()));

});
function cardsofrange(minval,maxval)
{
    console.log(data)
    document.getElementById("mobile-items").innerHTML="";
    var result=[]
    for(var iterator=0;iterator<data.length;iterator++)
    {
        if(data[iterator].price>=minval &&data[iterator].price<=maxval)
        {
            result.push(data[iterator]);
        }
    }
    console.log(result);
    gridstructure(result);
}
console.log(slidemin.values);

//adding event listners as well as sorting functionality as per the ratings
var ratings_button=document.getElementById("ratings");
ratings_button.addEventListener("click",ratingsort);
function ratingsort()
{
    document.getElementById("mobile-items").innerHTML = "";
    data.sort((product_a,product_b)=>(product_a.star<product_b.star)?1:-1);
    
    //console.log(data);
    
    gridstructure(data);
}
//adding event listners as well as sorting functionality as per the price range only from low-high
var low_high=document.getElementById("low-high");
low_high.addEventListener("click",lowhighsort);
function lowhighsort()
{
    document.getElementById("mobile-items").innerHTML="";
    data.sort((product_a,product_b)=>(product_a.price>product_b.price)?1:-1);
    gridstructure(data);
}
//adding event listners and extracting the cards only which had "new" tags
var newest=document.getElementById("newest");
newest.addEventListener("click",newestfunction);
function newestfunction()
{
    document.getElementById("mobile-items").innerHTML="";
    var newest_tag=[]
    data.forEach((objects,index)=>{
        if(objects['new-status']=="NEW")
        {
            
            newest_tag.push(data[index]);
        }
    })
    //console.log(newest_tag);
    gridstructure(newest_tag);
}
//function to add event listners and to extract the cards as per the mobile name
var gosearch=document.getElementById("go-search");
gosearch.addEventListener("click",searchdata);
function searchdata()
{
    var searchtext=document.getElementById("search-bar").value;
    var searchitems=[];
    searchtext=searchtext.toLowerCase();
    // alert(searchtext.toLowerCase());
    document.getElementById("mobile-items").innerHTML="";
    var newest_tag=[]
    data.forEach((objects,index)=>{
        if(objects.name.includes(searchtext))
        {
            searchitems.push(data[index]);
        }
    })
    //console.log(searchitems);
    gridstructure(searchitems);
    
}

var productContainer;
var productIndex=0;
if(localStorage.getItem("productList")==null){
    productContainer=[];
}
else{
    productContainer=JSON.parse(localStorage.getItem("productList"));
    display();
}
var productName = document.getElementById("ProductNameInp");
var productPrice = document.getElementById("ProductPriceInp");
var productCategory = document.getElementById("ProductCategoryInp");
var productDesc = document.getElementById("ProductDescInp");






function addProduct(){
    if(vaildationProductName()==true){
        var product={
            name:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            desc:productDesc.value
        };
        productContainer.push(product);
        localStorage.setItem("productList",JSON.stringify(productContainer));
        display();
        clearForm();
        document.getElementById("valdationText").innerHTML="";

    }
    else{
        document.getElementById("valdationText").innerHTML="product name is in-valde ";
        document.getElementById("ProductNameInp").style.border="1px solid red";
    }
    
    
}

function display(){
    var cartonna=``;
    for(var i=0; i<productContainer.length;i++){
        cartonna+=`<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button onclick="updateProduct(`+i+`);" class=" btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(`+i+`);" class=" btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("TAB").innerHTML=cartonna;
}

function clearForm(){
    productName.value="";
    productCategory.value="";
    productDesc.value="";
    productPrice.value="";
}

function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("productList",JSON.stringify(productContainer));
    display();

}

function search(char){
    var cartonna=``;
    for(var i=0;i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(char.toLowerCase())){
            cartonna+=`<tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].desc}</td>
            <td><button onclick="updateProduct(`+i+`);" class=" btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(`+i+`);" class=" btn btn-outline-danger">Delete</button></td>
            </tr>`;
        }
        else{
            console.log("no match found");
        }
    }
    document.getElementById("TAB").innerHTML=cartonna;

}

function updateProduct(index) {
    productName.value=productContainer[index].name;
    productCategory.value=productContainer[index].category;
    productDesc.value=productContainer[index].desc;
    productPrice.value=productContainer[index].price;
    document.getElementById("updateBtn").style="display:inline;";  
    productIndex=index;
    
}
function update(){
    
    productContainer[productIndex].name=productName.value;
    productContainer[productIndex].category=productCategory.value;
    productContainer[productIndex].desc=productDesc.value;
    productContainer[productIndex].price=productPrice.value;
    localStorage.setItem("productList",JSON.stringify(productContainer));
    document.getElementById("updateBtn").style="display:none;";  
    display();
    clearForm();
}

function vaildationProductName() {
    var regx=/^[A-Z][a-z]{2,10}$/;
    if(regx.test(productName.value)==true){
        return true;
    }
    else{
        return false;
    }
}

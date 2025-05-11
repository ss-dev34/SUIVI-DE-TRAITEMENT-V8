//main variable
let nom_comercial=document.getElementById("nom_comercial");
let date_expiration=document.getElementById("date_expiration");
let categorie=document.getElementById("categorie");

let LMR_UE_LMR_GB=document.getElementById("lmr_ue_gb");

let observation=document.getElementById("observation");
let matiere_active=document.getElementById("matiere_active");
let dose=document.getElementById("dose");
let dose_par=document.getElementById("dose_par");
let cible=document.getElementById("cible");
let dar=document.getElementById("dar");
let reentree=document.getElementById("reentree");
let nbr_application=document.getElementById("nbr_application");
// modifide variables
let nom_comercial_modifide=document.getElementById("nom_comercial_modifide");

let date_expiration_modifide=document.getElementById("date_expiration_modifide");
let categorie_modifide=document.getElementById("categorie_modifide");
let LMR_UE_LMR_GB_modifide=document.getElementById("lmr_ue_gb_modifide");
let observation_modifide=document.getElementById("observation_modifide");


let matiere_active_modifide=document.getElementById("matiere_active_modifide");
let dose_modifide=document.getElementById("dose_modifide");
let dose_par_modifide=document.getElementById("dose_par_modifide");
let cible_modifide=document.getElementById("cible_modifide");
let dar_modifide=document.getElementById("dar_modifide");
let reentree_modifide=document.getElementById("reentree_modifide");
let nbr_application_modifide=document.getElementById("nbr_application_modifide");
let Modifide_Pro_Name=document.getElementById("Modifide_Pro_Name");
//////
 //download_button
 let downloadBTN=document.getElementById("downloadBTN");

//helper variables
let Pro_Name = document.getElementById("Pro_Name");

let Pro_Quantity = document.getElementById("Pro_Quantity");

//models bs
let input_validaton = new bootstrap.Modal(document.getElementById('input_validation'));
let input_modifide_validation = new bootstrap.Modal(document.getElementById('input_modifide_validation'));
let Produit_inputs_Modifier = new bootstrap.Modal(document.getElementById('Produit_inputs_Modifier'));
let Toust = new bootstrap.Toast(document.getElementById('Toast'));



//delet temporary variable
let delet_temp;
//modification temporary variable
let Modifide_Produit_temp;
//initialization de stockage
let list_produits;
        if(localStorage.list_produits!=null) {
                list_produits=JSON.parse(localStorage.list_produits)
        }else{list_produits=[];}

//fonction de calcule la quantity
function get_quantity(){
    Pro_Quantity.innerText=list_produits.length;
}



//fonction de l addition 
function Ajouter(){
    //text
    let list_of_items=[nbr_application,LMR_UE_LMR_GB,observation]
    //&& nbr_application.value !== ""
    if(nom_comercial.value !== "" && matiere_active.value !== "" && dose.value !== "" && dose_par.value !== "" && cible.value !== "" && dar.value !== "" && reentree.value !== ""  && categorie.value !== ""){
        console.log("i am worcking")

        list_of_items.forEach(val=>{
            if(val.value==""){
                val.value="-";
            }
        })



        let NewProduit = {
            nom_comercial: nom_comercial.value,
            date_expiration: date_expiration.value,
            categorie: categorie.value, 
            LMR_UE_LMR_GB: LMR_UE_LMR_GB.value, 
            matiere_active: matiere_active.value,
            cible:cible.value,
            dose: dose.value,
            dose_par: dose_par.value,
            dar: dar.value,
            nbr_application: nbr_application.value,
            reentree: reentree.value,
            observation: observation.value
        }

        const forms = document.querySelectorAll('form');
        const form = forms[0];

        Array.from(form.elements).forEach((input) => {
        input.value="";
            });

    

        list_produits.push(NewProduit);
        localStorage.setItem('list_produits',JSON.stringify(list_produits));
        Toust.show()
    }else{
        input_validaton.show();
    }

   
    get_quantity()
    ShowData()
  
}

//fonction de l'affichage
function ShowData (){
    let table="";
    
    for (let i=0; i<list_produits.length;i++){
        
        table+=`
        <tr>
            <td>${list_produits[i].nom_comercial}</td>
            <td>${list_produits[i].date_expiration}</td>
            <td>${list_produits[i].categorie}</td>
            <td>${list_produits[i].matiere_active}</td>
            <td>${list_produits[i].cible}</td>
            <td>${list_produits[i].dose}</td>
            <td>${list_produits[i].dose_par}</td>
            <td>${list_produits[i].dar}</td>
            <td>${list_produits[i].LMR_UE_LMR_GB}</td>
            <td>${list_produits[i].nbr_application}</td>
            <td>${list_produits[i].reentree}</td>
            <td>${list_produits[i].observation}</td>
            <td class="w-100 ">
                <div class="h-100 " >
                    <button onclick= "ModifyProp(${i})" type="button" class="btn btn-warning m-1"><i class="bi bi-pencil-square"></i></button>
                    <button onclick="DeleteProp(${i})" type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#delet_v"><i class="bi bi-trash3"></i></button>
                </div>
                
            </td>
        </tr>
        `;
        
    }
    document.getElementById("tbody").innerHTML=table;
    get_quantity()
    downloadBTN_validation()
}


//fonctions de suppression
function DeleteProp(index){
    Pro_Name.innerText = list_produits[index].nom_comercial;
    delet_temp = index;
}
function Delete(){
    list_produits.splice(delet_temp,1);
    localStorage.setItem('list_produits',JSON.stringify(list_produits));
    ShowData();
    delet_temp = null;
    get_quantity()
    Toust.show()

}

//fonction de modification
function ModifyProp(index){
    Produit_inputs_Modifier.show();
    Modifide_Pro_Name.innerText = list_produits[index].nom_comercial;
    nom_comercial_modifide.value = list_produits[index].nom_comercial;
    matiere_active_modifide.value = list_produits[index].matiere_active;
    dose_modifide.value = list_produits[index].dose;
    dose_par_modifide.value = list_produits[index].dose_par;
    cible_modifide.value = list_produits[index].cible;
    dar_modifide.value = list_produits[index].dar;
    reentree_modifide.value = list_produits[index].reentree;
    nbr_application_modifide.value = list_produits[index].nbr_application;
    date_expiration_modifide.value = list_produits[index].date_expiration;
    categorie_modifide.value = list_produits[index].categorie;
    LMR_UE_LMR_GB_modifide.value = list_produits[index].LMR_UE_LMR_GB;
    observation_modifide.value = list_produits[index].observation;
    Modifide_Produit_temp = index;
}

function Modify(){
    let list_of_items=[nbr_application_modifide,LMR_UE_LMR_GB_modifide,observation_modifide]
    if(nom_comercial_modifide.value !== "" && date_expiration_modifide.value !== ""  &&  matiere_active_modifide.value !== "" && dose_modifide.value !== "" && dose_par_modifide.value !== "" && cible_modifide.value !== "" && dar_modifide.value !== "" && reentree_modifide.value !== "" && categorie_modifide.value !== ""){

        list_of_items.forEach(val=>{
            if(val.value==""){
                val.value="-";
            }
        })

        list_produits[Modifide_Produit_temp].nom_comercial = nom_comercial_modifide.value;
        list_produits[Modifide_Produit_temp].matiere_active = matiere_active_modifide.value;
        list_produits[Modifide_Produit_temp].dose = dose_modifide.value;
        list_produits[Modifide_Produit_temp].dose_par = dose_par_modifide.value;
        list_produits[Modifide_Produit_temp].cible = cible_modifide.value;
        list_produits[Modifide_Produit_temp].dar = dar_modifide.value;
        list_produits[Modifide_Produit_temp].reentree = reentree_modifide.value;
        list_produits[Modifide_Produit_temp].nbr_application = nbr_application_modifide.value;
        list_produits[Modifide_Produit_temp].date_expiration = date_expiration_modifide.value;
        list_produits[Modifide_Produit_temp].categorie = categorie_modifide.value;
        list_produits[Modifide_Produit_temp].LMR_UE_LMR_GB = LMR_UE_LMR_GB_modifide.value;
        list_produits[Modifide_Produit_temp].observation = observation_modifide.value;
        localStorage.setItem('list_produits',JSON.stringify(list_produits));
        ShowData();
        Produit_inputs_Modifier.hide();
        get_quantity()
        Toust.show()
        Modifide_Produit_temp = null;
        }else{
        input_modifide_validation.show();
        }
    

}


//fonction pour convirtire json ou execl
function exportToExcel() {
    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(list_produits);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Save to Excel file
    XLSX.writeFile(workbook, "liste_positive.xlsx");
  }

//fonction pour convirtire json ou pdf
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape" });

    const title = "Liste Positive";
    doc.setFontSize(7); // Set title font size
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 10);
  
    const headers = Object.keys(list_produits[0]);
    const rows = list_produits.map(obj => headers.map(key => obj[key]));
  
    doc.autoTable({
      head: [headers],
      body: rows,
      styles: {
        fontSize: 8, 
        cellPadding: 2, 
      },
      headStyles: {
        fillColor: [52, 73, 94], // Optional: darker header for readability
        textColor: 255,
        fontSize: 9, // Header slightly bigger
        halign: 'center' 
      },
      bodyStyles: {
        halign: 'center' 
      },
      startY: 15,
      margin: { top: 10 }, // Optional: leave space at top
    });
  
    doc.save("liste_positive.pdf");
  }
  



//fonction de validation du downloadBTN
function downloadBTN_validation(){
    if(list_produits.length==0){
        downloadBTN.style.display="none";
        // virification du tableau if it is empty
        document.getElementById("tbody").innerHTML=`<tr style="height: 50vh;">

        <td class="text-secondary " colspan="23">La Table Est Vide</td>
        
        
        </tr>`;
    }else{downloadBTN.style.display="block";}
}



//Pour coriger l'error « Blocked aria-hidden on an element because its descendant retained focus...» sur Chrome, j'utilise ce code
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('hide.bs.modal', function (event) {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    });
});

//fonction de base 

downloadBTN_validation()
ShowData ()
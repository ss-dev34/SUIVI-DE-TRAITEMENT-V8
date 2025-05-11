//main variable
let ferme=document.getElementById("ferme");
let parcelle=document.getElementById("parcelle");
let superficie=document.getElementById("superficie");
let culture=document.getElementById("culture");
let varietee=document.getElementById("varietee");
let date_de_plantation=document.getElementById("date_de_plantation");
let cycle=document.getElementById("cycle");

// modifide variables
let ferme_modifide=document.getElementById("ferme_modifide");
let parcelle_modifide=document.getElementById("parcelle_modifide");
let superficie_modifide=document.getElementById("superficie_modifide");
let culture_modifide=document.getElementById("culture_modifide");
let varietee_modifide=document.getElementById("varietee_modifide");
let date_de_plantation_modifide=document.getElementById("date_de_plantation_modifide");
let cycle_modifide=document.getElementById("cycle_modifide");



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
let list_parcelaire;
        if(localStorage.list_parcelaire!=null) {
                list_parcelaire=JSON.parse(localStorage.list_parcelaire)
        }else{list_parcelaire=[];}

//fonction de calcule la quantity
function get_quantity(){
    Pro_Quantity.innerText=list_parcelaire.length;
}


 
//fonction de l addition 
function Ajouter(){



    if(ferme.value !== "" && parcelle.value !== ""  && superficie.value !== "" && culture.value !== "" && varietee.value !== "" && date_de_plantation.value !== "" && cycle.value !== "" ){
        console.log("i am worcking")
        let NewParcelaire = {
            ferme: ferme.value,
            parcelle: parcelle.value, 
            superficie: superficie.value, 
            culture: culture.value,
            varietee:varietee.value,
            date_de_plantation:date_de_plantation.value,
            cycle: cycle.value
            
        }

        const forms = document.querySelectorAll('form');
        const form = forms[0];

        Array.from(form.elements).forEach((input) => {
        input.value="";
            });

    

        list_parcelaire.push(NewParcelaire);
        localStorage.setItem('list_parcelaire',JSON.stringify(list_parcelaire));
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
    
    for (let i=0; i<list_parcelaire.length;i++){
        
        table+=`
        <tr>
            <td>${list_parcelaire[i].ferme}</td>
            <td>${list_parcelaire[i].parcelle}</td>
            <td>${list_parcelaire[i].superficie}</td>
            <td>${list_parcelaire[i].culture}</td>
            <td>${list_parcelaire[i].varietee}</td>
            <td>${list_parcelaire[i].date_de_plantation}</td>
            <td>${list_parcelaire[i].cycle}</td>
            <td class="w-100 d-flex justify-content-center ">
                <button onclick= "ModifyProp(${i})" type="button" class="btn btn-warning m-1"><i class="bi bi-pencil-square"></i></button>
                <button onclick="DeleteProp(${i})" type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#delet_v"><i class="bi bi-trash3"></i></button>
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

    delet_temp = index;
}
function Delete(){
    list_parcelaire.splice(delet_temp,1);
    localStorage.setItem('list_parcelaire',JSON.stringify(list_parcelaire));
    ShowData();
    delet_temp = null;
    get_quantity()
    Toust.show()

}

//fonction de modification
function ModifyProp(index){
    Produit_inputs_Modifier.show();

    ferme_modifide.value = list_parcelaire[index].ferme;
    parcelle_modifide.value = list_parcelaire[index].parcelle;
    superficie_modifide.value = list_parcelaire[index].superficie;
    culture_modifide.value = list_parcelaire[index].culture;
    varietee_modifide.value = list_parcelaire[index].varietee;
    date_de_plantation_modifide.value = list_parcelaire[index].date_de_plantation;
    cycle_modifide.value = list_parcelaire[index].cycle;

   
    Modifide_Produit_temp = index;
}

function Modify(){
    if(ferme_modifide.value !== "" && parcelle_modifide.value !== ""  &&  superficie_modifide.value !== "" && culture_modifide.value !== "" && varietee_modifide.value !== "" && date_de_plantation_modifide.value !== "" && cycle_modifide.value !== ""){
        list_parcelaire[Modifide_Produit_temp].ferme = ferme_modifide.value;
        list_parcelaire[Modifide_Produit_temp].parcelle = parcelle_modifide.value;
        list_parcelaire[Modifide_Produit_temp].superficie = superficie_modifide.value;
        list_parcelaire[Modifide_Produit_temp].culture = culture_modifide.value;
        list_parcelaire[Modifide_Produit_temp].varietee = varietee_modifide.value;
        list_parcelaire[Modifide_Produit_temp].date_de_plantation = date_de_plantation_modifide.value;
        list_parcelaire[Modifide_Produit_temp].cycle = cycle_modifide.value;

        localStorage.setItem('list_parcelaire',JSON.stringify(list_parcelaire));
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
    const worksheet = XLSX.utils.json_to_sheet(list_parcelaire);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Save to Excel file
    XLSX.writeFile(workbook, "fiche_parcellaire.xlsx");
  }

//fonction pour convirtire json ou pdf
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape" });

    const title = "Fiche Parcellaire";
    doc.setFontSize(7); // Set title font size
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 10);
  
    const headers = Object.keys(list_parcelaire[0]);
    const rows = list_parcelaire.map(obj => headers.map(key => obj[key]));
  
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
  
    doc.save("fiche_parcellaire.pdf");
  }
  



//fonction de validation du downloadBTN
function downloadBTN_validation(){
    if(list_parcelaire.length==0){
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
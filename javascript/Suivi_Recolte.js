//main variable
let date_recolte=document.getElementById("date_recolte");
let nbr_caisses=document.getElementById("nbr_caisses");
let parcelle=document.getElementById("parcelle");
let bon_de_livraison=document.getElementById("bon_de_livraison");
let heure_debut_recolte=document.getElementById("heure_debut_recolte");
let heure_fin_recolte=document.getElementById("heure_fin_recolte");

// modifide variables

let date_recolte_modifide=document.getElementById("date_recolte_modifide");
let nbr_caisses_modifide=document.getElementById("nbr_caisses_modifide");
let parcelle_modifide=document.getElementById("parcelle_modifide");
let bon_de_livraison_modifide=document.getElementById("bon_de_livraison_modifide");
let heure_debut_recolte_modifide=document.getElementById("heure_debut_recolte_modifide");
let heure_fin_recolte_modifide=document.getElementById("heure_fin_recolte_modifide");



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
let list_suivi_recolte;
        if(localStorage.list_suivi_recolte!=null) {
                list_suivi_recolte=JSON.parse(localStorage.list_suivi_recolte)
        }else{list_suivi_recolte=[];}


//initialization de stockage list des parcelle
let list_parcelaire;
        if(localStorage.list_parcelaire!=null) {
                list_parcelaire=JSON.parse(localStorage.list_parcelaire)
        }else{list_parcelaire=[]}

//initialization de stockage list de suivi 
let list_suivi;
        if(localStorage.list_suivi!=null) {
                list_suivi=JSON.parse(localStorage.list_suivi)
        }else{list_suivi=[];}



//fonction de calcule la quantity
function get_quantity(){
    Pro_Quantity.innerText=list_suivi_recolte.length;
}

//just to show le parcelle list 
function get_parcelle(){
    let list='';
    for (let i=0; i<list_parcelaire.length; i++){
        list+=`
                <option value="${list_parcelaire[i].parcelle}">${list_parcelaire[i].parcelle}</option>
        `;
    }


    parcelle.innerHTML=list;
    parcelle_modifide.innerHTML=list;

}
get_parcelle()


function Get_list_Of_Parcelle(target_parselle){
    let list_data=[];
    list_suivi.forEach(obj=>{
    if (obj.parcelle===target_parselle){
        console.log(obj.Recolte_prevu_le)
        let val_reco=obj.Recolte_prevu_le
        let dateofreco=val_reco.split(" à ")
        console.log("----------------------")
        console.log(`${obj.date}T${obj.heure_debut}`)
        console.log(`${dateofreco[0]}T${dateofreco[1]}`)

        data_obj={
            x:new Date(`${obj.date}T${obj.heure_debut}`),
            y:new Date(`${dateofreco[0]}T${dateofreco[1]}`)
        }
        list_data.push(data_obj) 
    }
    })
    console.log(list_data)
    return list_data
}

function FindingConformite(list_des_date,date_rec){
    console.log(list_des_date)
    
    let viri=true;

    for(let i =0 ; i< list_des_date.length;i++){
        console.log(viri)
        if(viri){
            if(date_rec>=list_des_date[i].x && date_rec <=list_des_date[i].y ){
                viri=false;
            }
        }   
    }
    //console.log(viri)
    if(viri){
        return "conforme"
    }else{ return "non conforme"}
    
}



 
//fonction de l addition 
function Ajouter(){

    
    



    

    let conformite="ERROR";



    if(date_recolte.value !== "" && nbr_caisses.value !== ""  && parcelle.value !== "" && bon_de_livraison.value !== "" && heure_debut_recolte.value !== "" && heure_fin_recolte.value !== "" ){
        console.log("i am worcking")

        let date_rec= new Date(`${date_recolte.value}T${heure_fin_recolte.value}`)
        //Get_list_Of_Parcelle(parcelle.value)
        conformite=FindingConformite(Get_list_Of_Parcelle(parcelle.value),date_rec)

        let NewRecolte = {
            date_recolte: date_recolte.value,
            nbr_caisses: nbr_caisses.value, 
            parcelle: parcelle.value, 
            bon_de_livraison: bon_de_livraison.value,
            heure_debut_recolte:heure_debut_recolte.value,
            heure_fin_recolte:heure_fin_recolte.value,
            conformite:conformite,
           
            
        }

        const forms = document.querySelectorAll('form');
        const form = forms[0];

        Array.from(form.elements).forEach((input) => {
        input.value="";
            });

    

        list_suivi_recolte.push(NewRecolte);
        localStorage.setItem('list_suivi_recolte',JSON.stringify(list_suivi_recolte));
        Toust.show()
    }else{
        input_validaton.show();
    }

   
    get_quantity()
    ShowData()
  
}
  

//fonction de l'affichage
function ShowData (){

    Actualiser()
    let table="";
    
    for (let i=0; i<list_suivi_recolte.length;i++){

      
        
        table+=`
        <tr>
            <td>${list_suivi_recolte[i].date_recolte}</td>
            <td>${list_suivi_recolte[i].nbr_caisses}</td>
            <td>${list_suivi_recolte[i].parcelle}</td>
            <td>${list_suivi_recolte[i].bon_de_livraison}</td>
            <td>${list_suivi_recolte[i].heure_debut_recolte}</td>
            <td>${list_suivi_recolte[i].heure_fin_recolte}</td>
            <td><span class="confotme" id="${i}">${list_suivi_recolte[i].conformite}</span></td>
            <td class="w-100 d-flex justify-content-center ">
                <button onclick= "ModifyProp(${i})" type="button" class="btn btn-warning m-1"><i class="bi bi-pencil-square"></i></button>
                <button onclick="DeleteProp(${i})" type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#delet_v"><i class="bi bi-trash3"></i></button>
            </td>
        </tr>
        `;

        
        
    }
    document.getElementById("tbody").innerHTML=table;

    for (let i=0; i<list_suivi_recolte.length;i++){
      if(list_suivi_recolte[i].conformite=="conforme"){
        document.getElementById(i).style.background= "rgb(48, 214, 48)";
      }else{document.getElementById(i).style.background= "red"}

    }
    get_quantity()
    downloadBTN_validation()
}


//fonctions de suppression
function DeleteProp(index){

    delet_temp = index;
}
function Delete(){
    list_suivi_recolte.splice(delet_temp,1);
    localStorage.setItem('list_suivi_recolte',JSON.stringify(list_suivi_recolte));
    ShowData();
    delet_temp = null;
    get_quantity()
    Toust.show()

}

//fonction de modification
function ModifyProp(index){
    Produit_inputs_Modifier.show();

    date_recolte_modifide.value = list_suivi_recolte[index].date_recolte;
    nbr_caisses_modifide.value = list_suivi_recolte[index].nbr_caisses;
    parcelle_modifide.value = list_suivi_recolte[index].parcelle;
    bon_de_livraison_modifide.value = list_suivi_recolte[index].bon_de_livraison;
    heure_debut_recolte_modifide.value = list_suivi_recolte[index].heure_debut_recolte;
    heure_fin_recolte_modifide.value = list_suivi_recolte[index].heure_fin_recolte;

   
    Modifide_Produit_temp = index;
}

function Modify(){
    if(date_recolte_modifide.value !== "" && nbr_caisses_modifide.value !== ""  &&  parcelle_modifide.value !== "" && bon_de_livraison_modifide.value !== "" && heure_debut_recolte_modifide.value !== "" && heure_fin_recolte_modifide.value !== ""){
        list_suivi_recolte[Modifide_Produit_temp].date_recolte = date_recolte_modifide.value;
        list_suivi_recolte[Modifide_Produit_temp].nbr_caisses = nbr_caisses_modifide.value;
        list_suivi_recolte[Modifide_Produit_temp].parcelle = parcelle_modifide.value;
        list_suivi_recolte[Modifide_Produit_temp].bon_de_livraison = bon_de_livraison_modifide.value;
        list_suivi_recolte[Modifide_Produit_temp].heure_debut_recolte = heure_debut_recolte_modifide.value;
        list_suivi_recolte[Modifide_Produit_temp].heure_fin_recolte = heure_fin_recolte_modifide.value;

        localStorage.setItem('list_suivi_recolte',JSON.stringify(list_suivi_recolte));
        ShowData();
        Produit_inputs_Modifier.hide();
        get_quantity()
        Toust.show()
        Modifide_Produit_temp = null;
        }else{
        input_modifide_validation.show();
        }
    

}

function Actualiser(){

    for(let v=0 ; v<list_suivi_recolte.length;v++){
        let conformite="ERROR"

        let date_rec= new Date(`${list_suivi_recolte[v].date_recolte}T${list_suivi_recolte[v].heure_fin_recolte}`)
        //Get_list_Of_Parcelle(parcelle.value)
        conformite=FindingConformite(Get_list_Of_Parcelle(list_suivi_recolte[v].parcelle),date_rec)
        list_suivi_recolte[v].conformite=conformite;

        
    }
}


//fonction pour convirtire json ou execl
function exportToExcel() {
    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(list_suivi_recolte);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Save to Excel file
    XLSX.writeFile(workbook, "fiche_parcellaire.xlsx");
  }

//fonction pour convirtire json ou pdf

  function exportToPDF() {
    let temp=0;
    let tempTout=0;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const rowsPerPage = 30;
    const headers = [[
      "Date", "Nbr des caisses", "Parcelle récolté",
      "Bon de livraison", "Heure début de récolte", "Heure fin de récolte", "Conformité"
    ]];
    /*
    // Sample JSON data
    const jsonData = [];
    for (let i = 1; i <= 65; i++) {
      jsonData.push({
        date: `2025-05-${String(i).padStart(2, '0')}`,
        nbCaisses: 10 + i,
        cumul: 10 * i,
        serre: "Serre A",
        bon: `BL${100 + i}`,
        heureDebut: "08:00",
        heureFin: "10:00",
        conforme: i % 2 === 0 ? "Oui" : "Non"
      });
    }
      */

    const data = list_suivi_recolte.map(item => [
      item.date_recolte,
      item.nbr_caisses,
      item.parcelle,
      item.bon_de_livraison,
      item.heure_debut_recolte,
      item.heure_fin_recolte,
      item.conformite
    ]);
    console.log(data)

    let page = 1;
    let Total_Pages=0;

    for (let i = 0; i < data.length; i += rowsPerPage) {
      Total_Pages++;
    }

    for (let i = 0; i < data.length; i += rowsPerPage) {
      const chunk = data.slice(i, i + rowsPerPage);
      for (let j =0 ; j< chunk.length; j++){
      
        temp+=Number(chunk[j][1]);

      }

      // Boxed header
      doc.setDrawColor(0);
      doc.setLineWidth(0.3);
      doc.rect(10, 5, 190, 10); // Outer box
      doc.line(60, 5, 60, 15);  // Left column divider
      doc.line(150, 5, 150, 15); // Right column divider

      doc.setFontSize(10);
      doc.text("Nature Growers", 15, 10);
      doc.text("FICHE DE RECOLTE", 105, 10, null, null, "center");
      doc.text(`Page ${page} / ${Total_Pages} `, 155, 10);

      // Header info
      doc.setFontSize(10);
      doc.text(`Exploitation : .............................. `, 10, 22);
      doc.text("Campagne : ..............................", 10, 29);
      //doc.text("Secteur : .................................", 10, 29);
      doc.text("Culture/Variété : .......................", 10, 36);
      //doc.text("Serres : ..................................", 10, 36);
      //doc.text("Période : ................................", 120, 36);

      // Table
      doc.autoTable({
        startY: 42,
        head: headers,
        body: chunk,
        styles: {
          fontSize: 8,
          halign: 'center',
          valign: 'middle',
        },
        headStyles: {
          fillColor: [220, 220, 220],
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        },
        columnStyles: {
          5: { fontStyle: 'bold' },
          6: { fontStyle: 'bold' }
        }
      });

      // Footer
      const y = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(9);
      doc.text(`totale de la page : ${temp}`, 10, y-5);
      
      doc.text("NB: Une DAR de 3 jours doit se traduire en un délai minimum de 72 heures entre la fin de traitement et le début de la récolte.", 10, y + 5);
      doc.text("Visa de chef de culture", 10, y + 15);
      doc.text("....................................................", 10, y + 26);
      doc.text("Visa de responsable technique", 120, y + 15);
      doc.text("....................................................", 120, y + 26);



      tempTout+=temp
      if (i + rowsPerPage < data.length) {
        doc.addPage();
        page++;
      }else{
        if (page>=1){
            doc.setTextColor(255, 0, 0); // Red color (RGB)
            doc.text(`totale generale :${tempTout}`, 10, y);
            

        }
      }
      temp=0
    }

    doc.save("fiche_recolte.pdf");
  }
  



//fonction de validation du downloadBTN
function downloadBTN_validation(){
    if(list_suivi_recolte.length==0){
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
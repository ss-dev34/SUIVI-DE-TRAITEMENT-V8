
//main variable
let date=document.getElementById('date');
let heure_debut=document.getElementById('heure_debut');
let heure_fin=document.getElementById('heure_fin');
let parcelle=document.getElementById('parcelle');
//let sup=document.getElementById('sup');
//let variete=document.getElementById('variete');

let produit_commercial=document.getElementById('produit_commercial');
let bouilliee=document.getElementById('bouilliee');
let materiel=document.getElementById('materiel');
let methode=document.getElementById('methode');
let operateurs=document.getElementById('operateurs');
let condtiion_clima_vent=document.getElementById('condtiion_clima_vent');
let condtiion_clima_TC=document.getElementById('condtiion_clima_TC');
let condtiion_clima_pluie=document.getElementById('condtiion_clima_pluie');
let condtiion_clima_nuages=document.getElementById('condtiion_clima_nuages');
let Gestion_de_la_lutte_integree=document.getElementById('gli');
let n_order=document.getElementById('n_order');
// modifide variables

let date_modifide=document.getElementById('date_modifide');
let heure_debut_modifide=document.getElementById('heure_debut_modifide');
let heure_fin_modifide=document.getElementById('heure_fin_modifide');
let parcelle_modifide=document.getElementById('parcelle_modifide');
//let sup_modifide=document.getElementById('sup_modifide');
//let variete_modifide=document.getElementById('variete_modifide');

let bouilliee_modifide=document.getElementById('bouilliee_modifide');
let materiel_modifide=document.getElementById('materiel_modifide');
let methode_modifide=document.getElementById('methode_modifide');
let operateurs_modifide=document.getElementById('operateurs_modifide');
let condtiion_clima_vent_modifide=document.getElementById('condtiion_clima_vent_modifide');
let condtiion_clima_TC_modifide=document.getElementById('condtiion_clima_TC_modifide');
let condtiion_clima_pluie_modifide=document.getElementById('condtiion_clima_pluie_modifide');
let condtiion_clima_nuages_modifide=document.getElementById('condtiion_clima_nuages_modifide');
let Gestion_de_la_lutte_integree_modifide=document.getElementById('gli_modifide');
let n_order_modifide=document.getElementById('n_order_modifide');
////

 //download_button
 let downloadBTN=document.getElementById("downloadBTN");



//helper variables
let Suivi_Quantity = document.getElementById("Suivi_Quantity");
let Suivi_Name = document.getElementById("Suivi_Name");

//models bs

let input_validaton = new bootstrap.Modal(document.getElementById('input_validation'));
let input_modifide_validation = new bootstrap.Modal(document.getElementById('input_modifide_validation'));
let Suivi_inputs_Modifier = new bootstrap.Modal(document.getElementById('Suivi_inputs_Modifier'));
let Toust = new bootstrap.Toast(document.getElementById('Toast'));


//delet temporary variable
let delet_temp;
//modification temporary variable
let Modifide_temp;




//initialization de stockage list des produit
let list_produits;
        if(localStorage.list_produits!=null) {
                list_produits=JSON.parse(localStorage.list_produits)
        }else{list_produits=[]}

//initialization de stockage list des parcelle
let list_parcelaire;
        if(localStorage.list_parcelaire!=null) {
                list_parcelaire=JSON.parse(localStorage.list_parcelaire)
        }else{list_parcelaire=[]}

//initialization de stockage
let list_suivi;
        if(localStorage.list_suivi!=null) {
                list_suivi=JSON.parse(localStorage.list_suivi)
        }else{list_suivi=[];}


//fonction de calcule la quantity
function get_quantity(){
    Suivi_Quantity.innerText= list_suivi.length;
}




///teste finding the id of the element 
//let index = list_produits.findIndex(produit => produit.nom_comercial === 'DYNAMEC');




//remplaire la list des products
function get_produits(){
    let list='';
    for (let i=0; i<list_produits.length; i++){
        list+=`
                <option value="${list_produits[i].nom_comercial}">${list_produits[i].nom_comercial}</option>
        `;
    }
    
    produit_commercial.innerHTML=list;
    produit_commercial_modifide.innerHTML=list;
}
get_produits()


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




//fonction de l addition 




function Ajouter(){
    //index=> index of produit 
   
    let index = list_produits.findIndex(produit => produit.nom_comercial === produit_commercial.value );
    let index_parcelle = list_parcelaire.findIndex(parcelle_val => parcelle_val.parcelle === parcelle.value );
    console.log("indexofff " + index_parcelle)
    console.log(parcelle.value)
    console.log(list_parcelaire)

    console.log("indexofffp " + index)

    let Quantity_Pro;
    //les conditon pour calculer la quantity par sup 

    if(list_produits[index].dose_par=="l/ha" || list_produits[index].dose_par=="kg/ha" ){
        Quantity_Pro= list_parcelaire[index_parcelle].superficie * list_produits[index].dose;
     //les conditon pour calculer la quantity par bouilliee 
    }else if (list_produits[index].dose_par=="cc/ha" || list_produits[index].dose_par=="g/ha" ){
        Quantity_Pro= (list_parcelaire[index_parcelle].superficie * list_produits[index].dose)/1000;

    }else if(list_produits[index].dose_par=="cc/hl" || list_produits[index].dose_par=="g/hl"){

        Quantity_Pro= (bouilliee.value * list_produits[index].dose)/ 100 / 1000;
    }
    



    function addDays(date, days) {
        console.log("date test " + date)
        let result = new Date(date); // Crée une copie de la date d'origine
        console.log("test resulte " + result.toISOString())
        result.setDate(result.getDate() + days); // Ajoute le nombre de jours
        return result; // Retourne la nouvelle date
    }


    let dar_val;
    if(list_produits[index].dar==0){
        dar_val=list_produits[index].reentree

    }else(dar_val=list_produits[index].dar)
            
            
    let newDate = addDays(date.value,Number(dar_val));
   
    console.log(index)
    console.log( "ndate" +newDate.toISOString())

    // Format : JJ/MM/AAAA

    function formatDateToISO(dateStr) {
        const [day, month, year] = dateStr.split("-");
        return `${year}-${month}-${day}`;
        
      }



    let dateStr = `${newDate.getDate().toString().padStart(2, '0')}-${ 
                (newDate.getMonth() + 1).toString().padStart(2, '0')}-${ 
                newDate.getFullYear()}`;
    
    let Recolte_prevu_le=`${formatDateToISO(dateStr)} à ${heure_fin.value}`;


    console.log(Recolte_prevu_le);;





  
    let list_of_items=[condtiion_clima_vent,condtiion_clima_TC,condtiion_clima_pluie,condtiion_clima_nuages]
    //&& condtiion_clima_vent.value !== "" && condtiion_clima_TC.value !== "" && condtiion_clima_pluie.value !== "" && condtiion_clima_nuages.value !== "" pas obligé
    if(date.value !== "" && heure_debut.value !== "" && heure_fin.value !== "" && parcelle.value !== ""   && produit_commercial.value !== "" && bouilliee.value !== "" && materiel.value !== "" && methode.value !== "" && operateurs.value !== ""   && n_order.value !==""){
        //
        list_of_items.forEach(val=>{
            if(val.value==""){
                val.value="-";
            }
        })

        
          
        
        let NewSuivi = {
            n_order: n_order.value,
            date: date.value,

            heure_debut: heure_debut.value,
            heure_fin: heure_fin.value,
            parcelle: parcelle.value,
            sup:list_parcelaire[index_parcelle].superficie,
            variete:list_parcelaire[index_parcelle].varietee,
            produit_commercial: produit_commercial.value,
            matiere_active:list_produits[index].matiere_active,
            dose:list_produits[index].dose,
            dose_par:list_produits[index].dose_par,
            bouilliee: bouilliee.value,
            quantite_produit:Quantity_Pro.toFixed(2),
            cible:list_produits[index].cible,


            dar:list_produits[index].dar,


            materiel: materiel.value,
            methode:methode.value,
            operateurs:operateurs.value,
            condtiion_clima_vent:condtiion_clima_vent.value,
            condtiion_clima_TC:condtiion_clima_TC.value,
            condtiion_clima_pluie:condtiion_clima_pluie.value,
            condtiion_clima_nuages:condtiion_clima_nuages.value,
            
            Recolte_prevu_le:Recolte_prevu_le,
            Gestion_de_la_lutte_integree:"Conforme",
            //attention a la quantity
            

            


        }

        //pour initialisi la  form
        const forms = document.querySelectorAll('form');
        const form = forms[0];

        Array.from(form.elements).forEach((input) => {
        input.value="";
            });

        list_suivi.push(NewSuivi);
        localStorage.setItem('list_suivi',JSON.stringify(list_suivi));
        Toust.show()
    }else{
        input_validaton.show();
        console.log('error ');
    }

   
    get_quantity()
    ShowData()
  
}


//fonction de l'affichage
function ShowData (){
    Actualiser()
    let table="";
    
    for (let i=0; i<list_suivi.length;i++){
        
        table+=`
        <tr>
            <td>${list_suivi[i].n_order}</td>
            <td style="width:30px;" >${list_suivi[i].date}</td>
            <td>${list_suivi[i].heure_debut}</td>
            <td>${list_suivi[i].heure_fin}</td>
            <td>${list_suivi[i].parcelle}</td>
            <td>${list_suivi[i].sup}</td>
            <td>${list_suivi[i].variete}</td>
            <td>${list_suivi[i].produit_commercial}</td>
            <td>${list_suivi[i].matiere_active}</td>
            <td>${list_suivi[i].dose}</td>
            <td>${list_suivi[i].dose_par}</td>
            <td>${list_suivi[i].bouilliee}</td>
            <td>${list_suivi[i].quantite_produit}</td>
            <td>${list_suivi[i].cible}</td>
            <td>${list_suivi[i].dar}</td>
            <td style="width:30px;">${list_suivi[i].Recolte_prevu_le}</td>
            <td>${list_suivi[i].materiel}</td>
            <td>${list_suivi[i].methode}</td>
            <td>${list_suivi[i].operateurs}1</td>
            <td>${list_suivi[i].condtiion_clima_vent}</td>
            <td>${list_suivi[i].condtiion_clima_TC}</td>
            <td>${list_suivi[i].condtiion_clima_pluie}</td>
            <td>${list_suivi[i].condtiion_clima_nuages}</td>
            <td>${list_suivi[i].Gestion_de_la_lutte_integree}</td>
            <td class="w-100 d-flex justify-content-center">
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
    list_suivi.splice(delet_temp,1);
    localStorage.setItem('list_suivi',JSON.stringify(list_suivi));
    ShowData();
    delet_temp = null;
    get_quantity()
    Toust.show()
   
    
}

//fonction de modification
function ModifyProp(index){
    Suivi_inputs_Modifier.show();
    //Modifide_Pro_Name.innerText = list_produits[index].nom_comercial;

    date_modifide.value = list_suivi[index].date;
    n_order_modifide.value = list_suivi[index].n_order;
    heure_debut_modifide.value = list_suivi[index].heure_debut;
    heure_fin_modifide.value = list_suivi[index].heure_fin;
    parcelle_modifide.value = list_suivi[index].parcelle;
    //sup_modifide.value = list_suivi[index].sup;
    //variete_modifide.value = list_suivi[index].variete;
    produit_commercial_modifide.value = list_suivi[index].produit_commercial;
    bouilliee_modifide.value = list_suivi[index].bouilliee;
    materiel_modifide.value = list_suivi[index].materiel;

    methode_modifide.value = list_suivi[index].methode;
    operateurs_modifide.value = list_suivi[index].operateurs;
    condtiion_clima_vent_modifide.value = list_suivi[index].condtiion_clima_vent;
    condtiion_clima_TC_modifide.value = list_suivi[index].condtiion_clima_TC;
    condtiion_clima_pluie_modifide.value = list_suivi[index].condtiion_clima_pluie;
    condtiion_clima_nuages_modifide.value = list_suivi[index].condtiion_clima_nuages;
    //Gestion_de_la_lutte_integree_modifide.value = list_suivi[index].Gestion_de_la_lutte_integree;









    Modifide_temp=index;

    
}   


function Actualiser(){
    console.log("test")
    for(let v=0 ; v<list_suivi.length;v++){
        console.log(v)
        let index = list_produits.findIndex(produit => produit.nom_comercial === list_suivi[v].produit_commercial);
        let index_parcelle = list_parcelaire.findIndex(parcelle_val => parcelle_val.parcelle === list_suivi[v].parcelle );
        

        if(index_parcelle>=0){
            list_suivi[v].sup= list_parcelaire[index_parcelle].superficie;    
            list_suivi[v].variete= list_parcelaire[index_parcelle].varietee; 
        }

        if (index>=0 ){

            let Quantity_Pro;
        //les conditon pour calculer la quantity par sup    
    
        if(list_produits[index].dose_par=="l/ha" || list_produits[index].dose_par=="kg/ha" ){
            Quantity_Pro= list_suivi[v].sup * list_produits[index].dose;
         //les conditon pour calculer la quantity par bouilliee 
        }else if(list_produits[index].dose_par=="cc/ha" || list_produits[index].dose_par=="g/ha" ){
            Quantity_Pro= (list_suivi[v].sup * list_produits[index].dose) / 1000;
    
        }else if(list_produits[index].dose_par=="cc/hl" || list_produits[index].dose_par=="g/hl"){
    
            Quantity_Pro= (list_suivi[v].bouilliee  * list_produits[index].dose)/ 100 / 1000;
    
    
    
        }
        function addDays(date, days) {
            console.log("date test " + date)
            let result = new Date(date); // Crée une copie de la date d'origine
            console.log("test resulte " + result.toISOString())
            result.setDate(result.getDate() + days); // Ajoute le nombre de jours
            return result; // Retourne la nouvelle date
        }

        let dar_val;
            if(list_produits[index].dar==0){
                dar_val=list_produits[index].reentree
    
            }else(dar_val=list_produits[index].dar)
    
      
        let newDate = addDays(list_suivi[v].date,Number(dar_val));
        
        
        function formatDateToISO(dateStr) {
            const [day, month, year] = dateStr.split("-");
            return `${year}-${month}-${day}`;
            
        }

        let dateStr = `${newDate.getDate().toString().padStart(2, '0')}-${ 
            (newDate.getMonth() + 1).toString().padStart(2, '0')}-${ 
            newDate.getFullYear()}`;
        
        let Recolte_prevu_le=`${formatDateToISO(dateStr)} à ${list_suivi[v].heure_fin}`;

        
   
                    
            list_suivi[v].Recolte_prevu_le= Recolte_prevu_le;
           
            list_suivi[v].quantite_produit = Quantity_Pro.toFixed(2);
            list_suivi[v].dose = list_produits[index].dose ;
            list_suivi[v].dose_par = list_produits[index].dose_par ;
            list_suivi[v].matiere_active = list_produits[index].matiere_active ;
            list_suivi[v].cible = list_produits[index].cible ;
            


            
            
            list_suivi[v].dar= list_produits[index].dar; 
            
            
               


        }
        
    

        

    }


}

function Modify(){

    /*
    let index = list_produits.findIndex(produit => produit.nom_comercial === produit_commercial_modifide.value);
    

    let Quantity_Pro;
    //les conditon pour calculer la quantity par sup 

    if(list_produits[index].dose_par=="l/ha" || list_produits[index].dose_par=="kg/ha" ){
        Quantity_Pro= sup_modifide.value * list_produits[index].dose;
     //les conditon pour calculer la quantity par bouilliee 
    }else if(list_produits[index].dose_par=="cc/ha" || list_produits[index].dose_par=="g/ha" ){
        Quantity_Pro= (sup_modifide.value * list_produits[index].dose) / 1000;

    }else if(list_produits[index].dose_par=="cc/hl" || list_produits[index].dose_par=="g/hl"){

        Quantity_Pro= (bouilliee_modifide.value * list_produits[index].dose)/ 100 / 1000;
    } 
    */
    //&& condtiion_clima_vent_modifide.value !== "" && condtiion_clima_TC_modifide.value !== "" && condtiion_clima_pluie_modifide.value !== "" && condtiion_clima_nuages_modifide.value !== "" pas oblge
    let list_of_items=[condtiion_clima_vent_modifide,condtiion_clima_TC_modifide,condtiion_clima_pluie_modifide,condtiion_clima_nuages_modifide]
    if(date_modifide.value !== "" && heure_debut_modifide.value !== "" && heure_fin_modifide.value !== "" && parcelle_modifide.value !== ""    && produit_commercial_modifide.value !== "" && bouilliee_modifide.value !== "" && materiel_modifide.value !== "" && methode_modifide.value !== "" && operateurs_modifide.value !== "" ){
        
        list_of_items.forEach(val=>{
            if(val.value==""){
                val.value="-";
            }
        })
        


        list_suivi[Modifide_temp].date = date_modifide.value;
        list_suivi[Modifide_temp].n_order = n_order_modifide.value;
        list_suivi[Modifide_temp].heure_debut = heure_debut_modifide.value;
        list_suivi[Modifide_temp].heure_fin = heure_fin_modifide.value;
        list_suivi[Modifide_temp].parcelle = parcelle_modifide.value;
        //list_suivi[Modifide_temp].sup = sup_modifide.value;
        //list_suivi[Modifide_temp].variete = variete_modifide.value;
        list_suivi[Modifide_temp].produit_commercial = produit_commercial_modifide.value;
        list_suivi[Modifide_temp].bouilliee = bouilliee_modifide.value;
        list_suivi[Modifide_temp].materiel = materiel_modifide.value;
        list_suivi[Modifide_temp].methode = methode_modifide.value;
        list_suivi[Modifide_temp].operateurs = operateurs_modifide.value;
        list_suivi[Modifide_temp].condtiion_clima_vent = condtiion_clima_vent_modifide.value;
        list_suivi[Modifide_temp].condtiion_clima_TC = condtiion_clima_TC_modifide.value;
        list_suivi[Modifide_temp].condtiion_clima_pluie = condtiion_clima_pluie_modifide.value;
        list_suivi[Modifide_temp].condtiion_clima_nuages = condtiion_clima_nuages_modifide.value;
        
        //list_suivi[Modifide_temp].Gestion_de_la_lutte_integree = Gestion_de_la_lutte_integree_modifide.value;

        //metre on considiration


        /*
        list_suivi[Modifide_temp].quantite_produit = Quantity_Pro;


        list_suivi[Modifide_temp].dose = list_produits[index].dose ;
        list_suivi[Modifide_temp].dose_par = list_produits[index].dose_par ;
        list_suivi[Modifide_temp].matiere_active = list_produits[index].matiere_active ;
        list_suivi[Modifide_temp].cible = list_produits[index].cible ;
        list_suivi[Modifide_temp].dar= list_produits[index].dar;

        */

        localStorage.setItem('list_suivi',JSON.stringify(list_suivi));
        
        ShowData();
        Suivi_inputs_Modifier.hide();
        get_quantity()
        Toust.show()
        Modifide_temp = null;
        }else{
        input_modifide_validation.show();
        }
    

}


//fonction pour convirtire json ou execl
function exportToExcel() {
    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(list_suivi);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "list_suivi");

    // Save to Excel file
    XLSX.writeFile(workbook, "list_suivi.xlsx");
  }


  //fonction pour convirtire json ou pdf
  function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape" }); // Landscape mode


    const title = "Liste de Suivi";
    doc.setFontSize(7); 
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 10);
  
    
    const headers = Object.keys(list_suivi[0]);
    const rows = list_suivi.map(obj => headers.map(key => obj[key]));
  
   
    doc.autoTable({
      head: [headers],
      body: rows,
      styles: {
        fontSize: 4.5,       
        cellPadding: 1     
      },
      headStyles: {
        fontSize: 4.5,
        fillColor: [52, 73, 94], //header color
        textColor: 255,
        halign: 'center'
      },
      bodyStyles: {
        halign: 'center'
      },
      startY: 15,
      margin: { left: 1 , right: 1} // Add some top margin
    });
  
    doc.save("liste_suivi.pdf");
  }
  


  //fonction de validation du downloadBTN
function downloadBTN_validation(){
    if(list_suivi.length==0){
        downloadBTN.style.display="none";
        // virification du tableau if it is empty
        document.getElementById("tbody").innerHTML=`<tr style="height: 50vh;">

        <td class="text-secondary " colspan="23">La Table Est Vide</td>
        
        
        </tr>`;

    }else{downloadBTN.style.display="block";}
}






//Pour corriger l'erreur « Blocked aria-hidden on an element because its descendant retained focus...» sur Chrome, j'utilise ce code.
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('hide.bs.modal', function (event) {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    });
});

//les fonction de base 
downloadBTN_validation()
ShowData()

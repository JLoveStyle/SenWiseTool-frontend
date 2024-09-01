// // Ouvrir une base de données
// const request = indexedDB.open('maBaseDeDonnées', 1);

// request.onupgradeneeded = function(event) {
//   const db = (event.target as IDBOpenDBRequest).result;
//   const objectStore = db.createObjectStore("MesObjets", { keyPath: "id", autoIncrement: true });
//   objectStore.createIndex("nom", "nom", { unique: false });
// };

// request.onsuccess = function(event) {
//   const db = (event.target as IDBOpenDBRequest).result;
//   console.log("Base de données ouverte avec succès");

//   // Ajouter des données
//   const transaction = db.transaction('maTable', 'readwrite');
//   const objectStore = transaction.objectStore('maTable');
//   objectStore.add({ id: 1, nom: 'Exemple' });

//   // Lire des données
//   const getRequest = objectStore.get(1);
//   getRequest.onsuccess = (event) => {
//     console.log('Données récupérées:', event.target.result);
//   };
// };

// function ajouterDonnee(data: object) {
//   const transaction = db.transaction(["MesObjets"], "readwrite");
//   const objectStore = transaction.objectStore("MesObjets");
//   const request = objectStore.add(data);

//   request.onsuccess = function(event) {
//     console.log("Donnée ajoutée avec succès");
//   };

//   request.onerror = function(event) {
//     console.error("Erreur lors de l'ajout de la donnée", event);
//   };
// }

// request.onerror = (event) => {
//   console.error('Erreur IndexedDB:', event.target.errorCode);
// };

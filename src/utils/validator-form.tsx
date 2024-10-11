import { objecType } from "@/types/type-tools";
// import { isUniq } from "./tools";

export const validatorForm = async (
  formData: any,
  rules: objecType
): Promise<{ isValid: boolean; errors: objecType }> => {
  let isValid = true;
  let errors: objecType = {};

  // Parcours de chaque champ dans formData
  for (const fieldName in formData) {
    if (formData.hasOwnProperty(fieldName)) {
      const value = formData[fieldName];
      const fieldRules = rules[fieldName];

      // Vérifier chaque règle pour le champ actuel
      if (fieldRules) {
        const ruleList = fieldRules.split("|");

        for (const rule of ruleList) {
          const [ruleName, ruleParams] = rule.split(":");
          let error = "";

          // Application de la règle de validation
          switch (ruleName) {
            case "required":
              if (!value) {
                error = "Ce champ est requis";
                isValid = false;
              }
              break;
            case "email":
              if (value && !email(value)) {
                error = "Veuillez entrer une adresse email valide";
                isValid = false;
              }
              break;
            case "size":
              if (value && value.length !== parseInt(ruleParams)) {
                error = `Ce champ doit avoir ${ruleParams} caractères`;
                isValid = false;
              }
              break;
            case "minLength":
              if (value && value.length < parseInt(ruleParams)) {
                error = `Ce champ doit avoir au moins ${ruleParams} caractères`;
                isValid = false;
              }
              break;
            case "maxLength":
              if (value && value.length > parseInt(ruleParams)) {
                error = `Ce champ ne doit pas avoir plus de ${ruleParams} caractères`;
                isValid = false;
              }
              break;
            case "min":
              if (value && parseInt(value) < parseInt(ruleParams)) {
                error = `Ce champ doit avoir au moins ${ruleParams} caractères`;
                isValid = false;
              }
              break;
            case "max":
              if (value && parseInt(value) > parseInt(ruleParams)) {
                error = `Ce champ ne doit pas avoir plus de ${ruleParams} caractères`;
                isValid = false;
              }
              break;
            // case "unique":
            //   const { error: err, isUniqData } = await isUniq(
            //     ruleParams,
            //     value,
            //     fieldName
            //   );

            //   if (err) {
            //     error = err.message;
            //     isValid = false;
            //   }
            //   if (!isUniqData) {
            //     error = `${fieldName} ${value} est déjà utilisé`;
            //     isValid = false;
            //   }
            //   break;
            // // Ajouter d'autres règles de validation ici
            // default:
            //   break;
          }

          // Si une erreur est trouvée, l'ajouter aux erreurs pour ce champ
          if (error) {
            errors[fieldName] = error;
            break; // Arrêter la vérification des règles pour ce champ s'il y a une erreur
          }
        }
      }
    }
  }

  return { isValid, errors };
};

// Fonction utilitaire pour valider l'email (exemple)
const email = (email: string): boolean => {
  // Implémentation de la validation de l'email, retourne true ou false
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|gov|edu)$/.test(
    email
  );
};

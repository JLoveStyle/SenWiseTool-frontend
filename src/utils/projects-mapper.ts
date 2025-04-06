import { PROJECTTYPE } from "@/types/api-types";

export function mapToProjectType(type: string | undefined): string {
    if (!type) {
        return '-'
    }

    switch(type){
        case (PROJECTTYPE.INITIAL_INSPECTION):
            return "INSPECTION INITIAL"
        case (PROJECTTYPE.AUTO_EVALUATION):
            return "AUTO EVALUATION"
        case (PROJECTTYPE.INTERNAL_INSPECTION):
            return "INSPECTION INTERNE"
        case (PROJECTTYPE.TRAINING):
            return "TRAINING"
        case (PROJECTTYPE.MAPPING):
            return "MAPPING"
        default: return type; 
    }
}

export function mapToProjectStatus(status: string | undefined): string {
    if (!status) {
        return '-'
    }

    switch(status){
        case "DRAFT":
            return "Brouillon"
        case "VALIDATED":
            return "Validé"
        case "DEPLOYED":
            return "Déployé"
        case "ARCHIVED":
            return "Archivé"
        default: return status;
    }
}
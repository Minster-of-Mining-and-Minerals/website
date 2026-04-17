import ResourceList from '@/features/sectors/mining/ResourceList'
import React from 'react'

function GeothermalResourcePage() {
    return (
        <ResourceList 
            sector="geothermal" 
            title="Geothermal Resources"
            addDocumentLabel="Add a new document or report to the geothermal sector"
            placeholder="E.g., Geothermal Sector Annual Report 2024"
        />
    )
}

export default GeothermalResourcePage
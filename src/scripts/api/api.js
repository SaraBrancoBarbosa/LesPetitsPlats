export async function getRecipes() {
    try {
        const database = await fetch("./public/data/recipes.json")
        if (!database.ok) {
            throw new Error(`Error! status: ${database.status}`)
        }
        return await database.json()
    } catch (error) {
        console.error("Error getting the recipes:", error) 
        return null
    }
}
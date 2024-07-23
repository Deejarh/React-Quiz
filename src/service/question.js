import supabase from "./supabase"

export async function getQuestions () {
    let { data, error } = await supabase
    .from('react-quiz')
    .select('*')

    if (error){
        console.error(error)
        throw new Error('Questions could not be fetched')
    }
    return data;
}
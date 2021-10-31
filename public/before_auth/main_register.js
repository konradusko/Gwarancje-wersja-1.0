export default async function register_main(){
    const register_button = await import('./register_button.js')
    register_button.default()
}